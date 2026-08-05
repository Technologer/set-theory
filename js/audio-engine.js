/* Set Theory — audio engine.
   Wraps the YouTube IFrame Player API. Guarantees exactly one audible player,
   fades volume across section changes, and keeps only a small window of live
   players alive so a 24-section page doesn't melt the browser.

   Requires HTTP (not file://) — see README. On file:// YouTube returns error 153. */

const AudioEngine = (() => {
  const TARGET_VOLUME = 70;
  const FADE_IN_MS = 600;
  const FADE_OUT_MS = 400;
  const KEEP_WINDOW = 2;      // destroy players further than this many sections away
  const PRELOAD_WINDOW = 1;   // create players for current section +/- this many
  const PRELOAD_DELAY_MS = 2500;  // hold neighbours back so they don't starve the active track

  let tracks = [];            // [{ id, video, videoStart }]
  const players = new Map();  // index -> { player, ready, index }
  const fades = new Map();    // index -> rAF id

  let apiReady = false;
  let apiReadyWaiters = [];
  let soundOn = false;
  let activeIndex = -1;
  let started = false;        // journey begun (user gesture registered)
  let enabled = true;         // false under prefers-reduced-motion
  let onSoundChange = () => {};
  let onFirstPlay = () => {};
  let onTrackEnd = () => {};
  let firstPlayAnnounced = false;

  /* ---------- YouTube API bootstrap ---------- */

  function loadApi() {
    if (window.YT && window.YT.Player) { apiReady = true; return Promise.resolve(); }
    return new Promise((resolve) => {
      apiReadyWaiters.push(resolve);
      if (document.getElementById("yt-api-script")) return;
      const s = document.createElement("script");
      s.id = "yt-api-script";
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    });
  }

  window.onYouTubeIframeAPIReady = function () {
    apiReady = true;
    apiReadyWaiters.forEach((r) => r());
    apiReadyWaiters = [];
  };

  /* ---------- player lifecycle ---------- */

  // YT.Player replaces its target div with an iframe, so each section keeps a
  // wrapper we can drop a fresh placeholder into after a destroy().
  function placeholderFor(index) {
    const wrap = document.querySelector(`[data-player-wrap="${index}"]`);
    if (!wrap) return null;
    let el = wrap.querySelector(".yt-slot");
    if (!el) {
      el = document.createElement("div");
      el.className = "yt-slot";
      wrap.appendChild(el);
    }
    return el;
  }

  function createPlayer(index) {
    if (!enabled || players.has(index)) return players.get(index);
    const track = tracks[index];
    const slot = placeholderFor(index);
    if (!track || !slot || !apiReady) return null;

    const entry = { player: null, ready: false, index };
    players.set(index, entry);

    entry.player = new YT.Player(slot, {
      videoId: track.video,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        start: track.videoStart || 0
      },
      events: {
        onReady: () => {
          entry.ready = true;
          entry.player.mute();          // always start muted — autoplay policy
          entry.player.setVolume(0);
          if (index === activeIndex && started) play(index);
        },
        onStateChange: (e) => {
          if (e.data !== YT.PlayerState.ENDED) return;
          // Rewind and park the finished track so scrolling back to it starts
          // clean, and so YouTube's end-screen grid never stays on display.
          // Drop the volume first: seekTo() makes an ended video resume, which
          // would otherwise replay the intro out loud during the handover scroll.
          cancelFade(index);
          try {
            entry.player.setVolume(0);
            entry.player.seekTo(track.videoStart || 0);
            entry.player.pauseVideo();
          } catch (err) { /* noop */ }
          // The track that just ended is the one on screen -> move the journey on.
          if (index === activeIndex && started) onTrackEnd(index);
        },
        onError: () => {
          const section = document.querySelector(`[data-index="${index}"]`);
          if (section) section.classList.add("has-video-error");
        }
      }
    });
    return entry;
  }

  function destroyPlayer(index) {
    const entry = players.get(index);
    if (!entry) return;
    cancelFade(index);
    try { entry.player && entry.player.destroy && entry.player.destroy(); } catch (e) { /* already gone */ }
    players.delete(index);
    const wrap = document.querySelector(`[data-player-wrap="${index}"]`);
    if (wrap) wrap.innerHTML = "";      // clear the leftover iframe node
  }

  function prunePlayers(center) {
    [...players.keys()].forEach((i) => {
      if (Math.abs(i - center) > KEEP_WINDOW) destroyPlayer(i);
    });
  }

  let preloadTimer = null;

  function ensureWindow(center) {
    // The section being listened to gets the connection to itself first. Creating
    // three iframes at once had them all buffering in parallel, which is what
    // made the active track sit on YouTube's spinner for many seconds — the
    // player is sized to the viewport, so each one is fetching a large stream.
    createPlayer(center);
    prunePlayers(center);

    clearTimeout(preloadTimer);
    preloadTimer = setTimeout(() => {
      if (center !== activeIndex) return;   // user has scrolled on; skip it
      for (let i = center - PRELOAD_WINDOW; i <= center + PRELOAD_WINDOW; i++) {
        if (i >= 0 && i < tracks.length && i !== center) createPlayer(i);
      }
    }, PRELOAD_DELAY_MS);
  }

  /* ---------- volume fading ---------- */

  function cancelFade(index) {
    const id = fades.get(index);
    if (id) { cancelAnimationFrame(id); fades.delete(index); }
  }

  /** Set volume AND record it, so a resume can put it back. */
  function setVol(entry, v) {
    entry.vol = v;
    try { entry.player.setVolume(v); } catch (e) { /* iframe torn down */ }
  }

  /** Current volume as the player actually has it, falling back to what we set. */
  function volOf(entry) {
    try {
      const v = entry.player.getVolume();
      if (typeof v === "number" && !isNaN(v)) return v;
    } catch (e) { /* not ready */ }
    return typeof entry.vol === "number" ? entry.vol : 0;
  }

  function fade(index, from, to, ms, done) {
    const entry = players.get(index);
    if (!entry || !entry.ready) { done && done(); return; }
    cancelFade(index);
    entry.target = to;               // where this fade is meant to land
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / ms);
      setVol(entry, Math.round(from + (to - from) * p));
      if (p < 1) {
        fades.set(index, requestAnimationFrame(step));
      } else {
        fades.delete(index);
        done && done();
      }
    };
    fades.set(index, requestAnimationFrame(step));
  }

  /** rAF stops firing while the tab is hidden, so a fade interrupted by a tab
      switch would leave the volume frozen part-way — or at 0. Snap it home. */
  function settleFade(index) {
    const entry = players.get(index);
    if (!entry || !entry.ready) return;
    if (fades.has(index)) cancelFade(index);
    if (typeof entry.target === "number") setVol(entry, entry.target);
  }

  /* ---------- playback ---------- */

  function applyMuteState(entry) {
    if (!entry || !entry.ready) return;
    try {
      if (soundOn) entry.player.unMute();
      else entry.player.mute();
    } catch (e) { /* noop */ }
  }

  function play(index) {
    const entry = players.get(index);
    if (!entry || !entry.ready) return;
    applyMuteState(entry);
    setVol(entry, 0);
    try { entry.player.playVideo(); } catch (e) { return; }
    fade(index, 0, TARGET_VOLUME, FADE_IN_MS);
    if (!firstPlayAnnounced) { firstPlayAnnounced = true; onFirstPlay(); }
  }

  function stop(index) {
    const entry = players.get(index);
    if (!entry || !entry.ready) return;
    // Fade from where the volume actually is. Assuming TARGET_VOLUME meant that
    // interrupting a fade-in jumped the level UP before ramping down — audible.
    fade(index, volOf(entry), 0, FADE_OUT_MS, () => {
      // Pause, don't destroy — scrolling back up should resume instantly.
      try { entry.player.pauseVideo(); } catch (e) { /* noop */ }
    });
  }

  // Browsers pause media in a backgrounded tab, and a paused embed draws
  // YouTube's own overlay. Resume the active section when the user comes back.
  //
  // Restoring playback alone was a bug: the fade runs on requestAnimationFrame,
  // which is frozen while the tab is hidden. Switching away during the 600ms
  // fade-in left the volume stuck at 0, so coming back resumed a *silent*
  // video. Settle the fade and re-apply mute state before resuming.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden || !started || activeIndex < 0) return;
    const entry = players.get(activeIndex);
    if (!entry || !entry.ready) return;
    settleFade(activeIndex);
    applyMuteState(entry);
    try { entry.player.playVideo(); } catch (e) { /* noop */ }
  });

  /* ---------- public API ---------- */

  return {
    /** @param list [{id, video, videoStart}] */
    async init(list, opts = {}) {
      tracks = list;
      enabled = opts.enabled !== false;
      onSoundChange = opts.onSoundChange || onSoundChange;
      onFirstPlay = opts.onFirstPlay || onFirstPlay;
      onTrackEnd = opts.onTrackEnd || onTrackEnd;
      if (!enabled) return;
      await loadApi();
      // The API usually resolves after the first section is already active,
      // so build that window now rather than waiting for the next scroll.
      if (activeIndex >= 0) {
        ensureWindow(activeIndex);
        if (started) play(activeIndex);
      }
    },

    /** Called from the "Begin" click so the browser sees a real user gesture.
        The no-op play/pause registers the gesture for the rest of the session. */
    unlock() {
      started = true;
      if (!enabled) return;
      const index = activeIndex >= 0 ? activeIndex : 0;
      activeIndex = index;
      ensureWindow(index);
      // Calling playVideo() inside the click gesture is itself what registers the
      // gesture. A play/pause no-op would race this play call — pauseVideo() is
      // async and can land after it, leaving the first section silently paused.
      // If the API is still loading, onReady starts playback instead.
      play(index);
    },

    setActive(index) {
      if (!enabled || index === activeIndex) return;
      const previous = activeIndex;
      activeIndex = index;
      if (previous >= 0) stop(previous);
      ensureWindow(index);
      if (started) play(index);
    },

    /** Pause everything — used when the intro/outro screens are on-screen. */
    clearActive() {
      if (activeIndex >= 0) stop(activeIndex);
      activeIndex = -1;
    },

    toggleSound() {
      soundOn = !soundOn;
      // unMute() here rides the click gesture, which is what actually unlocks audio.
      players.forEach(applyMuteState);
      onSoundChange(soundOn);
      return soundOn;
    },

    isSoundOn: () => soundOn,
    isEnabled: () => enabled,
    getActive: () => activeIndex,

    /** Read-only snapshot for QA. YT states: -1 unstarted, 0 ended, 1 playing,
        2 paused, 3 buffering, 5 cued. Exactly one player should ever report 1.
        Volume is included because a silently-playing player is a real failure
        mode — a fade interrupted by a hidden tab used to leave it at 0. */
    states() {
      const out = {};
      players.forEach((entry, i) => {
        let state = "not-ready", vol = null, muted = null;
        try {
          if (entry.ready) {
            state = entry.player.getPlayerState();
            vol = entry.player.getVolume();
            muted = entry.player.isMuted();
          }
        } catch (e) { state = "gone"; }
        out[i] = { state, vol, muted, target: entry.target ?? null };
      });
      return { activeIndex, soundOn, started, players: out };
    },

    /** Reduced-motion path: play one section on explicit user request only. */
    playOnDemand(index) {
      if (!enabled) enabled = true;
      started = true;
      soundOn = true;
      onSoundChange(true);
      if (activeIndex >= 0 && activeIndex !== index) stop(activeIndex);
      activeIndex = index;
      const entry = players.get(index) || createPlayer(index);
      if (entry && entry.ready) play(index);
    }
  };
})();
