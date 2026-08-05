/* Set Theory — app shell.
   Renders the 24 sections from data.js, drives the side rail, search, keyboard
   nav, scroll progress, and hands section changes to the audio engine.

   No build step and no third-party JS: entrance animation is IntersectionObserver
   + CSS transitions, jump nav is native smooth scrolling. */

(() => {
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const el = {
    body: document.body,
    intro: document.getElementById("intro"),
    begin: document.getElementById("begin"),
    journey: document.getElementById("journey"),
    rail: document.getElementById("rail"),
    outro: document.getElementById("outro"),
    outroGrid: document.getElementById("outro-grid"),
    restart: document.getElementById("restart"),
    nowAct: document.getElementById("now-act"),
    nowGenre: document.getElementById("now-genre"),
    nowCount: document.getElementById("now-count"),
    progress: document.getElementById("progress-fill"),
    soundToggle: document.getElementById("sound-toggle"),
    search: document.getElementById("search"),
    searchToggle: document.getElementById("search-toggle"),
    searchInput: document.getElementById("search-input"),
    searchResults: document.getElementById("search-results"),
    langToggle: document.getElementById("lang-toggle"),
    toast: document.getElementById("toast")
  };

  let sections = [];
  let current = -1;
  let journeyStarted = false;

  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ================= i18n =================
     Every locale is a peer: js/i18n/<lang>.js holds all of that language's
     prose, data.js holds only language-neutral facts, and index.html holds no
     copy at all. English doubles as the fallback, so a key a locale omits is
     read from English and a partial translation still renders. */

  const LANG_KEY = "set-theory-lang";
  const FALLBACK = "en";
  const LOCALES = {
    en: typeof I18N_EN !== "undefined" ? I18N_EN : null,
    sk: typeof I18N_SK !== "undefined" ? I18N_SK : null
  };

  let lang = FALLBACK;

  function detectLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "sk") return saved;
    // Slovak only for Slovak browsers; everyone else gets English.
    return (navigator.language || "").toLowerCase().startsWith("sk") ? "sk" : "en";
  }

  const locale = () => LOCALES[lang] || LOCALES[FALLBACK];

  function dig(obj, path) {
    return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }

  function ui(key) {
    const v = dig(locale().ui, key);
    return v !== undefined && v !== null ? v : dig(LOCALES[FALLBACK].ui, key);
  }

  /** Genre copy, falling back to English per field. */
  function gtext(g, field) {
    const here = locale().genres[g.id];
    const back = LOCALES[FALLBACK].genres[g.id];
    return (here && here[field]) || (back && back[field]) || "";
  }

  /** BPM range (neutral, from data.js) plus the translated parenthetical. */
  function gbpm(g) {
    const note = gtext(g, "bpmNote");
    return note ? `${g.bpm} (${note})` : g.bpm;
  }

  function actBlurb(act) {
    const here = locale().acts[act];
    const back = LOCALES[FALLBACK].acts[act];
    return (here && here.blurb) || (back && back.blurb) || "";
  }

  function applyLanguage() {
    const loc = locale();
    document.documentElement.lang = lang;

    document.title = loc.meta.title;
    document.querySelector('meta[name="description"]')
      .setAttribute("content", loc.meta.description);

    document.querySelectorAll("[data-i18n]").forEach((n) =>
      (n.textContent = ui(n.dataset.i18n)));
    document.querySelectorAll("[data-i18n-html]").forEach((n) =>
      (n.innerHTML = ui(n.dataset.i18nHtml)));
    document.querySelectorAll("[data-i18n-placeholder]").forEach((n) =>
      (n.placeholder = ui(n.dataset.i18nPlaceholder)));
    document.querySelectorAll("[data-i18n-aria-label]").forEach((n) =>
      n.setAttribute("aria-label", ui(n.dataset.i18nAriaLabel)));

    // Sections are patched in place rather than re-rendered: a re-render would
    // tear out the live YouTube iframes and orphan the audio engine's players.
    sections.forEach((s, i) => {
      const g = DATA[i];
      const q = (sel) => s.querySelector(sel);
      const blurb = q(".genre__actblurb");
      if (blurb) blurb.textContent = actBlurb(g.act);
      q(".genre__tagline").textContent = gtext(g, "tagline");
      q(".genre__desc").textContent = gtext(g, "desc");
      q(".genre__factlabel").textContent = ui("factLabel");
      q(".genre__fact p").textContent = gtext(g, "funFact");

      const k = s.querySelectorAll(".pill__k");
      k[0].textContent = ui("bpmLabel");
      k[1].textContent = ui("energyLabel");
      k[2].textContent = ui("artistsLabel");
      const v = s.querySelectorAll(".pill__v");
      v[0].textContent = gbpm(g);
      v[1].textContent = gtext(g, "energy");

      q(".genre__link").textContent = ui("openYouTube");
      q(".genre__error").textContent = ui("embedError");
      q(".genre__track").innerHTML =
        `<span class="genre__eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
         ${esc(gtext(g, "videoNote"))}`;

      const play = q("[data-play]");
      if (play && !play.classList.contains("is-playing")) play.textContent = ui("playTrack");
    });

    // Button advertises the language you'd switch TO.
    el.langToggle.textContent = lang === "sk" ? "EN" : "SK";
    el.langToggle.setAttribute("aria-label",
      lang === "sk" ? "Switch to English" : "Prepnúť na slovenčinu");

    reflectSound(AudioEngine.isSoundOn());
    if (el.search.classList.contains("is-open")) renderResults(el.searchInput.value);
  }

  function initLang() {
    el.langToggle.addEventListener("click", () => {
      lang = lang === "sk" ? "en" : "sk";
      localStorage.setItem(LANG_KEY, lang);
      applyLanguage();
    });
    applyLanguage();
  }

  /* ================= render ================= */

  function sectionHTML(g, i) {
    const act = ACTS[g.act];
    const first = i === 0 || DATA[i - 1].act !== g.act;
    return `
    <section class="genre ${first ? "genre--act-open" : ""}" id="${g.id}" data-index="${i}"
             style="--accent:${g.accent}" aria-labelledby="${g.id}-name">
      <div class="genre__bg" aria-hidden="true">
        <div class="genre__poster" style="background-image:url('https://i.ytimg.com/vi/${g.video}/hqdefault.jpg')"></div>
        <div class="genre__video" data-player-wrap="${i}"></div>
        <div class="genre__scrim"></div>
        <div class="genre__aurora"></div>
      </div>

      <div class="genre__content">
        <div class="genre__meta">
          <span class="chip chip--act">Act ${g.act} · ${esc(act.name)}</span>
          <span class="chip chip--family">${esc(g.family)}</span>
          <span class="genre__num">${pad(i + 1)} / ${pad(DATA.length)}</span>
        </div>

        ${first ? `<p class="genre__actblurb">${esc(actBlurb(g.act))}</p>` : ""}

        <h2 class="genre__name" id="${g.id}-name">${esc(g.name)}</h2>
        <p class="genre__tagline">${esc(gtext(g, "tagline"))}</p>
        <p class="genre__desc">${esc(gtext(g, "desc"))}</p>

        <div class="genre__fact">
          <span class="genre__factlabel">${esc(ui("factLabel"))}</span>
          <p>${esc(gtext(g, "funFact"))}</p>
        </div>

        <ul class="pills">
          <li class="pill"><span class="pill__k">${esc(ui("bpmLabel"))}</span><span class="pill__v">${esc(gbpm(g))}</span></li>
          <li class="pill"><span class="pill__k">${esc(ui("energyLabel"))}</span><span class="pill__v">${esc(gtext(g, "energy"))}</span></li>
          <li class="pill pill--wide"><span class="pill__k">${esc(ui("artistsLabel"))}</span><span class="pill__v">${esc(g.artists)}</span></li>
        </ul>

        <div class="genre__foot">
          <p class="genre__track">
            <span class="genre__eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
            ${esc(gtext(g, "videoNote"))}
          </p>
          <div class="genre__actions">
            ${REDUCED ? `<button class="btn-play" type="button" data-play="${i}">${esc(ui("playTrack"))}</button>` : ""}
            <a class="genre__link" href="https://www.youtube.com/watch?v=${g.video}" target="_blank" rel="noopener">${esc(ui("openYouTube"))}</a>
          </div>
          <p class="genre__error">${esc(ui("embedError"))}</p>
        </div>
      </div>
    </section>`;
  }

  function railHTML() {
    let html = "";
    let act = null;
    DATA.forEach((g, i) => {
      if (g.act !== act) {
        if (act !== null) html += `</div></div>`;
        act = g.act;
        html += `<div class="rail__act"><span class="rail__label"><b>Act ${act}</b> ${esc(ACTS[act].name)}</span><div class="rail__dots">`;
      }
      html += `<button class="rail__dot" type="button" data-jump="${i}" style="--accent:${g.accent}"
                 aria-label="${esc(g.name)}"><span class="rail__tip">${esc(g.name)}</span></button>`;
    });
    return html + `</div></div>`;
  }

  function outroHTML() {
    return DATA.map((g, i) => `
      <button class="recap" type="button" data-jump="${i}" style="--accent:${g.accent}">
        <span class="recap__n">${pad(i + 1)}</span>
        <span class="recap__name">${esc(g.name)}</span>
        <span class="recap__bpm">${esc(g.bpm)} BPM</span>
      </button>`).join("");
  }

  function render() {
    el.journey.innerHTML = DATA.map(sectionHTML).join("");
    el.rail.innerHTML = railHTML();
    el.outroGrid.innerHTML = outroHTML();
    sections = [...document.querySelectorAll(".genre")];
  }

  /* ================= navigation ================= */

  function goTo(index) {
    const target = sections[index];
    if (!target) return;
    if (!journeyStarted) start();
    target.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
  }

  function setCurrent(index) {
    if (index === current) return;
    current = index;
    const g = DATA[index];
    el.nowAct.textContent = `Act ${g.act} · ${ACTS[g.act].name}`;
    el.nowGenre.textContent = g.name;
    el.nowCount.textContent = `${pad(index + 1)} / ${pad(DATA.length)}`;
    document.documentElement.style.setProperty("--now-accent", g.accent);

    el.rail.querySelectorAll(".rail__dot").forEach((d, i) => {
      d.classList.toggle("is-current", i === index);
      d.classList.toggle("is-past", i < index);
    });

    sections.forEach((s, i) => s.classList.toggle("is-current", i === index));

    if (!REDUCED) AudioEngine.setActive(index);
  }

  /* ================= scroll observers ================= */

  function initObservers() {
    // Section becomes "active" once it owns most of the viewport.
    const active = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.55) {
          setCurrent(Number(e.target.dataset.index));
        }
      });
    }, { threshold: [0.25, 0.55, 0.8] });

    // Entrance animation — decoupled from the audio threshold so copy animates in early.
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle("is-revealed", e.isIntersecting));
    }, { threshold: 0.2 });

    sections.forEach((s) => { active.observe(s); reveal.observe(s); });

    // The outro owns the screen -> nothing should be playing. Resetting `current`
    // lets the last section re-activate when the user scrolls back up into it.
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.6) {
          AudioEngine.clearActive();
          current = -1;
        }
      });
    }, { threshold: [0.6] }).observe(el.outro);
  }

  function initProgress() {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      el.progress.style.width = `${pct}%`;
      el.body.classList.toggle("is-scrolled", window.scrollY > 40);
      ticking = false;
    };
    addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ================= search ================= */

  function matches(q) {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return DATA.map((g, i) => ({ g, i }))
      .filter(({ g }) =>
        g.name.toLowerCase().includes(t) ||
        g.family.toLowerCase().includes(t) ||
        g.artists.toLowerCase().includes(t) ||
        // the tagline the reader can actually see, so search matches the UI language
        gtext(g, "tagline").toLowerCase().includes(t))
      .slice(0, 6);
  }

  function renderResults(q) {
    const found = matches(q);
    el.searchResults.innerHTML = found.length
      ? found.map(({ g, i }) => `
          <li><button type="button" data-jump="${i}" style="--accent:${g.accent}">
            <span class="res__name">${esc(g.name)}</span>
            <span class="res__meta">${esc(g.family)} · ${esc(g.bpm)} BPM</span>
          </button></li>`).join("")
      : (q.trim() ? `<li class="res__empty">${esc(ui("noMatch")(q.trim()))}</li>` : "");
    el.searchResults.classList.toggle("is-open", el.searchResults.innerHTML !== "");
  }

  function openSearch() {
    el.search.classList.add("is-open");
    el.searchToggle.setAttribute("aria-expanded", "true");
    el.searchInput.focus();
  }

  function closeSearch() {
    el.search.classList.remove("is-open");
    el.searchToggle.setAttribute("aria-expanded", "false");
    el.searchInput.value = "";
    renderResults("");
    el.searchInput.blur();
  }

  function initSearch() {
    el.searchToggle.addEventListener("click", () =>
      el.search.classList.contains("is-open") ? closeSearch() : openSearch());
    el.searchInput.addEventListener("input", (e) => renderResults(e.target.value));
    el.searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSearch();
      if (e.key === "Enter") {
        const first = el.searchResults.querySelector("button[data-jump]");
        if (first) { goTo(Number(first.dataset.jump)); closeSearch(); }
      }
    });
  }

  /* ================= track end ================= */

  // A finished track hands the set over to the next genre — the scroll position
  // follows the music rather than the other way round.
  function handleTrackEnd(index) {
    if (index !== current) return;               // user already scrolled on

    if (REDUCED) {
      // Auto-scrolling is exactly the unrequested motion these users opted out
      // of, so just reset the section's play button instead.
      const btn = document.querySelector(`[data-play="${index}"]`);
      if (btn) { btn.classList.remove("is-playing"); btn.textContent = "▶ Play this track"; }
      return;
    }

    if (index + 1 < DATA.length) goTo(index + 1);
    else el.outro.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ================= sound ================= */

  function reflectSound(on) {
    el.body.classList.toggle("sound-on", on);
    el.soundToggle.setAttribute("aria-pressed", String(on));
    el.soundToggle.setAttribute("aria-label", on ? ui("soundOff") : ui("soundOn"));
  }

  let toastShown = false;
  function showToast() {
    if (toastShown || AudioEngine.isSoundOn()) return;
    toastShown = true;
    el.toast.classList.add("is-visible");
    setTimeout(() => el.toast.classList.remove("is-visible"), 4500);
  }

  /* ================= start / restart ================= */

  function start() {
    if (journeyStarted) return;
    journeyStarted = true;
    el.body.classList.remove("is-locked");
    el.body.classList.add("is-started");
    AudioEngine.unlock();               // must happen inside the click gesture
  }

  function initIntro() {
    el.begin.addEventListener("click", () => {
      start();
      sections[0].scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
    });
    el.restart.addEventListener("click", () => {
      AudioEngine.clearActive();
      window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
    });
  }

  /* ================= keyboard ================= */

  function initKeyboard() {
    addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea")) return;
      if (e.key === "/" ) { e.preventDefault(); openSearch(); return; }
      if (e.key === "Escape") { closeSearch(); return; }
      const next = ["ArrowDown", "j", "J"].includes(e.key);
      const prev = ["ArrowUp", "k", "K"].includes(e.key);
      if (!next && !prev) return;
      e.preventDefault();
      goTo(Math.min(DATA.length - 1, Math.max(0, current + (next ? 1 : -1))));
    });
  }

  /* ================= wiring ================= */

  function initDelegates() {
    document.addEventListener("click", (e) => {
      const jump = e.target.closest("[data-jump]");
      if (jump) { goTo(Number(jump.dataset.jump)); closeSearch(); return; }

      const play = e.target.closest("[data-play]");
      if (play) {
        const i = Number(play.dataset.play);
        AudioEngine.playOnDemand(i);
        document.querySelectorAll("[data-play]").forEach((b) => b.classList.remove("is-playing"));
        play.classList.add("is-playing");
        play.textContent = ui("playing");
        return;
      }

      if (!el.search.contains(e.target)) closeSearch();
    });

    el.soundToggle.addEventListener("click", () => {
      const on = AudioEngine.toggleSound();
      reflectSound(on);
      el.toast.classList.remove("is-visible");
    });
  }

  /* ================= boot ================= */

  lang = detectLang();
  render();
  initLang();
  initIntro();
  initObservers();
  initProgress();
  initSearch();
  initKeyboard();
  initDelegates();
  setCurrent(0);
  if (REDUCED) el.body.classList.add("is-reduced");

  AudioEngine.init(
    DATA.map((g) => ({ id: g.id, video: g.video, videoStart: g.videoStart })),
    { onSoundChange: reflectSound, onFirstPlay: showToast, onTrackEnd: handleTrackEnd }
  );
})();
