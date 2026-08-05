/* Set Theory — Slovak strings.
   Mirror of js/i18n/en.js. data.js holds the language-neutral facts, so video
   IDs, BPM numbers, accents and artist names are never duplicated here.

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

    recapTitle: "Všetkých 24 na jednom mieste",
    recapSub: "Každý žáner v poradí ako v sete, aj s tempom — najrýchlejší spôsob, ako vidieť, ktoré sú si dosť blízko na zmixovanie.",

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

  /* Slovník. Id sú jazykovo neutrálne, v texte sa odkazujú ako
     [[viditeľný text|term-id]] — viditeľný text môže byť skloňovaný,
     id zostáva rovnaké. */
  glossary: {
    "four-on-the-floor": {
      term: "Four-on-the-floor",
      def: "Kick na každej dobe — raz, dva, tri, štyri. Rovnomerný pulz pod housom, technom aj trancom a to, podľa čoho sa väčšina tanečnej hudby počíta."
    },
    "offbeat-hats": {
      term: "Hi-haty na offbeate",
      def: "Hi-haty umiestnené medzi kicky, na „a“ každej doby. Práve ony spôsobia, že four-on-the-floor groove pôsobí, akoby sa hýbal, a nie pochodoval."
    },
    "stab": {
      term: "Stab",
      def: "Krátky, ostrý akord — zvyčajne organ alebo synth — zahraný ako jeden úder, nie ako držaný tón. House je ich plný."
    },
    "sub-bass": {
      term: "Sub-bass",
      def: "Basy tak nízke, že ich skôr cítiš než počuješ, zhruba pod 60 Hz. Preto majú klubové aparatúry samostatné subwoofery a preto niektoré skladby na notebooku stratia zmysel."
    },
    "wobble": {
      term: "Wobble bass",
      def: "Basový tón, ktorému sa rytmicky posúva filter, takže pulzuje alebo „rozpráva“. Charakteristický zvuk raného dubstepu."
    },
    "syncopation": {
      term: "Synkopa",
      def: "Prízvuky dopadajúce mimo hlavnej doby, nie na ňu. Práve to odlišuje shuffle garage a swing breakbeatu od rovnej štvorky."
    },
    "dubplate": {
      term: "Dubplate",
      def: "Jednorazová acetátová platňa vyrezaná pre jedného DJa, často s nevydanou skladbou. Pred digitálom to bol spôsob, ako producent otestoval nahrávku na skutočnej aparatúre."
    },
    "drum-machine": {
      term: "Bicí automat",
      def: "Krabička, ktorá sekvencuje zvuky bicích namiesto nahrávania bubeníka. Rolandy 808 a 909 sformovali zvuk skoro všetkého v tomto sprievodcovi."
    },
    "drop": {
      term: "Drop",
      def: "Moment, keď sa napätie zlomí a nastúpi plný groove alebo basy, zvyčajne po breakdowne. To, k čomu celý build smeruje."
    },
    "groove": {
      term: "Groove",
      def: "Feel rytmu — ako tlačí alebo povoľuje voči dobe. Dve skladby s rovnakým BPM môžu groovovať úplne inak."
    },
    "percussion": {
      term: "Percusia",
      def: "Všetko rytmické, čo nie je kick ani basa — hi-haty, shakery, kongá, rimshoty. Práve tam žije väčšina swingu skladby."
    },
    "hook": {
      term: "Hook",
      def: "To, čo si zapamätáš bez námahy — vokálna linka, riff, melodická fráza. Pop na nich stojí, DJ tooly často žiadny nemajú."
    },
    "pads": {
      term: "Pady",
      def: "Dlhé, držané akordy, ktoré sedia za všetkým ostatným a vypĺňajú priestor. Nastavia náladu bez toho, aby na seba upozorňovali."
    },
    "tb-303": {
      term: "Roland TB-303",
      def: "Basový syntezátor z roku 1981, predávaný gitaristom na cvičenie a komerčne prepadák. Jeho rezonančný filter náhodou vytvoril acid, originály sa dnes predávajú za tisíce."
    },
    "bassline": {
      term: "Bassline",
      def: "Pohyblivá melódia v spodku, oddelená od kicku. V mnohej tanečnej hudbe je bassline vlastne tá melódia."
    },
    "acid": {
      term: "Acid",
      def: "Bublavý, rezonujúci zvuk filtra vytiahnutého na TB-303 alebo niečom, čo ju imituje. Je to textúra, nie tempo — objaví sa v house, techne aj trance."
    },
    "peak-time": {
      term: "Peak time",
      def: "Najhustejšia časť noci s najvyššou energiou — a zároveň reálna nálepka na skladbách, ktoré sú na ňu postavené. Ak platňa dáva zmysel len pri plnej sále, je peak-time."
    },
    "shuffle": {
      term: "Shuffle",
      def: "Rytmus, v ktorom sú offbeaty posunuté trochu neskôr, nie presne na mieste — vzniká valivý, poskakujúci feel. Garage na ňom stojí."
    },
    "vocal-chop": {
      term: "Vocal chop",
      def: "Vokál nasekaný na fragmenty a prehrávaný ako nástroj, často posunutý nahor. Hlas vnímaš ako rytmus a melódiu, nie ako slová."
    },
    "drum-break": {
      term: "Drum break",
      def: "Pár taktov bicích vybraných zo starej funkovej alebo soulovej platne a potom loopovaných či nasekaných. Celé žánre vyrástli z hŕstky slávnych breakov."
    },
    "sampler": {
      term: "Sampler",
      def: "Stroj, ktorý nahrá krátke zvuky a dovolí ti ich prehrať v akejkoľvek výške. Vďaka nemu sa dali skladby stavať z iných platní."
    },
    "sample": {
      term: "Sample",
      def: "Akýkoľvek existujúci zvuk použitý v novej skladbe — úder bicích, vokál, celý takt. Lacný samplovací hardvér zmenil tanečnú hudbu navždy."
    },
    "arpeggio": {
      term: "Arpeggio",
      def: "Tóny akordu zahrané po sebe namiesto naraz, zvyčajne rýchlo a opakovane. Melodic technu a trancu to dáva pohyb dopredu."
    },
    "sound-design": {
      term: "Sound design",
      def: "Tvorba zvuku od nuly namiesto hrania presetu — tvaruješ samotnú farbu, kým nie je tvoja. V mnohej elektronike je sound design vlastne to skladanie."
    },
    "distortion": {
      term: "Skreslenie",
      def: "Zámerné prebudenie zvuku tak, aby klipoval a pribrali mu harmonické. Kick vďaka tomu pôsobí tvrdšie a hlasnejšie bez toho, aby naozaj bol hlasnejší."
    },
    "buildup": {
      term: "Build-up",
      def: "Úsek, ktorý pridáva napätie a odoberá spodok, aby drop mal kam dopadnúť. Risery, snare rolky, otvárajúce sa filtre."
    },
    "breakdown": {
      term: "Breakdown",
      def: "Časť, kde vypadnú bicie a prevezmú to melódia alebo pady. Zresetuje sálu pred ďalším stúpaním."
    },
    "synth-lead": {
      term: "Synth lead",
      def: "Hlavná melodická linka na syntezátore, sediaca navrchu mixu. Trance sa hodnotí hlavne podľa leadov."
    },
    "loop": {
      term: "Loop",
      def: "Krátky úsek opakovaný donekonečna. Skoro celá tanečná hudba sú loopy rozložené v čase, a preto majú malé zmeny takú váhu."
    },
    "kick": {
      term: "Kick",
      def: "Basový bubon — najhlasnejší a najdôležitejší zvuk vo väčšine tanečnej hudby. Žánre sa často rozlišujú tvarom kicku viac než čímkoľvek iným."
    },
    "reverse-bass": {
      term: "Reverse bass",
      def: "Basový tón naladený tak, aby stúpal do kicku, nie odpadával od neho — spodok potom akoby odskakoval nahor. Podpis hardstylu."
    },
    "mc": {
      term: "MC",
      def: "Vokalista, ktorý naživo rozpráva a rýmuje ponad DJov set, nie spieva napísanú melódiu. Kľúčový pre jungle, garage a drum & bass."
    },
    "sound-system": {
      term: "Sound system",
      def: "Crew s vlastnými, ručne postavenými stenami basákov, hraná na hlasitosti, ktoré bežná aparatúra nedosiahne. Jamajská tradícia, ktorá sformovala britskú basovú hudbu."
    },
    "808": {
      term: "Roland TR-808",
      def: "Bicí automat z roku 1980, ktorého dlhý, dunivý basový bubon sa stal základom hip-hopu a o dekády neskôr trapu."
    },
    "hihat-roll": {
      term: "Hi-hat rolka",
      def: "Hi-haty vypálené v rýchlych dávkach, často v dvoj- či štvornásobnej rýchlosti. Najrozpoznateľnejší rytmický odtlačok trapu."
    },
    "half-time": {
      term: "Half-time",
      def: "Počítanie skladby v polovičnom BPM, pretože kick a snare dopadajú polovične často. Skladba pri 140 BPM môže pôsobiť ako 70 — takto DJi premostia tempá, ktoré vyzerajú vzdialené."
    },
    "dj-tool": {
      term: "DJ tool",
      def: "Skladba postavená na mixovanie, nie na počúvanie: dlhé intro, dlhé outro, žiadny veľký vokál. V sete užitočná, v slúchadlách nezáživná."
    }
  },

  /* Per-genre copy. `bpmNote` is the parenthetical after the BPM range; the
     range itself is a number and lives in data.js.
     Deliberately loose rather than literal: the English idioms are re-said the
     way someone from the scene would say them, not word-for-word. */
  genres: {
    "ambient-downtempo": {
      tagline: "Pomalé, textúrové — nálada pred pohybom.",
      bpmNote: "ambient môže byť aj bez beatu",
      energy: "Pokojná, pohlcujúca",
      desc: "Ambient a downtempo stavajú na atmosfére, textúre a priestore — nie na tom, či sa na to dá tancovať. Ambient vie rytmus opustiť úplne a nechať znieť len plynúce zvukové plochy, downtempo si drží voľný, pomalý [[groove|groove]]. Ideálne na otvorenie setu, do chill-out miestnosti alebo na dojazd po nočnej.",
      funFact: "Pojem „ambient music“ zaviedol Brian Eno v roku 1978 v texte k albumu Music for Airports — písal, že taká hudba má byť rovnako ľahko prehliadnuteľná ako zaujímavá. Bonobo stojí na druhej strane tej hranice: „Kerala“ si drží pomalý, voľný groove, ale ťahá ťa textúra, nie [[drop|drop]].",
      videoNote: "Bonobo — „Kerala“, moderný etalón downtempa"
    },

    "tropical-house": {
      tagline: "Slnečný, rádiový house s marimbovými hookmi.",
      energy: "Pohodová, slnečná",
      desc: "Mäkká, k popu naklonená odnož housu, ktorá sa presadila okolo roku 2014. Stojí na melódiách v štýle marimby a steel drumov, uvoľnenej [[perkusii|percussion]] a spevných [[hookoch|hook]]. Tempo je citeľne nižšie než pri väčšine housu, takže to celé znie ako pláž pri západe slnka.",
      funFact: "Kygo skladal svoje prvé hity vrátane „Firestone“ v detskej izbe v Nórsku, v skúšobných verziách softvéru — ešte predtým, než vôbec stál na festivalovom pódiu.",
      videoNote: "Kygo ft. Conrad Sewell — „Firestone“, vlajková loď žánru"
    },

    "deep-house": {
      tagline: "Spomalený house oblečený do jazzových akordov.",
      energy: "Teplá, uvoľnená",
      desc: "Deep house berie housový groove a zjemňuje ho: rozšírené jazzové akordy, teplý [[sub-bass|sub-bass]] a atmosférické [[pady|pads]], pričom všetko ostatné drží nenápadne a nižšie v mixe. Ide mu o náladu a textúru, nie o veľké momenty.",
      funFact: "Tu sa deep house začína: Chicagčan Larry Heard, nahrávajúci ako Mr. Fingers, to vraj postavil takmer celé na jedinom Rolande Juno-60. Všetko, čo žáner robí dodnes, je už tu — zjemnený groove, teplý sub-bass a odmietanie siahnuť po veľkom momente. Disclosure pracovali s rovnakým receptom o štvrťstoročie neskôr.",
      videoNote: "Mr. Fingers — „Can You Feel It“, platňa, z ktorej deep house vyrástol"
    },

    "house": {
      tagline: "Štvorkový základ, na ktorom stojí skoro všetko ostatné.",
      energy: "Stabilný groove",
      desc: "House sa zrodil v chicagských kluboch na začiatku 80. rokov. Beží na neúprosnom [[four-on-the-floor|four-on-the-floor]] kicku, [[hi-hatoch na offbeate|offbeat-hats]], tlesknutí na druhú a štvrtú dobu a často na soulových či gospelom podfarbených vokáloch. Je spoločným predkom deep housu, tech housu, big roomu aj väčšiny žánrov v tomto sprievodcovi.",
      funFact: "House má meno po legendárnom chicagskom klube The Warehouse, kde Frankie Knuckles od roku 1977 miešal disco edity s [[bicími automatmi|drum-machine]]. Kým Robin S vydala v roku 1993 „Show Me Love“, z klubového experimentu sa stal recept na hitparády — ten organový stab a vokál v štýle divy sú chicagská DNA v dennom rádiu.",
      videoNote: "Robin S — „Show Me Love“ (1993), definujúca vokálna housová hymna"
    },

    "acid-house": {
      tagline: "Bublavý zvuk TB-303, ktorý zapálil rave kultúru.",
      energy: "Hypnotická, trippy",
      desc: "Acid house stojí na bublavom, rezonujúcom zvuku basového syntezátora [[Roland TB-303|tb-303]]. Jeho hypnotické, psychedelické [[basové linky|bassline]] pomohli odpáliť britskú rave explóziu na konci 80. rokov a dodnes sú referenčným bodom pre techno aj house.",
      funFact: "[[Acidový|acid]] zvuk vznikol skoro náhodou: chicagskí producenti DJ Pierre a Spanky ho našli tak, že náhodne otáčali gombíkmi na lacnom a vtedy nikým nechcenom Rolande TB-303.",
      videoNote: "Phuture — „Acid Tracks“ (1987), platňa, ktorou to celé začalo"
    },

    "tech-house": {
      tagline: "Housový swing sa stretáva s hypnotickým minimalizmom techna.",
      energy: "Ťahavá, groovy",
      desc: "Tech house spája poskakujúci housový groove s odľahčenou, repetitívnou [[perkusiou|percussion]] a valivými [[basmi|bassline]] z techna. Vokály sú riedke alebo nasekané na rytmické stabs — čistý groove stavaný na [[peak-time|peak-time]] klubové sety.",
      funFact: "FISHER bol v Austrálii profesionálnym skateboardistom, než sa z neho stala jedna z najväčších hviezd tech housu.",
      videoNote: "Fisher — „Losing It“, tech house, ktorý sa prebil do mainstreamu"
    },

    "uk-garage": {
      tagline: "Shufflované housové rytmy so zrýchlenými vokálnymi sekmi.",
      energy: "Skákavá, soulová",
      desc: "UK garage vyrástol v londýnskych kluboch v polovici 90. rokov. Spája housový four-on-the-floor základ so [[synkopovanými|syncopation]], [[shufflovanými|shuffle]] rytmami, [[vokálmi posunutými nahor|vocal-chop]] a hlbokým sub-bassom. Výrazne britský bounce, z ktorého priamo vyšli grime aj dubstep.",
      funFact: "„Re-Rewind“ naštartoval kariéru Craiga Davida — keď ho Artful Dodger prvýkrát pozvali do štúdia, bol ešte tínedžer a pracoval v obchode s topánkami v Southamptone.",
      videoNote: "Artful Dodger ft. Craig David — „Re-Rewind“, klasika UK garage"
    },

    "breakbeat": {
      tagline: "Samplované funkové a hip-hopové breaky namiesto rovnej štvorky.",
      energy: "Funková, úderná",
      desc: "Zastrešujúci pojem pre elektroniku postavenú na synkopovaných, samplovaných [[bubeníckych breakoch|drum-break]] namiesto rovného [[four-on-the-floor|four-on-the-floor]] kicku. Korene má v hip-hope a britskom rave 90. rokov a vyrástli z neho odnože ako big beat, jungle či nu-skool breaks.",
      funFact: "Liam Howlett z The Prodigy skladal prvé breakbeatové veci na počítači Atari ST a lacnom [[sampleri|sampler]] — dávno predtým, než kapela začala zatvárať festivaly.",
      videoNote: "The Prodigy — „Breathe“, medzník breakbeatu a big beatu"
    },

    "future-house": {
      tagline: "Skákavé, ladené basové stabs stavané na festivalové pódiá.",
      energy: "Skákavá, hravá",
      desc: "Future house pridáva k housovému grooveu úderné, ladené až vrčiace basové [[stabs|stab]], synkopované [[basové linky|bassline]] a popovo stavané [[dropy|drop]]. Presadil sa v rokoch 2014 – 2016 a vďaka okamžite chytľavým hookom sa stal stálicou festivalových mainstage.",
      funFact: "Tchami pomenoval žáner aj preto, aby svoj zvuk na pomedzí gospelu, housu a basov odlíšil od čoraz všeobecnejšej nálepky „EDM“, ktorá vládla polovici desiatych rokov.",
      videoNote: "Tchami — „Adieu“, hymna, ktorá žáner definovala"
    },

    "progressive-house": {
      tagline: "Pomaly rastúci, filmový — na drop sa nikam neponáhľa.",
      energy: "Hypnotické stúpanie",
      desc: "Progressive house dáva prednosť dlhým, postupne sa vyvíjajúcim skladbám pred náhlymi [[dropmi|drop]]. Melodické a rytmické vrstvy pribúdajú a ubúdajú pomaly, naprieč šiestimi až ôsmimi minútami. Je to cesta, nie moment.",
      funFact: "„Opus“ od Erica Prydza stúpa vyše štyroch minút, kým príde prvý skutočný drop — extrémna ukážka toho, ako progressive house testuje trpezlivosť.",
      videoNote: "Eric Prydz — „Opus“, moderný medzník progressive housu"
    },

    "melodic-techno": {
      tagline: "Ťah techna plus emocionálny ťah progressive housu.",
      energy: "Emotívna, atmosférická",
      desc: "Melodic techno spája ťahavú technovú [[perkusiu|percussion]] s bohatými [[padmi|pads]], [[arpeggiami|arpeggio]] a často melancholickými melódiami vypožičanými z progressive housu. Je to zvuk na festivalový prechod z večera do noci.",
      funFact: "Label a párty Afterlife, ktoré spoluzaložili Tale Of Us, spravili z melodic techna jeden z najväčších festivalových ťahákov 20. rokov — často vypredajú pódiá veľkosti arény.",
      videoNote: "Tale Of Us & Mind Against — „Astral“, definujúca nahrávka melodic techna"
    },

    "electro-house": {
      tagline: "Skreslené syntezátorové basové stabs a veľké drzé dropy.",
      energy: "Energická, drzá",
      desc: "Electro house pridáva do housu úderné, [[skreslené|distortion]] syntezátorové basové „[[stabs|stab]]“ a [[zvukový dizajn|sound-design]] inšpirovaný elektrom 80. rokov. Namiesto jemnosti stavia na priamočiarych, výrazných dropoch. Ovládol EDM boom na prelome nultých a desiatych rokov.",
      funFact: "Obrovská myšacia hlava deadmau5 začala ako lacný halloweensky kostým v Kanade — dnes je to jedna z najrozpoznateľnejších vizuálnych značiek tanečnej hudby.",
      videoNote: "deadmau5 ft. Rob Swire — „Ghosts 'n' Stuff“, etalón žánru"
    },

    "big-room-house": {
      tagline: "Obrovský, jednoduchý, hymnický — stavaný pre 50 000 ľudí.",
      energy: "Euforická, peak-time",
      desc: "Navrhnutý priamo pre festivalové mainstage: obrovský, jednoduchý a okamžite chytľavý [[drop|drop]] po dlhom [[budovaní napätia|buildup]]. Nejde tu o jemnosť, ale o dopad na obrovský dav.",
      funFact: "„Animals“ napísal Martin Garrix ako sedemnásťročný — skladba sa dostala na prvé miesto britskej hitparády a spravila z neho jedného z najmladších headlinerov veľkých festivalov.",
      videoNote: "Martin Garrix — „Animals“, skladba, ktorá definovala zvuk"
    },

    "trance": {
      tagline: "Dlhé stúpania, veľké breakdowny, ruky vo vzduchu.",
      energy: "Euforická, emotívna",
      desc: "Trance vznikol v Nemecku na začiatku 90. rokov. Stojí na dlhom [[budovaní|buildup]], emotívnom [[breakdowne|breakdown]] a vzlietajúcej [[melodickej syntezátorovej linke|synth-lead]] vo vrchole — celé je to postavené tak, aby na parkete vznikol spoločný moment s rukami vo vzduchu.",
      funFact: "Tiësto bol prvým DJom, ktorý hral naživo na otváracom ceremoniáli olympiády — mixoval počas nástupu športovcov v Aténach v roku 2004. Približne v tom istom období ho čitatelia DJ Mag trikrát po sebe zvolili za najlepšieho DJa sveta. „Lethal Industry“ je presne z tých rokov, keď bol tento dlhý, melodický trance tým najväčším, čo tanečná hudba mala.",
      videoNote: "Tiësto — „Lethal Industry“, hymna z vrcholnej éry trancu"
    },

    "techno": {
      tagline: "Strojové, repetitívne, temné a futuristické.",
      bpmNote: "bežne ~128–135",
      energy: "Hypnotická, neúprosná",
      desc: "Techno sa zrodilo v Detroite v polovici 80. rokov a zredukovalo tanečnú hudbu na jej strojovú podstatu: neúprosný [[four-on-the-floor|four-on-the-floor]] rytmus, minimum melódie a temnú, futuristickú atmosféru. Je to chrbtová kosť nočných a [[peak-time|peak-time]] momentov v kluboch po celom svete.",
      funFact: "Detroitskí zakladatelia techna (Juan Atkins, Derrick May, Kevin Saunderson) čerpali z nemeckých Kraftwerk a z futurológa Alvina Tofflera, ktorého kniha The Third Wave dala scéne slovník. O štyri dekády neskôr pracuje Charlotte de Witte s rovnakým zadaním: stroje, opakovanie a žiadny refrén.",
      videoNote: "Charlotte de Witte — „Doppler“, moderná peak-time technová stálica"
    },

    "minimal-techno": {
      tagline: "Techno zoškrtané takmer na nulu — a aj tak ťa rozhýbe.",
      energy: "Riedka, meditatívna",
      desc: "Minimal techno redukuje žáner na úplný základ: [[slučky|loop]] [[mikro-samplov|sample]], jemné posuny v textúre, takmer žiadna melódia. [[Groove|groove]] vzniká z drobných zmien natiahnutých cez dlhý čas.",
      funFact: "Richie Hawtin odohral celé sety len s notebookom a hŕstkou slučiek — dôkaz, koľko grooveu vie minimal techno vyžmýkať z minima materiálu.",
      videoNote: "Richie Hawtin — mix minimal techna a IDM, štýl v pohybe"
    },

    "hard-techno": {
      tagline: "Rýchlejšie, tvrdšie, skreslenejšie — čistá peak-time intenzita.",
      energy: "Intenzívna, agresívna",
      desc: "Hard techno tlačí tempo aj agresivitu ďalej než bežné techno: [[skreslené|distortion]], ubíjajúce [[kicky|kick]], ostré [[stabs|stab]] a neúprosná energia na záver noci.",
      funFact: "Amelie Lens založila v roku 2018 label Lenske a patrí k tým pár umelcom, ktorí s rovnako tvrdým zvukom zahrajú aj na podzemnom warehouse rave, aj na festivalovom mainstage.",
      videoNote: "Amelie Lens — „In My Mind“, ťahavý hard technový kus"
    },

    "hardstyle": {
      tagline: "Skreslený reverse-bass kick a euforická trance melódia.",
      energy: "Intenzívna, euforická",
      desc: "Holandský žáner, ktorý spája skreslený, výškovo ohýbaný „[[reverse bass|reverse-bass]]“ [[kick|kick]] z hard techna s euforickými melódiami inšpirovanými trancom. Strieda tvrdšie „rawstyle“ pasáže s melodickými vrcholmi.",
      funFact: "Práve reverse-bass kick — pri ktorom výška tónu stúpa namiesto klesania — odlišuje hardstyle od hard techna a dáva mu ten charakteristický euforický úder.",
      videoNote: "Headhunterz — „Dragonborn“, hardstylová hymna"
    },

    "jungle": {
      tagline: "Surovejší, reggae nasiaknutý starší brat drum & bassu.",
      energy: "Surová, koreňová",
      desc: "Jungle predchádzal drum & bassu a priamo ho splodil. Spája nasekané [[breakbeaty|drum-break]] s reggae a dancehall basmi, samplami a [[MC|mc]] kultúrou z londýnskej čiernej [[sound-systémovej|sound-system]] scény zo začiatku 90. rokov.",
      funFact: "„Inner City Life“ od Goldieho bola jednou z prvých jungle skladieb, ktoré hrali cez deň na BBC Radio 1 — obrovský moment v tom, ako sa britský underground dostal do mainstreamu.",
      videoNote: "Goldie — „Inner City Life“ (1994), medzník jungle a DnB"
    },

    "drum-and-bass": {
      tagline: "Rýchle breakbeaty nad ťažkým sub-bassom — čistá britská energia.",
      energy: "Rýchla, ženúca",
      desc: "Drum & bass vyrástol z britského jungle a breakbeat hardcoru zo začiatku 90. rokov. Definujú ho rýchle, nasekané [[breakbeaty|drum-break]] spojené s hlbokým [[sub-bassom|sub-bass]]. Pôsobí skôr ženúco než zbrklo — skvelý nástroj na sety s vysokou energiou.",
      funFact: "Netsky vydal prvý album ako dvadsaťročný a singel „Rio“ pomenoval po ceste, ktorá jeho zvuk preformovala brazílskymi rytmami.",
      videoNote: "Netsky ft. Digital Farm Animals — „Rio“, crossover DnB hit"
    },

    "dubstep": {
      tagline: "Riedky a temný, alebo agresívny a plný dropov.",
      bpmNote: "vnímané v half-time",
      energy: "Ťažká, basová",
      desc: "Dubstep vznikol na začiatku nultých rokov v južnom Londýne ako riedka, basovo ťažká hudba ovplyvnená dubom, postavená na [[synkopovanom|syncopation]] rytme a charakteristickom „[[wobble|wobble]]“ base. Americká vetva („brostep“) ho neskôr posunula k agresívnym dropom s vrčiacimi strednými polohami.",
      funFact: "Dubstep sa rodil v malých predajniach platní v južnom Londýne, napríklad v Big Apple Records, kde producenti skúšali nevydané [[dubplates|dubplate]] na obrovských sound systémoch skôr, než ich ktokoľvek inde počul. „Bangarang“ je to, čo sa stalo, keď táto sub-bassová kultúra prešla cez Atlantik a vymenila temnotu a priestor za agresiu v stredných polohách.",
      videoNote: "Skrillex ft. Sirah — „Bangarang“, definujúca skladba brostepovej éry"
    },

    "trap-edm": {
      tagline: "808-ky a hi-hat rolky z hip-hopu, prerobené pre festivaly.",
      bpmNote: "half-time feel, ~65–85 na dobu",
      energy: "Úderná, hype",
      desc: "EDM trap si požičiava rýchle [[hi-hat rolky|hihat-roll]], dunivý [[808|808]] sub-bass a [[half-time|half-time]] dropy z južanského hip-hopu a prerába ich pre festivalové mainstage.",
      funFact: "RL Grime pôvodne študoval jazzový klavír na USC a až potom sa dal na produkciu — to klasické školenie je v jeho vrstvených, melodických trapových aranžmánoch stále počuť.",
      videoNote: "RL Grime — „Core“, definujúce EDM-trapové vydanie"
    },

    "psytrance": {
      tagline: "Hypnotický, psychedelický, zrodený na plážach Goa.",
      energy: "Trippy, ťahavá",
      desc: "Psychedelický trance zapustil korene v rave scéne v indickej Goe na konci 80. a v 90. rokoch. Vyvinul sa do rýchleho, hypnotického štýlu postaveného na valivých [[basových linkách|bassline]] a prepracovanom, [[acidom|acid]] inšpirovanom [[zvukovom dizajne|sound-design]].",
      funFact: "Psytrance má korene v indickej Goe na konci 80. rokov, kde cestujúci baťôžkari a miestni DJi robili celonočné párty na pláži a miešali indickú spiritualitu s ranou elektronikou. Veľa z tých cestovateľov boli Izraelčania, ktorí si zvuk priniesli domov — a tak sa z dvojice ako Infected Mushroom stal jeden z najväčších izraelských hudobných exportov.",
      videoNote: "Infected Mushroom — „Becoming Insane“, klasika psytrancu"
    },

    "dance-pop": {
      tagline: "Pesničkovo stavaný, rádiový elektronický pop.",
      energy: "Široko prístupná",
      desc: "Zastrešujúci pojem pre rádiovú elektroniku postavenú na pesničkovej štruktúre a vokálnych [[hookoch|hook]], nie na funkcii [[DJského nástroja|dj-tool]]. Čerpá z housu, elektra aj popovej produkcie.",
      funFact: "Avicii predviedol „Wake Me Up“ na Ultre v roku 2013 so živými folkovými hudobníkmi na pódiu a tanečné publikum ho vypískalo. O pár mesiacov bola skladba jednotkou vo vyše dvadsiatich krajinách. Platňa, ktorú parket odmietol ako príliš popovú, je celkom vhodné miesto na záver sprievodcu o tom, kde vlastne hranice žánrov ležia.",
      videoNote: "Avicii — „Wake Me Up“, crossover EDM-popu v najčistejšej podobe"
    }
  }
};
