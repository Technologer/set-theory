/* Set Theory — shared i18n resolution.
   Used by both pages: the guide (index.html) and the quiz (quiz/index.html).

   Every locale is a peer. js/i18n/<lang>.js holds all of that language's prose,
   data.js holds only language-neutral facts, and the HTML holds no copy at all.
   English doubles as the fallback, so a key a locale omits is read from English
   and a partial translation still renders.

   This file deliberately knows nothing about either page's markup beyond the
   data-i18n* attributes, so neither page has to reimplement the fallback rules. */

const I18N = (() => {
  const KEY = "set-theory-lang";
  const FALLBACK = "en";
  const LOCALES = {
    en: typeof I18N_EN !== "undefined" ? I18N_EN : null,
    sk: typeof I18N_SK !== "undefined" ? I18N_SK : null,
  };

  let lang = FALLBACK;

  const locale = () => LOCALES[lang] || LOCALES[FALLBACK];

  const dig = (obj, path) =>
    path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);

  return {
    detect() {
      const saved = localStorage.getItem(KEY);
      // Slovak only for Slovak browsers; everyone else gets English.
      lang = (saved === "en" || saved === "sk")
        ? saved
        : (navigator.language || "").toLowerCase().startsWith("sk") ? "sk" : "en";
      return lang;
    },

    get: () => lang,
    other: () => (lang === "sk" ? "en" : "sk"),

    set(next) {
      lang = next === "sk" ? "sk" : "en";
      localStorage.setItem(KEY, lang);
      return lang;
    },

    toggle() {
      return this.set(this.other());
    },

    meta: () => locale().meta,

    /** Page-specific meta, where a page has its own. Falls back to English. */
    metaQuiz: () => locale().metaQuiz || (LOCALES[FALLBACK] && LOCALES[FALLBACK].metaQuiz),

    ui(key) {
      const v = dig(locale().ui, key);
      return v !== undefined && v !== null ? v : dig(LOCALES[FALLBACK].ui, key);
    },

    /** Genre copy, falling back to English field by field. */
    gtext(g, field) {
      const here = locale().genres[g.id];
      const back = LOCALES[FALLBACK].genres[g.id];
      return (here && here[field]) || (back && back[field]) || "";
    },

    /** BPM range (neutral, from data.js) plus the translated parenthetical. */
    gbpm(g) {
      const note = this.gtext(g, "bpmNote");
      return note ? `${g.bpm} (${note})` : g.bpm;
    },

    term(id) {
      return (
        (locale().glossary && locale().glossary[id]) ||
        (LOCALES[FALLBACK].glossary && LOCALES[FALLBACK].glossary[id]) ||
        null
      );
    },

    actBlurb(act) {
      const here = locale().acts[act];
      const back = LOCALES[FALLBACK].acts[act];
      return (here && here.blurb) || (back && back.blurb) || "";
    },

    /** The generic pass: <html lang>, title, description, and every data-i18n*
        attribute on the page. Page-specific rendering stays in the page. */
    applyAttributes() {
      const m = locale().meta;
      document.documentElement.lang = lang;
      document.title = m.title;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", m.description);

      const self = this;
      document.querySelectorAll("[data-i18n]").forEach((n) => {
        n.textContent = self.ui(n.dataset.i18n);
      });
      document.querySelectorAll("[data-i18n-html]").forEach((n) => {
        n.innerHTML = self.ui(n.dataset.i18nHtml);
      });
      document.querySelectorAll("[data-i18n-placeholder]").forEach((n) => {
        n.placeholder = self.ui(n.dataset.i18nPlaceholder);
      });
      document.querySelectorAll("[data-i18n-aria-label]").forEach((n) => {
        n.setAttribute("aria-label", self.ui(n.dataset.i18nAriaLabel));
      });
      document.querySelectorAll("[data-i18n-title]").forEach((n) => {
        n.setAttribute("title", self.ui(n.dataset.i18nTitle));
      });
    },
  };
})();
