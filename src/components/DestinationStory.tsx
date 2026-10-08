"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Scrollytelling from "@/components/Scrollytelling";
import {
  ArrowLeft,
  ArrowUpRight,
  X,
  MapPin,
  History,
  Globe,
  Utensils,
  Bed,
  Compass,
  Calendar,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import {
  adjacentDestinations,
  type Destination,
  type BookingItem,
} from "@/data/destinations";
import { LampEffect } from "@/components/ui/lamp";
import { useLanguage } from "@/context/LanguageContext";
import AmbientSoundscape from "@/components/AmbientSoundscape";
import DesertTelemetryCard from "@/components/DesertTelemetryCard";
import HeritagePassport from "@/components/HeritagePassport";

const MotionLink = motion.create(Link);

export default function DestinationStory({
  destination: d,
}: {
  destination: Destination;
}) {
  const { language, toggleLanguage, isArabic, t } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<BookingItem | null>(null);
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [inChronology, setInChronology] = useState(false);

  useEffect(() => {
    function updateChronologyState() {
      const el = document.getElementById("chapters");
      if (!el) {
        setInChronology(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      // Active when chapters section is covering or near the viewport top
      const active = rect.top <= 140 && rect.bottom >= 120;
      setInChronology(active);
    }

    window.addEventListener("scroll", updateChronologyState, { passive: true });
    updateChronologyState();
    return () => window.removeEventListener("scroll", updateChronologyState);
  }, []);

  function openBooking(item: BookingItem) {
    setSelected(item);
    setArrival("");
    setDeparture("");
    dialog.current?.showModal();
  }
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Amman",
  });

  const nightsCount = (() => {
    if (!arrival || !departure) return 0;
    const d1 = new Date(arrival);
    const d2 = new Date(departure);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  })();

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr + "T12:00:00");
      return d.toLocaleDateString(isArabic ? "ar-JO" : "en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const applyPreset = (daysOffset: number, duration: number) => {
    const now = new Date();
    const arr = new Date(now.getTime() + daysOffset * 86400000);
    const dep = new Date(arr.getTime() + duration * 86400000);
    setArrival(arr.toLocaleDateString("en-CA", { timeZone: "Asia/Amman" }));
    setDeparture(dep.toLocaleDateString("en-CA", { timeZone: "Asia/Amman" }));
  };

  const search = selected
    ? `${selected.query}${arrival && departure > arrival ? ` ${arrival} to ${departure}` : ""}`
    : "";
  return (
    <main className="destination-story">
      <nav
        className={`back-dock ${inChronology ? "is-hidden-chronology" : ""}`}
        aria-label="Story navigation"
      >
        <Link href="/">
          <ArrowLeft size={16} /> {t("The atlas", "الخريطة")}
        </Link>
        <span>{isArabic ? d.arabic : d.name}</span>
        <a href="#chronology" className="dock-chronology">
          <History size={14} /> {t("Chronology", "العصور")}
        </a>
        <Link
          className="dock-nearby"
          href={`/destinations/${adjacentDestinations(d)[0].slug}`}
          aria-label={`Nearby region: ${adjacentDestinations(d)[0].name}`}
        >
          <MapPin size={15} />
          <span>{isArabic ? adjacentDestinations(d)[0].arabic : adjacentDestinations(d)[0].name}</span>
        </Link>
        <a href="#explore">
          {t("Plan your visit", "خطط لزيارتك")} <ArrowUpRight size={15} />
        </a>
        <AmbientSoundscape destinationSlug={d.slug} />
        <button
          type="button"
          onClick={toggleLanguage}
          className="dock-lang-btn"
          aria-label={t("Switch to Arabic", "التبديل إلى الإنجليزية")}
          title={t("Switch to Arabic", "التبديل إلى الإنجليزية")}
        >
          <Globe size={13} className="text-[#d49b6a]" />
          <span>{isArabic ? "EN" : "عربي"}</span>
        </button>
      </nav>
      <Scrollytelling destination={d} key={d.slug} />

      {/* Deep-Dive Topics & Governorate Heritage Dossier */}
      {d.topics && d.topics.length > 0 && (
        <section className="topics-section" id="dossier">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="tiny-star">✦</span> {d.governorate.en} · {d.governorate.ar}
              </p>
              <h2>Archaeological & Natural Dossier.</h2>
            </div>
            <p>
              Beyond the surface monuments lies a deeper story of human ingenuity,
              <br />
              ancient engineering, and living traditions that have persisted for millennia.
            </p>
          </div>
          <div className="topics-grid">
            {d.topics.map((t, idx) => (
              <motion.article
                className="topic-card relative overflow-hidden group"
                key={idx}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                <LampEffect size="sm" />
                <div className="relative z-10">
                  <span className="topic-tag">{t.tag}</span>
                  <span className="topic-index">0{idx + 1}</span>
                  <h3>{t.titleEn}</h3>
                  <h4 lang="ar">{t.titleAr}</h4>
                  <p className="topic-en">{t.descriptionEn}</p>
                  <p className="topic-ar" lang="ar">{t.descriptionAr}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* Atmospheric & Celestial Desert Telemetry */}
      <DesertTelemetryCard slug={d.slug} />

      {/* Culinary Heritage & Local Flavors */}
      {d.culinary && (
        <section className="culinary-strip">
          <div className="culinary-content">
            <span className="eyebrow">LIVING TABLE & TRADITIONS · المائدة التراثية</span>
            <h2 lang="ar">{d.culinary.dishAr}</h2>
            <h3>{d.culinary.dishEn}</h3>
            <p lang="ar" className="culinary-story-ar">{d.culinary.storyAr}</p>
            <p className="culinary-story-en">{d.culinary.storyEn}</p>
          </div>
          {d.insiderTip && (
            <motion.div
              className="insider-card"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <span className="eyebrow">INSIDER VANTAGE POINT · سر من الميدان</span>
              <p lang="ar">{d.insiderTip.ar}</p>
              <small>{d.insiderTip.en}</small>
            </motion.div>
          )}
        </section>
      )}

      <section className="booking-section" id="explore">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MAKE THE STORY YOURS</p>
            <h2>A little closer to {d.name}.</h2>
          </div>
          <p>
            Sleep somewhere special. Share a local table.
            <br />
            See it through the eyes of someone who lives here.
          </p>
        </div>
        <div className="booking-grid">
          {d.bookings.map((item) => (
            <motion.article
              className="booking-card"
              key={item.id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                width={560}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div>
                <span className="eyebrow">{item.kind}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <motion.button
                  className="booking-trigger"
                  onClick={() => openBooking(item)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.kind === "Stay"
                    ? "Find a stay"
                    : item.kind === "Taste"
                      ? "Find a local table"
                      : "Find a local guide"}
                  <ArrowUpRight size={17} />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
        <a
          className="official-link"
          href="https://www.jordanpass.jo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore official Jordan Pass ticket options <ArrowUpRight size={15} />
        </a>
      </section>

      {/* Explorer Passport & Destination Stamp */}
      <HeritagePassport currentSlug={d.slug} autoStamp={true} />

      <section className="nearby-section">
        <p className="eyebrow">LET CURIOSITY TAKE YOU FURTHER</p>
        <h2>Another place. Another perspective.</h2>
        <div>
          {adjacentDestinations(d).map((nearby) => (
            <MotionLink
              href={`/destinations/${nearby.slug}`}
              key={nearby.slug}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <MapPin size={16} />
              <span>
                {nearby.name}
                <small>{nearby.region}</small>
              </span>
              <ArrowUpRight size={20} />
            </MotionLink>
          ))}
        </div>
      </section>
      <footer className="atlas-footer">
        <Link href="/" className="wordmark">
          jordan<span>THE HERITAGE ATLAS</span>
        </Link>
        <a href="/image-credits.txt">Photography credits</a>
        <Link href="/">
          Back to the map <ArrowLeft size={15} />
        </Link>
      </footer>
      <dialog
        className="booking-dialog"
        ref={dialog}
        onClose={() => setSelected(null)}
        aria-labelledby="booking-title"
      >
        <button
          className="dialog-close"
          aria-label="Close booking options"
          onClick={() => dialog.current?.close()}
        >
          <X size={18} />
        </button>
        {selected && (
          <div className="dialog-inner-card">
            {/* Top Image Showcase Banner */}
            {selected.image && (
              <div className="dialog-media-frame">
                <Image
                  src={selected.image}
                  alt={selected.imageAlt || selected.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-cover"
                />
                <div className="dialog-media-gradient" />
                <div className="dialog-media-badge">
                  {selected.kind === "Stay" && <Bed size={13} className="text-amber-300" />}
                  {selected.kind === "Taste" && <Utensils size={13} className="text-amber-300" />}
                  {selected.kind === "Explore" && <Compass size={13} className="text-amber-300" />}
                  <span>
                    {selected.kind === "Stay"
                      ? t("Desert Sanctuary & Stays", "إقامة وتخييم")
                      : selected.kind === "Taste"
                        ? t("Local Culinary Table", "مائدة ومذاقات تراثية")
                        : t("Guided Expedition & Trails", "استكشاف ودلالة")}
                  </span>
                </div>
              </div>
            )}

            <div className="dialog-body-content">
              <div className="dialog-meta-row">
                <span className="eyebrow">
                  <span className="tiny-star">✦</span>
                  {d.name} · {selected.kind}
                </span>
                <span className="dialog-gov-pill" lang="ar">
                  {d.governorate.ar}
                </span>
              </div>

              <h2 id="booking-title" className="dialog-title">
                {selected.title}
              </h2>

              <p className="dialog-desc">
                {selected.description}
              </p>

              {selected.kind === "Stay" && (
                <div className="stay-picker-suite">
                  <div className="date-fields">
                    <label htmlFor="booking-checkin" className="date-field-card">
                      <div className="date-field-header">
                        <span className="date-label-title">
                          <Calendar size={13} className="text-amber-400" />
                          Check-in
                          {isArabic && <span className="opacity-70 font-normal text-[10px]">· وصول</span>}
                        </span>
                        {arrival && (
                          <span className="date-preview-pill">
                            {formatDisplayDate(arrival)}
                          </span>
                        )}
                      </div>
                      <input
                        id="booking-checkin"
                        type="date"
                        min={today}
                        value={arrival}
                        onClick={(e) => {
                          try {
                            e.currentTarget.showPicker?.();
                          } catch {}
                        }}
                        onChange={(e) => {
                          setArrival(e.target.value);
                          if (departure <= e.target.value) setDeparture("");
                        }}
                      />
                    </label>

                    <label htmlFor="booking-checkout" className="date-field-card">
                      <div className="date-field-header">
                        <span className="date-label-title">
                          <Calendar size={13} className="text-amber-400" />
                          Check-out
                          {isArabic && <span className="opacity-70 font-normal text-[10px]">· مغادرة</span>}
                        </span>
                        {departure && (
                          <span className="date-preview-pill">
                            {formatDisplayDate(departure)}
                          </span>
                        )}
                      </div>
                      <input
                        id="booking-checkout"
                        type="date"
                        min={arrival || today}
                        value={departure}
                        onClick={(e) => {
                          try {
                            e.currentTarget.showPicker?.();
                          } catch {}
                        }}
                        onChange={(e) => setDeparture(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="date-presets-row" aria-label="Stay duration presets">
                    <span className="presets-label">{t("Quick:", "تحديد سريع:")}</span>
                    <button
                      type="button"
                      onClick={() => applyPreset(0, 1)}
                      className="preset-chip"
                    >
                      {t("Tonight (1n)", "الليلة (١)")}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(1, 2)}
                      className="preset-chip"
                    >
                      {t("Weekend (2n)", "عطلة (٢)")}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(2, 3)}
                      className="preset-chip"
                    >
                      {t("Retreat (3n)", "إقامة (٣)")}
                    </button>
                  </div>

                  {nightsCount > 0 && (
                    <div className="nights-summary-badge">
                      <Sparkles size={13} className="text-amber-300" />
                      <span>
                        {isArabic
                          ? `${nightsCount} ${nightsCount === 1 ? "ليلة" : nightsCount === 2 ? "ليلتان" : "ليالٍ"} في ${d.arabic}`
                          : `${nightsCount} ${nightsCount === 1 ? "night" : "nights"} stay in ${d.name}`}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="dialog-action-row">
                <motion.a
                  className="solid-button dialog-submit-btn"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(search)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore providers</span>
                  <ArrowUpRight size={17} />
                </motion.a>
              </div>

              <small className="dialog-footer-hint">
                <span className="hint-bullet">◈</span>
                {t(
                  "Opens direct verified providers in Google Maps in a new tab.",
                  "يفتح نتائج المزودين المعتمدين عبر خرائط جوجل في نافذة جديدة.",
                )}
              </small>
            </div>
          </div>
        )}
      </dialog>
    </main>
  );
}
