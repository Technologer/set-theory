/* Set Theory — language-neutral data.
   Facts only: ids, act/family grouping, accent colours, artist names, BPM
   numbers and YouTube ids. Every piece of prose (taglines, descriptions, fun
   facts, energy, video captions, act blurbs) lives in js/i18n/<lang>.js.

   Act names are here rather than in the locales on purpose: they are DJ
   vocabulary and stay English in every language — the outro note explains
   which of them are real industry terms and which are this guide's own.

   videoStart is the cue offset in seconds — raise it per track for a stronger
   hook.

   preview / credit are the quiz's 40-second clip and its attribution.
   The clips are cut from NoCopyrightSounds releases and served from this
   repo, so nothing depends on a third party keeping a URL alive. NCS licenses
   its catalogue on condition that the artist, track and a link to the NCS
   upload are credited, which is what `credit` carries and the quiz renders.
   Only the genres NCS covers have a clip; the rest appear as options only. */

const ACTS = {
  1: { name: "Warm-Up" },
  2: { name: "Groove" },
  3: { name: "The Build" },
  4: { name: "Peak Time" },
  5: { name: "After Hours" },
  6: { name: "Last Record" },
};

const FAMILY_ACCENTS = {
  "House": "#ff3d81",
  "Techno": "#3dc9ff",
  "Trance": "#7c4dff",
  "Bass & Breaks": "#7cff3d",
  "Hard Dance": "#ff3d3d",
  "Dance / Crossover": "#ffd23d",
  "Chill / Downtempo": "#3dffc9"
};

