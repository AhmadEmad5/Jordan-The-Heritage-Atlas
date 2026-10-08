"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  destinationEras,
  type Destination,
  type HistoricalEra,
} from "@/data/destinations";
import { useStoryPreference } from "./useStoryPreference";
import { LampEffect } from "@/components/ui/lamp";
import { CometCard } from "@/components/ui/comet-card";
import VoiceNarrationPlayer, { type NarrationTrack } from "@/components/VoiceNarrationPlayer";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const getMotionPreference = () => window.matchMedia(motionQuery).matches;
const getServerMotionPreference = () => true;

function getEraDateBadge(era: HistoricalEra): string {
  const p = era.periodEn;
  if (/million/i.test(p)) {
    const m = p.match(/^([0-9.]+)\s*Million\s*Years/i);
    if (m) return `${m[1]}M Yrs`;
  }
  const match = p.match(/^([0-9]+\s*(?:BCE|CE))/i);
  return match ? match[1] : p.split("–")[0].trim();
}

function getEraShortName(era: HistoricalEra): string {
  const name = era.eraNameEn;
  if (name.includes("Edomite")) return "Edomite";
  if (name.includes("Nabataean")) return "Nabataean";
  if (name.includes("Roman")) return "Roman";
  if (name.includes("Mar Elias")) return "Mar Elias";
  if (name.includes("Byzantine")) return "Byzantine";
  if (name.includes("Bitumen") || name.includes("Sodom")) return "Bitumen";
  if (name.includes("Herod")) return "Herodian";
  if (name.includes("Forest Reserve") || name.includes("Ancient Oak"))
    return "Forest Reserve";
  if (
    name.includes("Living Bedouin") ||
    name.includes("Living Heritage") ||
    name.includes("World Heritage")
  )
    return "Living Heritage";
  if (name.includes("Precambrian") || name.includes("Geological") || name.includes("Rift Valley"))
    return "Deep Time";
  if (name.includes("Thamudic")) return "Thamudic";
  if (name.includes("Arab Revolt") || name.includes("Revolt"))
    return "Great Revolt";
  if (name.includes("Neolithic") || name.includes("Natufian"))
    return "Prehistoric";
  if (name.includes("Decapolis") || name.includes("Antioch"))
    return "Decapolis";
  if (name.includes("Umayyad")) return "Umayyad";
  if (name.includes("Bronze") || name.includes("Rabbath")) return "Ammonite";
  if (name.includes("Essenes") || name.includes("Qumran")) return "Essenes";
  if (name.includes("Ayyubid") || name.includes("Saladin")) return "Ayyubid";
  if (name.includes("Mamluk")) return "Mamluk";
  if (name.includes("Ottoman")) return "Ottoman";
  if (name.includes("Philosophers") || name.includes("Gadara")) return "Gadara";
  if (
    name.includes("Modern") ||
    name.includes("Contemporary") ||
    name.includes("Biosphere") ||
    name.includes("Therapeutic")
  )
    return "Biosphere";
  return name.split(" ").slice(0, 2).join(" ");
}

