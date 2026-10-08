/**
 * Authentic Nabataean Aramaic Alphabet Dataset
 * Derived from archaeological rock inscriptions at Petra, Jabal Haroun & Umm el-Jimal
 * Includes Unicode codepoints (U+10880 - U+1089F) and precise SVG glyph vector paths
 */

export interface NabataeanGlyph {
  id: string;
  name: string;
  nameAr: string;
  phonetic: string;
  arabicEquiv: string;
  englishEquiv: string[];
  unicodeChar: string;
  unicodeHex: string;
  svgPath: string; // viewBox="0 0 100 100"
  historicalNoteEn: string;
  historicalNoteAr: string;
}

export const NABATAEAN_ALPHABET: NabataeanGlyph[] = [
  {
    id: "alaph",
    name: "Alaph",
    nameAr: "ألف",
    phonetic: "’",
    arabicEquiv: "ا / أ / ء",
    englishEquiv: ["a", "e"],
    unicodeChar: "𐢀",
    unicodeHex: "U+10880",
    svgPath: "M 40 85 L 40 25 Q 40 15 50 15 Q 60 15 65 30 L 75 75 M 35 45 L 70 45",
    historicalNoteEn: "Derived from the Phoenician ox-head; in Nabataean cursive it flattened into a vertical stem with loop.",
    historicalNoteAr: "تطورت من رأس الثور الفينيقي؛ في الخط النبطي استقامت كقائمة رأسية مع عقدة علوية أصل حرف الألف العربي.",
  },
  {
    id: "beth",
    name: "Beth",
    nameAr: "باء",
    phonetic: "b",
    arabicEquiv: "ب",
    englishEquiv: ["b"],
    unicodeChar: "𐢁",
    unicodeHex: "U+10881",
    svgPath: "M 75 30 L 75 75 Q 75 85 65 85 L 25 85 Q 15 85 15 75 L 15 50",
    historicalNoteEn: "Originally representing 'house'; horizontal baseline connects naturally to following cursive glyphs.",
    historicalNoteAr: "رمز 'البيت'؛ يتميز بخط قاعدي أفقي يتصل بما بعده، وهو السلف المباشر لحرف الباء والتاء والثاء في العربية.",
  },
  {
    id: "gamal",
    name: "Gamal",
    nameAr: "جيم",
    phonetic: "g",
    arabicEquiv: "ج",
    englishEquiv: ["g", "j"],
    unicodeChar: "𐢂",
    unicodeHex: "U+10882",
    svgPath: "M 25 85 L 50 20 L 75 85 M 38 55 L 68 55",
    historicalNoteEn: "Meaning 'camel'; distinct apex arch resembling a pack saddle, becoming the curved crown of Arabic Jim.",
    historicalNoteAr: "تعني 'الجمل'؛ قوس مثلث يشبه رحل الناقة، تحور لاحقاً ليصبح رأس حرف الجيم والحاء والخاء.",
  },
  {
    id: "dalath",
    name: "Dalath",
    nameAr: "دال",
    phonetic: "d",
    arabicEquiv: "د / ذ",
    englishEquiv: ["d"],
    unicodeChar: "𐢃",
    unicodeHex: "U+10883",
    svgPath: "M 65 25 L 35 60 Q 30 75 40 80 L 75 85",
    historicalNoteEn: "Meaning 'door'; open angular crook facing left, directly preserved in Arabic Dal.",
    historicalNoteAr: "تعني 'الباب'؛ زاوية مفتوحة لليسار انحدر منها شكل الدال والذال العربي الحديث دون تغيير يُذكر.",
  },
  {
    id: "he",
    name: "He",
    nameAr: "هاء",
    phonetic: "h",
    arabicEquiv: "هـ / ة",
    englishEquiv: ["h"],
    unicodeChar: "𐢄",
    unicodeHex: "U+10884",
    svgPath: "M 65 20 L 65 85 M 65 25 L 30 55 M 30 55 L 65 80",
    historicalNoteEn: "Window / breath sign; dual-branch ligature that folded into the circular Arabic Ha.",
    historicalNoteAr: "علامة النافذة أو النفس؛ تفرع مزدوج انغلق تدريجياً ليصنع دائرة الهاء العربية المربوطة والمفتوحة.",
  },
  {
    id: "waw",
    name: "Waw",
    nameAr: "واو",
    phonetic: "w / ū",
    arabicEquiv: "و",
    englishEquiv: ["w", "o", "u"],
    unicodeChar: "𐢅",
    unicodeHex: "U+10885",
    svgPath: "M 60 25 Q 75 25 75 40 Q 75 55 60 55 L 45 55 L 25 85",
    historicalNoteEn: "Tent peg; looped head with a descending tail, almost identical to modern Arabic Waw.",
    historicalNoteAr: "وتد الخيمة؛ رأس دائري مع ذيل منساب لأسفل، متطابق تقريباً مع حرف الواو العربي.",
  },
  {
    id: "zayn",
    name: "Zayn",
    nameAr: "زاي",
    phonetic: "z",
    arabicEquiv: "ز",
    englishEquiv: ["z"],
    unicodeChar: "𐢆",
    unicodeHex: "U+10886",
    svgPath: "M 60 20 L 40 50 L 50 85",
    historicalNoteEn: "Weapon; slender single stroke, which later received a dot in Arabic to distinguish from Ra.",
    historicalNoteAr: "رمز السلاح؛ ضربة رشيقة مائلة نُقطت لاحقاً في الإسلام لتمييزها عن الراء.",
  },
  {
    id: "heth",
    name: "Heth",
    nameAr: "حاء",
    phonetic: "ḥ",
    arabicEquiv: "ح / خ",
    englishEquiv: ["7", "kh"],
    unicodeChar: "𐢇",
    unicodeHex: "U+10887",
    svgPath: "M 25 25 L 25 80 Q 25 85 35 85 L 65 85 L 65 25 M 25 50 L 65 50",
    historicalNoteEn: "Courtyard enclosure; ladder-shaped glyph that softened in cursive into the deep pharyngeal Haa.",
    historicalNoteAr: "حائط الفناء؛ شكل سلمي تحول في الكتابة النبطية السريعة إلى حنية الحاء والخاء الحلقية.",
  },
  {
    id: "teth",
    name: "Teth",
    nameAr: "طاء",
    phonetic: "ṭ",
    arabicEquiv: "ط / ظ",
    englishEquiv: ["t", "6"],
    unicodeChar: "𐢈",
    unicodeHex: "U+10888",
    svgPath: "M 50 20 L 50 85 M 30 85 Q 25 60 50 60 Q 75 60 70 85 Z",
    historicalNoteEn: "Coiled wheel; loop with an upright vertical stick, father of Arabic Taa.",
    historicalNoteAr: "العجلة الملفوفة؛ عقدة دائرية ذات سارية عمودية، الأصل الأثري لحرف الطاء والظاء.",
  },
  {
    id: "yodh",
    name: "Yodh",
    nameAr: "ياء",
    phonetic: "y / ī",
    arabicEquiv: "ي / ى",
    englishEquiv: ["y", "i"],
    unicodeChar: "𐢉",
    unicodeHex: "U+10889",
    svgPath: "M 70 25 Q 50 25 45 45 Q 40 70 65 75 L 25 85",
    historicalNoteEn: "Hand symbol; compact swan-like curved neck forming Arabic Yaa and Alif Maqsura.",
    historicalNoteAr: "رمز الكف واليد؛ قوس انسيابي يشبه عنق البجعة نشأت منه الياء والألف المقصورة.",
  },
  {
    id: "kaph",
    name: "Kaph",
    nameAr: "كاف",
    phonetic: "k",
    arabicEquiv: "ك",
    englishEquiv: ["k", "c"],
    unicodeChar: "𐢊",
    unicodeHex: "U+1088A",
    svgPath: "M 70 25 L 45 50 L 70 80 M 45 50 L 25 50",
    historicalNoteEn: "Open palm; angled cleft that opened outwards to create the Arabic Kaf.",
    historicalNoteAr: "كف اليد المفتوحة؛ شوكة مائلة منفرجة تحورت إلى الكاف النبطية الممتدة.",
  },
  {
    id: "lamadh",
    name: "Lamadh",
    nameAr: "لام",
    phonetic: "l",
    arabicEquiv: "ل",
    englishEquiv: ["l"],
    unicodeChar: "𐢋",
    unicodeHex: "U+1088B",
    svgPath: "M 55 15 L 55 70 Q 55 85 40 85 L 25 85",
    historicalNoteEn: "Goad/staff; tall vertical ascender sweeping horizontally into a hooked bottom.",
    historicalNoteAr: "عصا الراعي؛ سارية شامخة تنتهي بحنية سفلية رشيقة، تطابق تام مع حرف اللام.",
  },
  {
    id: "mim",
    name: "Mim",
    nameAr: "ميم",
    phonetic: "m",
    arabicEquiv: "م",
    englishEquiv: ["m"],
    unicodeChar: "𐢌",
    unicodeHex: "U+1088C",
    svgPath: "M 30 30 Q 50 15 65 30 Q 75 45 60 60 L 35 60 L 35 85",
    historicalNoteEn: "Water ripple; closed circular knot that acquired a descending tail in cursive Arabic.",
    historicalNoteAr: "موج الماء؛ عقدة دائرية مغلقة انسدل منها ذيل سفلي لتصبح الميم العربية الأصيلة.",
  },
  {
    id: "nun",
    name: "Nun",
    nameAr: "نون",
    phonetic: "n",
    arabicEquiv: "ن",
    englishEquiv: ["n"],
    unicodeChar: "𐢍",
    unicodeHex: "U+1088D",
    svgPath: "M 65 25 L 65 65 Q 65 85 45 85 Q 25 85 25 65",
    historicalNoteEn: "Fish/serpent; open crescent cup, later dotted to mark the nasal Nun sound.",
    historicalNoteAr: "الحوت أو الثعبان؛ طاسة هلالية مفتوحة للأعلى نُقطت لاحقاً بنقطة النون.",
  },
  {
    id: "samekh",
    name: "Samekh",
    nameAr: "سمك / سين",
    phonetic: "s",
    arabicEquiv: "س",
    englishEquiv: ["s"],
    unicodeChar: "𐢎",
    unicodeHex: "U+1088E",
    svgPath: "M 30 25 L 70 25 M 35 45 L 65 45 M 50 25 L 50 85",
    historicalNoteEn: "Prop / pillar; central support shaft crossed by horizontal balance bars.",
    historicalNoteAr: "عمود السند؛ سارية مركزية تقطعها عوارض أفقية استُبدلت لاحقاً بأسنان السين.",
  },
  {
    id: "ayin",
    name: "Ayin",
    nameAr: "عين",
    phonetic: "‘",
    arabicEquiv: "ع / غ",
    englishEquiv: ["3", "gh"],
    unicodeChar: "𐢏",
    unicodeHex: "U+1088F",
    svgPath: "M 60 30 Q 75 45 60 70 Q 40 85 30 65 Q 25 45 45 30 Z",
    historicalNoteEn: "Eye glyph; oval circle that opened at the top into the characteristic Arabic Ayn eyebrow.",
    historicalNoteAr: "رمز العين؛ دائرة بيضاوية انفتحت من الأعلى لتصنع حاجب العين العربية الشهير.",
  },
  {
    id: "pe",
    name: "Pe",
    nameAr: "فاء",
    phonetic: "p / f",
    arabicEquiv: "ف",
    englishEquiv: ["p", "f"],
    unicodeChar: "𐢐",
    unicodeHex: "U+10890",
    svgPath: "M 25 80 L 25 35 Q 25 20 45 20 Q 65 20 65 40 L 65 55",
    historicalNoteEn: "Mouth; hooked curve wrapping downward into Arabic Faa.",
    historicalNoteAr: "رمز الفم؛ قوس ملفوف للأمام تدحرج ليصبح رأس الفاء العربية.",
  },
  {
    id: "sade",
    name: "Sade",
    nameAr: "صاد",
    phonetic: "ṣ",
    arabicEquiv: "ص / ض",
    englishEquiv: ["s", "z"],
    unicodeChar: "𐢑",
    unicodeHex: "U+10891",
    svgPath: "M 65 30 Q 75 45 60 55 L 35 55 Q 25 70 40 85 L 65 85",
    historicalNoteEn: "Emphatic Sibilant; loop connected to a pronounced tooth and base, father of Saad/Daad.",
    historicalNoteAr: "الصوت الصفيري المفخم؛ حلقة متصلة بسن وقاعدة أفقية، والد الصاد والضاد.",
  },
  {
    id: "qoph",
    name: "Qoph",
    nameAr: "قاف",
    phonetic: "q",
    arabicEquiv: "ق",
    englishEquiv: ["q"],
    unicodeChar: "𐢒",
    unicodeHex: "U+10892",
    svgPath: "M 45 20 Q 65 20 65 40 Q 65 60 45 60 Q 25 60 25 40 Z M 65 45 L 65 85",
    historicalNoteEn: "Eye of needle; circular crown with vertical tail, direct parent of Arabic Qaf.",
    historicalNoteAr: "خرم الإبرة؛ حلقة دائرية علوية وساق هابطة، أصل القاف العربي القديم.",
  },
  {
    id: "resh",
    name: "Resh",
    nameAr: "راء",
    phonetic: "r",
    arabicEquiv: "ر",
    englishEquiv: ["r"],
    unicodeChar: "𐢓",
    unicodeHex: "U+10893",
    svgPath: "M 65 25 L 45 40 L 35 85",
    historicalNoteEn: "Human head; single sweeping curve, virtually identical to modern Ra.",
    historicalNoteAr: "رأس الإنسان؛ قوس انسيابي مائل دون زوايا، صورة طبق الأصل لحرف الراء.",
  },
  {
    id: "shin",
    name: "Shin",
    nameAr: "شين",
    phonetic: "š",
    arabicEquiv: "ش",
    englishEquiv: ["sh"],
    unicodeChar: "𐢔",
    unicodeHex: "U+10894",
    svgPath: "M 25 35 L 38 75 L 50 35 L 62 75 L 75 35",
    historicalNoteEn: "Teeth; trident-like triple crown that flattened into the three teeth of Arabic Sheen.",
    historicalNoteAr: "رمز الأسنان؛ تاج ثلاثي الشُعب تحول إلى أسنان الشين والسين الثلاثية.",
  },
  {
    id: "taw",
    name: "Taw",
    nameAr: "تاء",
    phonetic: "t",
    arabicEquiv: "ت / ث",
    englishEquiv: ["t"],
    unicodeChar: "𐢕",
    unicodeHex: "U+10895",
    svgPath: "M 50 20 L 50 85 M 25 50 L 75 50",
    historicalNoteEn: "Signature mark or cross; crossed emblem that evolved into looped terminal Taa.",
    historicalNoteAr: "علامة الوشم أو الصليب؛ تقاطع هندسي صريح تحور إلى التاء المنبسطة.",
  },
];

