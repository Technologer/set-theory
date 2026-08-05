/* Set Theory — English strings.
   Mirror of js/i18n/sk.js. data.js holds only language-neutral facts (ids,
   acts, families, accents, artists, BPM numbers, video ids); every piece of
   prose lives in a locale file, so adding a language means copying this file
   and nothing else.

   English also acts as the fallback: any key a locale omits is read from here,
   so a partial translation still renders. */

const I18N_EN = {
  code: "en",

  meta: {
    title: "Set Theory — 24 electronic genres, in set order",
    description: "A scroll-through guide to 24 electronic dance genres, sequenced like a real DJ set: BPM, energy, notable artists and a track for each."
  },

  ui: {
    introKicker: "24 genres · 6 acts · one continuous set",
    introPitch: "Can't hear the difference between tech house and techno yet? Twenty-four genres in set order, each with its BPM, its energy, and the track that defines it — so you learn them the way a DJ does: by what comes next.",
    begin: "Begin the Journey ▶",
    introHint: "Sound starts off. Hit the speaker any time. <kbd>J</kbd>/<kbd>K</kbd> to skip between genres.",

    searchToggle: "Search genres",
    searchPlaceholder: "Jump to a genre or artist…",
    soundOn: "Turn sound on",
    soundOff: "Mute sound",
    langToggle: "Prepnúť na slovenčinu",

    factLabel: "Fun fact",
    bpmLabel: "BPM",
    energyLabel: "Energy",
    artistsLabel: "Artists",
    openYouTube: "Open on YouTube ↗",
    embedError: "Embed blocked — use the YouTube link above.",
    playTrack: "▶ Play this track",
    playing: "▮▮ Playing",
    toast: "🔊 tap to hear the music",
    noMatch: (q) => `No genre matches “${q}”`,

    outroKicker: "Lights up",
    outroTitle: "You made it through the whole set.",
    outroText: "Twenty-four genres, 60 to 180 BPM, warm-up to last record. The useful part isn't memorising names — it's hearing where a track sits in the arc, and knowing what you'd play next. Tap any genre to go back and listen again.",
    outroNote: "<strong>About those six acts:</strong> <em>warm-up</em> and <em>peak time</em> are real DJ vocabulary — you'll see them in booking emails and on Beatport. <em>The build</em>, <em>after hours</em> and <em>last record</em> describe real moments but aren't fixed terms, and the six-act structure is a teaching device rather than an industry standard. Most DJs think in three phases: opening, peak, closing.",
    restart: "Back to the top ↑",

    craftTitle: "How a set actually gets built",
    craftSub: "The conventions behind the order you just scrolled through.",
    craft: [
      { h: "Energy moves in waves, not a line",
        p: "A set that climbs steadily and then sits at maximum exhausts a room. You build, pull back, build higher. A drop only lands if there was a valley before it — which is why the loudest record is almost never the first one." },
      { h: "Mix on the phrase",
        p: "Dance music is written in 4, 8 and 16-bar phrases. Bring the next track in on a phrase boundary and the transition disappears; come in halfway through one and the floor feels it, even if nobody could tell you why." },
      { h: "Stay near the tempo",
        p: "CDJ pitch faders default to ±6% for a reason — stretch a track much past that and it starts to sound wrong. Neighbouring genres in this guide mostly sit within a few BPM of each other, which is what makes them mixable." },
      { h: "Half-time is the bridge",
        p: "Tempo and feel aren't the same number. A dubstep track at 140 BPM is counted in half-time, so the kick and snare land like 70. That double reading is how DJs cross gaps that look impossible on paper — it's the trick behind Act 5." },
      { h: "Keys matter as much as beats",
        p: "Two tracks can be perfectly beatmatched and still sound sour together if their keys clash. Most DJ software labels every track with the Camelot wheel, so you can move to an adjacent number and stay consonant without knowing any theory." },
      { h: "Plan the first track and the last",
        p: "The common advice is to know exactly how you're opening and how you're closing, then read the room for everything in between. A fully scripted set can't respond to the floor in front of it." },
    ]
  },

  /* Act names live in data.js — they stay English in every locale by design. */
  acts: {
    1: { blurb: "Doors open, room's half full. Keep it slow." },
    2: { blurb: "Heads start nodding. Lock into the swing." },
    3: { blurb: "Tension stacking. Nothing resolves yet." },
    4: { blurb: "Full throttle. Melody optional." },
    5: { blurb: "Four-four breaks apart. The low end takes over." },
    6: { blurb: "Lights up. Send them home singing." },
  },

  genres: {
    "ambient-downtempo": {
      tagline: "Slow, textural, mood over movement.",
      bpmNote: "ambient can be beatless",
      energy: "Relaxed, immersive",
      desc: "Ambient and downtempo prioritize atmosphere, texture, and space over dancefloor function. Ambient can drop rhythm entirely in favor of evolving soundscapes, while downtempo keeps a loose, slow groove. Perfect for opening a set, chill-out rooms, or unwinding after a night out.",
      funFact: "Brian Eno coined the term \"ambient music\" in the 1978 liner notes to Music for Airports, describing it as music that should be \"as ignorable as it is interesting.\" Bonobo works the other side of that line — \"Kerala\" keeps a slow, loose groove, but the pull is still texture rather than any drop.",
      videoNote: "Bonobo — \"Kerala\", a modern downtempo touchstone"
    },
    "tropical-house": {
      tagline: "Sunny, radio-friendly house with marimba hooks.",
      energy: "Chill, sunny",
      desc: "A mellow, pop-adjacent house offshoot that emerged around 2014, built on marimba- and steel-drum-style melodies, laid-back percussion, and singer-songwriter vocal hooks. Tempo is noticeably slower than most house music, giving it a relaxed, beach-at-golden-hour feel.",
      funFact: "Kygo built his early hits, including \"Firestone,\" in his childhood bedroom in Norway using free trial software before he'd even played a real festival.",
      videoNote: "Kygo ft. Conrad Sewell — \"Firestone\", the genre's signature hit"
    },
    "deep-house": {
      tagline: "House slowed down and dressed in jazz chords.",
      energy: "Warm, laid-back",
      desc: "Deep house takes house's groove and softens it: jazzy extended chords, warm sub-bass and atmospheric pads, with anything else kept understated and low in the mix. It prioritizes mood and texture over big moments.",
      funFact: "This is where deep house starts: Chicago's Larry Heard, recording as Mr. Fingers, reportedly built it almost entirely on a single Roland Juno-60. Everything the genre still does is already here — the softened groove, the warm sub-bass, the refusal to reach for a big moment. Disclosure were working from the same recipe a quarter-century later.",
      videoNote: "Mr. Fingers — \"Can You Feel It\", the record deep house grew out of"
    },
    "house": {
      tagline: "The 4/4 foundation nearly everything else is built on.",
      energy: "Steady groove",
      desc: "Born in early-1980s Chicago clubs, house runs on a relentless four-on-the-floor kick, off-beat hi-hats, a clap on 2 and 4, and often soulful or gospel-tinged vocals. It's the common ancestor of deep house, tech house, big room, and most genres in this guide.",
      funFact: "House is named after Chicago's legendary club \"The Warehouse,\" where Frankie Knuckles pioneered the sound by blending disco edits with drum machines starting in 1977. By the time Robin S released \"Show Me Love\" in 1993, that club experiment had become a chart formula — the organ stab and the diva vocal are Chicago's DNA on daytime radio.",
      videoNote: "Robin S — \"Show Me Love\" (1993), a defining vocal house anthem"
    },
    "acid-house": {
      tagline: "The squelchy TB-303 sound that sparked rave culture.",
      energy: "Hypnotic, trippy",
      desc: "Acid house is built around the squelchy, resonant sound of the Roland TB-303 bass synthesizer. Its hypnotic, psychedelic basslines helped ignite the UK's late-80s rave explosion and it remains a foundational reference point for techno and house alike.",
      funFact: "The \"acid\" sound was discovered almost by accident: Chicago producers DJ Pierre and Spanky found the squelchy tone by randomly twisting knobs on a cheap, otherwise-unloved Roland TB-303.",
      videoNote: "Phuture — \"Acid Tracks\" (1987), the record that started it all"
    },
    "tech-house": {
      tagline: "House's swing meets techno's hypnotic minimalism.",
      energy: "Driving, groovy",
      desc: "Tech house fuses house's bouncy groove with techno's stripped-back, repetitive percussion and rolling basslines. Vocals are sparse or chopped into rhythmic stabs — pure groove, built for peak-time club sets.",
      funFact: "FISHER was a professional skateboarder in Australia before becoming one of tech house's biggest stars.",
      videoNote: "Fisher — \"Losing It\", a tech house track that broke into the mainstream"
    },
    "uk-garage": {
      tagline: "Shuffled house rhythms with pitched-up vocal chops.",
      energy: "Bouncy, soulful",
      desc: "UK garage grew out of London's mid-90s club scene, blending house's four-on-the-floor foundation with syncopated, shuffled rhythms, pitched-up vocal samples, and deep sub-bass. Distinctly British bounce that directly influenced grime and dubstep.",
      funFact: "\"Re-Rewind\" helped launch Craig David's career — he was still a teenager working at a shoe shop in Southampton when Artful Dodger first invited him into the studio.",
      videoNote: "Artful Dodger ft. Craig David — \"Re-Rewind\", a UK garage classic"
    },
    "breakbeat": {
      tagline: "Sampled funk/hip-hop drum breaks instead of a straight kick.",
      energy: "Funky, punchy",
      desc: "An umbrella term for electronic music built on syncopated, sampled drum breaks rather than a straight four-on-the-floor kick. Roots trace to hip-hop and 90s UK rave, and it spawned offshoots like big beat, jungle, and nu-skool breaks.",
      funFact: "The Prodigy's Liam Howlett built many of the group's earliest breakbeat tracks using an Atari ST computer and a cheap sampler, well before they became festival headliners.",
      videoNote: "The Prodigy — \"Breathe\", a breakbeat/big-beat landmark"
    },
    "future-house": {
      tagline: "Bouncy, pitched bass stabs built for festival mainstages.",
      energy: "Bouncy, playful",
      desc: "Future house layers house's groove with punchy, pitched/growling bass stabs and syncopated basslines, plus pop-structured drops. Took off around 2014-2016, becoming a festival-mainstage staple thanks to its instantly catchy hooks.",
      funFact: "Tchami named the genre partly to distinguish his gospel-house-meets-bass sound from the increasingly generic \"EDM\" label of the mid-2010s.",
      videoNote: "Tchami — \"Adieu\", a genre-defining future house anthem"
    },
    "progressive-house": {
      tagline: "Slow-building, cinematic, no rush to the drop.",
      energy: "Hypnotic build",
      desc: "Progressive house favors long, gradually evolving arrangements over sudden drops — layers of melodic and percussive elements added and removed slowly across 6-8+ minutes. A journey rather than a moment.",
      funFact: "Eric Prydz's \"Opus\" builds for over four minutes before its first real drop — an extreme example of progressive house's patience-testing structure.",
      videoNote: "Eric Prydz — \"Opus\", a modern progressive house landmark"
    },
    "melodic-techno": {
      tagline: "Techno's drive plus progressive house's emotional pull.",
      energy: "Emotional, atmospheric",
      desc: "Melodic techno blends driving techno percussion with lush pads, arpeggios, and often melancholic melodic lines borrowed from progressive house. The go-to sound for emotional sunset-to-night transitions at festivals.",
      funFact: "The Afterlife label and parties, co-founded by Tale Of Us, turned melodic techno into one of the biggest festival draws of the 2020s, often selling out arena-sized stages.",
      videoNote: "Tale Of Us & Mind Against — \"Astral\", a defining melodic techno record"
    },
    "electro-house": {
      tagline: "Distorted synth-bass stabs, big brash drops.",
      energy: "Energetic, brash",
      desc: "Electro house injects house with punchy, distorted synth-bass \"stabs\" and 80s-electro-inspired sound design, favoring bold, in-your-face drops over subtlety. It dominated the late-2000s/early-2010s EDM boom.",
      funFact: "Deadmau5's giant mouse-head helmet started as a cheap Canadian Halloween costume before becoming one of dance music's most recognizable visual brands.",
      videoNote: "deadmau5 ft. Rob Swire — \"Ghosts 'n' Stuff\", a genre touchstone"
    },
    "big-room-house": {
      tagline: "Massive, simple, anthemic — built for 50,000 people.",
      energy: "Euphoric peak-time",
      desc: "Designed specifically for festival mainstages: a huge, simple, instantly-gripping drop after a long tension-building intro. Subtlety isn't the point — impact on a huge crowd is.",
      funFact: "\"Animals\" by Martin Garrix was written when he was just 17 — it topped the UK Singles Chart and made him one of the youngest DJs ever to headline major festivals.",
      videoNote: "Martin Garrix — \"Animals\", the track that defined the sound"
    },
    "trance": {
      tagline: "Long builds, big breakdowns, hands-in-the-air euphoria.",
      energy: "Euphoric, emotional",
      desc: "Emerging from Germany in the early 90s, trance is built around extended build-ups, an emotional breakdown, and a soaring, melodic synth-lead climax — designed to create a communal, arms-up moment on the dancefloor.",
      funFact: "Tiësto was the first DJ to play a live set at an Olympic opening ceremony, mixing during the athletes' parade in Athens in 2004 — and DJ Mag readers voted him the world's #1 three years running around the same period. \"Lethal Industry\" comes from exactly those years, when this long, melodic strain of trance was as big as dance music got.",
      videoNote: "Tiësto — \"Lethal Industry\", a peak-era trance anthem"
    },
    "techno": {
      tagline: "Machine-driven, repetitive, dark and futuristic.",
      bpmNote: "commonly ~128–135",
      energy: "Hypnotic, relentless",
      desc: "Born in Detroit in the mid-80s, techno strips dance music to its mechanical essence: relentless four-on-the-floor rhythms, minimal melodic content, and a dark, futuristic atmosphere. The late-night/peak-time backbone of club culture worldwide.",
      funFact: "Techno's Detroit originators (Juan Atkins, Derrick May, Kevin Saunderson) took their cues from German electronic band Kraftwerk and from futurist Alvin Toffler, whose book The Third Wave handed the scene its vocabulary. Four decades on, Charlotte de Witte is still working the same premise: machines, repetition, and no need for a chorus.",
      videoNote: "Charlotte de Witte — \"Doppler\", a modern peak-time techno staple"
    },
    "minimal-techno": {
      tagline: "Techno stripped to almost nothing — and it still moves you.",
      energy: "Sparse, meditative",
      desc: "Minimal techno reduces the genre to its bare essentials: looping micro-samples, subtle textural shifts, very little melody, groove created through tiny changes over long stretches of time.",
      funFact: "Richie Hawtin has performed entire DJ sets using nothing but a laptop and a handful of loops, proving how much groove minimal techno can squeeze from very little material.",
      videoNote: "Richie Hawtin — Minimal Techno & IDM mix, showcasing the style in motion"
    },
    "hard-techno": {
      tagline: "Faster, harder, more distorted — pure peak-time intensity.",
      energy: "Intense, aggressive",
      desc: "Hard techno pushes tempo and aggression further than standard techno, with distorted, punishing kicks, sharp stabs, and relentless, closing-set energy.",
      funFact: "Amelie Lens started her label Lenske in 2018 and has since become one of the few artists to headline both underground warehouse raves and mainstage festival slots with the same hard-edged sound.",
      videoNote: "Amelie Lens — \"In My Mind\", a driving hard techno cut"
    },
    "hardstyle": {
      tagline: "Distorted reverse-bass kicks meet euphoric trance melody.",
      energy: "Intense, euphoric",
      desc: "A Dutch genre combining hard techno's distorted, pitch-bent \"reverse bass\" kick drum with euphoric, trance-inspired melodies, alternating harder \"rawstyle\" sections with melodic euphoric peaks.",
      funFact: "Hardstyle's \"reverse bass\" kick — where the pitch rises rather than falls — is largely what separates it from hard techno and gives the genre its distinctive euphoric punch.",
      videoNote: "Headhunterz — \"Dragonborn\", a hardstyle anthem"
    },
    "jungle": {
      tagline: "Drum & bass's rawer, reggae-infused older sibling.",
      energy: "Raw, rootsy",
      desc: "Jungle predates and directly birthed drum & bass, combining chopped breakbeats with reggae and dancehall basslines, samples, and MC culture from London's Black British sound-system scene of the early 90s.",
      funFact: "Goldie's \"Inner City Life\" was one of the first jungle tracks played on daytime BBC Radio 1, a huge moment in bringing the underground UK sound to the mainstream.",
      videoNote: "Goldie — \"Inner City Life\" (1994), a landmark jungle/DnB record"
    },
    "drum-and-bass": {
      tagline: "Fast breakbeats over heavy sub-bass — pure UK energy.",
      energy: "Fast, propulsive",
      desc: "Drum & bass emerged from the UK's early-90s jungle and breakbeat hardcore scenes, defined by rapid, chopped breakbeats paired with deep sub-bass. Feels propulsive rather than frantic — a great tool for peak-energy sets.",
      funFact: "Netsky released his first full album at just 20 years old and named his breakout single \"Rio\" after a trip that reshaped his sound with Brazilian rhythmic influences.",
      videoNote: "Netsky ft. Digital Farm Animals — \"Rio\", a crossover DnB hit"
    },
    "dubstep": {
      tagline: "Sparse and dark, or aggressive and drop-heavy.",
      bpmNote: "felt half-time",
      energy: "Heavy, bass-forward",
      desc: "Dubstep began in early-2000s South London as sparse, bass-heavy, dub-influenced music built around syncopated rhythms and a signature \"wobble\" bass. The US strand (\"brostep\") later pushed toward aggressive, mid-range growl-bass drops.",
      funFact: "Dubstep started in small South London record shops like Big Apple Records, where producers tested unreleased dubplates on massive sound systems before anyone had heard the tracks anywhere else. \"Bangarang\" is what happened when that sub-bass culture crossed the Atlantic and traded the darkness and space for mid-range aggression.",
      videoNote: "Skrillex ft. Sirah — \"Bangarang\", the brostep era's defining track"
    },
    "trap-edm": {
      tagline: "Hip-hop's 808s and hi-hat rolls, festival-ified.",
      bpmNote: "half-time feel, ~65–85 per beat",
      energy: "Hard-hitting, hype",
      desc: "EDM trap borrows Southern hip-hop's rapid hi-hat rolls, booming 808 sub-bass, and half-time drops, reframed for festival main stages.",
      funFact: "RL Grime originally studied jazz piano at USC before turning to production — classical training you can still hear in his layered, melodic trap arrangements.",
      videoNote: "RL Grime — \"Core\", a defining EDM-trap release"
    },
    "psytrance": {
      tagline: "Hypnotic, psychedelic, born on Goa's beaches.",
      energy: "Trippy, driving",
      desc: "Psychedelic trance took root in Goa, India's rave scene in the late 80s/90s, evolving into a fast, hypnotic style built on rolling basslines and intricate, acid-inspired sound design.",
      funFact: "Psytrance traces its roots to Goa, India in the late 1980s, where travelling backpackers and local DJs threw all-night beach parties blending Indian spirituality with early electronic music. A lot of those travellers were Israeli, and they carried the sound home — which is how a duo like Infected Mushroom made it one of Israel's biggest musical exports.",
      videoNote: "Infected Mushroom — \"Becoming Insane\", a psytrance classic"
    },
    "dance-pop": {
      tagline: "Song-structured, radio-ready electronic pop.",
      energy: "Broadly accessible",
      desc: "An umbrella for radio-friendly electronic music built around pop song structure and vocal hooks rather than DJ-tool functionality — pulling from house, electro, and pop production alike.",
      funFact: "Avicii previewed \"Wake Me Up\" at Ultra in 2013 with live folk musicians on stage, and the dance crowd booed it. Months later it was number one in more than twenty countries. A record the dancefloor rejected for being too pop is a fitting place to end a guide about where genre lines actually fall.",
      videoNote: "Avicii — \"Wake Me Up\", the EDM-pop crossover in its purest form"
    }
  }
};