/** Historical Eras Scrollytelling: The core chronological journey for every destination */
export default function Scrollytelling({
  destination: d,
}: {
  destination: Destination;
}) {
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotionPreference,
    getServerMotionPreference,
  );
  const [preference, setPreference] = useStoryPreference();
  const cinematic =
    preference === "cinematic" || (preference === "system" && !reducedMotion);
  const [activeScene, setActiveScene] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const activeSceneRef = useRef(0);
  const pendingJump = useRef<number | null>(null);

  const eras = d.eras || destinationEras[d.slug] || [];
  const scenes: HistoricalEra[] = eras.length > 0 ? eras : [];

  const narrationTracks: NarrationTrack[] = useMemo(() => {
    if (scenes.length > 0) {
      return scenes.map((s, idx) => ({
        id: s.eraNameEn,
        actTitleEn: `Epoch 0${idx + 1}: ${s.eraNameEn}`,
        actTitleAr: `الحقبة ٠${idx + 1}: ${s.eraNameAr}`,
        periodEn: s.periodEn,
        periodAr: s.periodAr,
        textEn: `${s.significanceEn} ${s.detailsEn}`,
        textAr: `${s.significanceAr} ${s.detailsAr}`,
      }));
    }
    return d.chapters.map((c, idx) => ({
      id: `chapter-${idx}`,
      actTitleEn: `Act 0${idx + 1}: ${c.title}`,
      actTitleAr: `الفصل ٠${idx + 1}: ${c.arabicSubtitle || c.title}`,
      periodEn: c.eyebrow,
      periodAr: c.eyebrow,
      textEn: `${c.body}. ${c.fact}`,
      textAr: `${c.body}. ${c.fact}`,
    }));
  }, [scenes, d.chapters]);

  const jumpToScene = useCallback(
    (index: number) => {
      const trigger = timeline.current?.scrollTrigger;
      const article =
        stage.current?.querySelectorAll<HTMLElement>(".cinema-scene")[index];
      const totalDuration = Math.max(2, scenes.length * 2);
      if (cinematic && trigger) {
        window.scrollTo({
          top:
            trigger.start +
            (trigger.end - trigger.start) * ((index * 2 + 0.5) / totalDuration),
          behavior: "smooth",
        });
      } else {
        article?.scrollIntoView({ behavior: "auto", block: "start" });
      }
    },
    [cinematic, scenes.length],
  );

  function chooseMode(mode: "cinematic" | "reading", enterStory = false) {
    setPreference(mode);
    const bounds = stage.current?.getBoundingClientRect();
    if (enterStory || (bounds && bounds.top <= 100 && bounds.bottom > 100))
      pendingJump.current = enterStory ? 0 : activeSceneRef.current;
    if ((mode === "cinematic") === cinematic) {
      pendingJump.current = null;
      if (enterStory) jumpToScene(0);
      return;
    }
  }

  // Keyboard navigation for jumping between epochs
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        jumpToScene(Math.min(scenes.length - 1, activeSceneRef.current + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        jumpToScene(Math.max(0, activeSceneRef.current - 1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jumpToScene, scenes.length]);

  useLayoutEffect(() => {
    const element = stage.current;
    if (!element) return;
    let frame = 0;
    let alive = true;
    let context: gsap.Context | undefined;
    if (cinematic) {
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const sceneElements = gsap.utils.toArray<HTMLElement>(
          ".cinema-scene",
          element,
        );
        const copies = sceneElements.map((scene) =>
          scene.querySelector<HTMLElement>(".scene-copy")!,
        );
        const dossierPanes = sceneElements.map((scene) =>
          scene.querySelector<HTMLElement>(".scene-dossier-pane"),
        );
        const backgrounds = sceneElements.map((scene) =>
          scene.querySelector<HTMLElement>(".scene-photo")!,
        );

        // Required setup for testing and initial animation state
        gsap.set(sceneElements.slice(1), { autoAlpha: 0, yPercent: 100 });
        gsap.set(copies.slice(1), { autoAlpha: 0, y: 44 });
        gsap.set(backgrounds, { scale: 1.04, force3D: true });
        gsap.set(".story-progress-fill", {
          scaleX: 0,
          transformOrigin: "left center",
        });

        const totalDuration = Math.max(2, sceneElements.length * 2);
        const sequence = gsap.timeline({
          onUpdate: () => {
            const index = Math.min(
              sceneElements.length - 1,
              Math.floor((sequence.time() + 0.05) / 2),
            );
            if (index !== activeSceneRef.current) {
              activeSceneRef.current = index;
              setActiveScene(index);
            }
          },
          scrollTrigger: {
            id: `story-${d.slug}`,
            trigger: element,
            start: "top top",
            end: () => `+=${window.innerHeight * (sceneElements.length * 1.5)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        timeline.current = sequence;

        sequence.to(
          ".story-progress-fill",
          { scaleX: 1, duration: totalDuration, ease: "none" },
          0,
        );

        sceneElements.forEach((scene, index) => {
          const at = index * 2;
          sequence.to(
            backgrounds[index],
            {
              scale: 1.12 + (index % 2) * 0.06,
              yPercent: index % 2 === 0 ? 2 : -2,
              duration: 2,
              ease: "none",
              force3D: true,
            },
            at,
          );

          if (!index) return;

          // Seamless crossfade: clean exit of previous scene before entrance of next scene
          sequence.to(
            sceneElements[index - 1],
            {
              autoAlpha: 0,
              yPercent: -15,
              duration: 0.45,
              ease: "power2.in",
            },
            at - 0.7,
          );

          sequence.to(
            scene,
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            at - 0.35,
          );

          sequence.to(
            copies[index],
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
            },
            at - 0.2,
          );

          if (dossierPanes[index]) {
            sequence.to(
              dossierPanes[index]!,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
              },
              at - 0.1,
            );
          }
        });
      }, root);

      // Re-measure after local fonts load; guard the asynchronous callback on unmount.
      document.fonts?.ready.then(() => {
        if (alive) timeline.current?.scrollTrigger?.refresh();
      });
    }

    if (pendingJump.current !== null) {
      const index = pendingJump.current;
      pendingJump.current = null;
      frame = requestAnimationFrame(() => {
        const trigger = timeline.current?.scrollTrigger;
        const article =
          element.querySelectorAll<HTMLElement>(".cinema-scene")[index];
        const totalDuration = Math.max(2, scenes.length * 2);
        const top =
          cinematic && trigger
            ? trigger.start +
              (trigger.end - trigger.start) *
                ((index * 2 + 0.5) / totalDuration)
            : (article?.getBoundingClientRect().top ?? 0) +
              window.scrollY -
              100;
        window.scrollTo({ top, behavior: "instant" });
      });
    }

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      context?.revert();
      timeline.current = null;
    };
  }, [cinematic, d.slug, scenes.length]);

  return (
    <div
      className="story-experience"
      data-motion={cinematic ? "cinematic" : "reading"}
      ref={root}
    >
      <section className="story-hero">
        <Image
          src={d.image}
          alt={`${d.name}, Jordan`}
          fill
          priority
          loading="eager"
          sizes="100vw"
        />
        <div className="story-vignette" />
        <div className="story-hero-copy">
          <p className="eyebrow">
            {d.region} &nbsp; / &nbsp; CHRONOLOGICAL HERITAGE SCROLLYTELLING
          </p>
          <p className="story-arabic" lang="ar">
            {d.arabic}
          </p>
          <h1>{d.name}</h1>
          <p>{d.subtitle}</p>
          {d.quote && (
            <blockquote className="story-hero-quote">
              <p className="quote-arabic" lang="ar">
                «{d.quote.ar}»
              </p>
              <cite className="quote-english">“{d.quote.en}”</cite>
            </blockquote>
          )}
          <div className="story-entry">
            <button
              className="enter-story"
              onClick={() => chooseMode("cinematic", true)}
            >
              <Play size={14} fill="currentColor" />{" "}
              {cinematic ? "Enter the story" : "Enable cinematic story"}
              <ArrowDown size={18} />
            </button>
            <button
              className="reading-choice"
              onClick={() => {
                chooseMode("reading", true);
              }}
            >
              <BookOpen size={15} /> Read at your pace
            </button>
          </div>
          <p className="motion-explanation">
            {cinematic
              ? "Five historical epochs. Scroll to journey through millennia of living heritage."
              : reducedMotion && preference === "system"
                ? "Reading mode follows your device’s reduced-motion setting. Cinematic mode is your choice."
                : "Reading mode is on. All five historical epochs are displayed without animation."}
          </p>
        </div>
        <span className="hero-coordinate">
          {d.coordinates.lat.toFixed(3)}° N &nbsp;{" "}
          {d.coordinates.lng.toFixed(3)}° E
        </span>
      </section>

      <section
        id="chapters"
        ref={stage}
        className={`cinema-stage ${cinematic ? "is-cinematic" : "is-reading"}`}
        data-active-scene={activeScene + 1}
        aria-label={`${d.name} story chapters`}
      >
        <div id="chronology" className="chronology-anchor" />
        <div className="story-hud">
          {/* Luminous Top Progress Rail */}
          <div className="hud-rail" aria-hidden="true">
            <div
              className="hud-rail-fill"
              style={{
                width: `${scenes.length > 1 ? (activeScene / (scenes.length - 1)) * 100 : 100}%`,
              }}
            />
            <div className="hud-rail-ticks">
              {scenes.map((_, i) => (
                <span
                  key={i}
                  className={`hud-rail-tick ${i <= activeScene ? "is-passed" : ""} ${i === activeScene ? "is-active" : ""}`}
                  style={{
                    left: `${scenes.length > 1 ? (i / (scenes.length - 1)) * 100 : 0}%`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Left: Origin Breadcrumb & Era Chapter Tabs Grouped Together */}
          <div className="hud-left-group">
            <div className="hud-origin-group">
              <Link href="/" className="hud-origin-link" title="Return to Jordan Atlas">
                <ArrowLeft size={13} />
                <span className="hud-origin-text">The atlas</span>
              </Link>
              <span className="hud-origin-divider">/</span>
              <span className="hud-origin-name">{d.name}</span>
            </div>

            <div className="story-chapter-tabs" aria-label="Story chapters">
              {scenes.map((era, index) => {
                const isCurrent = cinematic && activeScene === index;
                const shortTitle = getEraShortName(era);
                const dateBadge = getEraDateBadge(era);
                return (
                  <button
                    key={era.id}
                    onClick={() => jumpToScene(index)}
                    aria-current={isCurrent ? "step" : undefined}
                    className={`chapter-tab-btn ${isCurrent ? "is-active-tab" : ""}`}
                    title={`${era.eraNameEn} (${era.periodEn})`}
                  >
                    {isCurrent && (
                      <motion.span
                        layoutId="activeScenePill"
                        className="scene-tab-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 28,
                        }}
                      />
                    )}
                    <span className="tab-idx">0{index + 1}</span>
                    <span className="tab-label">{shortTitle}</span>
                    <span className="tab-date">{dateBadge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Live Era Chronicle Badge */}
          <div className="hud-center-chronicle hidden 2xl:flex" aria-hidden="true">
            <div className="chronicle-badge">
              <span className="pulse-dot" />
              <span>{d.name} CHRONOLOGY</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="chronicle-active-title"
              >
                <span className="chronicle-era-en">
                  {getEraShortName(scenes[activeScene])} ({getEraDateBadge(scenes[activeScene])})
                </span>
                <span className="chronicle-era-sep">·</span>
                <span className="chronicle-era-ar" lang="ar">
                  {scenes[activeScene]?.eraNameAr.split("و")[0].split("في")[0].trim()}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Controls & Stepper */}
          <div className="hud-controls-group">
            <div
              className="hud-slide-stepper"
              aria-label="Slide stepping controls"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => jumpToScene(Math.max(0, activeScene - 1))}
                disabled={activeScene === 0}
                aria-label="Previous chapter slide"
                className="hud-stepper-btn"
                title="Previous epoch (← Left arrow)"
              >
                <ChevronLeft size={16} />
              </motion.button>
              <div className="hud-stepper-counter">
                <span className="counter-current">0{activeScene + 1}</span>
                <span className="counter-divider">/</span>
                <span className="counter-total">0{scenes.length}</span>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() =>
                  jumpToScene(Math.min(scenes.length - 1, activeScene + 1))
                }
                disabled={activeScene === scenes.length - 1}
                aria-label="Next chapter slide"
                className="hud-stepper-btn"
                title="Next epoch (→ Right arrow)"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="story-mode-toggle"
              onClick={() => chooseMode(cinematic ? "reading" : "cinematic")}
              aria-label={
                cinematic
                  ? "Switch to reading mode"
                  : "Switch to cinematic mode"
              }
            >
              {cinematic ? (
                <>
                  <span className="mode-indicator is-cinematic-mode" />
                  <Pause size={13} />
                  <span>Reading mode</span>
                </>
              ) : (
                <>
                  <span className="mode-indicator is-reading-mode" />
                  <Play size={13} fill="currentColor" />
                  <span>Cinematic mode</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        <div className="story-scenes">
          {scenes.map((era, index) => {
            const chapter = d.chapters[index];
            return (
              <article
                key={era.id}
                className={`cinema-scene scene-${index + 1} era-scene`}
                data-chapter={index + 1}
                aria-labelledby={`chapter-title-${index}`}
              >
                {index === 1 && (
                  <div
                    className="diagram-line"
                    style={{ transform: "scaleX(1)", opacity: 0.7 }}
                    aria-hidden="true"
                  />
                )}
                <div className="scene-visual" aria-hidden="true">
                  <Image
                    className="scene-photo"
                    src={era.image || d.image}
                    alt=""
                    fill
                    sizes="100vw"
                  />
                  <div className="scene-shade" />
                </div>

                {/* Subtle background watermark */}
                <span
                  className="scene-calligraphy"
                  lang="ar"
                  aria-hidden="true"
                >
                  {era.eraNameAr.split(" ")[0]}
                </span>

                <div className="scene-container">
                  {/* Left Column: Era Identity, Titles, and Quote */}
                  <div className="scene-hero-pane scene-copy">
                    <div className="scene-act">
                      <span className="epoch-pill">
                        EPOCH 0{index + 1} / 0{scenes.length}
                      </span>
                      <i />
                      <span className="period-badge">
                        {era.periodEn} ·{" "}
                        <span lang="ar">{era.periodAr}</span>
                      </span>
                    </div>

                    <h3 className="scene-era-ar" lang="ar">
                      {era.eraNameAr}
                    </h3>
                    <h2
                      id={`chapter-title-${index}`}
                      className="scene-era-en"
                    >
                      {era.eraNameEn}
                    </h2>

                    {/* Preserves chapter heading for accessibility and tests */}
                    {chapter && (
                      <h4 className="scene-chapter-subtitle">
                        <span className="tiny-bullet" aria-hidden="true">✦ </span>{chapter.title}
                      </h4>
                    )}

                    <blockquote className="scene-significance relative overflow-hidden group">
                      <LampEffect size="sm" />
                      <div className="relative z-10">
                        <p lang="ar">«{era.significanceAr}»</p>
                        <cite>“{era.significanceEn}”</cite>
                      </div>
                    </blockquote>
                  </div>

                  {/* Right Column: Historical Narrative & Dossier Card */}
                  <div className="scene-dossier-pane">
                    <CometCard className="w-full h-full">
                      <div className="p-5 md:p-6 flex flex-col gap-3 relative h-full">
                        <LampEffect size="md" />
                        <div className="dossier-narrative relative z-10">
                          <p className="scene-body">{era.detailsEn}</p>
                          <p className="scene-body-ar" lang="ar">
                            {era.detailsAr}
                          </p>
                        </div>

                        {/* Architectural Milestones */}
                        {era.architecturalMilestones &&
                          era.architecturalMilestones.length > 0 && (
                            <div
                              className="scene-milestones relative z-10"
                              aria-label="Architectural milestones"
                            >
                              <div className="milestones-header">
                                <Sparkles size={12} className="milestones-icon" />
                                <span className="milestones-tag">
                                  ARCHITECTURAL MILESTONES · شواهد العمارة
                                </span>
                              </div>
                              <ul className="milestones-list">
                                {era.architecturalMilestones
                                  .slice(0, 3)
                                  .map((item, mIdx) => (
                                    <motion.li
                                      key={mIdx}
                                      whileHover={{ x: 5 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 24,
                                      }}
                                    >
                                      <span className="milestone-bullet text-amber-400">✦</span>
                                      <span className="milestone-text">
                                        {item}
                                        {era.architecturalMilestonesAr &&
                                          era.architecturalMilestonesAr[mIdx] && (
                                            <small lang="ar">
                                              {" "}
                                              ·{" "}
                                              {era.architecturalMilestonesAr[mIdx]}
                                            </small>
                                          )}
                                      </span>
                                    </motion.li>
                                  ))}
                              </ul>
                            </div>
                          )}

                        {/* Relics and Archaeological Records */}
                        {era.relicsOrRulers && (
                          <div className="scene-relics-strip relative z-10">
                            <span className="relics-badge">ARCHAEOLOGICAL RECORD</span>
                            <p>
                              {era.relicsOrRulers}
                              {era.relicsOrRulersAr && (
                                <span lang="ar"> · {era.relicsOrRulersAr}</span>
                              )}
                            </p>
                          </div>
                        )}

                        {index === scenes.length - 1 && (
                          <a
                            href="#explore"
                            className="scene-visit-link relative z-10 group"
                          >
                            <span>Make this journey yours</span>
                            <ArrowUpRight
                              size={16}
                              className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                          </a>
                        )}
                      </div>
                    </CometCard>
                  </div>
                </div>

                <div className="scene-coordinate" aria-hidden="true">
                  <span>{d.coordinates.lat.toFixed(2)}° N</span>
                  <span>{d.coordinates.lng.toFixed(2)}° E</span>
                </div>

                <span className="scene-folio" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} / 0{scenes.length}
                </span>
              </article>
            );
          })}
        </div>
        <div className="story-progress" aria-hidden="true">
          <div className="story-progress-fill" />
        </div>
        <div className="story-scroll-cue" aria-hidden="true">
          <span>
            {activeScene === scenes.length - 1
              ? "YOUR JOURNEY CONTINUES BELOW"
              : "KEEP SCROLLING TO UNFOLD THE STORY"}
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
          >
            <ArrowDown size={15} />
          </motion.div>
        </div>

        {/* Documentary Audio Narration HUD */}
        <VoiceNarrationPlayer
          tracks={narrationTracks}
          activeTrackIndex={activeScene}
          onTrackChange={(idx) => jumpToScene(idx)}
          destinationNameEn={d.name}
          destinationNameAr={d.arabic}
        />
      </section>
    </div>
  );
}
