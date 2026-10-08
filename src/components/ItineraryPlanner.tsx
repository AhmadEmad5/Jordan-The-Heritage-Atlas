"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  MapPin,
  Clock,
  Navigation,
  Check,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  Sparkles,
  Route,
} from "lucide-react";
import { destinations, type Destination } from "@/data/destinations";
import { useLanguage } from "@/context/LanguageContext";

interface RoutePreset {
  id: string;
  titleEn: string;
  titleAr: string;
  durationEn: string;
  durationAr: string;
  stops: string[]; // slugs
  descriptionEn: string;
  descriptionAr: string;
}

const PRESETS: RoutePreset[] = [
  {
    id: "golden-triangle",
    titleEn: "The Golden Desert Triangle",
    titleAr: "المثلث الذهبي الصحراوي",
    durationEn: "3 Days · 380 km",
    durationAr: "٣ أيام · ٣٨٠ كم",
    stops: ["petra", "wadi-rum", "dead-sea"],
    descriptionEn: "Jordan’s crown jewels: The rose-red Nabataean capital, the Martian crimson dunes of Wadi Rum, and the buoyant mineral waters of the Dead Sea.",
    descriptionAr: "جوهرة التاج الأردني: عاصمة الأنباط الوردية، كثبان وادي رم الخلابة، وأدنى بقعة على وجه الأرض في البحر الميت.",
  },
  {
    id: "kings-highway",
    titleEn: "The King’s Highway Expedition",
    titleAr: "مسار طريق الملوك التاريخي",
    durationEn: "4 Days · 460 km",
    durationAr: "٤ أيام · ٤٦٠ كم",
    stops: ["dead-sea", "dana", "petra", "wadi-rum"],
    descriptionEn: "Trace a 5,000-year-old trade artery from Dead Sea canyons down through Dana Biosphere gorges to Petra and Wadi Rum.",
    descriptionAr: "عبر الشريان التجاري العريق الذي يزيد عمره عن ٥٠٠٠ عام من البحر الميت ومحمية ضانا وصولاً إلى البتراء ورم.",
  },
  {
    id: "northern-heritage",
    titleEn: "Northern Decapolis & Highlands",
    titleAr: "مدن الديكابولس وجبال الشمال",
    durationEn: "2 Days · 210 km",
    durationAr: "يومان · ٢١٠ كم",
    stops: ["jerash", "ajloun", "umm-qais"],
    descriptionEn: "Roman colonnades of Gerasa, medieval Saladin castle ramparts in Ajloun, and black basalt Greek theatres overlooking the Sea of Galilee.",
    descriptionAr: "أعمدة جرش الرومانية المحفوظة، قلعة عجلون الأيوبية المحاطة بالبلوط، ومدرجات جدارا البازلتية في أم قيس.",
  },
];

// Approximate driving distances between waypoints (km)
const DISTANCE_MATRIX: Record<string, Record<string, number>> = {
  petra: { "wadi-rum": 112, "dead-sea": 210, jerash: 275, ajloun: 295, dana: 54, "umm-qais": 320 },
  "wadi-rum": { petra: 112, "dead-sea": 315, jerash: 375, ajloun: 395, dana: 165, "umm-qais": 420 },
  "dead-sea": { petra: 210, "wadi-rum": 315, jerash: 95, ajloun: 110, dana: 155, "umm-qais": 140 },
  jerash: { petra: 275, "wadi-rum": 375, "dead-sea": 95, ajloun: 24, dana: 220, "umm-qais": 68 },
  ajloun: { petra: 295, "wadi-rum": 395, "dead-sea": 110, jerash: 24, dana: 240, "umm-qais": 52 },
  dana: { petra: 54, "wadi-rum": 165, "dead-sea": 155, jerash: 220, ajloun: 240, "umm-qais": 265 },
  "umm-qais": { petra: 320, "wadi-rum": 420, "dead-sea": 140, jerash: 68, ajloun: 52, dana: 265 },
};

