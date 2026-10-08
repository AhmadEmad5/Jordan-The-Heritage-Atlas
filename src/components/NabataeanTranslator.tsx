"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Scroll,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Info,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Volume2,
} from "lucide-react";
import {
  NABATAEAN_ALPHABET,
  ANCIENT_PRESETS,
  translateToNabataean,
  type NabataeanGlyph,
} from "@/data/nabataeanAlphabet";
import { useLanguage } from "@/context/LanguageContext";

export default function NabataeanTranslator() {
  const { isArabic, t } = useLanguage();
  const [inputText, setInputText] = useState("RAQMU");
  const [copied, setCopied] = useState(false);
  const [selectedGlyph, setSelectedGlyph] = useState<NabataeanGlyph | null>(
    NABATAEAN_ALPHABET[0]
  );
  const [showAlphabetMatrix, setShowAlphabetMatrix] = useState(false);

  // Convert input text to glyph list
  const translatedGlyphs = useMemo(() => {
    return translateToNabataean(inputText);
  }, [inputText]);

  // Copy raw Unicode string or transliteration
  const handleCopy = () => {
    const rawUnicode = translatedGlyphs.map((g) => g.unicodeChar).join("");
    const textToCopy = `${rawUnicode} (${inputText.toUpperCase()})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="nabataean-studio-section py-20 px-4 md:px-8 relative" id="nabataean-studio">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#d49b6a] text-xs font-mono mb-4">
            <Scroll size={13} />
            <span>{t("EPIGRAPHIC HERITAGE LAB", "مختبر النقوش والخطوط القديمة")}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif text-[#f5efe6] font-semibold tracking-tight mb-4">
            {t("The Nabataean Script Visualizer.", "محاكي ومترجم الخط النبطي القديم")}
          </h2>

          <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light">
            {t(
              "Carved into the rose-red sandstone of Petra 2,200 years ago, the cursive Nabataean Aramaic alphabet is the direct ancestor of modern Arabic calligraphy. Transcribe your name into ancient desert stone.",
              "قبل أكثر من ألفي ومئتي عام، نحت الأنباط خطهم الآرامي في صخور البتراء الوردية؛ وهو الأصل المباشر الذي انبثقت منه حروف اللغة العربية وفنون الخط الكوفي. اكتب اسمك لتشاهده منقوشاً بالأبجدية النبطية الأصيلة.",
            )}
          </p>
        </div>

        {/* Studio Workspace Card */}
        <div className="bg-gradient-to-b from-[#19221e]/95 via-[#121915]/95 to-[#0d120f]/95 border border-[#d49b6a]/35 rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative overflow-hidden">
          {/* Top Sandstone Accent Rim */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#d49b6a]/20 via-[#d49b6a] to-[#d49b6a]/20" />

          {/* Interactive Preset Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-[rgba(212,155,106,0.15)] text-xs">
            <span className="text-stone-400 shrink-0 font-serif italic text-xs">
              {t("Ancient Inscriptions:", "نقوش ملكية تاريخية:")}
            </span>
            {ANCIENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setInputText(preset.wordEn)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all border ${
                  inputText.toUpperCase() === preset.wordEn
                    ? "bg-[#d49b6a] text-black font-semibold border-[#d49b6a]"
                    : "bg-black/30 text-stone-300 border-white/10 hover:border-[#d49b6a]/40 hover:text-white"
                }`}
              >
                <span>{isArabic ? preset.wordAr : preset.wordEn}</span>
                <span className="opacity-60 text-[10px] ml-1.5">
                  ({isArabic ? preset.wordEn : preset.wordAr})
                </span>
              </button>
            ))}
          </div>

          {/* Input Field Bar */}
          <div className="relative mb-8">
            <div className="flex items-center gap-3 p-2 bg-black/40 border border-[#d49b6a]/30 rounded-2xl focus-within:border-[#d49b6a] transition-all">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isArabic
                    ? "اكتب اسمك بالإنجليزية أو العربية (مثل: PETRA, AHMAD, سلام)..."
                    : "Type a name or word in English or Arabic (e.g., PETRA, AMMAN, SALAM)..."
                }
                className="w-full bg-transparent px-4 py-2.5 text-[#f5efe6] text-lg md:text-xl focus:outline-none font-sans placeholder:text-stone-500"
                maxLength={24}
              />
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#d49b6a]/15 hover:bg-[#d49b6a]/25 text-[#d49b6a] text-xs font-medium border border-[#d49b6a]/30 transition-all shrink-0"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? t("Copied!", "تم النسخ!") : t("Copy Glyph", "نسخ النقش")}</span>
              </button>
            </div>
          </div>

          {/* Chiseled Rose-Red Sandstone Relief Tablet */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#2a1b18] via-[#1f1412] to-[#140c0b] border-2 border-[#b35446]/40 p-8 md:p-12 mb-8 shadow-inner overflow-hidden text-center select-none min-h-[220px] flex flex-col justify-center items-center">
            {/* Rock texture overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e5b98f_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            <div className="relative z-10 w-full">
              <span className="text-[10px] font-mono tracking-widest text-amber-200/50 uppercase block mb-3">
                {t("CHISELED ROCK INSCRIPTION · PETRA VINTAGE", "نقش صخري غائر · حجر البتراء الوردي")}
              </span>

              {/* Glyphs Display (Rendered Right-to-Left like ancient Semitic scripts) */}
              <div
                dir="rtl"
                className="flex items-center justify-center flex-wrap gap-4 md:gap-6 my-4"
              >
                {translatedGlyphs.length === 0 ? (
                  <p className="text-stone-400 text-sm font-serif italic">
                    {t(
                      "Type letters above to carve them into stone...",
                      "اكتب حروفاً أعلاه لنقشها في الصخر...",
                    )}
                  </p>
                ) : (
                  translatedGlyphs.map((glyph, index) => (
                    <motion.div
                      key={`${glyph.id}-${index}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                      onClick={() => setSelectedGlyph(glyph)}
                      className={`cursor-pointer group relative p-3 rounded-xl transition-all ${
                        selectedGlyph?.id === glyph.id
                          ? "bg-amber-500/20 border border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                          : "hover:bg-white/5 border border-transparent"
                      }`}
                      title={`${glyph.name} (${glyph.arabicEquiv})`}
                    >
                      {/* SVG Vector Glyph with Chiseled Glow */}
                      <svg
                        viewBox="0 0 100 100"
                        className="w-12 h-12 md:w-16 md:h-16 stroke-[#e5b98f] group-hover:stroke-amber-200 transition-colors filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                        fill="none"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={glyph.svgPath} />
                      </svg>

                      {/* Transliteration badge */}
                      <span className="block text-[11px] font-mono text-stone-300 mt-1 opacity-70 group-hover:opacity-100">
                        {glyph.name}
                      </span>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Transliteration footer */}
              {translatedGlyphs.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/10 text-xs font-serif text-[#d49b6a] flex items-center justify-center gap-3">
                  <span>Phonetic: &ldquo;{translatedGlyphs.map((g) => g.phonetic).join(" · ")}&rdquo;</span>
                  <span>•</span>
                  <span>Cognate: {translatedGlyphs.map((g) => g.arabicEquiv.split("/")[0].trim()).join("")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Selected Letter Epigraphic Dossier */}
          {selectedGlyph && (
            <div className="p-5 rounded-2xl bg-black/40 border border-[#d49b6a]/20 mb-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-[#2a1b18] border border-amber-500/40 p-2 flex items-center justify-center shrink-0 shadow-lg">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full stroke-[#e5b98f]"
                  fill="none"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={selectedGlyph.svgPath} />
                </svg>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                  <h4 className="text-lg font-serif text-[#f5efe6] font-bold">
                    {selectedGlyph.name} ({selectedGlyph.nameAr})
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedGlyph.unicodeHex}
                  </span>
                  <span className="text-xs text-stone-300">
                    Phonetic: <strong>/{selectedGlyph.phonetic}/</strong> · Arabic Cognate:{" "}
                    <strong>{selectedGlyph.arabicEquiv}</strong>
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  {isArabic ? selectedGlyph.historicalNoteAr : selectedGlyph.historicalNoteEn}
                </p>
              </div>
            </div>
          )}

          {/* Toggle Full 22-Letter Alphabet Matrix Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowAlphabetMatrix((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1b2520] hover:bg-[#23312b] border border-[#d49b6a]/30 text-[#e5b98f] text-xs font-serif transition-all"
            >
              <BookOpen size={14} />
              <span>
                {showAlphabetMatrix
                  ? t("Hide Nabataean Alphabet Table", "إخفاء جدول الأبجدية النبطية الكاملة")
                  : t("View Complete 22-Letter Alphabet (الأبجدية النبطية الكاملة)", "عرض جدول الأبجدية النبطية الكاملة (٢٢ حرفاً)")}
              </span>
            </button>
          </div>

          {/* Full Alphabet Grid Matrix */}
          <AnimatePresence>
            {showAlphabetMatrix && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 pt-8 border-t border-[rgba(212,155,106,0.15)] overflow-hidden"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {NABATAEAN_ALPHABET.map((glyph) => (
                    <div
                      key={glyph.id}
                      onClick={() => setSelectedGlyph(glyph)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                        selectedGlyph?.id === glyph.id
                          ? "bg-amber-500/15 border-amber-400"
                          : "bg-black/30 border-white/5 hover:border-[#d49b6a]/40"
                      }`}
                    >
                      <svg
                        viewBox="0 0 100 100"
                        className="w-10 h-10 stroke-[#e5b98f] my-1"
                        fill="none"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={glyph.svgPath} />
                      </svg>
                      <strong className="text-xs text-white block">{glyph.name}</strong>
                      <span className="text-[10px] text-amber-200/70 font-mono">
                        {glyph.arabicEquiv.split("/")[0]} · /{glyph.phonetic}/
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
