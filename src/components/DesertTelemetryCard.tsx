"use client";

import { motion } from "motion/react";
import {
  Compass,
  Mountain,
  Moon,
  Sparkles,
  Thermometer,
  Calendar,
  Eye,
  Info,
} from "lucide-react";
import { getDestinationTelemetry } from "@/data/telemetry";
import { useLanguage } from "@/context/LanguageContext";

import SolarTelemetryCard from "@/components/SolarTelemetryCard";

interface DesertTelemetryCardProps {
  slug: string;
}

export default function DesertTelemetryCard({ slug }: DesertTelemetryCardProps) {
  const { isArabic, t } = useLanguage();
  const telemetry = getDestinationTelemetry(slug);

  return (
    <section className="telemetry-section" id="telemetry">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span className="tiny-star">✦</span> {t("ENVIRONMENT & CELESTIAL CANOPY", "البيئة والمشهد الفلكي")}
          </p>
          <h2>{t("Atmospheric Telemetry & Dark Skies.", "الرصد الفلكي وخصائص البيئة")}</h2>
        </div>
        <p>
          {t(
            "Jordan's dramatic rift valleys and high deserts create unique microclimates and pristine nocturnal skies.",
            "تمنح جغرافيا الأردن وأوديته المتصدعة مناخات بيئية فريدة وسماء ليلية بكر تُعد من الأصفى عالمياً.",
          )}
        </p>
      </div>

      <div className="telemetry-grid">
        {/* Main Celestial & Dark Sky Card */}
        <motion.div
          className="telemetry-card telemetry-card-featured"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        >
          <div className="telemetry-card-header">
            <div className="telemetry-icon-box">
              <Moon size={18} className="text-amber-300" />
            </div>
            <div>
              <span className="telemetry-badge-label">
                {t("BORTLE SCALE RATING", "مقياس بورتل لظلمة السماء")}
              </span>
              <h3>{isArabic ? telemetry.bortleName.ar : telemetry.bortleName.en}</h3>
            </div>
            <div className="bortle-pill">
              <span>Class {telemetry.bortleScale}</span>
            </div>
          </div>

          <p className="telemetry-desc">
            {isArabic ? telemetry.stargazingRating.ar : telemetry.stargazingRating.en}
          </p>

          <div className="telemetry-meter-row">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-sand/80 font-medium">
                {t("Nocturnal Sky Transparency", "نسبة نقاء السماء ليلاً")}
              </span>
              <span className="text-amber-300 font-bold tabular-nums">
                {telemetry.skyClarityPct}%
              </span>
            </div>
            <div className="meter-track">
              <motion.div
                className="meter-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${telemetry.skyClarityPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          <div className="telemetry-highlight-box">
            <div className="flex items-start gap-2.5">
              <Sparkles size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-xs font-semibold text-sand mb-0.5">
                  {t("Prime Celestial Alignment", "الحدث الفلكي الأبرز")}:
                </strong>
                <p className="text-xs text-white/85 leading-relaxed">
                  {isArabic ? telemetry.celestialHighlight.ar : telemetry.celestialHighlight.en}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Elevation & Climate Card */}
        <motion.div
          className="telemetry-card"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        >
          <div className="telemetry-card-header">
            <div className="telemetry-icon-box">
              <Mountain size={18} className="text-amber-300" />
            </div>
            <div>
              <span className="telemetry-badge-label">
                {t("ELEVATION PROFILE", "الارتفاع والتضاريس")}
              </span>
              <h3>
                {telemetry.elevation.meters > 0 ? `+${telemetry.elevation.meters}m` : `${telemetry.elevation.meters}m`}
              </h3>
            </div>
          </div>

          <p className="telemetry-desc">
            {isArabic ? telemetry.elevation.ar : telemetry.elevation.en}
          </p>

          <div className="telemetry-stats-list">
            <div className="stat-item">
              <Thermometer size={14} className="text-amber-400/80 shrink-0" />
              <div>
                <span className="stat-label">{t("Typical Temperatures", "درجات الحرارة المعتادة")}</span>
                <span className="stat-val">{isArabic ? telemetry.temperatureRange.ar : telemetry.temperatureRange.en}</span>
              </div>
            </div>

            <div className="stat-item">
              <Calendar size={14} className="text-amber-400/80 shrink-0" />
              <div>
                <span className="stat-label">{t("Best Travel Window", "أفضل مواسم الزيارة")}</span>
                <span className="stat-val">{isArabic ? telemetry.bestSeason.ar : telemetry.bestSeason.en}</span>
              </div>
            </div>
          </div>

          <div className="telemetry-tip-pill">
            <Info size={13} className="text-amber-400 shrink-0 mt-0.5" />
            <span className="text-[11.5px] leading-relaxed text-sand/90">
              {isArabic ? telemetry.astronomicalTip.ar : telemetry.astronomicalTip.en}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Real-time Astronomical Solar & Golden Hour Telemetry */}
      <SolarTelemetryCard slug={slug} />
    </section>
  );
}
