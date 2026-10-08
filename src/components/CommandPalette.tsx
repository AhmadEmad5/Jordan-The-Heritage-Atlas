"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  MapPin,
  Sparkles,
  Utensils,
  BookOpen,
  ArrowRight,
  CornerDownLeft,
  X,
  Compass,
  Sunrise,
  Scroll,
  Award,
  Volume2,
  Globe,
  Layers,
  ChevronRight,
} from "lucide-react";
import { destinations } from "@/data/destinations";
import { useLanguage } from "@/context/LanguageContext";
import { ambientEngine } from "@/lib/ambientSound";

export type PaletteCategory =
  | "all"
  | "places"
  | "eras"
  | "artifacts"
  | "culinary"
  | "actions";

interface SearchItem {
  id: string;
  category: "places" | "eras" | "artifacts" | "culinary" | "actions";
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  badgeEn?: string;
  badgeAr?: string;
  keywords: string[];
  icon: typeof MapPin;
  action: () => void;
  url?: string;
}

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenPassport?: () => void;
  onOpenTranslator?: () => void;
}

export default function CommandPalette({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  onOpenPassport,
  onOpenTranslator,
}: CommandPaletteProps) {
  const router = useRouter();
  const { language, toggleLanguage, isArabic, t } = useLanguage();

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PaletteCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const closePalette = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
    setQuery("");
    setSelectedIndex(0);
  };

  // Global hotkey listener (Cmd+K / Ctrl+K / '/' key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          setInternalIsOpen(true);
        }
        return;
      }

      // Open on '/' if not in an input
      if (
        e.key === "/" &&
        !isOpen &&
        !(
          document.activeElement instanceof HTMLInputElement ||
          document.activeElement instanceof HTMLTextAreaElement ||
          document.activeElement?.getAttribute("contenteditable") === "true"
        )
      ) {
        e.preventDefault();
        setInternalIsOpen(true);
        return;
      }

      // Close on Escape
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build searchable database
  const items: SearchItem[] = useMemo(() => {
    const list: SearchItem[] = [];

    // 1. Destinations
    destinations.forEach((d) => {
      list.push({
        id: `dest-${d.slug}`,
        category: "places",
        titleEn: d.name,
        titleAr: d.arabic,
        subtitleEn: `${d.region} · ${d.category}`,
        subtitleAr: `${d.governorate.ar} · ${d.category}`,
        badgeEn: d.category,
        badgeAr: d.category,
        keywords: [
          d.name,
          d.arabic,
          d.region,
          d.hook,
          d.subtitle,
          d.governorate.en,
          d.governorate.ar,
          d.slug,
        ],
        icon: MapPin,
        url: `/destinations/${d.slug}`,
        action: () => {
          router.push(`/destinations/${d.slug}`);
          closePalette();
        },
      });

      // Culinary per destination
      if (d.culinary) {
        list.push({
          id: `food-${d.slug}`,
          category: "culinary",
          titleEn: d.culinary.dishEn,
          titleAr: d.culinary.dishAr,
          subtitleEn: `Traditional Feast · Origin: ${d.name}`,
          subtitleAr: `مطبخ وتراث أصيل · منبع: ${d.arabic}`,
          badgeEn: "Gastronomy",
          badgeAr: "مطبخ تراثي",
          keywords: [
            d.culinary.dishEn,
            d.culinary.dishAr,
            d.culinary.storyEn,
            d.culinary.storyAr,
            d.name,
            d.arabic,
            "food",
            "cuisine",
            "أكل",
            "طعام",
          ],
          icon: Utensils,
          url: `/destinations/${d.slug}#culinary`,
          action: () => {
            router.push(`/destinations/${d.slug}#culinary`);
            closePalette();
          },
        });
      }
    });

    // 2. Eras & Historical Periods
    const erasData = [
      {
        id: "era-nabataean",
        titleEn: "Nabataean Kingdom (312 BCE – 106 CE)",
        titleAr: "مملكة الأنباط (٣١٢ ق.م – ١٠٦ م)",
        subtitleEn: "Masters of water engineering, rose sandstone architecture & incense routes",
        subtitleAr: "مهندسو المياه وعمارة الصخر الوردي وطرق البخور وقوافل البتراء",
        dest: "petra",
      },
      {
        id: "era-decapolis",
        titleEn: "Decapolis & Roman League (63 BCE – 324 CE)",
        titleAr: "حلف الديكابولس والعصر الروماني (٦٣ ق.م – ٣٢٤ م)",
        subtitleEn: "Ten Hellenistic-Roman cities of the East: Gerasa, Gadara, Pella & Philadelphia",
        subtitleAr: "عشر مدن رومانية متحدة: جرش، جدارا، طبقة فحل، وفيلادلفيا",
        dest: "jerash",
      },
      {
        id: "era-byzantine",
        titleEn: "Byzantine Mosaic Golden Age (324 – 636 CE)",
        titleAr: "العصر البيزنطي وفنون الفسيفساء (٣٢٤ – ٦٣٦ م)",
        subtitleEn: "World’s oldest geographic Holy Land map in Madaba & Mount Nebo basilicase",
        subtitleAr: "خريطة مأدبا الفسيفسائية الأقدم في العالم وكنائس جبل نيبو الخالدة",
        dest: "amman-citadel",
      },
      {
        id: "era-ayyubid",
        titleEn: "Ayyubid & Islamic Fortresses (1184 – 1260 CE)",
        titleAr: "العصر الأيوبي والقلاع الإسلامية (١١٨٤ – ١٢٦٠ م)",
        subtitleEn: "Saladin’s strategic watchtowers guarding trade routes across Ajloun & Kerak",
        subtitleAr: "أبراج صلاح الدين الأيوبي لحماية طرق القوافل بين دمشق والقاهرة",
        dest: "ajloun",
      },
      {
        id: "era-neolithic",
        titleEn: "Ain Ghazal Neolithic Era (7250 BCE)",
        titleAr: "العصر الحجري الحديث · عين غزال (٧٢٥٠ ق.م)",
        subtitleEn: "Oldest monumental human statues in civilization history found near Amman",
        subtitleAr: "أقدم تماثيل بشرية تصويرية في تاريخ الحضارة الإنسانية",
        dest: "amman-citadel",
      },
    ];

    erasData.forEach((era) => {
      list.push({
        id: era.id,
        category: "eras",
        titleEn: era.titleEn,
        titleAr: era.titleAr,
        subtitleEn: era.subtitleEn,
        subtitleAr: era.subtitleAr,
        badgeEn: "Historical Era",
        badgeAr: "حقبة تاريخية",
        keywords: [
          era.titleEn,
          era.titleAr,
          era.subtitleEn,
          era.subtitleAr,
          "history",
          "archaeology",
          "تاريخ",
          "آثار",
        ],
        icon: BookOpen,
        url: `/destinations/${era.dest}#timeline`,
        action: () => {
          router.push(`/destinations/${era.dest}#timeline`);
          closePalette();
        },
      });
    });

    // 3. Artifacts
    const artifactsData = [
      {
        id: "art-nabataean-bowl",
        titleEn: "Nabataean Eggshell Painted Bowl",
        titleAr: "آنية نبطية خزفية فائقة الرقة (قشر البيض)",
        subtitleEn: "Terracotta 1.5mm thickness · Petra Great Temple",
        subtitleAr: "فخار ملكي فائق الدقة بسماكة ١.٥ ملم · معبد البتراء الكبير",
      },
      {
        id: "art-gerasa-medallion",
        titleEn: "Decapolis Bronze Medallion of Gerasa",
        titleAr: "ميدالية جراسا البرونزية لحلف الديكابولس",
        subtitleEn: "Embossed Tyche goddess & Corinthian columns · Jerash Cardo",
        subtitleAr: "ربة الحظ تايخي وأعمدة الكاردو الكورنثية · جرش",
      },
      {
        id: "art-madaba-mosaic",
        titleEn: "Madaba Mosaic Map Compass Tessera",
        titleAr: "حجر بوصلة خريطة مأدبا الفسيفسائية",
        subtitleEn: "Over 2 million natural stone tesserae · St. George Church",
        subtitleAr: "أكثر من مليوني حجر فسيفسائي طبيعي · كنيسة الروم الأرثوذكس",
      },
    ];

    artifactsData.forEach((art) => {
      list.push({
        id: art.id,
        category: "artifacts",
        titleEn: art.titleEn,
        titleAr: art.titleAr,
        subtitleEn: art.subtitleEn,
        subtitleAr: art.subtitleAr,
        badgeEn: "Artifact Vault",
        badgeAr: "خزانة الآثار",
        keywords: [
          art.titleEn,
          art.titleAr,
          art.subtitleEn,
          art.subtitleAr,
          "artifact",
          "relic",
          "متحف",
          "تحفة",
          "آثار",
        ],
        icon: Sparkles,
        url: "/#artifacts",
        action: () => {
          router.push("/#artifacts");
          closePalette();
        },
      });
    });

    // 4. Interactive Tools & Global Actions
    list.push({
      id: "act-passport",
      category: "actions",
      titleEn: "Open Digital Heritage Passport",
      titleAr: "فتح جواز السفر التراثي الرقمي",
      subtitleEn: "Track collection stamps & expedition certificates",
      subtitleAr: "استعرض أختامك الأثرية وبطاقة المستكشف التذكارية",
      badgeEn: "Passport",
      badgeAr: "جواز السفر",
      keywords: ["passport", "stamps", "collector", "جواز", "سفر", "ختم", "أختام"],
      icon: Award,
      action: () => {
        closePalette();
        if (onOpenPassport) onOpenPassport();
        else {
          const el = document.getElementById("heritage-passport");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          else router.push("/#passport");
        }
      },
    });

    list.push({
      id: "act-translator",
      category: "actions",
      titleEn: "Nabataean Script Visualizer & Translator",
      titleAr: "مترجم ومحاكي الخط النبطي القديم",
      subtitleEn: "Convert English & Arabic names into ancient Aramaic rock glyphs",
      subtitleAr: "حوّل اسمك أو أي عبارة إلى نقوش الخط النبطي الحجري الأصيل",
      badgeEn: "Script Tool",
      badgeAr: "الخط النبطي",
      keywords: ["nabataean", "script", "font", "translator", "خط", "نبطي", "ترجمة", "نقوش"],
      icon: Scroll,
      action: () => {
        closePalette();
        if (onOpenTranslator) onOpenTranslator();
        else {
          const el = document.getElementById("nabataean-studio");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          else router.push("/#nabataean-studio");
        }
      },
    });

    list.push({
      id: "act-audio",
      category: "actions",
      titleEn: "Toggle Ambient Desert Soundscape",
      titleAr: "تبديل الصوت المحيطي للبادية والآثار",
      subtitleEn: "Procedural soundscape generator with desert wind & oud resonance",
      subtitleAr: "مؤثرات صوتية هادئة تحاكي نسيم الصحراء وعزف العود التراثي",
      badgeEn: "Audio",
      badgeAr: "صوت محيطي",
      keywords: ["audio", "sound", "music", "ambience", "صوت", "موسيقى", "أجواء"],
      icon: Volume2,
      action: () => {
        if (ambientEngine) ambientEngine.toggle();
        closePalette();
      },
    });

    list.push({
      id: "act-language",
      category: "actions",
      titleEn: isArabic ? "Switch Language to English" : "التبديل إلى اللغة العربية",
      titleAr: isArabic ? "Switch Language to English" : "التبديل إلى اللغة العربية",
      subtitleEn: "Toggle between Arabic and English across the entire atlas",
      subtitleAr: "تبديل لغة الموقع بين العربية والإنجليزية في جميع الأقسام",
      badgeEn: "Locale",
      badgeAr: "اللغة",
      keywords: ["language", "arabic", "english", "ترجمة", "لغة", "عربي", "انجليزي"],
      icon: Globe,
      action: () => {
        toggleLanguage();
        closePalette();
      },
    });

    return list;
  }, [router, isArabic, onOpenPassport, onOpenTranslator, toggleLanguage]);

  // Filter items
  const filteredItems = useMemo(() => {
    let result = items;

    if (selectedCategory !== "all") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.titleEn.toLowerCase().includes(q) ||
          item.titleAr.includes(q) ||
          item.subtitleEn.toLowerCase().includes(q) ||
          item.subtitleAr.includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    return result;
  }, [items, selectedCategory, query]);

  // Keep selectedIndex in bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems.length, selectedCategory]);

  // Keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  const categories: { key: PaletteCategory; labelEn: string; labelAr: string; icon: typeof MapPin }[] = [
    { key: "all", labelEn: "All", labelAr: "الكل", icon: Sparkles },
    { key: "places", labelEn: "Destinations", labelAr: "الوجهات", icon: MapPin },
    { key: "eras", labelEn: "Eras", labelAr: "الحقب", icon: BookOpen },
    { key: "artifacts", labelEn: "Artifacts", labelAr: "الآثار", icon: Sparkles },
    { key: "culinary", labelEn: "Cuisine", labelAr: "المطبخ", icon: Utensils },
    { key: "actions", labelEn: "Tools", labelAr: "الأدوات", icon: Layers },
  ];

  return (
    <>
      {/* Floating launcher trigger button (always accessible) */}
      <button
        type="button"
        onClick={() => setInternalIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#141b18]/90 hover:bg-[#1c2622] text-[#e8dfd3] border border-[#d49b6a]/30 hover:border-[#d49b6a]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all group scale-95 hover:scale-100"
        aria-label="Open command search palette"
        title="Command Palette (Ctrl + K)"
      >
        <Search size={14} className="text-[#d49b6a] transition-transform group-hover:scale-110" />
        <span className="text-xs font-serif tracking-wider text-[#dcd4c8]">
          {t("Search Atlas", "ابحث في الأطلس")}
        </span>
        <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-[#d49b6a] bg-black/40 rounded border border-[#d49b6a]/20">
          ⌘K
        </kbd>
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4">
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closePalette}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="relative w-full max-w-2xl bg-[#0f1412]/95 border border-[#d49b6a]/35 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden flex flex-col max-h-[80vh] z-10 text-[#f5efe6]"
              onKeyDown={handleKeyDown}
            >
              {/* Top Accent Rim */}
              <div className="h-1 bg-gradient-to-r from-[#8b4513] via-[#d49b6a] to-[#2d5a4c] opacity-80" />

              {/* Search Input Bar */}
              <div className="relative flex items-center px-5 py-4 border-b border-[rgba(212,155,106,0.18)]">
                <Search size={18} className="text-[#d49b6a] mr-3 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    isArabic
                      ? "ابحث عن أي وجهة، حقبة، تحفة أثرية، أو أكلة تراثية..."
                      : "Search destinations, eras, artifacts, dishes, tools..."
                  }
                  className="w-full bg-transparent text-[#f5efe6] placeholder-[#8a8377] text-base md:text-lg focus:outline-none font-sans"
                  aria-label="Command search"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="p-1 rounded-full text-stone-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-black/40 border border-stone-700/60 rounded">
                    ESC
                  </kbd>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto no-scrollbar border-b border-[rgba(212,155,106,0.1)] bg-black/20 text-xs">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                        isSelected
                          ? "bg-[#d49b6a] text-black font-semibold shadow-sm"
                          : "text-stone-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon size={12} className={isSelected ? "text-black" : "text-[#d49b6a]"} />
                      <span>{isArabic ? cat.labelAr : cat.labelEn}</span>
                    </button>
                  );
                })}
              </div>

              {/* Results List */}
              <div
                ref={listRef}
                className="overflow-y-auto flex-1 divide-y divide-[rgba(212,155,106,0.08)] max-h-[380px] p-2"
              >
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center text-stone-400">
                    <Compass size={32} className="mx-auto mb-3 text-[#d49b6a]/50 animate-pulse" />
                    <p className="text-sm font-medium">
                      {isArabic ? "لم نجد نتائج مطابقة لبحثك" : "No matching heritage records found"}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      {isArabic
                        ? "جرب البحث عن (البتراء، وادي رم، جرش، المنسف، الأنباط)"
                        : "Try searching for 'Petra', 'Rum', 'Mansaf', 'Nabataean', or 'Passport'"}
                    </p>
                  </div>
                ) : (
                  filteredItems.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        onClick={() => item.action()}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#d49b6a]/15 text-white border border-[#d49b6a]/40 shadow-inner"
                            : "hover:bg-white/5 text-stone-300 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0 pr-2">
                          <div
                            className={`p-2.5 rounded-lg shrink-0 ${
                              isSelected
                                ? "bg-[#d49b6a] text-black"
                                : "bg-black/40 text-[#d49b6a] border border-[#d49b6a]/20"
                            }`}
                          >
                            <Icon size={16} />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm md:text-base font-medium truncate text-[#f5efe6]">
                                {isArabic ? item.titleAr : item.titleEn}
                              </h4>
                              {item.badgeEn && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider bg-white/10 text-amber-200/80 border border-white/5">
                                  {isArabic ? item.badgeAr : item.badgeEn}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-400 truncate mt-0.5">
                              {isArabic ? item.subtitleAr : item.subtitleEn}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 text-stone-400">
                          {isSelected && (
                            <span className="flex items-center text-[11px] text-[#d49b6a] font-mono gap-1">
                              <span className="hidden sm:inline">Select</span>
                              <CornerDownLeft size={12} />
                            </span>
                          )}
                          <ChevronRight
                            size={14}
                            className={`transition-transform ${
                              isSelected ? "translate-x-0.5 text-[#d49b6a]" : "text-stone-600"
                            }`}
                          />
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Bottom Footer Bar */}
              <div className="px-4 py-2.5 bg-black/40 border-t border-[rgba(212,155,106,0.15)] flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-stone-800 rounded border border-stone-700 text-[10px]">
                      ↑
                    </kbd>
                    <kbd className="px-1 py-0.5 bg-stone-800 rounded border border-stone-700 text-[10px]">
                      ↓
                    </kbd>
                    <span className="hidden sm:inline text-stone-500">Navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700 text-[10px]">
                      ↵
                    </kbd>
                    <span className="hidden sm:inline text-stone-500">Jump</span>
                  </span>
                </div>
                <div className="text-[#d49b6a]/80 font-serif italic text-xs">
                  {t("Jordan Heritage Atlas", "أطلس التراث الأردني")}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
