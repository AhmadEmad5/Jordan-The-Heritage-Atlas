"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sunrise,
  Sunset,
  Sun,
  Camera,
  Compass,
  Clock,
  Sparkles,
  Aperture,
  Eye,
  Info,
  ChevronDown,
} from "lucide-react";
import { destinations } from "@/data/destinations";
import {
  calculateSolarTelemetry,
  PHOTO_GUIDANCE,
  type SolarTelemetryResult,
} from "@/lib/solarCalculator";
import { useLanguage } from "@/context/LanguageContext";

interface SolarTelemetryCardProps {
  slug: string;
}

export default function SolarTelemetryCard({ slug }: SolarTelemetryCardProps) {
  const { isArabic, t } = useLanguage();
  const [showPhotoGuide, setShowPhotoGuide] = useState(true);

  // Find destination coordinates
  const destination = destinations.find((d) => d.slug === slug) || destinations[0];
  const { lat, lng } = destination.coordinates;

  const solar: SolarTelemetryResult = useMemo(() => {
    return calculateSolarTelemetry(lat, lng, new Date());
  }, [lat, lng]);

  const photoGuide = PHOTO_GUIDANCE[slug] || PHOTO_GUIDANCE.petra;

  // Phase translation
  const phaseLabels: Record<
    SolarTelemetryResult["currentPhase"],
    { en: string; ar: string; color: string }
  > = {
    night: {
      en: "Nocturnal Night Sky",
      ar: "سكون الليل المرصع بالنجوم",
      color: "text-indigo-300",
    },
    "blue-hour-dawn": {
      en: "Dawn Blue Hour",
      ar: "الساعة الزرقاء الفجرية",
      color: "text-sky-300",
    },
    "golden-hour-morning": {
      en: "Morning Golden Hour",
      ar: "الساعة الذهبية الصباحية",
      color: "text-amber-400",
    },
    daylight: {
      en: "Solar Daylight",
      ar: "شمس النهار الساطعة",
      color: "text-yellow-200",
    },
    "golden-hour-evening": {
      en: "Evening Golden Hour",
      ar: "الساعة الذهبية المسائية",
      color: "text-orange-400",
    },
    "blue-hour-dusk": {
      en: "Dusk Blue Hour",
      ar: "الشفق الأزرق المسائي",
      color: "text-purple-300",
    },
  };

  const currentPhaseInfo = phaseLabels[solar.currentPhase];

  // SVG arc calculation: width 320, height 120
  // Arc starts at (30, 100), peaks at (160, 20), ends at (290, 100)
  // Sun position interpolates along arc based on solar.progressPct
  const arcProgress = Math.max(0, Math.min(1, solar.progressPct / 100));
  // Quadratic bezier: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
  // P0 = (30, 100), P1 = (160, -10), P2 = (290, 100)
  const sunX = Math.round((1 - arcProgress) ** 2 * 30 + 2 * (1 - arcProgress) * arcProgress * 160 + arcProgress ** 2 * 290);
  const sunY = Math.round((1 - arcProgress) ** 2 * 100 + 2 * (1 - arcProgress) * arcProgress * 10 + arcProgress ** 2 * 100);

  return (
    <motion.div
      className="telemetry-card telemetry-card-solar mt-6 border border-[#d49b6a]/30 bg-gradient-to-b from-[#18201c]/90 to-[#0e1411]/95 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Radiant Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10 border-b border-[rgba(212,155,106,0.15)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-inner">
            <Sun size={20} className="animate-[spin_40s_linear_infinite]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-[#d49b6a] uppercase">
                {t("PHOTOGRAPHY & SOLAR TELEMETRY", "حاسبة الساعة الذهبية ورصد الشمس")}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif text-[#f5efe6] font-semibold">
              {t("Golden Hour & Celestial Arc", "أوقات الإضاءة الذهبية ومسار الشمس")}
            </h3>
          </div>
        </div>

        {/* Live Countdown Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-amber-500/30 text-xs">
          <Clock size={13} className="text-amber-400 shrink-0" />
          <span className="text-stone-300">
            {isArabic ? solar.countdown.eventAr : solar.countdown.eventEn}:
          </span>
          <span className="font-mono font-bold text-amber-300 tabular-nums">
            {solar.countdown.hours}h {solar.countdown.minutes}m
          </span>
        </div>
      </div>

      {/* Celestial Arc Visualizer & Key Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6 relative z-10">
        {/* Left: Solar Trajectory Arc Graphic */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-black/30 border border-white/5 relative">
          <div className="w-full max-w-[320px] relative">
            <svg
              viewBox="0 0 320 120"
              className="w-full h-auto overflow-visible select-none"
              aria-label="Solar trajectory arc"
            >
              {/* Ground Horizon line */}
              <line
                x1="20"
                y1="100"
                x2="300"
                y2="100"
                stroke="rgba(212, 155, 106, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Sun trajectory curve */}
              <path
                d="M 30 100 Q 160 10 290 100"
                fill="none"
                stroke="url(#solarGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="solarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
                </linearGradient>
                <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                  <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Sunrise marker */}
              <circle cx="30" cy="100" r="3.5" fill="#f59e0b" />
              <text
                x="30"
                y="114"
                textAnchor="middle"
                className="text-[9px] fill-stone-400 font-mono"
              >
                {solar.sunrise}
              </text>

              {/* Solar Noon marker */}
              <circle cx="160" cy="32" r="3" fill="#fef08a" opacity="0.6" />
              <text
                x="160"
                y="20"
                textAnchor="middle"
                className="text-[9px] fill-amber-200/80 font-mono"
              >
                {solar.solarNoon}
              </text>

              {/* Sunset marker */}
              <circle cx="290" cy="100" r="3.5" fill="#f97316" />
              <text
                x="290"
                y="114"
                textAnchor="middle"
                className="text-[9px] fill-stone-400 font-mono"
              >
                {solar.sunset}
              </text>

              {/* Interactive Current Sun Marker */}
              {solar.currentPhase !== "night" && (
                <g>
                  {/* Sun outer aura */}
                  <circle cx={sunX} cy={sunY} r="14" fill="url(#sunGlow)" />
                  {/* Core sun disc */}
                  <circle
                    cx={sunX}
                    cy={sunY}
                    r="5"
                    fill="#fff"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    className="filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                  />
                </g>
              )}
            </svg>
          </div>

          <div className="flex items-center justify-between w-full mt-3 px-2 text-xs">
            <span className="text-stone-400 flex items-center gap-1">
              <Compass size={12} className="text-[#d49b6a]" />
              <span>{t("Azimuth", "السمت")}: {solar.sunAzimuthDeg}°</span>
            </span>
            <span className={`font-medium ${currentPhaseInfo.color}`}>
              {isArabic ? currentPhaseInfo.ar : currentPhaseInfo.en}
            </span>
            <span className="text-stone-400">
              {t("Elevation", "الارتفاع")}: {solar.sunAltitudeDeg}°
            </span>
          </div>
        </div>

        {/* Right: Golden Hour & Blue Hour Cards */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Morning Golden Hour */}
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-medium mb-1">
              <Sunrise size={14} />
              <span>{t("Dawn Golden", "ذهبي الصباح")}</span>
            </div>
            <div className="text-base font-mono font-bold text-white tabular-nums my-1">
              {solar.morningGoldenHour.start}
            </div>
            <span className="text-[10px] text-amber-200/70">
              {t("until", "حتى")} {solar.morningGoldenHour.end}
            </span>
          </div>

          {/* Evening Golden Hour */}
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-orange-300 text-xs font-medium mb-1">
              <Sunset size={14} />
              <span>{t("Dusk Golden", "ذهبي الغروب")}</span>
            </div>
            <div className="text-base font-mono font-bold text-white tabular-nums my-1">
              {solar.eveningGoldenHour.start}
            </div>
            <span className="text-[10px] text-orange-200/70">
              {t("until", "حتى")} {solar.eveningGoldenHour.end}
            </span>
          </div>

          {/* Blue Hour Dusk */}
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-sky-500/10 to-transparent border border-sky-500/20 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-sky-300 text-xs font-medium mb-1">
              <Aperture size={14} />
              <span>{t("Blue Hour", "الساعة الزرقاء")}</span>
            </div>
            <div className="text-base font-mono font-bold text-white tabular-nums my-1">
              {solar.blueHourDusk.start}
            </div>
            <span className="text-[10px] text-sky-200/70">
              {t("until", "حتى")} {solar.blueHourDusk.end}
            </span>
          </div>

          {/* Daylight Duration */}
          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-stone-300 text-xs font-medium mb-1">
              <Sun size={14} className="text-[#d49b6a]" />
              <span>{t("Daylight", "ساعات النهار")}</span>
            </div>
            <div className="text-base font-mono font-bold text-white tabular-nums my-1">
              {Math.floor(solar.dayLengthMinutes / 60)}h {solar.dayLengthMinutes % 60}m
            </div>
            <span className="text-[10px] text-stone-400">
              {t("Solar Noon", "ذروة الظهيرة")} {solar.solarNoon}
            </span>
          </div>
        </div>
      </div>

      {/* Photographer's Field Playbook Section */}
      <div className="border-t border-[rgba(212,155,106,0.15)] pt-4 relative z-10">
        <button
          type="button"
          onClick={() => setShowPhotoGuide((prev) => !prev)}
          className="w-full flex items-center justify-between py-2 text-left text-sm text-[#e5b98f] hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <Camera size={16} className="text-amber-400" />
            <span className="font-medium font-serif">
              {t("Photographer's Lighting & Angle Guide", "دليل المصور: زوايا الضوء والعدسات المقترحة")}
            </span>
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${showPhotoGuide ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {showPhotoGuide && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Prime Window & Facade Angle */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-[#d49b6a]/20">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold mb-1.5">
                    <Sparkles size={13} />
                    <span>{t("Optimal Lighting Direction", "توجيه الضوء والزاوية المثالية")}</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed mb-2 font-light">
                    {isArabic ? photoGuide.facadeAngleAr : photoGuide.facadeAngleEn}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#d49b6a]">
                    <span>{t("Recommended Window", "النافذة الزمنية")}:</span>
                    <span className="font-mono font-medium text-amber-200">
                      {isArabic ? photoGuide.primaryWindowAr : photoGuide.primaryWindowEn}
                    </span>
                  </div>
                </div>

                {/* Lens Recommendation & Curator Secret */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-[#d49b6a]/20">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold mb-1.5">
                    <Aperture size={13} />
                    <span>{t("Optics & Field Secret", "العدسات الموصى بها وسر الكادر")}</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed mb-2 font-light">
                    {isArabic ? photoGuide.curatorTipAr : photoGuide.curatorTipEn}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#d49b6a]">
                    <span>{t("Lens kit", "طقم العدسات")}:</span>
                    <span className="font-mono text-amber-200 truncate max-w-[200px]">
                      {isArabic ? photoGuide.lensRecommendationAr : photoGuide.lensRecommendationEn}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
