/* Set Theory — content data.
   Descriptions, BPM, energy, artists and video IDs carried over from the
   validated prototype. funFact + videoStart are new.
   videoStart is the cue offset in seconds — bump it per track for a stronger hook. */

const ACTS = {
  1: { name: "Warm-Up", blurb: "Doors open, room's half full. Keep it slow." },
  2: { name: "Groove", blurb: "Heads start nodding. Lock into the swing." },
  3: { name: "The Build", blurb: "Tension stacking. Nothing resolves yet." },
  4: { name: "Peak Time", blurb: "Full throttle. Melody optional." },
  5: { name: "After Hours", blurb: "Four-four breaks apart. The low end takes over." },
  6: { name: "Last Record", blurb: "Lights up. Send them home singing." }
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
  { id:"ambient-downtempo", act:1, family:"Chill / Downtempo", accent:"#3dffc9",
    name:"Ambient / Downtempo", tagline:"Slow, textural, mood over movement.",
    bpm:"60–110 (ambient can be beatless)", energy:"Relaxed, immersive",
    desc:"Ambient and downtempo prioritize atmosphere, texture, and space over dancefloor function. Ambient can drop rhythm entirely in favor of evolving soundscapes, while downtempo keeps a loose, slow groove. Perfect for opening a set, chill-out rooms, or unwinding after a night out.",
    funFact:"Brian Eno coined the term \"ambient music\" in the 1978 liner notes to Music for Airports, describing it as music that should be \"as ignorable as it is interesting.\" Bonobo works the other side of that line — \"Kerala\" keeps a slow, loose groove, but the pull is still texture rather than any drop.",
    artists:"Bonobo, Brian Eno, Tycho, Boards of Canada",
    video:"AYu3ZU-QmjY", videoStart:0, videoNote:"Bonobo — \"Kerala\", a modern downtempo touchstone" },

  { id:"tropical-house", act:1, family:"House", accent:"#ff3d81",
    name:"Tropical House", tagline:"Sunny, radio-friendly house with marimba hooks.",
    bpm:"100–115", energy:"Chill, sunny",
    desc:"A mellow, pop-adjacent house offshoot that emerged around 2014, built on marimba- and steel-drum-style melodies, laid-back percussion, and singer-songwriter vocal hooks. Tempo is noticeably slower than most house music, giving it a relaxed, beach-at-golden-hour feel.",
    funFact:"Kygo built his early hits, including \"Firestone,\" in his childhood bedroom in Norway using free trial software before he'd even played a real festival.",
    artists:"Kygo, Robin Schulz, Thomas Jack",
    video:"9Sc-ir2UwGU", videoStart:0, videoNote:"Kygo ft. Conrad Sewell — \"Firestone\", the genre's signature hit" },

  { id:"deep-house", act:1, family:"House", accent:"#ff3d81",
    name:"Deep House", tagline:"House slowed down and dressed in jazz chords.",
    bpm:"118–125", energy:"Warm, laid-back",
    desc:"Deep house takes house's groove and softens it: jazzy extended chords, warm sub-bass, atmospheric pads, and understated, often soulful vocals sitting low in the mix. It prioritizes mood and texture over big moments.",
    funFact:"Deep house's template came from Chicago's Larry Heard (aka Mr. Fingers), who reportedly built his classic \"Can You Feel It\" almost entirely on a single Roland Juno-60. Disclosure's \"Latch\" landed a quarter-century later with the same ingredients — jazz-tinged chords and warm sub-bass under a soulful vocal.",
    artists:"Disclosure, Kerri Chandler, Dixon, Larry Heard",
    video:"cjRO1phXsg8", videoStart:0, videoNote:"Disclosure ft. Sam Smith — \"Latch\", a modern deep house crossover hit" },

  // ===== ACT 2 — GROOVE =====
  { id:"house", act:2, family:"House", accent:"#ff3d81",
    name:"House", tagline:"The 4/4 foundation nearly everything else is built on.",
    bpm:"120–128", energy:"Steady groove",
    desc:"Born in early-1980s Chicago clubs, house runs on a relentless four-on-the-floor kick, off-beat hi-hats, a clap on 2 and 4, and often soulful or gospel-tinged vocals. It's the common ancestor of deep house, tech house, big room, and most genres in this guide.",
    funFact:"House is named after Chicago's legendary club \"The Warehouse,\" where Frankie Knuckles pioneered the sound by blending disco edits with drum machines starting in 1977. By the time Robin S released \"Show Me Love\" in 1993, that club experiment had become a chart formula — the organ stab and the diva vocal are Chicago's DNA on daytime radio.",
    artists:"Frankie Knuckles, Robin S, Cajmere / Green Velvet, MK",
    video:"Ps2Jc28tQrw", videoStart:0, videoNote:"Robin S — \"Show Me Love\" (1993), a defining vocal house anthem" },

  { id:"acid-house", act:2, family:"House", accent:"#ff3d81",
    name:"Acid House", tagline:"The squelchy TB-303 sound that sparked rave culture.",
    bpm:"120–130", energy:"Hypnotic, trippy",
    desc:"Acid house is built around the squelchy, resonant sound of the Roland TB-303 bass synthesizer. Its hypnotic, psychedelic basslines helped ignite the UK's late-80s rave explosion and it remains a foundational reference point for techno and house alike.",
    funFact:"The \"acid\" sound was discovered almost by accident: Chicago producers DJ Pierre and Spanky found the squelchy tone by randomly twisting knobs on a cheap, otherwise-unloved Roland TB-303.",
    artists:"Phuture, DJ Pierre, Josh Wink",
    video:"QZSd2pP2dms", videoStart:0, videoNote:"Phuture — \"Acid Tracks\" (1987), the record that started it all" },

  { id:"tech-house", act:2, family:"House", accent:"#ff3d81",
    name:"Tech House", tagline:"House's swing meets techno's hypnotic minimalism.",
    bpm:"122–128", energy:"Driving, groovy",
    desc:"Tech house fuses house's bouncy groove with techno's stripped-back, repetitive percussion and rolling basslines. Vocals are sparse or chopped into rhythmic stabs — pure groove, built for peak-time club sets.",
    funFact:"FISHER was a professional skateboarder in Australia before becoming one of tech house's biggest stars.",
    artists:"Fisher, Chris Lake, Green Velvet, Solardo",
    video:"wE8Az1EV6UQ", videoStart:0, videoNote:"Fisher — \"Losing It\", a tech house track that broke into the mainstream" },

  { id:"uk-garage", act:2, family:"Bass & Breaks", accent:"#7cff3d",
    name:"UK Garage", tagline:"Shuffled house rhythms with pitched-up vocal chops.",
    bpm:"130–135", energy:"Bouncy, soulful",
    desc:"UK garage grew out of London's mid-90s club scene, blending house's four-on-the-floor foundation with syncopated, shuffled rhythms, pitched-up vocal samples, and deep sub-bass. Distinctly British bounce that directly influenced grime and dubstep.",
    funFact:"\"Re-Rewind\" helped launch Craig David's career — he was still a teenager working at a shoe shop in Southampton when Artful Dodger first invited him into the studio.",
    artists:"Artful Dodger, MJ Cole, Todd Edwards",
    video:"M0wv_cQv8As", videoStart:0, videoNote:"Artful Dodger ft. Craig David — \"Re-Rewind\", a UK garage classic" },

  { id:"breakbeat", act:2, family:"Bass & Breaks", accent:"#7cff3d",
    name:"Breakbeat", tagline:"Sampled funk/hip-hop drum breaks instead of a straight kick.",
    bpm:"120–140", energy:"Funky, punchy",
    desc:"An umbrella term for electronic music built on syncopated, sampled drum breaks rather than a straight four-on-the-floor kick. Roots trace to hip-hop and 90s UK rave, and it spawned offshoots like big beat, jungle, and nu-skool breaks.",
    funFact:"The Prodigy's Liam Howlett built many of the group's earliest breakbeat tracks using an Atari ST computer and a cheap sampler, well before they became festival headliners.",
    artists:"The Prodigy, The Chemical Brothers, Fatboy Slim",
    video:"6_PAHbqq-o4", videoStart:0, videoNote:"The Prodigy — \"Breathe\", a breakbeat/big-beat landmark" },

  { id:"future-house", act:2, family:"House", accent:"#ff3d81",
    name:"Future House", tagline:"Bouncy, pitched bass stabs built for festival mainstages.",
    bpm:"124–128", energy:"Bouncy, playful",
    desc:"Future house layers house's groove with punchy, pitched/growling bass stabs and syncopated basslines, plus pop-structured drops. Took off around 2014-2016, becoming a festival-mainstage staple thanks to its instantly catchy hooks.",
    funFact:"Tchami named the genre partly to distinguish his gospel-house-meets-bass sound from the increasingly generic \"EDM\" label of the mid-2010s.",
    artists:"Tchami, Don Diablo, Oliver Heldens",
    video:"kr0_YzOQf5A", videoStart:0, videoNote:"Tchami — \"Adieu\", a genre-defining future house anthem" },

  // ===== ACT 3 — LIFT OFF =====
  { id:"progressive-house", act:3, family:"House", accent:"#ff3d81",
    name:"Progressive House", tagline:"Slow-building, cinematic, no rush to the drop.",
    bpm:"124–128", energy:"Hypnotic build",
    desc:"Progressive house favors long, gradually evolving arrangements over sudden drops — layers of melodic and percussive elements added and removed slowly across 6-8+ minutes. A journey rather than a moment.",
    funFact:"Eric Prydz's \"Opus\" builds for over four minutes before its first real drop — an extreme example of progressive house's patience-testing structure.",
    artists:"Eric Prydz, early deadmau5, Sasha & Digweed",
    video:"iRA82xLsb_w", videoStart:0, videoNote:"Eric Prydz — \"Opus\", a modern progressive house landmark" },

  { id:"melodic-techno", act:3, family:"Techno", accent:"#3dc9ff",
    name:"Melodic Techno", tagline:"Techno's drive plus progressive house's emotional pull.",
    bpm:"122–128", energy:"Emotional, atmospheric",
    desc:"Melodic techno blends driving techno percussion with lush pads, arpeggios, and often melancholic melodic lines borrowed from progressive house. The go-to sound for emotional sunset-to-night transitions at festivals.",
    funFact:"The Afterlife label and parties, co-founded by Tale Of Us, turned melodic techno into one of the biggest festival draws of the 2020s, often selling out arena-sized stages.",
    artists:"Tale Of Us, Mind Against, Stephan Bodzin",
    video:"K2eCQO-S4ws", videoStart:0, videoNote:"Tale Of Us & Mind Against — \"Astral\", a defining melodic techno record" },

  { id:"electro-house", act:3, family:"House", accent:"#ff3d81",
    name:"Electro House", tagline:"Distorted synth-bass stabs, big brash drops.",
    bpm:"125–130", energy:"Energetic, brash",
    desc:"Electro house injects house with punchy, distorted synth-bass \"stabs\" and 80s-electro-inspired sound design, favoring bold, in-your-face drops over subtlety. It dominated the late-2000s/early-2010s EDM boom.",
    funFact:"Deadmau5's giant mouse-head helmet started as a cheap Canadian Halloween costume before becoming one of dance music's most recognizable visual brands.",
    artists:"deadmau5, Steve Aoki, early Chainsmokers",
    video:"h7ArUgxtlJs", videoStart:0, videoNote:"deadmau5 ft. Rob Swire — \"Ghosts 'n' Stuff\", a genre touchstone" },

  { id:"big-room-house", act:3, family:"House", accent:"#ff3d81",
    name:"Big Room House", tagline:"Massive, simple, anthemic — built for 50,000 people.",
    bpm:"126–130", energy:"Euphoric peak-time",
    desc:"Designed specifically for festival mainstages: a huge, simple, instantly-gripping drop after a long tension-building intro. Subtlety isn't the point — impact on a huge crowd is.",
    funFact:"\"Animals\" by Martin Garrix was written when he was just 17 — it topped the UK Singles Chart and made him one of the youngest DJs ever to headline major festivals.",
    artists:"Martin Garrix, Hardwell, W&W",
    video:"gCYcHz2k5x0", videoStart:0, videoNote:"Martin Garrix — \"Animals\", the track that defined the sound" },

  { id:"trance", act:3, family:"Trance", accent:"#7c4dff",
    name:"Trance", tagline:"Long builds, big breakdowns, hands-in-the-air euphoria.",
    bpm:"130–140", energy:"Euphoric, emotional",
    desc:"Emerging from Germany in the early 90s, trance is built around extended build-ups, an emotional breakdown, and a soaring, melodic synth-lead climax — designed to create a communal, arms-up moment on the dancefloor.",
    funFact:"Armin van Buuren has been voted #1 DJ in the world by DJ Mag readers a record five times, largely on the strength of his trance productions and his long-running radio show \"A State of Trance.\"",
    artists:"Armin van Buuren, Above & Beyond, Paul van Dyk",
    video:"BR_DFMUzX4E", videoStart:0, videoNote:"Armin van Buuren ft. Trevor Guthrie — \"This Is What It Feels Like\"" },

  // ===== ACT 4 — PEAK TIME =====
  { id:"techno", act:4, family:"Techno", accent:"#3dc9ff",
    name:"Techno", tagline:"Machine-driven, repetitive, dark and futuristic.",
    bpm:"125–150 (commonly ~128–135)", energy:"Hypnotic, relentless",
    desc:"Born in Detroit in the mid-80s, techno strips dance music to its mechanical essence: relentless four-on-the-floor rhythms, minimal melodic content, and a dark, futuristic atmosphere. The late-night/peak-time backbone of club culture worldwide.",
    funFact:"Techno's Detroit originators (Juan Atkins, Derrick May, Kevin Saunderson) took their cues from German electronic band Kraftwerk and from futurist Alvin Toffler, whose book The Third Wave handed the scene its vocabulary. Four decades on, Charlotte de Witte is still working the same premise: machines, repetition, and no need for a chorus.",
    artists:"Charlotte de Witte, Jeff Mills, Carl Cox, Adam Beyer",
    video:"AS8Q_5knkrg", videoStart:0, videoNote:"Charlotte de Witte — \"Doppler\", a modern peak-time techno staple" },

  { id:"minimal-techno", act:4, family:"Techno", accent:"#3dc9ff",
    name:"Minimal Techno", tagline:"Techno stripped to almost nothing — and it still moves you.",
    bpm:"125–135", energy:"Sparse, meditative",
    desc:"Minimal techno reduces the genre to its bare essentials: looping micro-samples, subtle textural shifts, very little melody, groove created through tiny changes over long stretches of time.",
    funFact:"Richie Hawtin has performed entire DJ sets using nothing but a laptop and a handful of loops, proving how much groove minimal techno can squeeze from very little material.",
    artists:"Richie Hawtin, Ricardo Villalobos, Robert Hood",
    video:"rbx_gcX5Fd4", videoStart:0, videoNote:"Richie Hawtin — Minimal Techno & IDM mix, showcasing the style in motion" },

  { id:"hard-techno", act:4, family:"Techno", accent:"#3dc9ff",
    name:"Hard Techno", tagline:"Faster, harder, more distorted — pure peak-time intensity.",
    bpm:"140–155", energy:"Intense, aggressive",
    desc:"Hard techno pushes tempo and aggression further than standard techno, with distorted, punishing kicks, sharp stabs, and relentless, closing-set energy.",
    funFact:"Amelie Lens started her label Lenske in 2018 and has since become one of the few artists to headline both underground warehouse raves and mainstage festival slots with the same hard-edged sound.",
    artists:"Amelie Lens, I Hate Models, Perc",
    video:"MxKcx0FVuqk", videoStart:0, videoNote:"Amelie Lens — \"In My Mind\", a driving hard techno cut" },

  { id:"hardstyle", act:4, family:"Hard Dance", accent:"#ff3d3d",
    name:"Hardstyle", tagline:"Distorted reverse-bass kicks meet euphoric trance melody.",
    bpm:"150–160", energy:"Intense, euphoric",
    desc:"A Dutch genre combining hard techno's distorted, pitch-bent \"reverse bass\" kick drum with euphoric, trance-inspired melodies, alternating harder \"rawstyle\" sections with melodic euphoric peaks.",
    funFact:"Hardstyle's \"reverse bass\" kick — where the pitch rises rather than falls — is largely what separates it from hard techno and gives the genre its distinctive euphoric punch.",
    artists:"Headhunterz, Wildstylez, Da Tweekaz",
    video:"VaiHTvifGt0", videoStart:0, videoNote:"Headhunterz — \"Dragonborn\", a hardstyle anthem" },

  // ===== ACT 5 — BASS HEAVY =====
  { id:"jungle", act:5, family:"Bass & Breaks", accent:"#7cff3d",
    name:"Jungle", tagline:"Drum & bass's rawer, reggae-infused older sibling.",
    bpm:"160–180", energy:"Raw, rootsy",
    desc:"Jungle predates and directly birthed drum & bass, combining chopped breakbeats with reggae and dancehall basslines, samples, and MC culture from London's Black British sound-system scene of the early 90s.",
    funFact:"Goldie's \"Inner City Life\" was one of the first jungle tracks played on daytime BBC Radio 1, a huge moment in bringing the underground UK sound to the mainstream.",
    artists:"Goldie, LTJ Bukem, Congo Natty",
    video:"i-P98B2skts", videoStart:0, videoNote:"Goldie — \"Inner City Life\" (1994), a landmark jungle/DnB record" },

  { id:"drum-and-bass", act:5, family:"Bass & Breaks", accent:"#7cff3d",
    name:"Drum & Bass", tagline:"Fast breakbeats over heavy sub-bass — pure UK energy.",
    bpm:"160–180", energy:"Fast, propulsive",
    desc:"Drum & bass emerged from the UK's early-90s jungle and breakbeat hardcore scenes, defined by rapid, chopped breakbeats paired with deep sub-bass. Feels propulsive rather than frantic — a great tool for peak-energy sets.",
    funFact:"Netsky released his first full album at just 20 years old and named his breakout single \"Rio\" after a trip that reshaped his sound with Brazilian rhythmic influences.",
    artists:"Netsky, Andy C, Sub Focus, Chase & Status",
    video:"qFDP9egTwfM", videoStart:0, videoNote:"Netsky ft. Digital Farm Animals — \"Rio\", a crossover DnB hit" },

  { id:"dubstep", act:5, family:"Bass & Breaks", accent:"#7cff3d",
    name:"Dubstep", tagline:"Sparse and dark, or aggressive and drop-heavy.",
    bpm:"138–142 (felt half-time)", energy:"Heavy, bass-forward",
    desc:"Dubstep began in early-2000s South London as sparse, bass-heavy, dub-influenced music built around syncopated rhythms and a signature \"wobble\" bass. The US strand (\"brostep\") later pushed toward aggressive, mid-range growl-bass drops.",
    funFact:"Dubstep started in small South London record shops like Big Apple Records, where producers tested unreleased dubplates on massive sound systems before anyone had heard the tracks anywhere else. \"Bangarang\" is what happened when that sub-bass culture crossed the Atlantic and traded the darkness and space for mid-range aggression.",
    artists:"Skrillex, Excision, Mala, Benga",
    video:"YJVmu6yttiw", videoStart:0, videoNote:"Skrillex ft. Sirah — \"Bangarang\", the brostep era's defining track" },

  { id:"trap-edm", act:5, family:"Bass & Breaks", accent:"#7cff3d",
    name:"Trap (EDM)", tagline:"Hip-hop's 808s and hi-hat rolls, festival-ified.",
    bpm:"130–170 (half-time feel, ~65–85 per beat)", energy:"Hard-hitting, hype",
    desc:"EDM trap borrows Southern hip-hop's rapid hi-hat rolls, booming 808 sub-bass, and half-time drops, reframed for festival main stages.",
    funFact:"RL Grime originally studied jazz piano at USC before turning to production — classical training you can still hear in his layered, melodic trap arrangements.",
    artists:"RL Grime, Flosstradamus, Baauer",
    video:"04ufimjXEbA", videoStart:0, videoNote:"RL Grime — \"Core\", a defining EDM-trap release" },

  { id:"psytrance", act:5, family:"Trance", accent:"#7c4dff",
    name:"Psytrance", tagline:"Hypnotic, psychedelic, born on Goa's beaches.",
    bpm:"140–150", energy:"Trippy, driving",
    desc:"Psychedelic trance took root in Goa, India's rave scene in the late 80s/90s, evolving into a fast, hypnotic style built on rolling basslines and intricate, acid-inspired sound design.",
    funFact:"Psytrance traces its roots to Goa, India in the late 1980s, where travelling backpackers and local DJs threw all-night beach parties blending Indian spirituality with early electronic music. A lot of those travellers were Israeli, and they carried the sound home — which is how a duo like Infected Mushroom made it one of Israel's biggest musical exports.",
    artists:"Infected Mushroom, Astrix, Vini Vici",
    video:"WxhTbxMSvT0", videoStart:0, videoNote:"Infected Mushroom — \"Becoming Insane\", a psytrance classic" },

  // ===== ACT 6 — ENCORE =====
  { id:"dance-pop", act:6, family:"Dance / Crossover", accent:"#ffd23d",
    name:"Dance / EDM-Pop", tagline:"Song-structured, radio-ready electronic pop.",
    bpm:"100–128", energy:"Broadly accessible",
    desc:"An umbrella for radio-friendly electronic music built around pop song structure and vocal hooks rather than DJ-tool functionality — pulling from house, electro, and pop production alike.",
    funFact:"Calvin Harris wrote, produced, and performed nearly every instrument on his early albums himself before becoming one of the highest-paid DJs in the world.",
    artists:"Calvin Harris, David Guetta, Avicii",
    video:"ebXbLfLACGM", videoStart:0, videoNote:"Calvin Harris — \"Summer\", a genre-defining crossover hit" }
];
