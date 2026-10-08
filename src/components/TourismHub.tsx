"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Mountain,
  Landmark,
  Compass,
  Sparkles,
  Search,
  X,
  Volume2,
  VolumeX,
  Globe,
} from "lucide-react";
import JordanMap from "@/components/map/JordanMap";
import { destinations, type Category } from "@/data/destinations";
import { CometCard } from "@/components/ui/comet-card";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Lens } from "@/components/ui/lens";
import ItineraryPlanner from "@/components/ItineraryPlanner";
import ArtifactShowcase from "@/components/ArtifactShowcase";
import NabataeanTranslator from "@/components/NabataeanTranslator";
import HeritagePassport from "@/components/HeritagePassport";
import {
  setHeritageTheme,
  type HeritageThemeKey,
} from "@/components/ui/HeritageCanvasBackground";
import { useLanguage } from "@/context/LanguageContext";
import { ambientEngine } from "@/lib/ambientSound";

const filters = [
  "All places",
  "Ancient wonders",
  "Wild landscapes",
  "Living heritage",
] as const;

const realms = [
  {
    tag: "NORTHERN HIGHLANDS · إقليم الشمال",
    title: "Irbid, Jerash & Ajloun",
    subtitleAr: "غابات السنديان، بومبي الشرق، وجدارا البازلتية",
    description:
      "Ancient Decapolis cities chiseled in basalt and limestone, millennial olive groves, and hilltop Ayyubid fortresses overlooking the Jordan Rift.",
    highlights: [
      "Ancient Gerasa Colonnaded Cardo (Jerash)",
      "Saladin's Fortress & Forest Reserve (Ajloun)",
      "Gadara Basalt Theatres & Lake Vista (Umm Qais)",
    ],
    theme: "jerash" as const,
    image: "/images/jerash.jpg",
    coordinates: "32°20′ N · DECAPOLIS",
    glowColor: "rgba(197, 160, 89, 0.4)",
    roman: "Realm I",
    link: "/destinations/jerash",
  },
  {
    tag: "CENTRAL PLATEAU & RIFT · إقليم الوسط والغور",
    title: "Amman, Balqa & Madaba",
    subtitleAr: "عاصمة الحضارات، جبل القلعة، وأخفض بقعة في العالم",
    description:
      "Seven millennia of crowned history across white stone hills, plunging into the hyper-saline therapeutic waters of the world's lowest continental basin.",
    highlights: [
      "Temple of Hercules & Umayyad Palace (Amman)",
      "Salt Crystalline Shores & Mineral Oases (Dead Sea)",
      "Historic Ottoman Townscape & Trail of Heritage (As-Salt)",
    ],
    theme: "amman-citadel" as const,
    image: "/images/deadsea.jpg",
    coordinates: "31°57′ N · CALIPHATE",
    glowColor: "rgba(27, 122, 130, 0.4)",
    roman: "Realm II",
    link: "/destinations/amman-citadel",
  },
  {
    tag: "SOUTHERN DESERT & GULF · إقليم الجنوب والبادية",
    title: "Ma'an, Wadi Rum & Aqaba",
    subtitleAr: "أعجوبة الأنباط الوردية، وادي القمر، وبوابة البحر الأحمر",
    description:
      "The legendary Nabataean capital carved into rose cliffs, vast silence of monolithic crimson sand canyons, and pristine coral reefs of the Gulf of Aqaba.",
    highlights: [
      "Rose-Red Treasury, Siq & Monastery (Petra)",
      "Cosmic Dark Sky Monoliths & Bedouin Zarb (Wadi Rum)",
      "King's Highway Historical Mountain Passes",
    ],
    theme: "petra" as const,
    image: "/images/petra.jpg",
    coordinates: "30°19′ N · NABATAEA",
    glowColor: "rgba(179, 84, 70, 0.45)",
    roman: "Realm III",
    link: "/destinations/petra",
  },
];

