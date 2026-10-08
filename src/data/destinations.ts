export type Category =
  | "Ancient wonders"
  | "Wild landscapes"
  | "Living heritage";

export interface Chapter {
  title: string;
  eyebrow: string;
  body: string;
  fact: string;
  arabicSubtitle?: string;
}

export interface BookingItem {
  id: string;
  kind: "Stay" | "Taste" | "Explore";
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  query: string;
}

export interface TopicSection {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  tag: string;
}

export interface CulinaryHighlight {
  dishAr: string;
  dishEn: string;
  storyAr: string;
  storyEn: string;
}

import { type HistoricalEra, destinationEras } from "./historicalEras";
export { type HistoricalEra, destinationEras };

export interface Destination {
  slug: string;
  name: string;
  arabic: string;
  governorate: { ar: string; en: string };
  quote?: { ar: string; en: string };
  region: string;
  category: Category;
  coordinates: { lat: number; lng: number };
  image: string;
  hook: string;
  subtitle: string;
  chapters: [Chapter, Chapter, Chapter];
  topics: TopicSection[];
  eras?: HistoricalEra[];
  culinary: CulinaryHighlight;
  insiderTip: { ar: string; en: string };
  bookings: BookingItem[];
}

const chapter = (
  eyebrow: string,
  title: string,
  body: string,
  fact: string,
  arabicSubtitle?: string,
): Chapter => ({ eyebrow, title, body, fact, arabicSubtitle });

const experiences = (
  place: string,
  stay: string,
  food: string,
  explore: string,
  image: string,
): BookingItem[] => [
  {
    id: "stay",
    kind: "Stay",
    title: stay,
    description: `Find a place to slow down near ${place}. Compare availability directly with accommodation providers.`,
    image,
    imageAlt: `Landscape near ${place}`,
    query: `${stay} ${place} hotels`,
  },
  {
    id: "taste",
    kind: "Taste",
    title: food,
    description:
      "Meet Jordan through its table. Discover local kitchens and contact your host to arrange a meal.",
    image: "/images/heritage-mansaf.jpg",
    imageAlt: "Jordanian mansaf with rice, lamb, and jameed",
    query: `${food} ${place} restaurants`,
  },
  {
    id: "explore",
    kind: "Explore",
    title: explore,
    description:
      "Walk with a local perspective. Find guides and confirm access, availability, and prices with the operator.",
    image,
    imageAlt: `Landscape near ${place}`,
    query: `${explore} ${place} local guide`,
  },
];

