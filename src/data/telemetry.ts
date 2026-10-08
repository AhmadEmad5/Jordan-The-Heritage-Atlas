export interface DestinationTelemetry {
  slug: string;
  elevation: {
    meters: number;
    feet: number;
    en: string;
    ar: string;
  };
  bortleScale: number; // 1 (Primal Dark Sky) to 9 (Inner City)
  bortleName: {
    en: string;
    ar: string;
  };
  skyClarityPct: number;
  stargazingRating: {
    en: string;
    ar: string;
  };
  bestSeason: {
    en: string;
    ar: string;
  };
  temperatureRange: {
    en: string;
    ar: string;
  };
  celestialHighlight: {
    en: string;
    ar: string;
  };
  astronomicalTip: {
    en: string;
    ar: string;
  };
}

export const DESTINATION_TELEMETRY: Record<string, DestinationTelemetry> = {
  petra: {
    slug: "petra",
    elevation: {
      meters: 900,
      feet: 2950,
      en: "900m / 2,950 ft above sea level",
      ar: "٩٠٠م فوق سطح البحر · مرتفعات الشراة",
    },
    bortleScale: 3,
    bortleName: {
      en: "Class 3 · Rural Sky",
      ar: "الفئة ٣ · سماء ريفية صافية",
    },
    skyClarityPct: 92,
    stargazingRating: {
      en: "Exceptional night sky clarity over sandstone canyons",
      ar: "صفاء استثنائي فوق الجبال الصخرية والسيق",
    },
    bestSeason: {
      en: "March – May & September – November",
      ar: "آذار – أيار وتشرين الأول – تشرين الثاني",
    },
    temperatureRange: {
      en: "12°C – 26°C (Chilly desert nights)",
      ar: "١٢°م – ٢٦°م (ليالٍ جبلية مائلة للبرودة)",
    },
    celestialHighlight: {
      en: "Milky Way galactic core arching over the Monastery (Ad-Deir)",
      ar: "قوس درب التبانة متلألئاً فوق واجهة الدير المنحوت",
    },
    astronomicalTip: {
      en: "The narrow gorges of the Siq block ground scatter, making zenith stars intensely brilliant.",
      ar: "تساعد جدران السيق الشاهقة على حجب أضواء المحيط مما يمنح النجوم لمعاناً نقياً في سماء الوادي.",
    },
  },

  "wadi-rum": {
    slug: "wadi-rum",
    elevation: {
      meters: 1000,
      feet: 3280,
      en: "1,000m / 3,280 ft high desert plateau",
      ar: "١,٠٠٠م هضبة صحراوية مرتفعة",
    },
    bortleScale: 1,
    bortleName: {
      en: "Class 1 · Primal Dark Sky Sanctuary",
      ar: "الفئة ١ · محمية سماء مظلمة بكر تماماً",
    },
    skyClarityPct: 99,
    stargazingRating: {
      en: "World-Class · Near-zero light pollution",
      ar: "عالمي بامتياز · انعدام تام للتلوث الضوئي",
    },
    bestSeason: {
      en: "All year (Prime celestial core: April – October)",
      ar: "طوال العام (ذروة المجرة: نيسان – تشرين الأول)",
    },
    temperatureRange: {
      en: "6°C – 34°C (Significant day-night swings)",
      ar: "٦°م – ٣٤°م (فارق حراري صحراوي واسع)",
    },
    celestialHighlight: {
      en: "Full Zodiacal Light, Andromeda Galaxy, and Galactic Core",
      ar: "الضوء البروجي، مجرة أندروميدا ومركز درب التبانة بالعين المجردة",
    },
    astronomicalTip: {
      en: "Wadi Rum’s silica sand absorbs minimal ambient radiation, keeping night air remarkably stable for telescope astrophotography.",
      ar: "رمال وادي رم النقية لا تعكس أي تشتت حراري ليلي، مما يجعل الهواء فائق الاستقرار للتصوير الفلكي التلسكوبي.",
    },
  },

  "dead-sea": {
    slug: "dead-sea",
    elevation: {
      meters: -430,
      feet: -1410,
      en: "-430m / -1,410 ft (Lowest land point on Earth)",
      ar: "-٤٣٠م أدنى بقعة على سطح كوكب الأرض",
    },
    bortleScale: 3,
    bortleName: {
      en: "Class 3 · Valley Basin Horizon",
      ar: "الفئة ٣ · حوض غوري فريد",
    },
    skyClarityPct: 88,
    stargazingRating: {
      en: "High atmospheric barometric pressure (+4.8% extra oxygen)",
      ar: "ضغط جوي مرتفع مع أكسجين نقي بنسبة ٤.٨٪ إضافية",
    },
    bestSeason: {
      en: "October – April (Warm winter refuge)",
      ar: "تشرين الأول – نيسان (دفء شتوي فريد)",
    },
    temperatureRange: {
      en: "18°C – 38°C (Pleasantly mild winters)",
      ar: "١٨°م – ٣٨°م (شتاء دافئ معتدل ولطيف)",
    },
    celestialHighlight: {
      en: "Planetary reflections and moonlit mirror over mineral salt formations",
      ar: "انعكاس القمر وتلألؤ الكواكب على مرايا التكوينات الملحية",
    },
    astronomicalTip: {
      en: "The extra atmospheric cushion naturally filters harmful UV rays, creating soft sunset gradients unseen anywhere else.",
      ar: "طبقة الغلاف الجوي الإضافية لعمق الحوض ترشح الأشعة وتخلق ألوان شفق غروب فريدة لا مثيل لها.",
    },
  },

  jerash: {
    slug: "jerash",
    elevation: {
      meters: 600,
      feet: 1970,
      en: "600m / 1,970 ft Decapolis foothills",
      ar: "٦٠٠م سفوح تلال الديكابولس",
    },
    bortleScale: 4,
    bortleName: {
      en: "Class 4 · Mediterranean Inland",
      ar: "الفئة ٤ · تلال أثرية متوسطية",
    },
    skyClarityPct: 86,
    stargazingRating: {
      en: "Atmospheric alignment over Roman colonnades",
      ar: "إطلالة سماوية ساحرة فوق الأعمدة الرومانية",
    },
    bestSeason: {
      en: "March – June & September – November",
      ar: "آذار – حزيران وتشرين الأول – تشرين الثاني",
    },
    temperatureRange: {
      en: "13°C – 29°C (Mediterranean climate)",
      ar: "١٣°م – ٢٩°م (مناخ متوسطي معتدل)",
    },
    celestialHighlight: {
      en: "Orion & Sirius rising over the Oval Forum and Temple of Artemis",
      ar: "صعود كوكبة الجبار ونجم الشعرى اليمانية فوق معبد أرتميس والساحة البيضاوية",
    },
    astronomicalTip: {
      en: "The ancient north-south Cardo Maximus mirrors classical celestial cardinal alignments.",
      ar: "يمتد شارع الكاردو الروماني باتجاه شمالي-جنوبي هندسي يطابق خطوط الرصد الفلكي الكلاسيكية.",
    },
  },

  ajloun: {
    slug: "ajloun",
    elevation: {
      meters: 1100,
      feet: 3600,
      en: "1,100m / 3,600 ft northern highland summit",
      ar: "١,١٠٠م قمم جبال الشمال الخضراء",
    },
    bortleScale: 3,
    bortleName: {
      en: "Class 3 · Highland Forest Reserve",
      ar: "الفئة ٣ · محمية غابات جبلية",
    },
    skyClarityPct: 91,
    stargazingRating: {
      en: "Cool mountain air with panoramic Jordan Valley views",
      ar: "هواء جبلي عليل ورؤية بانورامية لغور الأردن",
    },
    bestSeason: {
      en: "April – October (Lush greenery and cool breezes)",
      ar: "نيسان – تشرين الأول (غطاء غابي منعش وهواء لطيف)",
    },
    temperatureRange: {
      en: "10°C – 26°C (Refreshing mountain refuge)",
      ar: "١٠°م – ٢٦°م (ملاذ صيفي معتدل)",
    },
    celestialHighlight: {
      en: "Polaris & Ursa Major pinned directly above the Saladin Citadel ramparts",
      ar: "نجم القطب ومجموعة الدب الأكبر تعلو أبراج قلعة صلاح الدين الأيوبي",
    },
    astronomicalTip: {
      en: "Highland pine canopy naturally mitigates daytime haze, delivering pristine twilight transparency.",
      ar: "تساعد غابات السنديان والبلوط في تنقية الأفق الهوائي لمنح شفق مسائي شديد النقاء.",
    },
  },

  dana: {
    slug: "dana",
    elevation: {
      meters: 1500,
      feet: 4920,
      en: "1,500m to 50m (Four biogeographic zones)",
      ar: "١,٥٠٠م إلى ٥٠م (تدرج ٤ أقاليم حيوية)",
    },
    bortleScale: 2,
    bortleName: {
      en: "Class 2 · Pristine Biosphere Night",
      ar: "الفئة ٢ · محمية طبيعية نقية ومظلمة",
    },
    skyClarityPct: 97,
    stargazingRating: {
      en: "Exceptional rift valley silence and dark skies",
      ar: "سكون وادي عربة وظلمة برية استثنائية",
    },
    bestSeason: {
      en: "March – May & October – December",
      ar: "آذار – أيار وتشرين الأول – كانون الأول",
    },
    temperatureRange: {
      en: "8°C – 28°C (Clean mountain wilderness)",
      ar: "٨°م – ٢٨°م (هواء بري منعش ونظيف)",
    },
    celestialHighlight: {
      en: "Summer Triangle and Sagittarius arm spanning the sandstone ridge",
      ar: "مثلث الصيف وذراع القوس ممتداً فوق جروف وادي ضانا الصخرية",
    },
    astronomicalTip: {
      en: "Dana's eco-lodges enforce total candlelit night protocols, protecting true biological night vision.",
      ar: "تعتمد نزل ضانا البيئية الإضاءة بالشموع فقط ليلاً، مما يحافظ على التكيف الطبيعي للعين لرؤية النجوم.",
    },
  },

  "umm-qais": {
    slug: "umm-qais",
    elevation: {
      meters: 380,
      feet: 1250,
      en: "380m / 1,250 ft basalt promontory",
      ar: "٣٨٠م نتوء بازلتي مشرف على اليرموك",
    },
    bortleScale: 3,
    bortleName: {
      en: "Class 3 · Trilateral Vista Ridge",
      ar: "الفئة ٣ · إطلالة مثلثة على اليرموك وطبريا",
    },
    skyClarityPct: 89,
    stargazingRating: {
      en: "Panoramic 360° western horizon viewing",
      ar: "أفق غربي مفتوح ٣٦٠ درجة لرصد الغروب والشهب",
    },
    bestSeason: {
      en: "February – May (Spring wildflowers across ruins)",
      ar: "شباط – أيار (موسم الربيع والزهور البرية)",
    },
    temperatureRange: {
      en: "14°C – 28°C (Gentle northern breezes)",
      ar: "١٤°م – ٢٨°م (نسيم شمالي عليل)",
    },
    celestialHighlight: {
      en: "Evening star Venus and twilight meteor showers across the Sea of Galilee",
      ar: "كوكب الزهرة وزخات الشهب فوق مياه بحيرة طبريا وهضبة الجولان",
    },
    astronomicalTip: {
      en: "The black basalt stone theater holds daytime warmth, offering comfortable nocturnal gazing benches.",
      ar: "حجارة البازلت الأسود للمدرج الروماني تحفظ الدفء وتوفر مدرجاً مريحاً للرصد الفلكي الليلي.",
    },
  },
};

export function getDestinationTelemetry(slug: string): DestinationTelemetry {
  return DESTINATION_TELEMETRY[slug] || DESTINATION_TELEMETRY["wadi-rum"];
}
