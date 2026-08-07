/* Set Theory — ear-training quiz.
   Plays Apple's 30-second preview and asks which genre it is.

   Audio only, deliberately: the YouTube video carries artist names and official
   video imagery, so showing it would hand over the answer. Previews also have no
   pre-roll ads and start instantly, neither of which is true of the embeds.

   Dependencies are injected by app.js rather than reached for globally, so this
   file has no opinion about how i18n or navigation work. */

const Quiz = (() => {
  const ROUND = 10; // questions per round
  const CLIP_MS = 30000;

  let ui, gtext, goToGenre, genreHref, onExit;
  let el = {};
  let round = [];
  let at = 0;
  let answers = []; // { genre, chosen, correct }
  let audio = null;
  let barTimer = null;
  let locked = false;

  const pad = (n) => String(n).padStart(2, "0");

  /** The bar counter, formatted like the guide's "01 / 24". */
  const count = () => `${pad(at + 1)} / ${pad(round.length)}`;

  const shuffle = (a) => a.map((v) => [Math.random(), v])
    .sort((x, y) => x[0] - y[0]).map(([, v]) => v);

  const range = (bpm) => {
    const m = String(bpm).match(/(\d+)\D+(\d+)/);
    return m ? [+m[1], +m[2]] : [0, 0];
  };

  /** Wrong answers a listener could plausibly pick: same family first, then
      overlapping tempo, then anything. Random options would make this trivial —
      nobody mistakes hardstyle for ambient. */
  function distractors(g) {
    const [lo, hi] = range(g.bpm);
    const others = DATA.filter((x) => x.id !== g.id);
    const family = others.filter((x) => x.family === g.family);
    const overlap = others.filter((x) => {
      const [a, b] = range(x.bpm);
      return a <= hi && b >= lo;
    });
    const pool = [];
    [shuffle(family), shuffle(overlap), shuffle(others)].forEach((list) =>
      list.forEach((x) => { if (!pool.includes(x)) pool.push(x); }));
    return pool.slice(0, 3);
  }

  /* ---------- audio ---------- */

  function ensureAudio() {
    if (audio) return audio;
    audio = new Audio();
    audio.preload = "auto";
    // The button follows the audio, not the clicks — a clip also stops on its own
    // after 30 seconds, and a blocked play() never starts at all.
    ["play", "playing"].forEach((ev) => audio.addEventListener(ev, () => {
      reflectPlayer();
      startBar();
    }));
    ["pause", "ended"].forEach((ev) => audio.addEventListener(ev, () => {
      reflectPlayer();
      stopBar();
    }));
    audio.addEventListener("ended", () => (el.bar.style.width = "100%"));
    return audio;
  }

  function reflectPlayer() {
    const playing = !!audio && !audio.paused && !audio.ended;
    el.player.classList.toggle("is-playing", playing);
    el.player.setAttribute("aria-label", ui(playing ? "quizPauseClip" : "quizPlayClip"));
  }

  function playClip(restart) {
    const g = round[at];
    const a = ensureAudio();
    if (a.src !== g.preview) {
      a.src = g.preview;
      restart = true;
    }
    if (restart || a.ended) a.currentTime = 0;
    a.volume = 1;
    const p = a.play();
    if (p && p.catch) p.catch(() => reflectPlayer()); // blocked until a gesture
    reflectPlayer();
  }

  /** What the button does: pause if it is playing, otherwise resume. */
  function togglePlay() {
    if (audio && !audio.paused && !audio.ended) {
      audio.pause();
      return;
    }
    playClip(false);
  }

  function stopClip() {
    if (!audio) return;
    audio.pause();
    stopBar();
    reflectPlayer();
  }

  /* Driven by currentTime rather than a wall clock, so pausing and resuming
     picks up where it left off instead of restarting the bar. */
  function startBar() {
    stopBar();
    const step = () => {
      if (!audio) return;
      const len = audio.duration && isFinite(audio.duration) ? audio.duration : CLIP_MS / 1000;
      el.bar.style.width = `${Math.min(100, (audio.currentTime / len) * 100)}%`;
      if (!audio.paused && !audio.ended) barTimer = requestAnimationFrame(step);
    };
    barTimer = requestAnimationFrame(step);
  }

  function stopBar() {
    if (barTimer) cancelAnimationFrame(barTimer);
    barTimer = null;
  }

  /* ---------- screens ---------- */

  function show(screen) {
    ["start", "play", "done"].forEach((k) => (el[k].hidden = k !== screen));
    // Top-align a question, and reveal the bar's progress only while playing.
    el.root.classList.toggle("is-playing", screen === "play");
    document.body.classList.toggle("quiz-in-play", screen === "play");
  }

  function begin() {
    round = shuffle(DATA.filter((g) => g.preview)).slice(0, ROUND);
    at = 0;
    answers = [];
    show("play");
    renderQuestion();
  }

  function renderQuestion() {
    locked = false;
    const g = round[at];
    el.reveal.hidden = true;
    el.bar.style.width = "0%";

    el.progress.textContent = count();

    el.dots.innerHTML = round.map((_, i) => {
      const a = answers[i];
      const cls = a ? (a.correct ? "is-hit" : "is-miss") : i === at ? "is-now" : "";
      return `<i class="${cls}"></i>`;
    }).join("");

    const options = shuffle([g, ...distractors(g)]);
    el.options.innerHTML = options.map((o, i) => `
      <li><button class="quiz__opt" type="button" data-pick="${o.id}" style="--accent:${o.accent}">
        <span class="quiz__key">${i + 1}</span>
        <span class="quiz__name">${o.name}</span>
        <span class="quiz__bpm">${o.bpm}</span>
      </button></li>`).join("");

    playClip(true);
  }

  function answer(id) {
    if (locked) return;
    locked = true;
    const g = round[at];
    const correct = id === g.id;
    answers[at] = { genre: g, chosen: id, correct };
    stopClip();

    el.options.querySelectorAll(".quiz__opt").forEach((b) => {
      b.disabled = true;
      if (b.dataset.pick === g.id) b.classList.add("is-answer");
      else if (b.dataset.pick === id) b.classList.add("is-wrong");
    });

    const picked = DATA.find((x) => x.id === id);
    el.verdict.textContent = correct ? ui("quizRight") : ui("quizWrong")(picked.name);
    el.verdict.className = `quiz__verdict ${correct ? "is-right" : "is-wrong"}`;
    // The tagline is already the one-line character sketch — reuse it rather than
    // writing a second version of the same sentence.
    el.why.textContent = `${g.name} · ${g.bpm} BPM — ${gtext(g, "tagline")}`;
    el.why.style.setProperty("--accent", g.accent);
    el.track.innerHTML =
      `${escapeHtml(g.previewBy)} · <a href="${g.apple}" target="_blank" rel="noopener">${escapeHtml(ui("quizApple"))}</a>`;
    el.next.textContent = at + 1 < round.length ? ui("quizNext") : ui("quizFinish");
    el.reveal.hidden = false;
    el.dots.querySelectorAll("i")[at].className = correct ? "is-hit" : "is-miss";
  }

  function next() {
    if (at + 1 < round.length) {
      at += 1;
      renderQuestion();
    } else {
      finish();
    }
  }

  function finish() {
    stopClip();
    const hits = answers.filter((a) => a.correct).length;
    show("done");
    el.doneScore.textContent = `${hits} / ${round.length}`;
    el.doneVerdict.textContent = ui("quizVerdict")(hits, round.length);

    const missed = answers.filter((a) => !a.correct);
    el.doneList.innerHTML = missed.length
      ? missed.map((a) => {
          const picked = DATA.find((x) => x.id === a.chosen);
          return `<li style="--accent:${a.genre.accent}">
            <a href="${genreHref(a.genre.id)}" data-quiz-jump="${a.genre.id}">
              <strong>${a.genre.name}</strong>
              <span>${ui("quizYouSaid")(picked.name)}</span>
            </a></li>`;
        }).join("")
      : `<li class="quiz__clean">${escapeHtml(ui("quizPerfect"))}</li>`;
  }

  const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- public ---------- */

  return {
    init(deps) {
      ui = deps.ui;
      gtext = deps.gtext;
      goToGenre = deps.goToGenre;
      // Where a genre lives as a real URL, so these stay copyable and
      // cmd-clickable rather than being click-handler-only.
      genreHref = deps.genreHref || ((id) => `#${id}`);
      onExit = deps.onExit;

      el = {
        root: document.getElementById("quiz"),
        start: document.getElementById("quiz-start"),
        play: document.getElementById("quiz-play"),
        done: document.getElementById("quiz-done"),
        progress: document.getElementById("quiz-progress"),
        dots: document.getElementById("quiz-dots"),
        bar: document.getElementById("quiz-bar"),
        player: document.getElementById("quiz-replay"),
        options: document.getElementById("quiz-options"),
        reveal: document.getElementById("quiz-reveal"),
        verdict: document.getElementById("quiz-verdict"),
        why: document.getElementById("quiz-why"),
        track: document.getElementById("quiz-track"),
        next: document.getElementById("quiz-next"),
        doneScore: document.getElementById("quiz-done-score"),
        doneVerdict: document.getElementById("quiz-done-verdict"),
        doneList: document.getElementById("quiz-done-list"),
      };

      document.getElementById("quiz-begin").addEventListener("click", begin);
      document.getElementById("quiz-again").addEventListener("click", begin);
      el.player.addEventListener("click", togglePlay);
      reflectPlayer();
      el.next.addEventListener("click", next);

      document.querySelectorAll("[data-quiz-exit]").forEach((b) =>
        b.addEventListener("click", () => this.close()));

      el.options.addEventListener("click", (e) => {
        const b = e.target.closest("[data-pick]");
        if (b) answer(b.dataset.pick);
      });

      el.doneList.addEventListener("click", (e) => {
        const a = e.target.closest("[data-quiz-jump]");
        if (!a) return;
        e.preventDefault();
        this.close();
        goToGenre(a.dataset.quizJump);
      });

      // 1–4 to answer, Enter to move on — quicker than reaching for the mouse.
      addEventListener("keydown", (e) => {
        if (el.root.hidden) return;
        if (e.target.matches && e.target.matches("input, textarea")) return;
        if (/^[1-4]$/.test(e.key) && !el.play.hidden && !locked) {
          const b = el.options.querySelectorAll(".quiz__opt")[+e.key - 1];
          if (b) { e.preventDefault(); answer(b.dataset.pick); }
          return;
        }
        if ((e.key === "Enter" || e.key === " ") && !el.reveal.hidden) {
          e.preventDefault();
          next();
        }
        if (e.key === "Escape") this.close();
      });
    },

    open() {
      // Only present when the quiz is embedded in the guide; on its own page
      // there is no journey audio to silence.
      if (typeof AudioEngine !== "undefined") AudioEngine.clearActive();
      document.body.classList.add("quiz-open");
      el.root.hidden = false;
      show("start");
      window.scrollTo({ top: 0, behavior: "auto" });
    },

    close() {
      stopClip();
      document.body.classList.remove("quiz-open", "quiz-in-play");
      el.root.hidden = true;
      if (onExit) onExit();
    },

    isOpen: () => !el.root || !el.root.hidden,

    /** Re-label whatever is on screen after a language switch. */
    applyLanguage() {
      if (!el.root || el.root.hidden) return;
      if (!el.play.hidden) {
        reflectPlayer();
        // The counter is digits, so it needs no relabelling.
        el.next.textContent = at + 1 < round.length ? ui("quizNext") : ui("quizFinish");
        if (!el.reveal.hidden) {
          const g = round[at];
          const a = answers[at];
          const picked = DATA.find((x) => x.id === a.chosen);
          el.verdict.textContent = a.correct ? ui("quizRight") : ui("quizWrong")(picked.name);
          el.why.textContent = `${g.name} · ${g.bpm} BPM — ${gtext(g, "tagline")}`;
          el.track.innerHTML =
            `${escapeHtml(g.previewBy)} · <a href="${g.apple}" target="_blank" rel="noopener">${escapeHtml(ui("quizApple"))}</a>`;
        }
      }
      if (!el.done.hidden) finish();
    },
  };
})();
