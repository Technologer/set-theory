/* Set Theory — bootstrap for the standalone quiz page.
   The guide has app.js; this page has only the quiz, so all it needs to do is
   resolve the language, label the chrome, and hand Quiz its dependencies. */

(() => {
  const langToggle = document.getElementById("lang-toggle");

  function paint() {
    I18N.applyAttributes();
    // applyAttributes sets the guide's title; this page has its own.
    const m = I18N.meta();
    const q = (typeof I18N.metaQuiz === "function" && I18N.metaQuiz()) || null;
    document.title = (q && q.title) || m.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", (q && q.description) || m.description);
    langToggle.textContent = I18N.other().toUpperCase();
    langToggle.setAttribute(
      "aria-label",
      I18N.get() === "sk" ? "Switch to English" : "Prepnúť na slovenčinu",
    );
    Quiz.applyLanguage();
  }

  I18N.detect();

  Quiz.init({
    ui: (k) => I18N.ui(k),
    gtext: (g, f) => I18N.gtext(g, f),
    // A miss links back into the guide, which honours a genre hash on arrival.
    genreHref: (id) => `../#${id}`,
    // Clip paths are site-root relative; this page sits one level down.
    previewUrl: (g) => `../${g.preview}`,
    onExit: () => { location.href = "../"; },
  });

  langToggle.addEventListener("click", () => {
    I18N.toggle();
    paint();
  });

  paint();
  Quiz.open();
})();
