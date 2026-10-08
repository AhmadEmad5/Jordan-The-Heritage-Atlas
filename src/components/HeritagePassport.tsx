"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Award,
  Stamp,
  CheckCircle2,
  Sparkles,
  Share2,
  Download,
  ShieldCheck,
  Compass,
  MapPin,
  Calendar,
  User,
  X,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { useLanguage } from "@/context/LanguageContext";

export interface PassportStamp {
  slug: string;
  titleEn: string;
  titleAr: string;
  sealSubtitleEn: string;
  sealSubtitleAr: string;
  iconSymbol: string;
  inkColor: string;
  collectedAt?: string;
}

export const PASSPORT_STAMPS: PassportStamp[] = [
  {
    slug: "petra",
    titleEn: "PETRA · RAQMU",
    titleAr: "البتراء · رقيم الأنباط",
    sealSubtitleEn: "ROYAL TREASURY & ROSE CLIFFS",
    sealSubtitleAr: "خزنة الأنباط وجبال الشراة الوردية",
    iconSymbol: "🏛️",
    inkColor: "#b35446", // Rose sandstone red
  },
  {
    slug: "wadi-rum",
    titleEn: "WADI RUM",
    titleAr: "وادي رم · وادي القمر",
    sealSubtitleEn: "BORTLE-1 COSMIC MONOLITHS",
    sealSubtitleAr: "أعمدة الحكمة وقوافل البادية",
    iconSymbol: "🐪",
    inkColor: "#c27838", // Desert amber
  },
  {
    slug: "dead-sea",
    titleEn: "DEAD SEA · -430M",
    titleAr: "البحر الميت · أخفض بقعة",
    sealSubtitleEn: "HYPERSALINE MINERAL HORIZON",
    sealSubtitleAr: "شواطئ الملح والمرايا الفيروزية",
    iconSymbol: "🌊",
    inkColor: "#1b7a82", // Turquoise mineral
  },
  {
    slug: "jerash",
    titleEn: "GERASA · DECAPOLIS",
    titleAr: "جرش · بومبي الشرق",
    sealSubtitleEn: "OVAL FORUM & CARDO COLONNADE",
    sealSubtitleAr: "أعمدة الكاردو والساحة البيضاوية",
    iconSymbol: "🏛️",
    inkColor: "#b89047", // Ancient limestone gold
  },
  {
    slug: "ajloun",
    titleEn: "AJLOUN CITADEL",
    titleAr: "عجلون · قلعة الربض",
    sealSubtitleEn: "SALADIN'S HIGHLAND BATTLEMENTS",
    sealSubtitleAr: "حصن صلاح الدين وغابات السنديان",
    iconSymbol: "🦅",
    inkColor: "#2d5a4c", // Forest pine emerald
  },
  {
    slug: "umm-qais",
    titleEn: "UMM QAIS · GADARA",
    titleAr: "أم قيس · جدارا الفلاسفة",
    sealSubtitleEn: "BASALT BASILICA & GALILEE VISTA",
    sealSubtitleAr: "أعمدة البازلت وإطلالة طبريا",
    iconSymbol: "📜",
    inkColor: "#4a5568", // Volcanic basalt
  },
  {
    slug: "dana",
    titleEn: "DANA BIOSPHERE",
    titleAr: "محمية ضانا الطبيعية",
    sealSubtitleEn: "1,500M RIFT DROP & NUBIAN IBEX",
    sealSubtitleAr: "الوادي السحيق والوعول النوبية",
    iconSymbol: "🐐",
    inkColor: "#8c6b4b", // Earth canyon ochre
  },
];

const STORAGE_KEY = "jordan_heritage_passport_v1";

interface HeritagePassportProps {
  currentSlug?: string;
  autoStamp?: boolean;
}

