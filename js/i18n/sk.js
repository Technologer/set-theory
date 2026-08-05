/* Set Theory — Slovak strings.
   English lives in index.html and data.js; this file only carries overrides,
   so video IDs, BPM numbers, accents and artist names are never duplicated.

   Deliberately NOT translated:
   - Genre names ("Deep House", "Drum & Bass") — proper nouns, used in English
     by the Slovak scene.
   - Act names (Warm-Up, Peak Time, …) — this vocabulary is the thing being
     taught, and the outro note explains which parts of it are real.
   - Craft terms Slovak DJs say in English anyway: drop, kick, snare, groove,
     beatmatch, half-time, pitch fader, opening/peak/closing.

   `genres` may be partially filled — anything missing falls back to English. */

const I18N_SK = {
  code: "sk",

  meta: {
    title: "Set Theory — 24 elektronických žánrov v poradí ako v sete",
    description: "Sprievodca 24 žánrmi elektronickej tanečnej hudby, zoradenými ako skutočný DJ set: BPM, energia, kľúčoví interpreti a skladba ku každému."
  },

  ui: {
    introKicker: "24 žánrov · 6 aktov · jeden súvislý set",
    introPitch: "Ešte nepočuješ rozdiel medzi tech house a techno? Dvadsaťštyri žánrov v poradí ako v sete, každý s BPM, energiou a skladbou, ktorá ho definuje — naučíš sa ich tak, ako sa ich učí DJ: podľa toho, čo príde ďalej.",
    begin: "Spustiť cestu ▶",
    introHint: "Zvuk je vypnutý. Reproduktor zapneš kedykoľvek. <kbd>J</kbd>/<kbd>K</kbd> na preskakovanie medzi žánrami.",

    searchToggle: "Hľadať žánre",
    searchPlaceholder: "Skoč na žáner alebo interpreta…",
    soundOn: "Zapnúť zvuk",
    soundOff: "Stlmiť zvuk",
    langToggle: "Switch to English",

    factLabel: "Zaujímavosť",
    bpmLabel: "BPM",
    energyLabel: "Energia",
    artistsLabel: "Interpreti",
    openYouTube: "Otvoriť na YouTube ↗",
    embedError: "Prehrávač je zablokovaný — použi odkaz na YouTube vyššie.",
    playTrack: "▶ Prehrať skladbu",
    playing: "▮▮ Hrá",
    toast: "🔊 ťukni pre zvuk",
    noMatch: (q) => `Žiadny žáner nezodpovedá „${q}“`,

    outroKicker: "Rozsvieti sa",
    outroTitle: "Prešiel si celým setom.",
    outroText: "Dvadsaťštyri žánrov, 60 až 180 BPM, od warm-upu po poslednú platňu. Užitočné nie je zapamätať si názvy — ale počuť, kde skladba sedí v oblúku, a vedieť, čo by si pustil ďalej. Ťukni na ktorýkoľvek žáner a vráť sa k nemu.",
    outroNote: "<strong>K tým šiestim aktom:</strong> <em>warm-up</em> a <em>peak time</em> sú reálne DJ pojmy — stretneš ich v bookingových mailoch aj na Beatporte. <em>The build</em>, <em>after hours</em> a <em>last record</em> opisujú skutočné momenty, ale nie sú ustálené termíny, a samotná štruktúra šiestich aktov je učebná pomôcka, nie odvetvový štandard. Väčšina DJov rozmýšľa v troch fázach: opening, peak, closing.",
    restart: "Späť na začiatok ↑",

    craftTitle: "Ako sa set naozaj stavia",
    craftSub: "Konvencie za poradím, ktorým si práve prešiel.",
    craft: [
      { h: "Energia ide vo vlnách, nie po priamke",
        p: "Set, ktorý stúpa rovnomerne a potom zostane na maxime, sálu vyčerpá. Staviaš, stiahneš, postavíš vyššie. Drop zafunguje len vtedy, keď pred ním bolo údolie — preto najhlasnejšia platňa takmer nikdy nie je prvá." },
      { h: "Mixuj na fráze",
        p: "Tanečná hudba sa píše vo frázach po 4, 8 a 16 taktoch. Keď ďalšiu skladbu pustíš na hranici frázy, prechod zmizne; keď nastúpiš uprostred, parket to cíti, aj keď nikto nevie povedať prečo." },
      { h: "Drž sa blízko tempa",
        p: "Pitch fader na CDJ má prednastavených ±6 % z dobrého dôvodu — keď skladbu natiahneš oveľa viac, začne znieť zle. Susedné žánre v tomto sprievodcovi sú väčšinou pár BPM od seba, a práve preto sa dajú mixovať." },
      { h: "Half-time je most",
        p: "Tempo a feel nie sú to isté číslo. Dubstepová skladba pri 140 BPM sa počíta v half-time, takže kick a snare dopadajú ako pri 70. Toto dvojité čítanie je spôsob, akým DJi prekonávajú medzery, ktoré na papieri vyzerajú nemožne — a je to trik za Aktom 5." },
      { h: "Tónina je rovnako dôležitá ako beat",
        p: "Dve skladby môžu byť dokonale zbeatmatchované a aj tak spolu znieť falošne, keď sa ich tóniny bijú. Väčšina DJ softvéru označuje skladby podľa Camelot wheel, takže sa vieš posunúť na susedné číslo a zostať v súlade aj bez znalosti teórie." },
      { h: "Naplánuj prvú a poslednú skladbu",
        p: "Bežná rada znie: vedieť presne, čím otvoríš a čím zavrieš, a všetko medzi tým čítať zo sály. Úplne naskriptovaný set nedokáže reagovať na parket pred sebou." }
    ]
  },

  /* Act names stay English on purpose — only the blurbs are translated. */
  acts: {
    1: { blurb: "Otvárajú sa dvere, sála je poloprázdna. Drž to pomalé." },
    2: { blurb: "Hlavy začínajú kývať. Chyť sa grooveu." },
    3: { blurb: "Napätie sa vrství. Zatiaľ sa nič nerozuzlí." },
    4: { blurb: "Naplno. Melódia nepovinná." },
    5: { blurb: "Štvorka sa rozpadá. Preberajú to basy." },
    6: { blurb: "Rozsvieti sa. Pošli ich domov so spevom." }
  },

  /* Etapa 2: tagline / desc / funFact / energy / bpm / videoNote per genre id.
     Anything absent falls back to the English text in data.js. */
  genres: {}
};
