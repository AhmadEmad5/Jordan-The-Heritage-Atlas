/**
 * Astronomical Solar & Golden Hour Telemetry Engine for Jordanian Coordinates
 * Standardized to Jordan Time (UTC+3, Asia/Amman)
 */

export interface SolarTelemetryResult {
  sunrise: string;
  sunset: string;
  solarNoon: string;
  morningGoldenHour: { start: string; end: string };
  eveningGoldenHour: { start: string; end: string };
  blueHourDawn: { start: string; end: string };
  blueHourDusk: { start: string; end: string };
  sunAltitudeDeg: number;
  sunAzimuthDeg: number;
  dayLengthMinutes: number;
  currentPhase:
    | "night"
    | "blue-hour-dawn"
    | "golden-hour-morning"
    | "daylight"
    | "golden-hour-evening"
    | "blue-hour-dusk";
  progressPct: number; // 0 to 100 representing sun journey from dawn to dusk
  countdown: {
    eventEn: string;
    eventAr: string;
    hours: number;
    minutes: number;
  };
}

export interface DestinationPhotoGuidance {
  primaryWindowEn: string;
  primaryWindowAr: string;
  lensRecommendationEn: string;
  lensRecommendationAr: string;
  facadeAngleEn: string;
  facadeAngleAr: string;
  curatorTipEn: string;
  curatorTipAr: string;
}