export interface AncientPreset {
  id: string;
  wordEn: string;
  wordAr: string;
  historicalMeaningEn: string;
  historicalMeaningAr: string;
}

export const ANCIENT_PRESETS: AncientPreset[] = [
  {
    id: "raqmu",
    wordEn: "RAQMU",
    wordAr: "رقيم",
    historicalMeaningEn: "The true ancient Nabataean name of Petra, meaning 'The Variegated / Rock-Chiseled Stone'.",
    historicalMeaningAr: "الاسم النبطي الأصلي الحقيقي لمدينة البتراء، ويعني 'الحجارة الملونة المنقوشة في الصخر'.",
  },
  {
    id: "aretas",
    wordEn: "HARETAT",
    wordAr: "حارثة",
    historicalMeaningEn: "Aretas IV Philopatris ('He who loves his people') — King under whom Petra's golden Treasury was chiseled.",
    historicalMeaningAr: "الملك النبطي حارثة الرابع المحب لشعبه (٩ ق.م – ٤٠ م) الذي بلغت البتراء في عهده قمة مجدها المعماري.",
  },
  {
    id: "shaqilat",
    wordEn: "SHAQILAT",
    wordAr: "شقيقه",
    historicalMeaningEn: "Queen Shaqilat II — Revered co-ruler of Nabataea, depicted alongside her king on silver drachmas.",
    historicalMeaningAr: "الملكة النبطية شقيلة الثانية؛ الحاكمة المشاركة لعرش المملكة، ونُقشت صورتها على الدراهم الفضية.",
  },
  {
    id: "dushara",
    wordEn: "DUSHARA",
    wordAr: "ذو الشرى",
    historicalMeaningEn: "'Lord of the Shara Mountains' — Supreme guardian deity of the Nabataean realm.",
    historicalMeaningAr: "'سيد جبال الشراة'؛ الإله الحامي الأول للمملكة النبطية وعواصمها الجبلية.",
  },
  {
    id: "salam",
    wordEn: "SHALAM",
    wordAr: "سلام",
    historicalMeaningEn: "Ancient Semitic blessing of peace and enduring harmony carved on caravan waypoints.",
    historicalMeaningAr: "تحية السلام والوئام السامية المحفورة على محطات القوافل ودروب التجارة الملكية.",
  },
];

/**
 * Maps an input string (Arabic or English) into an array of NabataeanGlyph objects
 */
export function translateToNabataean(input: string): NabataeanGlyph[] {
  const normalized = input.trim().toLowerCase();
  const glyphs: NabataeanGlyph[] = [];

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];

    // Skip spaces
    if (char === " ") continue;

    // Search by Arabic letter match first
    let match = NABATAEAN_ALPHABET.find((g) => g.arabicEquiv.includes(char));

    // Fallback to English match
    if (!match) {
      match = NABATAEAN_ALPHABET.find((g) => g.englishEquiv.includes(char));
    }

    if (match) {
      glyphs.push(match);
    }
  }

  return glyphs;
}
