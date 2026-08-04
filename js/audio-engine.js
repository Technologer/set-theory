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

  function ensureWindow(center) {
    for (let i = center - PRELOAD_WINDOW; i <= center + PRELOAD_WINDOW; i++) {
      if (i >= 0 && i < tracks.length) createPlayer(i);
    }
    prunePlayers(center);
  }

  /* ---------- volume fading ---------- */

  function cancelFade(index) {
    const id = fades.get(index);
    if (id) { cancelAnimationFrame(id); fades.delete(index); }
  }

  function fade(index, from, to, ms, done) {
    const entry = players.get(index);
    if (!entry || !entry.ready) { done && done(); return; }
    cancelFade(index);
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / ms);
      const v = Math.round(from + (to - from) * p);
      try { entry.player.setVolume(v); } catch (e) { /* iframe torn down */ }
      if (p < 1) {
        fades.set(index, requestAnimationFrame(step));
      } else {
        fades.delete(index);
        done && done();
      }
    };
    fades.set(index, requestAnimationFrame(step));
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
    try { entry.player.setVolume(0); entry.player.playVideo(); } catch (e) { return; }
    fade(index, 0, TARGET_VOLUME, FADE_IN_MS);
    if (!firstPlayAnnounced) { firstPlayAnnounced = true; onFirstPlay(); }
  }

  function stop(index) {
    const entry = players.get(index);
    if (!entry || !entry.ready) return;
    fade(index, TARGET_VOLUME, 0, FADE_OUT_MS, () => {
      // Pause, don't destroy — scrolling back up should resume instantly.
      try { entry.player.pauseVideo(); } catch (e) { /* noop */ }
    });
  }

  // Browsers pause media in a backgrounded tab, and a paused embed draws
  // YouTube's own overlay. Resume the active section when the user comes back.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden || !started || activeIndex < 0) return;
    const entry = players.get(activeIndex);
    if (entry && entry.ready) {
      try { entry.player.playVideo(); } catch (e) { /* noop */ }
    }
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
        2 paused, 3 buffering, 5 cued. Exactly one player should ever report 1. */
    states() {
      const out = {};
      players.forEach((entry, i) => {
        let state = "not-ready";
        try { if (entry.ready) state = entry.player.getPlayerState(); } catch (e) { state = "gone"; }
        out[i] = state;
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