export const PHOTO_GUIDANCE: Record<string, DestinationPhotoGuidance> = {
  petra: {
    primaryWindowEn: "08:30 – 10:15 AM & 04:30 – 05:45 PM",
    primaryWindowAr: "٠٨:٣٠ – ١٠:١٥ صباحاً و ٠٤:٣٠ – ٠٥:٤٥ مساءً",
    lensRecommendationEn: "24-70mm f/2.8 & Ultra-wide 14-24mm for the Siq fissure",
    lensRecommendationAr: "عدسة ٢٤-٧٠ ملم مع عدسة فائقة الاتساع ١٤-٢٤ ملم للسيق",
    facadeAngleEn: "Al-Khazneh (Treasury) faces east; morning sun penetrates the canyon directly at 38° elevation.",
    facadeAngleAr: "واجهة الخزنة تتجه شرقاً؛ أشعة الصباح تخترق السيق رأسياً بزاوية ٣٨ درجة لتضيء الحجر الوردي.",
    curatorTipEn: "At 09:00 AM sharp, the canyon floor is shaded while the urn and Corinthian pediment glow like burning embers.",
    curatorTipAr: "عند الساعة التاسعة صباحاً تماماً، يبقى قاع الوادي في الظل بينما تتوهج القمة المنحوتة بألوان الياقوت.",
  },
  "wadi-rum": {
    primaryWindowEn: "Golden Hour (1 hr before sunset) & Galactic Core (22:00 – 03:00)",
    primaryWindowAr: "الساعة الذهبية (قبل الغروب بساعة) وذروة المجرة (١٠ ليلاً – ٣ فجراً)",
    lensRecommendationEn: "14mm f/1.8 or 20mm f/1.4 Prime for Bortle-1 Milky Way",
    lensRecommendationAr: "عدسة واسعة وسريعة ١٤ ملم أو ٢٠ ملم بفتحة f/1.8 لتوثيق درب التبانة",
    facadeAngleEn: "Low raking side-light carves 3D ripple textures into the crimson iron sands of Umm Ishrin.",
    facadeAngleAr: "الضوء الجانبي المنخفض يرسم تموجات الرمال الحمراء وظلال الكتل الصخرية في أم عشرين.",
    curatorTipEn: "Arrive at Khazali canyon 45 minutes prior to sunset to capture the sandstone monolith turning from ochre to fiery scarlet.",
    curatorTipAr: "احرص على التواجد قرب جبل الخزعلي قبل ٤٥ دقيقة من الغروب لمشاهدة تحول الجبال من المغرة إلى القرمزي المتوهج.",
  },
  "dead-sea": {
    primaryWindowEn: "Blue Hour Dusk (15 – 45 min after sunset)",
    primaryWindowAr: "الساعة الزرقاء (١٥ – ٤٥ دقيقة بعد غروب الشمس)",
    lensRecommendationEn: "16-35mm with Circular Polarizer to cut mineral glare",
    lensRecommendationAr: "عدسة ١٦-٣٥ ملم مع فلتر استقطاب لإبراز البلورات الملحية تحت الماء",
    facadeAngleEn: "Reflections across hyper-saline mirror pools catch pastel lilac and rose sky gradients over the western ridge.",
    facadeAngleAr: "مرايا الملح الصافي تعكس تدرجات السماء الوردية والبنفسجية فوق جبال الشاطئ الغربي.",
    curatorTipEn: "Shoot low to the shoreline to catch backlight through translucent crystalline salt stalactites.",
    curatorTipAr: "اخفض زاوية الكاميرا بمحاذاة التكوينات الملحية لإظهار نقاء بلورات الملح مع الضوء المنكسر.",
  },
  jerash: {
    primaryWindowEn: "15:30 – 17:15 PM (Late Golden Afternoon)",
    primaryWindowAr: "٠٣:٣٠ – ٠٥:١٥ عصراً (أواخر العصر الذهبي)",
    lensRecommendationEn: "35mm / 50mm Prime for architectural Corinthian capitals",
    lensRecommendationAr: "عدسة ثابتة ٣٥ ملم أو ٥٠ ملم لالتقاط تيجان الأعمدة الكورنثية ونقوشها",
    facadeAngleEn: "Low sun strikes the Oval Plaza obliquely, casting long dramatic column shadows across the Cardo limestone paving.",
    facadeAngleAr: "تسقط الشمس المائلة على الساحة البيضاوية لتلقي ظلالاً مهيبة للأعمدة عبر حجارة الكاردو الروماني.",
    curatorTipEn: "Stand at the Temple of Artemis portico during the last 20 minutes before sunset to capture the warm amber fluting.",
    curatorTipAr: "قف عند رواق معبد أرتميس في آخر ٢٠ دقيقة قبل الغروب لتوثيق توهج الرخام العسلي مع أشعة الغروب.",
  },
  ajloun: {
    primaryWindowEn: "06:45 – 08:30 AM (Morning Oak Forest Mist)",
    primaryWindowAr: "٠٦:٤٥ – ٠٨:٣٠ صباحاً (ضباب الصباح فوق غابات السنديان)",
    lensRecommendationEn: "70-200mm Telephoto for castle battlements & mountain layers",
    lensRecommendationAr: "عدسة تقريب ٧٠-٢٠٠ ملم لتوثيق طبقات الجبال وقلعة الربض فوق السحاب",
    facadeAngleEn: "Qal'at ar-Rabad fortress perches at 1,023m, catching first dawn light over the Jordan Rift Valley.",
    facadeAngleAr: "تربض قلعة الربض على ارتفاع ١٠٢٣م وتستقبل أولى خيوط الفجر الذهبي المشرف على غور الأردن.",
    curatorTipEn: "Autumn mornings create dramatic sea-of-clouds phenomena below the fortress walls.",
    curatorTipAr: "تخلق صباحات الخريف والربيع بحراً ساحراً من الضباب يحيط بأسوار القلعة كجزيرة تاريخية معلقة.",
  },
  "umm-qais": {
    primaryWindowEn: "Sunset Vista (30 min prior to sunset through civil dusk)",
    primaryWindowAr: "إطلالة الغروب (٣٠ دقيقة قبل الغروب حتى الشفق المدني)",
    lensRecommendationEn: "24-105mm for black basalt theatre foreground & Lake Tiberias vista",
    lensRecommendationAr: "عدسة ٢٤-١٠٥ ملم تجمع بين أعمدة البازلت السوداء وبحيرة طبريا في الخلفية",
    facadeAngleEn: "West-facing basilica columns frame the sun setting directly over the Sea of Galilee and Mount Hermon.",
    facadeAngleAr: "أعمدة البازلت السوداء الغربية تؤطر قرص الشمس وهو يغيب مباشرة فوق مياه بحيرة طبريا وهضبة الجولان.",
    curatorTipEn: "The contrast between jet-black volcanic basalt and golden sunset water creates an unforgettable painterly palette.",
    curatorTipAr: "التباين بين حجارة البازلت البركانية السوداء وانعكاس الغروب الذهبي على البحيرة يمنح كادراً تشكيلياً نادراً.",
  },
  dana: {
    primaryWindowEn: "16:45 – 18:15 PM (Canyon Rim Haze)",
    primaryWindowAr: "٠٤:٤٥ – ٠٦:١٥ مساءً (الشفق الذهبي فوق حافة الوادي السحيق)",
    lensRecommendationEn: "Wide 16-35mm + Graduated ND filter for high dynamic range",
    lensRecommendationAr: "عدسة واسعة ١٦-٣٥ ملم مع فلتر تدرج ND لمعادلة الضوء الساطع بين القمة والوادي",
    facadeAngleEn: "The 1,500m elevation drop catches side-illumination as warm desert air rises from Wadi Araba.",
    facadeAngleAr: "الانحدار الهائل البالغ ١٥٠٠م يلتقط الضوء الجانبي الدافئ الصاعد من أودية وادي عربة.",
    curatorTipEn: "Position near the stone terraced village of Dana for authentic sandstone mud-brick silhouettes.",
    curatorTipAr: "اتخذ موقعك قرب بيوت قرية دانا الحجرية العتيقة لتوثيق ظلال القرية المعلقة في الأفق.",
  },
};