export default function ItineraryPlanner() {
  const { isArabic, t } = useLanguage();
  const [selectedStops, setSelectedStops] = useState<string[]>(PRESETS[0].stops);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<string>("golden-triangle");

  const handleSelectPreset = (preset: RoutePreset) => {
    setActivePreset(preset.id);
    setSelectedStops(preset.stops);
  };

  const toggleStop = (slug: string) => {
    setActivePreset("");
    if (selectedStops.includes(slug)) {
      if (selectedStops.length > 2) {
        setSelectedStops(selectedStops.filter((s) => s !== slug));
      }
    } else {
      setSelectedStops([...selectedStops, slug]);
    }
  };

  const removeStop = (slug: string) => {
    if (selectedStops.length > 2) {
      setActivePreset("");
      setSelectedStops(selectedStops.filter((s) => s !== slug));
    }
  };

  // Compute total distance & estimated drive hours
  let totalKm = 0;
  for (let i = 0; i < selectedStops.length - 1; i++) {
    const from = selectedStops[i];
    const to = selectedStops[i + 1];
    const dist = DISTANCE_MATRIX[from]?.[to] || 90;
    totalKm += dist;
  }
  const estDriveHours = (totalKm / 65).toFixed(1); // avg scenic highway speed
  const recommendedDays = Math.max(2, Math.ceil(selectedStops.length * 1.1));

  // Google Maps Multi-Stop Directions URL
  const destinationMap = new Map(destinations.map((d) => [d.slug, d]));
  const googleMapsUrl = `https://www.google.com/maps/dir/${selectedStops
    .map((s) => encodeURIComponent(destinationMap.get(s)?.name + ", Jordan"))
    .join("/")}`;

  const copyItinerarySummary = () => {
    const stopNames = selectedStops
      .map((s, idx) => `${idx + 1}. ${isArabic ? destinationMap.get(s)?.arabic : destinationMap.get(s)?.name}`)
      .join("\n");
    const summary = `${isArabic ? "مسار رحلة الأردن المقترح" : "Curated Jordan Heritage Itinerary"}:\n${stopNames}\n\n${isArabic ? `المسافة الإجمالية: ${totalKm} كم (~${estDriveHours} ساعات قيادة)` : `Total Distance: ~${totalKm} km (~${estDriveHours} hrs driving)`}\n${isArabic ? `المدة المقترحة: ${recommendedDays} أيام` : `Recommended Duration: ${recommendedDays} Days`}\n\nPlan with Jordan Heritage Atlas`;
    
    navigator.clipboard?.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section className="itinerary-section" id="itinerary">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span className="tiny-star">✦</span> {t("SMART TRAVEL EXPEDITIONS", "مخطط مسار الرحلات التفاعلي")}
          </p>
          <h2>{t("Curate Your Jordanian Route.", "صمّم خط سير رحلتك عبر الأردن")}</h2>
        </div>
        <p>
          {t(
            "Select iconic waypoints or adopt royal route presets with dynamic distance telemetry and road travel insights.",
            "اختر محطاتك المفضلة أو استكشف المسارات الملكية المقترحة مع حساب دقيق للمسافات وساعات القيادة.",
          )}
        </p>
      </div>

      {/* Preset Journey Pills */}
      <div className="itinerary-presets-row" role="tablist" aria-label="Route Presets">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleSelectPreset(p)}
            className={`itinerary-preset-card ${activePreset === p.id ? "is-active" : ""}`}
            role="tab"
            aria-selected={activePreset === p.id}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="preset-pill-tag">
                <Sparkles size={11} className="text-amber-300" />
                {isArabic ? p.durationAr : p.durationEn}
              </span>
            </div>
            <h4>{isArabic ? p.titleAr : p.titleEn}</h4>
            <p>{isArabic ? p.descriptionAr : p.descriptionEn}</p>
          </button>
        ))}
      </div>

      {/* Main Interactive Route Workbench */}
      <div className="itinerary-workbench">
        {/* Left: Waypoints Sequence */}
        <div className="itinerary-sequence-pane">
          <div className="sequence-header">
            <span className="sequence-label">
              <Route size={15} className="text-amber-400" />
              {t("Route Waypoints Sequence", "تسلسل محطات المسار")} ({selectedStops.length})
            </span>
            <small className="text-sand/70 text-xs">
              {t("Minimum 2 destinations", "محطتان على الأقل")}
            </small>
          </div>

          <div className="sequence-list">
            {selectedStops.map((slug, idx) => {
              const d = destinationMap.get(slug);
              if (!d) return null;
              const nextSlug = selectedStops[idx + 1];
              const legKm = nextSlug ? DISTANCE_MATRIX[slug]?.[nextSlug] || 85 : 0;

              return (
                <div key={slug} className="sequence-step-wrapper">
                  <motion.div
                    className="sequence-step-card"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="step-number">{idx + 1}</div>
                    <div className="step-info">
                      <h5>{isArabic ? d.arabic : d.name}</h5>
                      <span>{isArabic ? d.governorate.ar : d.governorate.en}</span>
                    </div>
                    {selectedStops.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeStop(slug)}
                        className="step-remove-btn"
                        aria-label={`Remove ${d.name}`}
                        title={t("Remove from route", "حذف من المسار")}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </motion.div>

                  {nextSlug && (
                    <div className="sequence-leg-indicator">
                      <div className="leg-line" />
                      <span className="leg-pill">
                        <Navigation size={10} className="text-amber-400 rotate-45" />
                        ~{legKm} km
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Available Destination Chips to Add */}
          <div className="mt-5 pt-4 border-t border-white/10">
            <span className="text-[11px] font-semibold tracking-wider text-sand uppercase block mb-2.5">
              {t("Add Waypoints to Itinerary", "إضافة محطات إلى المسار")}:
            </span>
            <div className="flex flex-wrap gap-2">
              {destinations.map((d) => {
                const isSelected = selectedStops.includes(d.slug);
                return (
                  <button
                    key={d.slug}
                    type="button"
                    onClick={() => toggleStop(d.slug)}
                    className={`destination-chip ${isSelected ? "is-selected" : ""}`}
                  >
                    <span className="chip-bullet">{isSelected ? "✓" : "+"}</span>
                    <span>{isArabic ? d.arabic : d.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Summary Telemetry & Export Actions */}
        <div className="itinerary-summary-pane">
          <div className="summary-card">
            <span className="summary-eyebrow">
              {t("EXPEDITION TELEMETRY", "بيانات وملخص الرحلة")}
            </span>
            <h3 className="summary-title">
              {recommendedDays} {t("Days Recommended", "أيام مقترحة")}
            </h3>
            <p className="summary-subtitle">
              {t(
                "Optimal pace allowing thorough exploration of monuments, trail hikes, and local hospitality.",
                "وتيرة سفر مثالية تمنحك وقتاً كافياً لاستكشاف الآثار والمشي في الطبيعة والمائدة المحلية.",
              )}
            </p>

            <div className="summary-metrics-grid">
              <div className="metric-box">
                <span className="metric-label">
                  <MapPin size={12} className="text-amber-400" />
                  {t("Total Distance", "المسافة الكلية")}
                </span>
                <strong className="metric-val">~{totalKm} km</strong>
              </div>

              <div className="metric-box">
                <span className="metric-label">
                  <Clock size={12} className="text-amber-400" />
                  {t("Est. Scenic Drive", "وقت القيادة")}
                </span>
                <strong className="metric-val">~{estDriveHours} hrs</strong>
              </div>
            </div>

            <div className="summary-actions">
              <motion.a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="itinerary-primary-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{t("Open Route in Google Maps", "فتح المسار في خرائط جوجل")}</span>
                <ExternalLink size={15} />
              </motion.a>

              <motion.button
                type="button"
                onClick={copyItinerarySummary}
                className="itinerary-secondary-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-emerald-400" />
                    <span>{t("Copied to Clipboard!", "تم نسخ المسار بنجاح!")}</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    <span>{t("Copy Travel Summary", "نسخ ملخص الرحلة")}</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
