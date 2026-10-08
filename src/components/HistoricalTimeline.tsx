"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Landmark,
  Crown,
  History,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import type { HistoricalEra } from "@/data/historicalEras";
import { LampEffect } from "@/components/ui/lamp";

export default function HistoricalTimeline({
  eras,
  destinationName,
  destinationArabic,
}: {
  eras: HistoricalEra[];
  destinationName: string;
  destinationArabic: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevEra = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : eras.length - 1));
  }, [eras.length]);

  const nextEra = useCallback(() => {
    setActiveIndex((prev) => (prev < eras.length - 1 ? prev + 1 : 0));
  }, [eras.length]);

  // Keyboard navigation (ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevEra();
      } else if (e.key === "ArrowRight") {
        nextEra();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevEra, nextEra]);

  if (!eras || eras.length === 0) return null;

  const activeEra = eras[activeIndex];

  return (
    <section
      className="historical-timeline-section"
      id="chronology"
      aria-label={`${destinationName} Historical Eras and Chronology`}
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span className="tiny-star">✦</span> CHRONOLOGICAL EPOCHS & LIVING
            HERITAGE · سِجِلُّ الحِقَبِ التَّارِيخِيَّةِ
          </p>
          <h2>The Journey Through Time: {destinationName}</h2>
          <h3 lang="ar" className="subheading-arabic">
            رحلة عبر حقب التاريخ الخالدة في {destinationArabic}
          </h3>
        </div>
        <p className="section-intro">
          From the deep dawn of human civilization to the living traditions of
          today. Slide through the pivotal epochs that sculpted this sanctuary.
        </p>
      </div>

      {/* Epoch Stepper Bar / Timeline Navigation */}
      <div className="timeline-nav-container">
        <div className="timeline-track" role="tablist" aria-label="Historical eras">
          {eras.map((era, idx) => {
            const isCurrent = activeIndex === idx;
            return (
              <button
                key={era.id}
                role="tab"
                id={`era-tab-${era.id}`}
                aria-selected={isCurrent}
                aria-controls={`era-panel-${era.id}`}
                tabIndex={isCurrent ? 0 : -1}
                onClick={() => setActiveIndex(idx)}
                className={`timeline-step-btn ${isCurrent ? "is-active" : ""}`}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="activeEraPill"
                    className="timeline-step-highlight"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <div className="timeline-step-content">
                  <span className="step-number">0{idx + 1}</span>
                  <div className="step-info">
                    <span className="step-period">{era.periodEn}</span>
                    <strong className="step-title" lang="ar">
                      {era.eraNameAr}
                    </strong>
                    <span className="step-sub">{era.eraNameEn}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Carousel Prev / Next Controls */}
        <div className="timeline-controls" aria-label="Era controls">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={prevEra}
            className="timeline-nav-arrow"
            aria-label="Previous historical era"
          >
            <ChevronLeft size={18} />
          </motion.button>

          <span className="timeline-counter">
            <History size={14} className="counter-icon" />
            <span>0{activeIndex + 1}</span>
            <small>/ 0{eras.length}</small>
          </span>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={nextEra}
            className="timeline-nav-arrow"
            aria-label="Next historical era"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>

      {/* Active Era Detailed Card with Motion Crossfade */}
      <div className="timeline-card-wrapper">
        <AnimatePresence mode="wait">
          <motion.article
            key={activeEra.id}
            id={`era-panel-${activeEra.id}`}
            role="tabpanel"
            aria-labelledby={`era-tab-${activeEra.id}`}
            className="era-showcase-card relative overflow-hidden group"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <LampEffect size="lg" />

            {/* Top Meta Header */}
            <div className="era-header relative z-10">
              <div className="era-badges">
                <span className="era-badge-pill">
                  <Calendar size={13} />
                  <span>{activeEra.periodEn}</span>
                </span>
                <span className="era-badge-pill arab-badge" lang="ar">
                  {activeEra.periodAr}
                </span>
                <span className="era-index-tag">
                  EPOCH 0{activeIndex + 1} / 0{eras.length}
                </span>
              </div>

              <div className="era-titles">
                <h3 lang="ar" className="era-title-ar">
                  {activeEra.eraNameAr}
                </h3>
                <h4 className="era-title-en">{activeEra.eraNameEn}</h4>
              </div>
            </div>

            {/* Significance Quote / Callout */}
            <div className="era-significance-box relative overflow-hidden group z-10">
              <LampEffect size="sm" />
              <div className="relative z-10 flex items-start gap-3 w-full">
                <Sparkles size={18} className="significance-icon shrink-0 mt-0.5" />
                <div className="significance-text">
                  <p lang="ar" className="significance-ar">
                    «{activeEra.significanceAr}»
                  </p>
                  <cite className="significance-en">
                    “{activeEra.significanceEn}”
                  </cite>
                </div>
              </div>
            </div>

            {/* In-depth Narrative Body */}
            <div className="era-narrative-columns">
              <div className="narrative-col arabic-col">
                <span className="col-label" lang="ar">
                  السياق والوقائع التاريخية
                </span>
                <p lang="ar" className="era-details-ar">
                  {activeEra.detailsAr}
                </p>
              </div>
              <div className="narrative-col english-col">
                <span className="col-label">Historical Context & Impact</span>
                <p className="era-details-en">{activeEra.detailsEn}</p>
              </div>
            </div>

            {/* Architectural Milestones & Relics */}
            <div className="era-footer-grid">
              <div className="era-milestones-box">
                <div className="box-title">
                  <Landmark size={15} />
                  <span>Key Architectural & Civic Milestones</span>
                </div>
                <ul className="milestone-list">
                  {activeEra.architecturalMilestones.map((milestone, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={14} className="milestone-check" />
                      <div>
                        <strong>{milestone}</strong>
                        {activeEra.architecturalMilestonesAr[idx] && (
                          <span lang="ar" className="milestone-ar">
                            {activeEra.architecturalMilestonesAr[idx]}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {activeEra.relicsOrRulers && (
                <div className="era-rulers-box">
                  <div className="box-title">
                    <Crown size={15} />
                    <span>Notable Figures, Rulers & Inscriptions</span>
                  </div>
                  <div className="ruler-content">
                    <p className="ruler-en">{activeEra.relicsOrRulers}</p>
                    {activeEra.relicsOrRulersAr && (
                      <p lang="ar" className="ruler-ar">
                        {activeEra.relicsOrRulersAr}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Timeline Footnote Navigation Help */}
      <div className="timeline-footer-bar">
        <span className="nav-hint">
          <kbd>←</kbd> <kbd>→</kbd> Use arrow keys to step between epochs
        </span>
        <span className="timeline-total-count">
          {eras.length} Recorded Epochs in {destinationName}&apos;s Living Memory
        </span>
      </div>
    </section>
  );
}