/**
 * Approximate astronomical solar calculations for coordinate + date
 */
export function calculateSolarTelemetry(
  lat: number,
  lng: number,
  date: Date = new Date()
): SolarTelemetryResult {
  // Day of year
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Solar declination (degrees & radians)
  const declinationDeg =
    -23.44 * Math.cos(((360 / 365) * (dayOfYear + 10) * Math.PI) / 180);
  const declinationRad = (declinationDeg * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;

  // Equation of time in minutes
  const B = ((360 / 365) * (dayOfYear - 81) * Math.PI) / 180;
  const equationOfTimeMin =
    9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);

  // Solar noon in local Jordan time (UTC+3 => 45 degrees longitude reference)
  // Time offset = 4 * (longitude - 45) + EoT
  const timeOffsetMin = 4 * (lng - 45) + equationOfTimeMin;
  const solarNoonMin = 12 * 60 - timeOffsetMin;

  // Hour angle for sunrise/sunset (zenith angle 90.833° for refraction)
  const zenithRad = (90.833 * Math.PI) / 180;
  const cosHourAngle =
    (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(declinationRad)) /
    (Math.cos(latRad) * Math.cos(declinationRad));

  // Clamp for polar edge cases (not applicable in Jordan, but safe)
  const clampedCosHA = Math.max(-1, Math.min(1, cosHourAngle));
  const hourAngleDeg = (Math.acos(clampedCosHA) * 180) / Math.PI;
  const halfDayMin = hourAngleDeg * 4;

  const sunriseMin = solarNoonMin - halfDayMin;
  const sunsetMin = solarNoonMin + halfDayMin;
  const dayLengthMin = Math.round(halfDayMin * 2);

  // Golden hours and Blue hours
  const morningGoldenStart = sunriseMin;
  const morningGoldenEnd = sunriseMin + 55;

  const eveningGoldenStart = sunsetMin - 55;
  const eveningGoldenEnd = sunsetMin;

  const blueHourDawnStart = sunriseMin - 35;
  const blueHourDawnEnd = sunriseMin - 10;

  const blueHourDuskStart = sunsetMin + 10;
  const blueHourDuskEnd = sunsetMin + 35;

  const formatMin = (m: number): string => {
    let normalized = Math.round(m);
    while (normalized < 0) normalized += 1440;
    while (normalized >= 1440) normalized -= 1440;
    const hrs = Math.floor(normalized / 60);
    const mins = normalized % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  // Current minutes in Jordan local time
  // Jordan is UTC+3
  const utcHours = date.getUTCHours();
  const utcMins = date.getUTCMinutes();
  const currentJordanMin = (utcHours + 3) * 60 + utcMins;

  // Calculate current sun altitude & phase
  let currentPhase: SolarTelemetryResult["currentPhase"] = "night";
  if (currentJordanMin >= blueHourDawnStart && currentJordanMin < morningGoldenStart) {
    currentPhase = "blue-hour-dawn";
  } else if (currentJordanMin >= morningGoldenStart && currentJordanMin <= morningGoldenEnd) {
    currentPhase = "golden-hour-morning";
  } else if (currentJordanMin > morningGoldenEnd && currentJordanMin < eveningGoldenStart) {
    currentPhase = "daylight";
  } else if (currentJordanMin >= eveningGoldenStart && currentJordanMin <= eveningGoldenEnd) {
    currentPhase = "golden-hour-evening";
  } else if (currentJordanMin > eveningGoldenEnd && currentJordanMin <= blueHourDuskEnd) {
    currentPhase = "blue-hour-dusk";
  } else {
    currentPhase = "night";
  }

  // Sun altitude approximate
  const hourDiffFromNoon = (currentJordanMin - solarNoonMin) / 60;
  const currentHourAngleRad = ((hourDiffFromNoon * 15) * Math.PI) / 180;
  const sinAltitude =
    Math.sin(latRad) * Math.sin(declinationRad) +
    Math.cos(latRad) * Math.cos(declinationRad) * Math.cos(currentHourAngleRad);
  const sunAltitudeDeg = Math.round((Math.asin(Math.max(-1, Math.min(1, sinAltitude))) * 180) / Math.PI);

  // Approximate Azimuth
  const cosAzimuth =
    (Math.sin(declinationRad) - Math.sin(latRad) * sinAltitude) /
    (Math.cos(latRad) * Math.cos((sunAltitudeDeg * Math.PI) / 180));
  let azimuthDeg = (Math.acos(Math.max(-1, Math.min(1, cosAzimuth))) * 180) / Math.PI;
  if (currentHourAngleRad > 0) azimuthDeg = 360 - azimuthDeg;

  // Sun progress pct (0 at sunrise, 100 at sunset)
  let progressPct = 0;
  if (currentJordanMin <= sunriseMin) progressPct = 0;
  else if (currentJordanMin >= sunsetMin) progressPct = 100;
  else {
    progressPct = Math.round(((currentJordanMin - sunriseMin) / (sunsetMin - sunriseMin)) * 100);
  }

  // Countdown to next highlight
  let nextTargetMin = morningGoldenStart;
  let eventEn = "Morning Golden Hour";
  let eventAr = "الساعة الذهبية الصباحية";

  if (currentJordanMin < morningGoldenStart) {
    nextTargetMin = morningGoldenStart;
    eventEn = "Morning Golden Hour";
    eventAr = "الساعة الذهبية الصباحية";
  } else if (currentJordanMin < eveningGoldenStart) {
    nextTargetMin = eveningGoldenStart;
    eventEn = "Evening Golden Hour";
    eventAr = "الساعة الذهبية المسائية";
  } else if (currentJordanMin < sunsetMin) {
    nextTargetMin = sunsetMin;
    eventEn = "Sunset & Blue Hour";
    eventAr = "غروب الشمس والشفق الأزرق";
  } else {
    // Tomorrow sunrise
    nextTargetMin = morningGoldenStart + 1440;
    eventEn = "Tomorrow's Dawn";
    eventAr = "فجر الغد";
  }

  let diffMin = nextTargetMin - currentJordanMin;
  if (diffMin < 0) diffMin += 1440;
  const countdownHours = Math.floor(diffMin / 60);
  const countdownMinutes = diffMin % 60;

  return {
    sunrise: formatMin(sunriseMin),
    sunset: formatMin(sunsetMin),
    solarNoon: formatMin(solarNoonMin),
    morningGoldenHour: {
      start: formatMin(morningGoldenStart),
      end: formatMin(morningGoldenEnd),
    },
    eveningGoldenHour: {
      start: formatMin(eveningGoldenStart),
      end: formatMin(eveningGoldenEnd),
    },
    blueHourDawn: {
      start: formatMin(blueHourDawnStart),
      end: formatMin(blueHourDawnEnd),
    },
    blueHourDusk: {
      start: formatMin(blueHourDuskStart),
      end: formatMin(blueHourDuskEnd),
    },
    sunAltitudeDeg,
    sunAzimuthDeg: Math.round(azimuthDeg),
    dayLengthMinutes: dayLengthMin,
    currentPhase,
    progressPct,
    countdown: {
      eventEn,
      eventAr,
      hours: countdownHours,
      minutes: countdownMinutes,
    },
  };
}