export default function HeritagePassport({
  currentSlug,
  autoStamp = false,
}: HeritagePassportProps) {
  const { isArabic, t } = useLanguage();
  const [collectedSlugs, setCollectedSlugs] = useState<string[]>([]);
  const [explorerName, setExplorerName] = useState("Heritage Explorer");
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [justStampedSlug, setJustStampedSlug] = useState<string | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCollectedSlugs(parsed);
        }
      }
      const storedName = localStorage.getItem("jordan_passport_name");
      if (storedName) {
        setExplorerName(storedName);
      }
    } catch {
      // Ignore localStorage exceptions in SSR/incognito
    }
  }, []);

  // Auto-stamp current destination if requested
  useEffect(() => {
    if (autoStamp && currentSlug) {
      stampDestination(currentSlug);
    }
  }, [autoStamp, currentSlug]);

  const saveSlugs = (newSlugs: string[]) => {
    setCollectedSlugs(newSlugs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSlugs));
    } catch {
      // ignore
    }
  };

  const stampDestination = (slug: string) => {
    if (!collectedSlugs.includes(slug)) {
      const updated = [...collectedSlugs, slug];
      saveSlugs(updated);
      setJustStampedSlug(slug);

      // Trigger celebration confetti
      if (
        typeof window !== "undefined" &&
        process.env.NODE_ENV !== "test" &&
        document.createElement("canvas").getContext?.("2d")
      ) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#d49b6a", "#e5b98f", "#b35446", "#2d5a4c"],
          });
        } catch {
          // ignore
        }
      }

      setTimeout(() => setJustStampedSlug(null), 3000);
    }
  };

  const progressCount = collectedSlugs.length;
  const totalStamps = PASSPORT_STAMPS.length;
  const progressPct = Math.round((progressCount / totalStamps) * 100);

  const explorerRank = useMemo(() => {
    if (progressCount >= 7) {
      return {
        en: "Grand Explorer of the Hashemite Realm",
        ar: "حارس التراث الملكي الأردني الأعظم",
        badge: "MASTER",
      };
    }
    if (progressCount >= 4) {
      return {
        en: "Expedition Wayfarer of Antiquity",
        ar: "مستكشف معالم المملكة الخالدة",
        badge: "WAYFARER",
      };
    }
    return {
      en: "Novice Heritage Wanderer",
      ar: "رحالة تراثي مبتدئ",
      badge: "INITIATE",
    };
  }, [progressCount]);

  return (
    <section className="heritage-passport-section py-20 px-4 md:px-8 relative" id="heritage-passport">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono mb-4">
            <Award size={13} />
            <span>{t("EXPEDITION STAMP VAULT", "جواز السفر التراثي الرقمي")}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif text-[#f5efe6] font-semibold tracking-tight mb-4">
            {t("Digital Heritage Passport & Collector.", "جواز سفر رحالة الأردن")}
          </h2>

          <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light">
            {t(
              "Collect bespoke consular seals across each ancient wonder. Complete all seven destinations to unlock the official Kingdom Explorer Certificate.",
              "كل معلم تاريخي تزوره أو تستكشفه يمنحك ختماً قنصلياً تراثياً فريداً. اجمع الأختام السبعة لتستحق وسام وبطاقة المستكشف التذكارية المعتمدة.",
            )}
          </p>
        </div>

        {/* Passport Booklet Card Container */}
        <div className="bg-gradient-to-br from-[#0c1a14] via-[#091510] to-[#060e0a] border-2 border-[#2d5a4c]/60 rounded-3xl p-6 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden">
          {/* Gold Foil Crown Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d49b6a]/20 pb-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#08120d] border border-[#d49b6a]/40 flex items-center justify-center text-amber-300 shadow-inner">
                <Stamp size={26} className="text-[#d49b6a]" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#d49b6a] uppercase">
                  {t("THE HASHEMITE KINGDOM OF JORDAN · ROYAL PASSPORT", "المملكة الأردنية الهاشمية · جواز المستكشف")}
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-[#f5efe6] font-semibold">
                  {isArabic ? explorerRank.ar : explorerRank.en}
                </h3>
              </div>
            </div>

            {/* Progress Meter */}
            <div className="flex items-center gap-4 bg-black/40 px-5 py-3 rounded-2xl border border-white/5">
              <div className="text-right">
                <span className="text-[11px] text-stone-400 block">
                  {t("Seals Verified", "الأختام المجمعة")}
                </span>
                <span className="text-lg font-mono font-bold text-amber-300 tabular-nums">
                  {progressCount} / {totalStamps}
                </span>
              </div>
              <div className="w-20 h-2 bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>

          {/* Stamp Grid Booklet Page */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {PASSPORT_STAMPS.map((stamp) => {
              const isCollected = collectedSlugs.includes(stamp.slug);
              const isJustStamped = justStampedSlug === stamp.slug;

              return (
                <motion.div
                  key={stamp.slug}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-5 rounded-2xl border transition-all flex flex-col justify-between min-h-[190px] overflow-hidden ${
                    isCollected
                      ? "bg-gradient-to-b from-[#14231b] to-[#0c1611] border-[#d49b6a]/40 shadow-lg"
                      : "bg-black/25 border-dashed border-stone-800 opacity-60 hover:opacity-80"
                  }`}
                >
                  {/* Antique Stamp Watermark Ring */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl select-none">{stamp.iconSymbol}</span>
                    {isCollected ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 size={11} />
                        <span>{t("VERIFIED", "معتمد")}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-stone-500">
                        {t("UNSTAMPED", "غير مختوم")}
                      </span>
                    )}
                  </div>

                  {/* Stamp Content */}
                  <div className="my-2">
                    <h4 className="font-serif font-bold text-base text-[#f5efe6] mb-0.5">
                      {isArabic ? stamp.titleAr : stamp.titleEn}
                    </h4>
                    <p className="text-[11px] text-[#d49b6a]/90 font-mono">
                      {isArabic ? stamp.sealSubtitleAr : stamp.sealSubtitleEn}
                    </p>
                  </div>

                  {/* Action Footer */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-auto">
                    {isCollected ? (
                      <Link
                        href={`/destinations/${stamp.slug}`}
                        className="text-[11px] text-amber-200/80 hover:text-white flex items-center gap-1 font-serif"
                      >
                        <span>{t("Revisit", "زيارة المعلم")}</span>
                        <ExternalLink size={11} />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => stampDestination(stamp.slug)}
                        className="text-[11px] px-3 py-1 rounded-full bg-[#d49b6a]/20 hover:bg-[#d49b6a]/30 text-[#d49b6a] font-medium border border-[#d49b6a]/40 transition-colors w-full flex items-center justify-center gap-1.5"
                      >
                        <Stamp size={12} />
                        <span>{t("Claim Stamp", "ختم الجواز")}</span>
                      </button>
                    )}
                  </div>

                  {/* Stamp Press Animation Splash */}
                  {isJustStamped && (
                    <motion.div
                      initial={{ scale: 2, opacity: 0, rotate: -20 }}
                      animate={{ scale: 1, opacity: 0.9, rotate: -5 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div className="border-4 border-amber-400 text-amber-300 font-serif font-black px-4 py-2 rounded-xl text-lg tracking-widest uppercase rotate-[-8deg] bg-black/80 backdrop-blur-sm shadow-2xl">
                        ★ {t("STAMPED", "تم الختم")} ★
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Certificate Generation Action Bar */}
          <div className="pt-6 border-t border-[#d49b6a]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-emerald-400" />
              <p className="text-xs text-stone-300 font-light">
                {t(
                  "All expedition milestones are securely preserved in your local traveler profile.",
                  "يتم حفظ وتوثيق جميع إنجازاتك الاستكشافية محلياً في سجلك التراثي الرقمي.",
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCertificateOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d49b6a] to-[#b35446] text-black font-semibold text-xs md:text-sm shadow-lg hover:brightness-110 transition-all"
            >
              <Award size={16} />
              <span>{t("View Expedition Certificate", "عرض بطاقة المستكشف التذكارية")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expedition Certificate Modal */}
      <AnimatePresence>
        {isCertificateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCertificateOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#1d2722] to-[#0e1612] border-4 border-[#d49b6a] rounded-3xl p-8 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-10 text-center select-none"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsCertificateOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-white bg-black/30"
              >
                <X size={18} />
              </button>

              {/* Certificate Inner Frame */}
              <div className="border border-[#d49b6a]/30 p-6 md:p-8 rounded-2xl relative">
                {/* Crown / Star Seal */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-2xl shadow-lg">
                  ★
                </div>

                <span className="text-[11px] font-mono tracking-widest text-[#d49b6a] uppercase block mb-1">
                  THE HASHEMITE KINGDOM OF JORDAN
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-[#f5efe6] font-bold mb-2">
                  {t("Heritage Expedition Certificate", "شهادة المستكشف التراثي الرسمية")}
                </h3>
                <p className="text-xs text-stone-400 font-serif italic mb-6">
                  {t(
                    "Conferred in recognition of completing historical waypoints across the ancient realm.",
                    "تُمنح هذه الشهادة تقديراً لرحلة استكشاف معالم التراث والحضارات في أرض الأردن.",
                  )}
                </p>

                {/* Explorer Name Field */}
                <div className="max-w-xs mx-auto mb-6">
                  <span className="text-[10px] text-stone-400 block mb-1">
                    {t("Explorer Name", "اسم الرحالة")}
                  </span>
                  <input
                    type="text"
                    value={explorerName}
                    onChange={(e) => {
                      setExplorerName(e.target.value);
                      try {
                        localStorage.setItem("jordan_passport_name", e.target.value);
                      } catch {
                        // ignore
                      }
                    }}
                    className="w-full text-center bg-black/40 border-b-2 border-[#d49b6a] text-xl font-serif text-amber-200 py-1 focus:outline-none"
                  />
                </div>

                {/* Badges / Stats Row */}
                <div className="flex items-center justify-center gap-6 my-6 text-xs text-stone-300 border-y border-white/10 py-4">
                  <div>
                    <span className="text-stone-400 block text-[10px]">{t("Rank", "الرتبة")}</span>
                    <strong className="text-amber-300 font-serif">{isArabic ? explorerRank.ar : explorerRank.en}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">{t("Stamps", "الأختام")}</span>
                    <strong className="text-amber-300 font-mono">{progressCount} / {totalStamps}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">{t("Issue Date", "تاريخ الإصدار")}</span>
                    <strong className="text-stone-200 font-mono">
                      {new Date().toLocaleDateString(isArabic ? "ar-JO" : "en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </strong>
                  </div>
                </div>

                {/* Stamp Hallmarks */}
                <div className="flex items-center justify-center gap-3 my-4 flex-wrap">
                  {PASSPORT_STAMPS.map((s) => (
                    <div
                      key={s.slug}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border ${
                        collectedSlugs.includes(s.slug)
                          ? "bg-amber-500/20 border-amber-400 shadow-sm"
                          : "bg-black/20 border-stone-800 opacity-30"
                      }`}
                      title={s.titleEn}
                    >
                      {s.iconSymbol}
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-stone-500 font-mono mt-6">
                  OFFICIAL DIGITAL ARCHIVE · THE JORDAN HERITAGE ATLAS
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