export const destinations: Destination[] = [
  {
    slug: "petra",
    name: "Petra",
    arabic: "البتراء",
    governorate: { ar: "محافظة معان", en: "Ma'an Governorate" },
    quote: {
      ar: "مدينة وردية يحرسها الصمت، أبدعها الأنباط بين الصخور لتبقى خالدة أبد الدهر.",
      en: "A rose-red city half as old as time, carved into the cliffs of eternity.",
    },
    region: "Ma’an · Southern Jordan",
    category: "Ancient wonders",
    coordinates: { lat: 30.3285, lng: 35.4444 },
    image: "/images/petra.jpg",
    hook: "A rose-red city, carved into eternity.",
    subtitle: "Follow the sandstone passage into the world of the Nabataeans.",
    chapters: [
      chapter(
        "Act I · The arrival",
        "A city hidden in the stone.",
        "Beyond the towering canyon walls of the Siq, bathed in warm shadow, the Treasury emerges like a vision chiseled from living rose sandstone. Petra was the heartbeat of the Nabataean kingdom—an opulent crossroads where Arabian frankincense, Indian silk, and Mediterranean spices met between the cliffs.",
        "Nabataean capital · Southern Jordan",
        "المدينة الوردية المنحوتة في الصخر",
      ),
      chapter(
        "Act II · The marvel",
        "Water made the desert bloom.",
        "Beneath the soaring monumental façade lies an extraordinary feat of hydraulic ingenuity. Rock-cut terracotta channels, carved cisterns, and stone dams captured seasonal flash floods, sustaining forty thousand souls and lush gardens in the heart of an arid desert mountain canyon.",
        "UNESCO World Heritage · Inscribed 1985",
        "هندسة المياه وإعجاز الأنباط",
      ),
      chapter(
        "Act III · The living legacy",
        "Take the longer way home.",
        "Ascend the rock-cut steps to Ad-Deir (The Monastery) as the golden hour turns sandstone cliffs into radiant amber. Local Bedouin hosts brew fragrant sage tea under desert shade, carrying forward centuries of warmth and mountain wisdom. Wadi Musa invites you to linger and explore deeply.",
        "Explore responsibly · Stay on marked paths",
        "كرم الضيافة وأسرار البادية",
      ),
    ],
    topics: [
      {
        tag: "Hydraulic Engineering",
        titleEn: "Mastery of Flash Floods and Aqueducts",
        titleAr: "عبقرية ترويض السيول وشبكات القنوات المائية",
        descriptionEn: "The Nabataeans built over 200 rock-hewn cisterns with waterproof plaster, terraced gravity pipes, and diversion dams across the Siq that safely collected millions of gallons of water in the hyper-arid Sharah mountains.",
        descriptionAr: "ابتكر الأنباط أكثر من مئتي خزان جبلي منحوت ومبطن بالجص المقاوم للماء، مع أنابيب فخارية وقنوات جاذبية وسدود تحويلية حمَت السيق ووفّرت مخزوناً مائياً هائلاً في قلب صحراء معان القاحلة.",
      },
      {
        tag: "Royal Architecture",
        titleEn: "The Royal Tombs and Hellenistic Fusion",
        titleAr: "الأضرحة الملكية واندماج العمارة النبطية الإغريقية",
        descriptionEn: "Carved into the sheer face of Jabal al-Khubtha, the Urn, Silk, Corinthian, and Palace Tombs fuse Mesopotamian step-crowning with classical Greek pediments, revealing Petra's cosmopolitan trade connections.",
        descriptionAr: "منحوتة في صخور جبل الخبثة الشاهقة، تدمج أضرحة الجرة والحرير والقرنثي والقصر الملكي بين الدرج المدرج الآشوري والتيجان والواجهات الإغريقية الكلاسيكية، مجسدة ذروة ازدهار التجارة النبطية.",
      },
      {
        tag: "Spiritual High Places",
        titleEn: "Jabal Harun and High Place of Sacrifice",
        titleAr: "مقام النبي هارون ومذبح التضحية السماوي",
        descriptionEn: "Perched 1,350 meters above sea level, the High Place of Sacrifice offers sacred obelisks dedicated to Dushara and Al-Uzza, while the distant white dome of Aaron's tomb crowns the southwestern ridge.",
        descriptionAr: "على ارتفاع 1350 متراً فوق مستوى البحر، يضم مذبح التضحية مسلات مقدسة مكرسة للإله ذو الشرى والإلهة العزى، بينما تتلألأ قبة مقام النبي هارون البيضاء على أعلى قمم جبال البتراء الجنوبية.",
      },
      {
        tag: "Living Culture",
        titleEn: "The Bdoul Tribe and Desert Traditions",
        titleAr: "قبائل البدول وحراس الحكمة التراثية",
        descriptionEn: "For centuries, the Bdoul Bedouins inhabited the sandstone caves of Petra, cultivating deep knowledge of desert herbal medicine, mountain paths, and the oral poetry of the southern highlands.",
        descriptionAr: "سكنت قبائل البدول كهوف البتراء الوردية لأجيال متتالية، حاملين أسرار المسالك الجبلية الخفية، وعلوم النباتات البرية الشافية، وتقاليد الضيافة البدوية التي تعبق برائحة الهيل والشيح.",
      },
    ],
    culinary: {
      dishEn: "Mansaf Karaki with Aged Jameed & Wild Herbs",
      dishAr: "المنسف بالجميد الكركي البلدي والأعشاب البرية",
      storyEn: "Tender local mountain lamb slow-cooked in sun-dried goat yogurt (Jameed), served over turmeric rice and thin shrak flatbread, garnished with toasted local pine nuts and almonds.",
      storyAr: "لحم الضأن البلدي المطهو في لبن الجميد الكركي الأصيل المجفف تحت شمس البادية، يُقدَّم فوق خبز الشراك الرقيق والأرز المزين باللوز والصنوبر البلدي المحمص، رمز الكرم الأردني الخالد.",
    },
    insiderTip: {
      en: "Take the secret trail via Little Petra (Siq al-Barid) into Ad-Deir for a jaw-dropping backcountry arrival away from all crowds.",
      ar: "اسلك المسار الجبلي الخلفي من البتراء الصغيرة (سيق البارد) نحو الدير، لتخوض تجربة وصول سينمائية ساحرة تخلو تماماً من الحشود وتطل على أودية وادي عربة.",
    },
    bookings: experiences(
      "Wadi Musa",
      "Petra guesthouses",
      "Jordanian home cooking",
      "Petra walking tour",
      "/images/petra.jpg",
    ),
  },
  {
    slug: "wadi-rum",
    name: "Wadi Rum",
    arabic: "وادي رم",
    governorate: { ar: "محافظة العقبة", en: "Aqaba Governorate" },
    quote: {
      ar: "وادي القمر المهيب، سكون الصحراء الخالدة وسماء تلألأ بمليار نجمة.",
      en: "Vast, echoing, and God-like—where stillness finds its purest expression.",
    },
    region: "Aqaba · Southern Jordan",
    category: "Wild landscapes",
    coordinates: { lat: 29.573, lng: 35.42 },
    image: "/images/wadirum.jpg",
    hook: "An earthbound journey to another world.",
    subtitle: "Sandstone cathedrals, Bedouin stories, and a sky without end.",
    chapters: [
      chapter(
        "Act I · The arrival",
        "Where silence has a shape.",
        "Colossal sandstone cathedrals rise from seas of crimson sand into a sky of brilliant cobalt. Wadi Rum is where terrestrial time slows to a whisper. For millennia, nomadic tribes and ancient caravaners have traversed these silent canyons, leaving their footprints alongside petroglyphs carved into stone.",
        "Protected desert · Southern Jordan",
        "وادي القمر وصمت الصحراء المهيب",
      ),
      chapter(
        "Act II · The marvel",
        "Written by wind and time.",
        "Sculpted by 500 million years of wind, flash floods, and thermal weathering, colossal sandstone massifs rest upon ancient Precambrian granite. Thamudic, Nabataean, and early Arabic inscriptions carved into sheer rock faces preserve sacred records of travelers across the ages.",
        "UNESCO World Heritage · Inscribed 2011",
        "نقوش الأجداد على صخور الجرانيت",
      ),
      chapter(
        "Act III · The living legacy",
        "Under a thousand stars.",
        "As twilight fades into indigo, the desert sky ignites into a canopy of a billion stars. Gather around the embers of a Bedouin fire to taste traditional Zarb cooked slowly beneath desert sand, surrounded by stories of the desert that have been passed down from father to son.",
        "Local guides · Desert hospitality",
        "سحر السمر وعشاء الزرب التقليدي",
      ),
    ],
    topics: [
      {
        tag: "Geological Wonder",
        titleEn: "Precambrian Basement and Sandstone Monoliths",
        titleAr: "قواعد الجرانيت وأبراج الحجر الرملي المعلقة",
        descriptionEn: "Wadi Rum represents a rare geological window where dark Precambrian igneous granite bases directly meet towering Cambrian and Ordovician red and yellow sandstone towers like Jebel Rum and Um Ishrin.",
        descriptionAr: "يمثل وادي رم نافذة جيولوجية نادرة تبرز التقاء صخور الجرانيت البركانية القديمة العائدة لما قبل الكمبري مع أبراج الحجر الرملي الأحمر والأصفر كجبل رم وجبل أم عشرين بارتفاع يتجاوز 1750 متراً.",
      },
      {
        tag: "Prehistoric Epigraphy",
        titleEn: "Anfeeshiah and Khazali Rock Inscriptions",
        titleAr: "نقوش أنفاشية والأنعام في مضيق الخزعلي",
        descriptionEn: "Over 25,000 petroglyphs and 20,000 inscriptions in Thamudic, Safaitic, Nabataean, and early Kufic script record camel caravans, hunters, leopards, and prayers across millennia.",
        descriptionAr: "يحتضن الوادي أكثر من 25 ألف نقش صخري و20 ألف كتابة بالثمودية والصفائية والنبطية والكوفية المبكرة في مضيق الخزعلي وجبل أنفاشية، توثق قوافل الإبل والصيادين والوعول البرية.",
      },
      {
        tag: "Natural Arches",
        titleEn: "Burdah and Um Fruth Rock Bridges",
        titleAr: "جسور الصخور المعلقة في بردة وأم فروث",
        descriptionEn: "Suspended 35 meters in the sky, Burdah Rock Bridge is one of the highest natural arches in the world, sculpted by wind erosion acting on fractured sandstone planes over millions of years.",
        descriptionAr: "يرتفع جسر بردة الصخري الطبيعي أكثر من 35 متراً فوق قمة الجبل، ويُعد من أعلى الجسور الصخرية المعلقة في العالم، نحتته عوامل التعرية والرياح على مدى ملايين السنين بتوازن مذهل.",
      },
      {
        tag: "Cosmic Dark Sky",
        titleEn: "Zero Light Pollution Stargazing Sanctuary",
        titleAr: "محمية السماء المظلمة ورصد المجرات",
        descriptionEn: "With pristine desert air and absence of urban light pollution, Wadi Rum serves as an international gold-tier dark sky destination where the Milky Way illuminates the sand dunes with naked-eye clarity.",
        descriptionAr: "بفضل نقاء الهواء الصحراوي وانعدام التلوث الضوئي، يُعد وادي رم من أصفى مناطق العالم لرصد النجوم، حيث يمكن رؤية ذراع مجرة درب التبانة وسديم كوكبة الجوزاء بالعين المجردة بوضوح باهر.",
      },
    ],
    culinary: {
      dishEn: "Traditional Bedouin Zarb Cooked Under Desert Embers",
      dishAr: "الزرب البدوي المطمور تحت جمر رمال الصحراء",
      storyEn: "Marinated lamb, chicken, and seasonal vegetables placed on tiered metal racks inside a sealed underground barrel pit heated by acacia charcoal, slow-smoked in the sand for three hours.",
      storyAr: "قطع اللحم والدجاج البلدي المتبل مع الخضار توضع في براميل حديدية محكمة الإغلاق تحت رمال الصحراء فوق جمر حطب الغضا والأكاسيا، لتنضج ببطء وتكتسب نكهة التدخين الرملي الفريدة.",
    },
    insiderTip: {
      en: "Climb the gentle dune of Al-Hasany at dawn to watch the first rays ignite the monoliths in liquid rose and crimson gold.",
      ar: "اصعد كثبان الحساني الرملية قبل شروق الشمس بخمس عشرة دقيقة، لتشاهد اللحظة السحرية التي تشتعل فيها قمم الصخور بلون الذهب الوردي والقرمزي الأخّاذ.",
    },
    bookings: experiences(
      "Wadi Rum",
      "Bedouin desert camps",
      "Zarb dinner",
      "Desert jeep and walking tour",
      "/images/wadirum.jpg",
    ),
  },
  {
    slug: "jerash",
    name: "Jerash",
    arabic: "جرش",
    governorate: { ar: "محافظة جرش", en: "Jerash Governorate" },
    quote: {
      ar: "بومبي الشرق، مدينة الأعمدة المتناسقة والمسارح التي تعزف ألحان الزمان.",
      en: "The jewel of the Decapolis, where monumental Roman stone reaches into the open sky.",
    },
    region: "Jerash · Northern Jordan",
    category: "Ancient wonders",
    coordinates: { lat: 32.281, lng: 35.891 },
    image: "/images/jerash.jpg",
    hook: "Walk the avenues of an ancient empire.",
    subtitle: "A Roman city where colonnades still meet the open sky.",
    chapters: [
      chapter(
        "Act I · The arrival",
        "The city beyond the arch.",
        "Step through the monumental Arch of Hadrian into Gerasa—the crowning jewel of the Decapolis and one of the finest preserved Greco-Roman cities on earth. Enter through monumental architecture into a sprawling landscape of theaters, temples, and limestone-paved avenues bathed in northern light.",
        "Ancient Gerasa · The Decapolis",
        "بوابة الإمبراطورية وقوس هادريان",
      ),
      chapter(
        "Act II · The marvel",
        "A rhythm of stone columns.",
        "The grand Oval Plaza sweeps into the Colonnaded Cardo Maximus, where subterranean drainage systems and stone flagstones still bear the grooves of ancient chariot wheels. Soaring Corinthian columns of the Temple of Artemis reach towards the clouds in timeless architectural harmony.",
        "Oval Plaza · Colonnaded Cardo",
        "ساحة الأعمدة وشارع الكاردو",
      ),
      chapter(
        "Act III · The living legacy",
        "History with room to wander.",
        "In the South Theater, ancient acoustic marvels still carry the melodic whisper of traditional bagpipes across stone tiers. Beyond the ruins, northern Jordan welcomes you with centuries-old olive groves, warm wood-fired village bakeries, and scenic routes through pine-covered hills.",
        "Continue west · Ajloun highlands",
        "أهازيج المسرح وبساتين الزيتون المعمر",
      ),
    ],
    topics: [
      {
        tag: "Imperial Planning",
        titleEn: "The 800-Meter Cardo Maximus and Oval Forum",
        titleAr: "شارع الأعمدة الرئيسي (الكاردو) والساحة البيضاوية",
        descriptionEn: "The limestone Cardo features over 500 Ionic and Corinthian columns, ingenious underground rainwater drainage cisterns, and monumental tetrapylons marking major cross streets.",
        descriptionAr: "يمتد شارع الكاردو لمسافة 800 متر تحفه أكثر من 500 سارية عملاقة، مع شبكة مجاري تصريف أمطار تحت الأرض، ومحاريب تجارية وحجر تبليط لا يزال يحمل أثر عجلات العربات الرومانية.",
      },
      {
        tag: "Temple Engineering",
        titleEn: "Temple of Artemis and Whispering Columns",
        titleAr: "معبد الإلهة أرتميس والأعمدة المترنحة المعجزة",
        descriptionEn: "Dedicated to the city's patron goddess, the Temple of Artemis boasts 13-meter Corinthian columns with loose mortar joints designed to withstand earthquakes while subtly swaying in the wind.",
        descriptionAr: "يشمخ معبد أرتميس فوق التل الشمالي بتيجان كورنثية بارتفاع 13 متراً؛ صُممت قواعد أعمدته بفواصل مرنة تمتص الهزات الأرضية وتتحرك حركة ميكروية طفيفة مع الرياح دون أن تسقط.",
      },
      {
        tag: "Ancient Acoustics",
        titleEn: "The South and North Roman Theatres",
        titleAr: "المسرح الجنوبي وهندسة الصوت المعمارية الفائقة",
        descriptionEn: "Seating 3,000 spectators, the South Theatre features mathematically calibrated parabolic stone tiers where a whisper on the central orchestra circle carries clearly to the topmost row.",
        descriptionAr: "يتسع المسرح الجنوبي لثلاثة آلاف متفرج؛ وتتيح هندسة صفوفه الحجرية تضخيم الصوت بصورة طبيعية، بحيث يسمع الجالس في الصف الأخير صوت الهمس من مركز المنصة دون أي مكبرات صوت.",
      },
      {
        tag: "Northern Agronomy",
        titleEn: "Millennial Olive Groves and Ancient Mills",
        titleAr: "أشجار الرومي المعمرة ومطاحن الزيتون الرومانية",
        descriptionEn: "Jerash's fertile valleys are home to 'Rumi' olive trees over 1,500 years old, still pressed in local village stone mills yielding aromatic, peppery green olive oil.",
        descriptionAr: "تحتضن أودية جرش الخصبة أشجار زيتون 'رومي' معمرة يتجاوز عمرها 1500 عام، وتُعصر ثمارها حتى اليوم في معاصر حجرية تقليدية لتنتج زيتاً ذهبياً غنياً بالنكهة والفوائد الصحية.",
      },
    ],
    culinary: {
      dishEn: "Northern Heirloom Olives, Fresh Labneh & Ja'adah Bread",
      dishAr: "الزيتون الجرشي الرومي واللبنة البلدية وخبز الجعدة",
      storyEn: "Fresh cracked green olives cured with wild lemon and chili, served alongside strained goat labneh drizzled with cold-pressed olive oil and hot Taboon bread baked with fresh mountain thyme.",
      storyAr: "زيتون جرش الأخضر المكسور المخلل بالليمون والفلفل الحار، يُقدَّم إلى جانب اللبنة البلدية المدحبرة بزيت الزيتون البكر وخبز الطابون الساخن المعجون بالزعتر البري الأخضر والسمسم.",
    },
    insiderTip: {
      en: "Visit in the early morning between 8:00 and 10:00 AM when the low sun casts dramatic column shadows across the Oval Forum before the tour buses arrive.",
      ar: "ادخل الموقع الأثري بين الساعة 8:00 و 9:30 صباحاً حين ترسم أشعة الشمس المائلة ظلالاً دراماتيكية لأعمدة الساحة البيضاوية قبل وصول أفواج الزوار.",
    },
    bookings: experiences(
      "Jerash",
      "Northern Jordan guesthouses",
      "Mansaf and seasonal mezze",
      "Jerash archaeological walk",
      "/images/jerash.jpg",
    ),
  },
  {
    slug: "amman-citadel",
    name: "Amman Citadel",
    arabic: "جبل القلعة",
    governorate: { ar: "محافظة العاصمة عمان", en: "Amman Governorate" },
    quote: {
      ar: "على قمة التلال السبعة، تقف القلعة حارساً أبدياً يروي قصة سبعة آلاف عام من الحضارة.",
      en: "Seven millennia of civilizations crowned upon Amman's highest hill.",
    },
    region: "Amman · Central Jordan",
    category: "Living heritage",
    coordinates: { lat: 31.954, lng: 35.935 },
    image: "/images/citadel/citadel-main.jpg",
    hook: "One hill. Layers of civilizations.",
    subtitle: "Read the story of the capital from its oldest vantage point.",
    chapters: [
      chapter(
        "Act I · The arrival",
        "Above the city's seven hills.",
        "High atop Jabal al-Qal'a, the Citadel commands breathtaking panoramic vistas across Amman's white-stone hills and bustling downtown valleys. From ancient Bronze Age Rabbath Ammon to Roman Philadelphia and the modern metropolis, seven thousand years of history unfold beneath your feet.",
        "Jabal al-Qal’a · Amman's historic hill",
        "ربّة عمون وتاريخ التلال السبعة",
      ),
      chapter(
        "Act II · The marvel",
        "A skyline across the centuries.",
        "Colossal Roman pillars of the Temple of Hercules frame the horizon alongside the domed monumental vestibule of the Umayyad Palace and the mosaic nave of a Byzantine basilica. Differing empires and sacred traditions harmonize on one commanding promontory.",
        "Roman temple · Umayyad palace",
        "معبد هرقل وقصر الخلافة الأموي",
      ),
      chapter(
        "Act III · The living legacy",
        "Follow the city downhill.",
        "Descend ancient stone stairways toward the Roman Theater and the vibrant alleys of downtown (Al-Balad). The aroma of freshly baked sesame ka'ak, warm kunafeh bubbling with goat cheese, and the lively melodies of bustling souks bring Jordan's heritage into vibrant, joyous everyday life.",
        "Downtown Amman · Living culture",
        "حيوية البلد ورائحة الكنافة والزعتر",
      ),
    ],
    topics: [
      {
        tag: "Seven Millennia Layers",
        titleEn: "From Bronze Age Rabbath Ammon to Philadelphia",
        titleAr: "سبعة آلاف عام من الاستيطان: من ربّة عمون إلى فيلادلفيا",
        descriptionEn: "Excavations on the citadel reveal pottery from the Neolithic period (7000 BCE), Ammonite royal fortifications, Hellenistic coin hoards, and massive Roman civic infrastructure.",
        descriptionAr: "كشفت حفريات جبل القلعة عن آثار تعود للعصر الحجري الحديث (7000 ق.م)، مروراً بتحصينات العمونيين في العصر الحديدي، وحتى الميدان الروماني لعاصمة الحلف الديكابوليسي فيلادلفيا.",
      },
      {
        tag: "Gigantic Monoliths",
        titleEn: "Colossus of Hercules and Temple Sanctuaries",
        titleAr: "تمثال هرقل العملاق وسواعد الرخام المنحوتة",
        descriptionEn: "The Temple of Hercules was designed on a colossal scale; three gigantic carved marble fingers and an elbow found nearby indicate a colossal statue over 12 meters in height.",
        descriptionAr: "صُمم معبد هرقل بمقاييس إمبراطورية مهيبة؛ وتدل الأصابع الرخامية الثلاثة الضخمة ومرفق اليد المكتشف بجانبه على وجود تمثال روماني عملاق كان يتجاوز طوله 12 متراً.",
      },
      {
        tag: "Early Islamic Glory",
        titleEn: "The Umayyad Palace Monumental Hall & Cistern",
        titleAr: "القصر الأموي والقاعة الأثرية والخزان الدائري",
        descriptionEn: "Built circa 730 CE under the Umayyad caliphate, the governor's palace features a cruciform domed monumental entrance hall, ornate floral stucco carvings, and an enormous stone water reservoir.",
        descriptionAr: "بُني القصر الأموي في عهد هشام بن عبد الملك (730 م)، ويضم إيواناً صليبياً بقبة خشبية مرممة، ونقوش جصية نباتية بديعة، وخزاناً مائياً أسطوانياً بسعة آلاف الأمتار المكعبة.",
      },
      {
        tag: "Living Downtown Pulse",
        titleEn: "Al-Balad Heritage Stairs and Souk Culture",
        titleAr: "أدراج عمان التاريخية وسحر أسواق قاع المدينة",
        descriptionEn: "Stone public stairways like Kalha and Al-Kulha link the Citadel ridge to the vibrant gold, spice, and antique souks below, where Amman's authentic daily rhythm thrives.",
        descriptionAr: "تربط الأدراج التاريخية القديمة كدرج الكلحة ودرج اللويبدة قمة القلعة بأسواق قاع المدينة (البلد)، حيث تنتشر محامص التوابل، ودكاكين الفضة والتحف، ومقاهي الرصيف العريقة كقهوة السنترال.",
      },
    ],
    culinary: {
      dishEn: "Nabulsi Kunafeh with Sweet Cheese & Sesame Ka'ak",
      dishAr: "كنافة قاع المدينة العمانية الساخنة وكعك السمسم المقرمش",
      storyEn: "Fresh shredded phyllo pastry crisped over copper coals, layered with warm stretchy sweet white cheese, soaked in orange-blossom sugar syrup, and topped with vibrant crushed green pistachios.",
      storyAr: "خيوط الكنافة المحمصة فوق صواني النحاس المتقدة بجمر الفحم، محشوة بالجبن الأبيض الحلو الذائب ومسقية بقطر ماء الزهر الفواح، تعلوها رشة الفستق الحلبي الأخضر في أزقة حارة حبيبة التاريخية.",
    },
    insiderTip: {
      en: "Stand by the columns of Hercules at dusk during the evening Call to Prayer (Adhan) to hear the resonant chorus echo across all seven hills of Amman simultaneously.",
      ar: "قف بجوار أعمدة هرقل وقت أذان المغرب، لتسمع تمازج نداء الأذان وهو يتردد بانسيابية مهيبة عبر كافة تلال العاصمة السبعة في لحظة روحانية لا تُنسى.",
    },
    bookings: experiences(
      "Amman",
      "Amman boutique hotels",
      "Downtown falafel and kunafeh",
      "Citadel and downtown walking tour",
      "/images/citadel/citadel-main.jpg",
    ),
  },
  {
    slug: "dead-sea",
    name: "Dead Sea",
    arabic: "البحر الميت",
    governorate: { ar: "محافظة البلقاء", en: "Balqa Governorate" },
    quote: {
      ar: "أخفض نقطة في العالم، مياه لازوردية شفائية وبلورات ملح نحتتها الطبيعة كالجواهر.",
      en: "The lowest point on earth, where stillness, healing minerals, and dramatic salt shores meet.",
    },
    region: "Balqa · Jordan Valley",
    category: "Wild landscapes",
    coordinates: { lat: 31.72, lng: 35.58 },
    image: "/images/heritage-dead-sea.jpg",
    hook: "Find stillness at the edge of the earth.",
    subtitle: "Salt, mineral blue, and the extraordinary Jordan Rift Valley.",
    chapters: [
      chapter(
        "Act I · The arrival",
        "A different kind of horizon.",
        "Descend into the Great Rift Valley toward the lowest continental basin on earth, over 430 meters below sea level. The air grows rich and restorative as shimmering aquamarine waters meet brilliant white salt deposits, framed by the sun-baked canyon folds of the surrounding desert.",
        "Jordan Rift Valley · Hypersaline lake",
        "أخفض بقعة على وجه الأرض",
      ),
      chapter(
        "Act II · The marvel",
        "The landscape of salt.",
        "With no ocean outlet and intense desert evaporation, waters ten times saltier than the sea sculpt otherworldly salt crystals and coral-like terraces along the water's edge. Mineral-dense black mud rich in magnesium and potassium has drawn seekers of wellness and vitality since antiquity.",
        "A fragile ecosystem · A changing shoreline",
        "بلورات الملح وعجائب الطبيعة",
      ),
      chapter(
        "Act III · The living legacy",
        "Make space for the quiet.",
        "Float weightlessly on calm saline waters under a warm desert sun as all stress melts into weightlessness. As dusk settles, watch the sky and mineral water ignite in shades of deep terracotta, amber, and violet—a tranquil sanctuary of natural healing and serene contemplation.",
        "Managed shore access · Follow local guidance",
        "سكينة النفس وطقوس الشفاء الطبيعي",
      ),
    ],
    topics: [
      {
        tag: "Global Extremes",
        titleEn: "The Deepest Continental Depression on Earth",
        titleAr: "أعمق انخفاض قاري: 432 متراً تحت مستوى سطح البحر",
        descriptionEn: "Formed along the Dead Sea Transform fault line, this rift valley feature boasts 8% more atmospheric oxygen, filtered natural UV rays, and barometric pressure that calms the human nervous system.",
        descriptionAr: "تشكّل هذا الحوض على امتداد الفالق التحويلي التكتوني للبحر الميت، ويتميز بهواء أغنى بنسبة 8% بالأكسجين، وأشعة شمس مفلترة طبيعياً من الأشعة فوق البنفسجية الضارة، وضغط جوي يريح الجهاز العصبي.",
      },
      {
        tag: "Therapeutic Geochemistry",
        titleEn: "Magnesium, Bromide and Mineral Saturation",
        titleAr: "الكيمياء الجيولوجية: 34% نسبة الملوحة و21 عنصراً معدنياً",
        descriptionEn: "With 34% salinity containing rich concentrations of magnesium, calcium, potassium, and zinc, Dead Sea mud accelerates cellular healing and has treated skin conditions since King Herod's winter spas.",
        descriptionAr: "يحتوي البحر على 21 معدناً حيوياً كالمغنيسيوم والكالسيوم والبروميد والزنك؛ ويعمل طمي البحر الميت الأسود الغني بالمواد العضوية على تنشيط الدورة الدموية وتجديد خلايا البشرة منذ عهد هيرودس وكليوباترا.",
      },
      {
        tag: "Crystalline Formations",
        titleEn: "Salt Chimneys, Mushrooms and Coral Reefs",
        titleAr: "الشرفات الملحية وفطر الملح البلوري النادر",
        descriptionEn: "Super-saturated mineral evaporation crystallizes into dazzling white salt chimneys, natural crystal chandeliers, and translucent stepping terraces along wild southern coves.",
        descriptionAr: "يؤدي التبخر الشديد للمياه المشبعة بالمعادن إلى تشكل بلورات ملحية ناصعة البياض تشبه الشعاب المرجانية وأعمدة الكريستال الشفافة في الخلجان البكر الجنوبية لوادي الموجب.",
      },
      {
        tag: "Canyon Oases",
        titleEn: "Wadi Mujib Biosphere and Thermal Springs",
        titleAr: "محمية وادي الموجب والشلالات الكبريتية الساخنة",
        descriptionEn: "Just minutes from the salty shore, the towering sandstone gorge of Wadi Mujib features freshwater canyon streams, hanging gardens of ferns, and nearby thermal springs of Ma'in.",
        descriptionAr: "على بُعد دقائق من الشاطئ الملحي، يرتفع شق وادي الموجب بجرانه الصخرية الشاهقة ومياهه العذبة الجارية ونباتات السرخس المعلقة، قريباً من حمامات ماعين المعدنية الكبريتية الساخنة.",
      },
    ],
    culinary: {
      dishEn: "Jordan Valley Grilled Sea Bream with Citrus & Sumac",
      dishAr: "سمك الغور المشوي بالأعشاب البرية والليمون والسماق",
      storyEn: "Fresh sweetwater fish from the Jordan Valley river basins, seasoned with wild garlic, crushed sumac, and local pomegranate molasses, char-grilled over olive wood coals.",
      storyAr: "السمك الطازج من أحواض وادي الأردن، متبل بالثوم البلدي وزيت الزيتون والسماق البري ودبس الرمان، مشوي على جمر حطب الزيتون ومقدم مع الخضار الطازجة المزروعة في تربة الغور الخصبة.",
    },
    insiderTip: {
      en: "Apply the mineral mud fully, let it bake dry under the afternoon sun for 15 minutes, then wash it off gently in the buoyant waters for a complete thermal skin reset.",
      ar: "ضع الطين الأسود بالكامل على بشرتك ودعه يجف تحت شمس العصر لمدة 15 دقيقة، ثم اغتسله برفق في المياه المالحة لتشعر بنعومة استثنائية وانتعاش جلدي فوري.",
    },
    bookings: experiences(
      "Dead Sea Jordan",
      "Dead Sea resorts",
      "Jordan Valley dining",
      "Dead Sea shore experience",
      "/images/heritage-dead-sea.jpg",
    ),
  },
  {
    slug: "ajloun",
    name: "Ajloun",
    arabic: "عجلون",
    governorate: { ar: "محافظة عجلون", en: "Ajloun Governorate" },
    quote: {
      ar: "قلعة الربض الشامخة بين غابات السنديان، حصن صلاح الدين الحصين في وجه الغزاة.",
      en: "A medieval mountain fortress guarding emerald oak forests and ancient highland routes.",
    },
    region: "Ajloun · Northern Jordan",
    category: "Living heritage",
    coordinates: { lat: 32.325, lng: 35.727 },
    image: "/images/ajloun.jpg",
    hook: "A hilltop fortress above a sea of green.",
    subtitle:
      "Medieval stone and the quieter paths of Jordan's northern forests.",
    chapters: [
      chapter(
        "Act I · The arrival",
        "The green heart of Jordan.",
        "Rolling hills blanketed with evergreen oak, pistachio, and ancient olive groves shelter the soaring ramparts of Ajloun Castle (Qal'at ar-Rabad). Built in 1184 CE by a general of Saladin, the fortress commanded the vital routes connecting Damascus, Cairo, and the Jordan Valley.",
        "Ayyubid fortress · 12th century",
        "قلعة الربض وحصن الأيوبيين المنيع",
      ),
      chapter(
        "Act II · The marvel",
        "Built to watch the horizon.",
        "Thick stone battlements, deep moats hewn directly into bedrock, and vaulted defensive galleries demonstrate the brilliance of Islamic military engineering. From the castle's highest towers, the panoramic view stretches across the Jordan Valley toward the distant hills of the Galilee.",
        "Hilltop defences · Vaulted chambers",
        "هندسة الحصون العسكرية وأبراج المراقبة",
      ),
      chapter(
        "Act III · The living legacy",
        "Into the shade of the oaks.",
        "Follow serene hiking trails through the Ajloun Forest Reserve, where woodland breezes carry the scent of pine and wild herbs. Community kitchens and olive presses offer warm taboon bread, wild honey, and rich green olive oil, celebrating the enduring warmth of Jordanian mountain hospitality.",
        "Forest walks · Community hospitality",
        "مسارات الغابات وكرم أهل الشمال",
      ),
    ],
    topics: [
      {
        tag: "Military Fortress",
        titleEn: "Saladin's Bastion and Bedrock Moat Defense",
        titleAr: "قلعة صلاح الدين والخندق الدفاعي المحفور في الصخر",
        descriptionEn: "Commissioned by Ayyubid commander Izz al-Din Usama, the castle controlled iron mines of Ajloun, defended against Crusader garrisons from Belvoir, and maintained carrier pigeon links with Cairo and Damascus.",
        descriptionAr: "شيّد القلعة القائد عز الدين أسامة بأمر صلاح الدين الأيوبي عام 1184 م للسيطرة على مناجم الحديد في عجلون وقطع طرق الصليبيين؛ وزُوّدت بشبكة حمام زاجل ربطتها بالقاهرة ودمشق وخندق صخري بعمق 16 متراً.",
      },
      {
        tag: "Ancient Woodlands",
        titleEn: "Evergreen Oak, Carob and Wild Pistachio Reserves",
        titleAr: "محمية غابات عجلون وأشجار البلوط والخروب المعمرة",
        descriptionEn: "Spanning 13 square kilometers of protected Mediterranean forest, Ajloun Forest Reserve harbors endangered Roe Deer, wild boars, and endemic flora like the black iris and medicinal mountain sage.",
        descriptionAr: "تمتد المحمية عبر 13 كيلومتراً مربعاً من الغابات المتوسطية المورقة، وتعد موطناً لإعادة إكثار الأيل الأسمر المهدد بالانقراض، وسوسنة عجلون السوداء النادرة، والأعشاب الجبلية الطبية.",
      },
      {
        tag: "Highland Pilgrimage",
        titleEn: "Mar Elias and Byzantine Hilltop Basilicas",
        titleAr: "موقع تل مار إلياس وكنائس الفسيفساء البيزنطية",
        descriptionEn: "Believed to be the biblical Tishbe, birthplace of Prophet Elijah, the nearby hill of Mar Elias preserves one of the largest Byzantine cruciform basilicas in Jordan with intricate 6th-century floor mosaics.",
        descriptionAr: "يُعتقد أن موقع مار إلياس هو بلدة 'تشبي' مسقط رأس النبي إلياس (إيليا)؛ وتضم التلة بقايا إحدى أضخم الكنائس البيزنطية الصليبية في بلاد الشام مع أرضيات فسيفسائية هندسية تعود للقرن السادس الميلادي.",
      },
      {
        tag: "Village Cooperatives",
        titleEn: "The Soap House, Biscuit House and Calligraphy Artisans",
        titleAr: "بيت الصابون وبيت البسكويت وحرفيات المجتمع المحلي",
        descriptionEn: "Local women's cooperatives handcraft pure olive oil soaps infused with mountain lavender and mint, bake carob molasses biscuits, and welcome travelers to traditional home table feasts.",
        descriptionAr: "تدير سيدات المجتمع المحلي في عجلون مشاغل لإنتاج صابون زيت الزيتون البكر المعطر بالخزامى والنعناع، ومخابز بسكويت الخروب والدبس الطبيعي، مقدمات نموذجاً رائداً للسياحة المجتمعية المستدامة.",
      },
    ],
    culinary: {
      dishEn: "Traditional Highland Rashoof & Ja'adeh Wild Herb Flatbread",
      dishAr: "الرشوف العجلوني التراثي بالعدس واللبن المخيض",
      storyEn: "A comforting northern winter stew of local brown lentils, coarse cracked wheat, and tangy cooked yogurt, topped with caramelized wild onions, clarified ghee, and served with freshly baked Saj bread.",
      storyAr: "حساء شتوي جبلي أصيل يُطهى من العدس البلدي والقمح المجروش (الجريشة) مع اللبن المخيض الرائب، ويُسكب فوقه البصل المقلي المقرمش والسمن البلدي المعطر بالحلبة، رمز الدفء في جبال الشمال.",
    },
    insiderTip: {
      en: "Take the Roe Deer Trail in the forest reserve in mid-spring when orchids and wild cyclamens carpet the forest floor under towering oaks.",
      ar: "امشِ في 'مسار الأيل الأسمر' داخل المحمية في منتصف فصل الربيع، حين تغطي أزهار السوسنة والدحنون وعصا الراعي أرضية الغابة تحت ظلال أشجار البلوط والسنديان.",
    },
    bookings: experiences(
      "Ajloun",
      "Ajloun forest lodges",
      "Village bread and olive oil",
      "Ajloun forest walking guide",
      "/images/ajloun.jpg",
    ),
  },
  {
    slug: "umm-qais",
    name: "Umm Qais",
    arabic: "أم قيس",
    governorate: { ar: "محافظة إربد", en: "Irbid Governorate" },
    quote: {
      ar: "جدارا القديمة بحجارتها البازلتية السوداء، إطلالة على ثلاث دول ومهد الفلاسفة والشعراء.",
      en: "Ancient Gadara chiseled in black basalt, where poetry and breathtaking border vistas meet.",
    },
    region: "Irbid · Northern Jordan",
    category: "Ancient wonders",
    coordinates: { lat: 32.654, lng: 35.684 },
    image: "/images/heritage-umm-qais.jpg",
    hook: "Basalt streets with a view beyond borders.",
    subtitle: "Ancient Gadara, Ottoman homes, and the wide northern horizon.",
    chapters: [
      chapter(
        "Act I · The arrival",
        "At the meeting of landscapes.",
        "Perched high on a scenic ridge overlooking the sparkling waters of Lake Tiberias (Sea of Galilee), the Golan Heights, and the Yarmouk Gorge, ancient Gadara was revered throughout antiquity as a luminous city of poets, philosophers, and artistic refinement.",
        "Ancient Gadara · Northern Jordan",
        "جدارا مدينة الفلاسفة والشعراء",
      ),
      chapter(
        "Act II · The marvel",
        "A city in black basalt.",
        "Dark, dramatic volcanic basalt stone distinguishes Gadara from all other Greco-Roman cities of the region. Walk down the basalt-flagged Decumanus Maximus, sit within the intimate black basalt theater, and observe Ottoman stone houses constructed seamlessly above ancient Roman vaults.",
        "Basalt theatre · Ottoman village",
        "المسرح البازلتي والقرية العثمانية",
      ),
      chapter(
        "Act III · The living legacy",
        "Stay for the northern light.",
        "As sunset paints the western waters in molten gold, linger at a terrace table to taste northern village dishes prepared with fresh herbs and pressed olive oil. The words of Gadara's ancient poet Meleager still welcome every wanderer: 'If you are Syrian: Salam! To you also, peace.'",
        "Village stories · Local hosts",
        "نسيم اليرموك وأشعار مليغر الخالدة",
      ),
    ],
    topics: [
      {
        tag: "Black Basalt Architecture",
        titleEn: "The Volcanic Decumanus and Western Theatre",
        titleAr: "شارع الديكومانوس البازلتي والمسرح الأسود النادر",
        descriptionEn: "Unlike the pale limestone of Jerash, Gadara was carved from hard volcanic black basalt brought from the Golan Plateau, creating an extraordinary monochrome architectural aesthetic.",
        descriptionAr: "على خلاف حجارة جرش الجيرية البيضاء، شُيّدت جدارا من حجر البازلت الأسود البركاني الصلب المنقول من هضبة الجولان، مما منح مسارحها وشوارعها المبلطة رونقاً مهيباً فريداً من نوعه في بلاد الشام.",
      },
      {
        tag: "Decapolis Philosophy",
        titleEn: "City of Poets: Meleager, Philodemus and Menippus",
        titleAr: "حاضرة الفكر الفلسفي: مليغر وفيلوديموس ومينيبوس",
        descriptionEn: "Gadara was acclaimed as the 'Athens of the East', producing Cynic and Epicurean philosophers whose papyrus scrolls were later found preserved in the Villa of the Papyri at Herculaneum.",
        descriptionAr: "لُقبت جدارا بـ 'أثينا الشرق'؛ إذ أنجبت كبار فلاسفة العصر الهلنستي كمليغر الشاعر مؤلف الإكليل، وفيلوديموس الأبيقوري الذي عُثر على مخطوطاته في مدينة هيركولانيوم قرب بومبي في إيطاليا.",
      },
      {
        tag: "Tri-Border Vista",
        titleEn: "Panoramic View of Galilee, Golan and Yarmouk Gorge",
        titleAr: "الإطلالة البانورامية الثلاثية على بحيرة طبريا واليرموك",
        descriptionEn: "From the terrace of the Ottoman village school, travelers gaze across three international borders: the blue waters of Lake Tiberias, Mount Hermon's snowcapped peaks, and the rugged Yarmouk River valley.",
        descriptionAr: "من شرفة مدرسة القرية العثمانية العتيقة، يشاهد الزائر مشهداً جغرافياً نادراً يطل على مياه بحيرة طبريا الزرقاء، وقمم جبل الشيخ المغطاة بالثلوج، ووادي اليرموك الخالد على تخوم ثلاث دول.",
      },
      {
        tag: "Ottoman Layer",
        titleEn: "Beit Rousan and Ottoman Village Houses",
        titleAr: "بيت الروسان والعمارة القروية العثمانية التراثية",
        descriptionEn: "In the late 19th century, local families constructed picturesque vaulted stone courtyards directly atop Roman vaults using antique basalt and limestone architectural fragments.",
        descriptionAr: "في أواخر القرن التاسع عشر، بنت العائلات الجدارية كعائلة الروسان بيوتاً حجرية ذات فناءات سماوية وقناطر مقوسة فوق الأقبية الرومانية القديمة مباشرة، مستخدمة الحجارة الأثرية بتناغم معماري ساحر.",
      },
    ],
    culinary: {
      dishEn: "Northern Makmoura with Layers of Dough & Spiced Onion Chicken",
      dishAr: "المكمورة الإربدية الشمالية برقائق العجين والدجاج المتبل",
      storyEn: "A celebratory northern Jordanian dish of thin hand-stretched layers of dough interlayered with tender chicken, heaps of local onions braised in olive oil, and fragrant allspice, baked in a sealed clay pot.",
      storyAr: "الطبق التراثي الأشهر في قرى شمال الأردن؛ يتألف من طبقات متتالية من رقائق العجين المفرودة يدوياً، تُحشى بالدجاج البلدي وكميات وفيرة من البصل المكرمل بزيت الزيتون والبهارات البلدية المعطرة.",
    },
    insiderTip: {
      en: "Have dinner at sunset on the terrace of the Romero Rest House overlooking the Sea of Galilee as the evening lights turn on across the distant hills.",
      ar: "تناول وجبة العشاء عند غروب الشمس على شرفة بيت أم قيس المطلة مباشرة على بحيرة طبريا، في اللحظة التي تنعكس فيها ألوان الشفق الذهبي على صفحة المياه الساكنة.",
    },
    bookings: experiences(
      "Umm Qais",
      "Umm Qais guesthouses",
      "Northern village kitchen",
      "Gadara heritage walking tour",
      "/images/heritage-umm-qais.jpg",
    ),
  },
];

destinations.forEach((d) => {
  d.eras = destinationEras[d.slug] || [];
});

export const getDestination = (slug: string) =>
  destinations.find((destination) => destination.slug === slug);

export const projectCoordinates = ({
  lat,
  lng,
}: Destination["coordinates"]) => ({
  x: ((lng - 34.8) / 4.6) * 100,
  y: ((33.5 - lat) / 4.6) * 100,
});

export const adjacentDestinations = (destination: Destination) =>
  destinations
    .filter((d) => d.slug !== destination.slug)
    .sort(
      (a, b) =>
        Math.hypot(
          a.coordinates.lat - destination.coordinates.lat,
          a.coordinates.lng - destination.coordinates.lng,
        ) -
        Math.hypot(
          b.coordinates.lat - destination.coordinates.lat,
          b.coordinates.lng - destination.coordinates.lng,
        ),
    )
    .slice(0, 2);