export default function TourismHub() {
  const { language, toggleLanguage, isArabic, t } = useLanguage();
  const [filter, setFilter] = useState<Category | "All places">("All places");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [featured, setFeatured] = useState(destinations[0]);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<"atlas" | "places" | "realms">("atlas");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = [
        { id: "realms" as const, threshold: 300 },
        { id: "places" as const, threshold: 300 },
        { id: "atlas" as const, threshold: 100 },
      ];

      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveNav(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredByCategory = destinations.filter(
    (d) => filter === "All places" || d.category === filter,
  );

  const visible = searchQuery.trim()
    ? filteredByCategory.filter((d) => {
        const q = searchQuery.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.arabic.includes(q) ||
          d.region.toLowerCase().includes(q) ||
          d.hook.toLowerCase().includes(q) ||
          d.governorate.en.toLowerCase().includes(q) ||
          d.governorate.ar.includes(q)
        );
      })
    : filteredByCategory;

  return (
    <main className="atlas-shell">
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="wordmark">
          jordan<span>THE HERITAGE ATLAS</span>
        </Link>

        <nav className="header-nav-dock" aria-label="Main navigation">
          <a
            href="#atlas"
            onClick={() => setActiveNav("atlas")}
            className={`header-nav-item ${activeNav === "atlas" ? "active" : ""}`}
          >
            <MapPin size={13} className="text-[#d49b6a]" />
            <span>{t("Explore the map", "استكشف الخريطة")}</span>
            {activeNav === "atlas" && (
              <motion.div
                layoutId="headerNavPill"
                className="header-nav-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </a>

          <a
            href="#places"
            onClick={() => setActiveNav("places")}
            className={`header-nav-item ${activeNav === "places" ? "active" : ""}`}
          >
            <Compass size={13} className="text-[#d49b6a]" />
            <span>{t("The collection", "المجموعة التراثية")}</span>
            {activeNav === "places" && (
              <motion.div
                layoutId="headerNavPill"
                className="header-nav-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </a>

          <a
            href="#realms"
            onClick={() => setActiveNav("realms")}
            className={`header-nav-item ${activeNav === "realms" ? "active" : ""}`}
          >
            <Sparkles size={13} className="text-[#d49b6a]" />
            <span>{t("The realms", "أقاليم الأردن")}</span>
            {activeNav === "realms" && (
              <motion.div
                layoutId="headerNavPill"
                className="header-nav-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </a>
        </nav>

        <div className="header-right">
          <button
            type="button"
            onClick={() => {
              if (ambientEngine) {
                const active = ambientEngine.toggle();
                setIsSoundOn(active);
              }
            }}
            className={`header-sound-btn ${isSoundOn ? "is-active" : ""}`}
            title={
              isSoundOn
                ? t("Mute ambient sound", "كتم الصوت المحيطي")
                : t("Play ambient sound", "تشغيل الصوت المحيطي")
            }
            aria-label={
              isSoundOn ? "Mute ambient atmosphere" : "Play ambient atmosphere"
            }
          >
            {isSoundOn ? (
              <Volume2 size={13} className="text-amber-300 animate-pulse" />
            ) : (
              <VolumeX size={13} />
            )}
            <span className="hidden sm:inline">
              {isSoundOn ? t("AUDIO ON", "الصوت نشط") : t("AMBIENCE", "الصوت")}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className="header-lang-btn"
            aria-label={t("Switch to Arabic", "التبديل إلى الإنجليزية")}
            title={t("Switch to Arabic", "التبديل إلى الإنجليزية")}
          >
            <Globe size={13} className="text-[#d49b6a]" />
            <span>{isArabic ? "EN" : "عربي"}</span>
          </button>

          <div className="header-curation-badge hidden xl:flex">
            <span className="radar-dot" />
            <span>{t("12 WONDERS · 5 MILLENNIA", "١٢ معلماً · ٥ آلاف عام")}</span>
          </div>

          <motion.a
            className="header-cta"
            href="#places"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span>{t("Find your wonder", "اكتشف المعالم")}</span>
            <span className="header-cta-arrow">
              <ArrowUpRight size={13} />
            </span>
          </motion.a>
        </div>
      </header>
      <section className="atlas-hero" id="atlas">
        <motion.div
          className="hero-editorial"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">
            <span className="tiny-star">✳</span> A SMALL KINGDOM. A WORLD OF
            WONDER.
          </p>
          <h1>
            A land of
            <br />
            timeless
            <br />
            <em>possibilities.</em>
          </h1>
          <p className="hero-intro">
            Ancient cities. Untamed landscapes. Stories that stay with you. Let
            your curiosity be your compass.
          </p>
          <div className="explore-hint">
            <span>
              <Compass size={19} />
            </span>
            Choose a place on the map.
            <br />
            Begin a story of your own.
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={featured.slug}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={`/destinations/${featured.slug}`}
                className="featured-card"
              >
                <Image
                  src={featured.image}
                  alt={featured.name}
                  width={560}
                  height={320}
                  priority
                />
                <div className="featured-shade" />
                <div className="featured-content">
                  <span className="eyebrow">YOUR NEXT CHAPTER</span>
                  <h2>
                    {featured.name} <span lang="ar">{featured.arabic}</span>
                  </h2>
                  <p>{featured.hook}</p>
                </div>
                <span className="card-arrow">
                  <ArrowUpRight size={22} />
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="atlas-panel">
          <div className="atlas-panel-heading">
            <span className="eyebrow">THE KINGDOM, AT A GLANCE</span>
            <span className="map-live">
              <i /> {visible.length} places to discover
            </span>
          </div>
          <div className="filter-row" aria-label="Filter destinations">
            {filters.map((f, i) => {
              const Icon = [Compass, Landmark, Mountain, MapPin][i];
              const isSelected = filter === f;
              return (
                <motion.button
                  key={f}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setFilter(f);
                    setFeatured(
                      destinations.find(
                        (d) => f === "All places" || d.category === f,
                      )!,
                    );
                  }}
                  className={isSelected ? "selected" : ""}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 450, damping: 26 }}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeFilterPill"
                      className="filter-pill-bg"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon size={14} />
                  <span>{f}</span>
                </motion.button>
              );
            })}
          </div>
          <JordanMap
            filter={filter}
            onPreview={(dest) => {
              setFeatured(dest);
              setHeritageTheme(dest.slug as HeritageThemeKey);
            }}
          />
          <div className="map-footnote">
            <span>
              <i className="legend-dot" /> A story waiting to be explored
            </span>
            <span>29°–33° N &nbsp; / &nbsp; 35°–39° E</span>
          </div>
        </div>
      </section>
      <div className="editorial-strip">
        <span>MORE THAN A DESTINATION</span>
        <p>
          Come for the wonder. <em>Stay for the welcome.</em>
        </p>
        <span lang="ar">أهلاً وسهلاً</span>
      </div>
      <section className="collection" id="places">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("THE COLLECTION", "المجموعة التراثية")}</p>
            <h2>{t("Find your kind of extraordinary.", "روعة التراث الأردني الخالد.")}</h2>
          </div>
          <div className="collection-search-wrap">
            <div className="relative flex items-center">
              <Search
                size={15}
                className="absolute left-3.5 text-[#d49b6a] pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(
                  "Search city, era, or wonder...",
                  "ابحث باسم المدينة أو العصر...",
                )}
                className="collection-search-input"
                aria-label="Search destinations"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <span className="search-count-badge">
              {visible.length} / {destinations.length} {t("wonders", "معالم")}
            </span>
          </div>
        </div>
        <div className="destination-grid">
          {visible.length === 0 ? (
            <div className="collection-empty-state">
              <p className="text-amber-200/80 text-sm mb-3 font-serif">
                {t(
                  `No wonders matching "${searchQuery}" in this category.`,
                  `لم يتم العثور على معالم مطابقة لـ "${searchQuery}".`,
                )}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setFilter("All places");
                }}
                className="px-4 py-2 rounded-full border border-amber-300/30 text-xs text-amber-200 hover:bg-amber-300/10 transition-colors"
              >
                {t("Reset filters & search", "إعادة ضبط البحث")}
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {visible.map((d, i) => (
                <motion.div
                  key={d.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 28,
                  }}
                  className="h-full"
                >
                  <CometCard className="h-full">
                    <Link
                      href={`/destinations/${d.slug}`}
                      className="destination-card block h-full select-none"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      onMouseEnter={() =>
                        setHeritageTheme(d.slug as HeritageThemeKey)
                      }
                      onMouseLeave={() => setHeritageTheme(null)}
                    >
                      <div
                        className="destination-photo"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        <Image
                          src={d.image}
                          alt={d.name}
                          width={560}
                          height={420}
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <span className="photo-index">0{i + 1}</span>
                        <ArrowUpRight className="photo-arrow" size={22} />
                      </div>
                    <div
                      className="destination-details"
                      style={{ transform: "translateZ(25px)" }}
                    >
                      <div className="card-top-meta">
                        <span className="eyebrow">{d.category}</span>
                        <span className="governorate-badge" lang="ar">
                          {d.governorate.ar}
                        </span>
                      </div>
                      <h3>
                        {d.name}{" "}
                        <span className="card-arabic" lang="ar">
                          {d.arabic}
                        </span>
                      </h3>
                      <p>{d.hook}</p>
                      <div className="card-footer-meta">
                        <span className="region">
                          <MapPin size={12} />
                          {d.region}
                        </span>
                        <span className="explore-action">
                          Explore story <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </CometCard>
              </motion.div>
            ))}
          </AnimatePresence>
          )}
        </div>
      </section>

      {/* The Three Great Realms of Jordan — Powered by Aceternity InfiniteMovingCards */}
      <section className="regions-showcase overflow-hidden" id="realms">
        <div className="section-heading mb-8">
          <div>
            <p className="eyebrow">
              THE REALMS OF JORDAN · أقاليم المملكة الأردنية الهاشمية
            </p>
            <h2>Three Lands. One Living Heritage.</h2>
          </div>
          <p>
            From the emerald oak forests of the north to the crimson sandstone
            cathedrals
            <br />
            of the south, each governorate holds its own distinctive voice and
            living memory.
          </p>
        </div>

        <InfiniteMovingCards
          items={realms}
          direction="left"
          speed="normal"
          pauseOnHover={true}
          className="w-full max-w-full py-4"
          itemClassName="w-[400px] md:w-[470px] p-0 border-0 bg-transparent shadow-none"
          renderItem={(realm) => (
            <Lens
              zoomFactor={1.22}
              lensSize={190}
              className="h-full w-[400px] md:w-[470px] rounded-3xl"
              lensRingColor={realm.glowColor}
            >
              <div
                className="group relative h-full w-[400px] md:w-[470px] rounded-3xl overflow-hidden border border-[rgba(226,199,153,0.22)] bg-gradient-to-b from-[#16141a]/95 via-[#0e0d12]/92 to-[#08070b]/98 backdrop-blur-2xl p-7 md:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.75)] transition-all duration-500 hover:border-[rgba(226,199,153,0.6)] hover:shadow-[0_25px_65px_-10px_rgba(0,0,0,0.95)] hover:-translate-y-1 select-none"
                onMouseEnter={() => setHeritageTheme(realm.theme)}
                onMouseLeave={() => setHeritageTheme(null)}
              >
                {/* Atmospheric Image Backdrop with Soft Gradient Fade */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                  <Image
                    src={realm.image}
                    alt={realm.title}
                    fill
                    sizes="470px"
                    className="object-cover opacity-18 scale-100 transition-all duration-700 ease-out group-hover:scale-108 group-hover:opacity-28"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08070b] via-[#0e0d12]/85 to-[#16141a]/60" />
                  <div
                    className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-75"
                    style={{
                      background: `radial-gradient(circle at 80% 20%, ${realm.glowColor}, transparent 65%)`,
                    }}
                  />
                </div>

                {/* Top-Edge Illuminated Rim (Lamp effect highlight) */}
                <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[rgba(226,199,153,0.55)] to-transparent opacity-80 group-hover:opacity-100 group-hover:via-[rgba(226,199,153,0.95)] transition-all duration-500" />

                {/* Header Section */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-[rgba(226,199,153,0.12)] text-[#e5b98f] border border-[rgba(226,199,153,0.28)] shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                      {realm.tag}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider text-amber-200/60 uppercase">
                      {realm.coordinates}
                    </span>
                  </div>

                  <h3 className="font-display font-serif text-2xl md:text-3xl text-[#f5efe6] font-semibold tracking-tight mb-1.5 group-hover:text-amber-100 transition-colors duration-300">
                    {realm.title}
                  </h3>
                  <h4
                    lang="ar"
                    className="font-arabic-heading text-base md:text-lg text-[#e5b98f] mb-4 font-normal tracking-wide"
                  >
                    {realm.subtitleAr}
                  </h4>

                  <p className="text-[#c7c2ba] text-[13px] leading-relaxed mb-6 font-light">
                    {realm.description}
                  </p>
                </div>

                {/* Features & Action Footer */}
                <div className="relative z-10 pt-5 border-t border-[rgba(226,199,153,0.16)]">
                  <ul className="space-y-2.5 mb-6">
                    {realm.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-stone-200/90 leading-snug"
                      >
                        <span className="text-[#e5b98f] text-xs mt-0.5 select-none">◈</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href={realm.link}
                      className="inline-flex items-center gap-2 text-xs font-medium text-[#e5b98f] hover:text-white transition-colors group/link"
                    >
                      <span>Explore {realm.title.split(",")[0]}</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </Link>
                    <span className="text-[11px] font-serif italic text-stone-400/80">
                      {realm.roman}
                    </span>
                  </div>
                </div>
              </div>
            </Lens>
          )}
        />
      </section>

      {/* Smart Route & Expedition Itinerary Planner */}
      <ItineraryPlanner />

      {/* 3D Virtual Archaeological Relic Showcase */}
      <ArtifactShowcase />

      {/* Ancient Nabataean Script Visualizer & Epigraphic Studio */}
      <NabataeanTranslator />

      {/* Digital Heritage Passport & Stamp Collector */}
      <HeritagePassport />

      <section className="journey-banner">
        <p className="eyebrow">FOLLOW THE STORIES SOUTH</p>
        <h2>
          From olive groves
          <br />
          to <em>infinite desert.</em>
        </h2>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link href="/destinations/wadi-rum" className="solid-button">
            Discover Wadi Rum <ArrowRight size={17} />
          </Link>
        </motion.div>
      </section>
      <footer className="atlas-footer">
        <Link href="/" className="wordmark">
          jordan<span>THE HERITAGE ATLAS</span>
        </Link>
        <p>Made for the curious. Rooted in the remarkable.</p>
        <a href="/image-credits.txt">Photography credits</a>
        <a
          href="https://international.visitjordan.com/where-to-go/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official travel information <ArrowUpRight size={14} />
        </a>
      </footer>

      {/* Floating Mobile Bottom Navigation Dock */}
      <nav className="mobile-bottom-dock" aria-label="Mobile navigation">
        <a
          href="#atlas"
          className={`mobile-dock-item ${activeNav === "atlas" ? "active" : ""}`}
          aria-label="Map"
        >
          <MapPin size={16} />
          <span>{t("Map", "الخريطة")}</span>
        </a>
        <a
          href="#places"
          className={`mobile-dock-item ${activeNav === "places" ? "active" : ""}`}
          aria-label="Collection"
        >
          <Compass size={16} />
          <span>{t("Places", "المعالم")}</span>
        </a>
        <a
          href="#realms"
          className={`mobile-dock-item ${activeNav === "realms" ? "active" : ""}`}
          aria-label="Realms"
        >
          <Sparkles size={16} />
          <span>{t("Realms", "الأقاليم")}</span>
        </a>
        <button
          type="button"
          onClick={toggleLanguage}
          className="mobile-dock-item"
          aria-label="Switch language"
        >
          <Globe size={16} />
          <span>{isArabic ? "EN" : "عربي"}</span>
        </button>
      </nav>
    </main>
  );
}