const DATA = [
  // ===== ACT 1 — WARM-UP =====
  { id: "ambient-downtempo", act: 1, family: "Chill / Downtempo", accent: "#3dffc9",
    name: "Ambient / Downtempo",
    bpm: "60–110", artists: "Bonobo, Brian Eno, Tycho, Boards of Canada",
    video: "AYu3ZU-QmjY", videoStart: 0 },
  { id: "tropical-house", act: 1, family: "House", accent: "#ff3d81",
    name: "Tropical House",
    bpm: "100–115", artists: "Kygo, Robin Schulz, Thomas Jack",
    video: "9Sc-ir2UwGU", videoStart: 0 },
  { id: "deep-house", act: 1, family: "House", accent: "#ff3d81",
    name: "Deep House",
    bpm: "118–125", artists: "Disclosure, Kerri Chandler, Dixon, Larry Heard",
    preview: "audio/previews/deep-house.m4a",
    credit: { artist: "nuphory, Chikaya", title: "Make Me Feel", url: "https://ncs.io/makemefeel" },
    video: "tFuujExs03A", videoStart: 0 },

  // ===== ACT 2 — GROOVE =====
  { id: "house", act: 2, family: "House", accent: "#ff3d81",
    name: "House",
    bpm: "120–128", artists: "Frankie Knuckles, Robin S, Cajmere / Green Velvet, MK",
    preview: "audio/previews/house.m4a",
    credit: { artist: "Reece Rosé", title: "The People", url: "https://ncs.io/thepeople" },
    video: "Ps2Jc28tQrw", videoStart: 0 },
  { id: "acid-house", act: 2, family: "House", accent: "#ff3d81",
    name: "Acid House",
    bpm: "120–130", artists: "Phuture, DJ Pierre, Josh Wink",
    video: "QZSd2pP2dms", videoStart: 0 },
  { id: "tech-house", act: 2, family: "House", accent: "#ff3d81",
    name: "Tech House",
    bpm: "122–128", artists: "Fisher, Chris Lake, Green Velvet, Solardo",
    preview: "audio/previews/tech-house.m4a",
    credit: { artist: "Aix Cee", title: "Feel Like", url: "https://ncs.io/ACFeelLike" },
    video: "wE8Az1EV6UQ", videoStart: 0 },
  { id: "uk-garage", act: 2, family: "Bass & Breaks", accent: "#7cff3d",
    name: "UK Garage",
    bpm: "130–135", artists: "Artful Dodger, MJ Cole, Todd Edwards",
    video: "M0wv_cQv8As", videoStart: 0 },
  { id: "breakbeat", act: 2, family: "Bass & Breaks", accent: "#7cff3d",
    name: "Breakbeat",
    bpm: "120–140", artists: "The Prodigy, The Chemical Brothers, Fatboy Slim",
    preview: "audio/previews/breakbeat.m4a",
    credit: { artist: "MANSHN", title: "Code", url: "https://ncs.io/code" },
    video: "6_PAHbqq-o4", videoStart: 0 },
  { id: "future-house", act: 2, family: "House", accent: "#ff3d81",
    name: "Future House",
    bpm: "124–128", artists: "Tchami, Don Diablo, Oliver Heldens",
    preview: "audio/previews/future-house.m4a",
    credit: { artist: "Egzod, Maestro Chives, Don Diablo", title: "Royalty (Don Diablo Remix)", url: "https://ncs.io/dd-royalty" },
    video: "kr0_YzOQf5A", videoStart: 0 },

  // ===== ACT 3 — THE BUILD =====
  { id: "progressive-house", act: 3, family: "House", accent: "#ff3d81",
    name: "Progressive House",
    bpm: "124–128", artists: "Eric Prydz, early deadmau5, Sasha & Digweed",
    preview: "audio/previews/progressive-house.m4a",
    credit: { artist: "Spektrem", title: "Shine", url: "https://ncs.io/shine" },
    video: "iRA82xLsb_w", videoStart: 0 },
  { id: "melodic-techno", act: 3, family: "Techno", accent: "#3dc9ff",
    name: "Melodic Techno",
    bpm: "122–128", artists: "Tale Of Us, Mind Against, Stephan Bodzin",
    video: "K2eCQO-S4ws", videoStart: 0 },
  { id: "electro-house", act: 3, family: "House", accent: "#ff3d81",
    name: "Electro House",
    bpm: "125–130", artists: "deadmau5, Steve Aoki, early Chainsmokers",
    preview: "audio/previews/electro-house.m4a",
    credit: { artist: "Bad Computer", title: "Can't Heal You", url: "https://ncs.io/canthealyou" },
    video: "h7ArUgxtlJs", videoStart: 0 },
  { id: "big-room-house", act: 3, family: "House", accent: "#ff3d81",
    name: "Big Room House",
    bpm: "126–130", artists: "Martin Garrix, Hardwell, W&W",
    video: "gCYcHz2k5x0", videoStart: 0 },
  { id: "trance", act: 3, family: "Trance", accent: "#7c4dff",
    name: "Trance",
    bpm: "130–140", artists: "Tiësto, Armin van Buuren, Above & Beyond, Paul van Dyk",
    video: "bgz2SWdKqvQ", videoStart: 0 },

  // ===== ACT 4 — PEAK TIME =====
  { id: "techno", act: 4, family: "Techno", accent: "#3dc9ff",
    name: "Techno",
    bpm: "125–150", artists: "Charlotte de Witte, Jeff Mills, Carl Cox, Adam Beyer",
    video: "AS8Q_5knkrg", videoStart: 0 },
  { id: "minimal-techno", act: 4, family: "Techno", accent: "#3dc9ff",
    name: "Minimal Techno",
    bpm: "125–135", artists: "Richie Hawtin, Ricardo Villalobos, Robert Hood",
    video: "rbx_gcX5Fd4", videoStart: 0 },
  { id: "hard-techno", act: 4, family: "Techno", accent: "#3dc9ff",
    name: "Hard Techno",
    bpm: "140–155", artists: "Amelie Lens, I Hate Models, Perc",
    video: "MxKcx0FVuqk", videoStart: 0 },
  { id: "hardstyle", act: 4, family: "Hard Dance", accent: "#ff3d3d",
    name: "Hardstyle",
    bpm: "150–160", artists: "Headhunterz, Wildstylez, Da Tweekaz",
    preview: "audio/previews/hardstyle.m4a",
    credit: { artist: "JJD", title: "Can't Say No", url: "https://ncs.io/cantsayno" },
    video: "VaiHTvifGt0", videoStart: 0 },

  // ===== ACT 5 — AFTER HOURS =====
  { id: "jungle", act: 5, family: "Bass & Breaks", accent: "#7cff3d",
    name: "Jungle",
    bpm: "160–180", artists: "Goldie, LTJ Bukem, Congo Natty",
    video: "i-P98B2skts", videoStart: 0 },
  { id: "drum-and-bass", act: 5, family: "Bass & Breaks", accent: "#7cff3d",
    name: "Drum & Bass",
    bpm: "160–180", artists: "Netsky, Andy C, Sub Focus, Chase & Status",
    preview: "audio/previews/drum-and-bass.m4a",
    credit: { artist: "MANIA, Remy Night", title: "Reason (ft. Remy Night)", url: "https://ncs.io/reason" },
    video: "qFDP9egTwfM", videoStart: 0 },
  { id: "dubstep", act: 5, family: "Bass & Breaks", accent: "#7cff3d",
    name: "Dubstep",
    bpm: "138–142", artists: "Skrillex, Excision, Mala, Benga",
    preview: "audio/previews/dubstep.m4a",
    credit: { artist: "TOKYO MACHINE", title: "CHEAT CODES", url: "https://ncs.io/cheatcodes" },
    video: "YJVmu6yttiw", videoStart: 0 },
  { id: "trap-edm", act: 5, family: "Bass & Breaks", accent: "#7cff3d",
    name: "Trap (EDM)",
    bpm: "130–170", artists: "RL Grime, Flosstradamus, Baauer",
    video: "04ufimjXEbA", videoStart: 0 },
  { id: "psytrance", act: 5, family: "Trance", accent: "#7c4dff",
    name: "Psytrance",
    bpm: "140–150", artists: "Infected Mushroom, Astrix, Vini Vici",
    video: "WxhTbxMSvT0", videoStart: 0 },

  // ===== ACT 6 — LAST RECORD =====
  { id: "dance-pop", act: 6, family: "Dance / Crossover", accent: "#ffd23d",
    name: "Dance / EDM-Pop",
    bpm: "100–128", artists: "Avicii, Calvin Harris, David Guetta",
    video: "IcrbM1l_BoI", videoStart: 0 }
];
