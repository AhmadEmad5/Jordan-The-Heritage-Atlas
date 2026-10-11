"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Sparkles,
  Search,
  Eye,
  ShieldCheck,
  MapPin,
  Clock,
  Layers,
  Rotate3d,
  Maximize2,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ModelViewer3D from "./ModelViewer3D";

interface Artifact {
  id: string;
  nameEn: string;
  nameAr: string;
  eraEn: string;
  eraAr: string;
  dateEn: string;
  dateAr: string;
  provenanceEn: string;
  provenanceAr: string;
  museumEn: string;
  museumAr: string;
  descriptionEn: string;
  descriptionAr: string;
  materialEn: string;
  materialAr: string;
  image: string;
  model3d: string;
  curatorNoteEn: string;
  curatorNoteAr: string;
}

const ARTIFACTS: Artifact[] = [
  {
    id: "nabataean-chalice",
    nameEn: "Nabataean Eggshell Painted Bowl",
    nameAr: "آنية نبطية خزفية فائقة الرقة (قشر البيض)",
    eraEn: "Nabataean Kingdom",
    eraAr: "المملكة النبطية",
    dateEn: "c. 1st Century CE (Peak Era)",
    dateAr: "القرن الأول الميلادي (عصر الازدهار)",
    provenanceEn: "Petra (Wadi Musa Basin · Great Temple)",
    provenanceAr: "البتراء (حوض وادي موسى · المعبد الكبير)",
    museumEn: "The Jordan Museum · Archaeological Vault",
    museumAr: "متحف الأردن · الخزانة الأثرية الوطنية",
    materialEn: "Terracotta (1.5mm thickness) with iron-oxide paint",
    materialAr: "فخار رقيق (سماكة ١.٥ ملم) مع أكسيد الحديد النباتي",
    descriptionEn: "World-renowned for being as thin as an eggshell. The Nabataeans mastered ultra-fine terracotta pottery adorned with stylized palm fronds and pomegranate motifs, unmatched throughout antiquity.",
    descriptionAr: "اشتهر الخزف النبطي عالمياً برقة جدرانه الشبيهة بقشر البيض، مع زخارف نباتية متقنة ترمز للنخيل والرمان وبركة الصحراء، وهو إنجاز تقني فريد في العالم القديم.",
    image: "/images/artifacts/nabataean-bowl.jpg",
    model3d: "/models/nabataean-bowl.glb",
    curatorNoteEn: "Excavated near the Great Temple of Petra. Demonstrates Nabataean chemical mastery in clay levigation and precise kiln reduction cycles.",
    curatorNoteAr: "عُثر عليها بالقرب من المعبد الكبير بالبتراء؛ تشهد على دقة تقنية متقدمة في تنقية الصلصال وضبط أفران الحرق في العاصمة النبطية.",
  },
  {
    id: "decapolis-coin",
    nameEn: "Decapolis Bronze Medallion of Gerasa",
    nameAr: "مسكوكة وميدالية جراسا البرونزية (حلف الديكابولس)",
    eraEn: "Roman Decapolis",
    eraAr: "العهد الروماني (حلف المدن العشر)",
    dateEn: "c. 165 CE · Reign of Marcus Aurelius",
    dateAr: "١٦٥ ميلادي · عصر الإمبراطور ماركوس أوريليوس",
    provenanceEn: "Jerash (Cardo Maximus Colonnade)",
    provenanceAr: "جرش (شارع الأعمدة الروماني - الكاردو)",
    museumEn: "Jerash Archaeological Museum",
    museumAr: "متحف آثار جرش",
    materialEn: "Cast bronze with Corinthian embossed relief",
    materialAr: "برونز مسكوك بنقش بارز وطبقة أكسدة خضراء",
    descriptionEn: "Commemorative municipal civic medallion of Gerasa depicting the patron goddess Tyche alongside Corinthian colonnades, struck during the golden zenith of Pompey's Decapolis League.",
    descriptionAr: "مسكوكة وميدالية تذكارية بلدية لمدينة جراسا (جرش) الرومانية، نُقشت عليها صورة حامية المدينة والأعمدة الكورنثية إبان ذروة ازدهار حلف الديكابولس.",
    image: "/images/artifacts/decapolis-coin.jpg",
    model3d: "/models/decapolis-coin.glb",
    curatorNoteEn: "Excavated within the monumental drainage conduit adjacent to the Oval Forum, proving trans-provincial commercial links across the Roman Levant.",
    curatorNoteAr: "عُثر عليها داخل شبكة التصريف الرومانية المجاورة للساحة البيضاوية، مؤكدةً ازدهار التجارة النقدية عبر مدن الديكابولس.",
  },
  {
    id: "byzantine-mosaic",
    nameEn: "Madaba Mosaic Map Compass Tessera",
    nameAr: "حجر بوصلة خريطة مأدبا الفسيفسائية",
    eraEn: "Byzantine Era",
    eraAr: "العصر البيزنطي",
    dateEn: "c. 560 CE · Justinian Horizon",
    dateAr: "٥٦٠ ميلادي · العهد البيزنطي",
    provenanceEn: "Madaba (Church of Saint George)",
    provenanceAr: "مأدبا (كنيسة القديس جاورجيوس)",
    museumEn: "Madaba Archaeological Park & Museum",
    museumAr: "متنزه ومتحف مأدبا الأثري",
    materialEn: "Hand-chiseled limestone & Dead Sea bitumen cubes",
    materialAr: "حجارة جيرية طبيعية ملونة مع بتيومين البحر الميت",
    descriptionEn: "The oldest surviving cartographic depiction of the Holy Land and the Jordan Valley. Features hand-chiseled polychrome stone tesserae detailing Biblical topography, rivers, and walled cities.",
    descriptionAr: "أقدم خارطة جغرافية فسيفسائية حية للأرض المقدسة وحوض نهر الأردن. شُكّلت من مكعبات حجرية طبيعية نادرة تصور الجغرافيا والمدن التاريخية بدقة متناهية.",
    image: "/images/artifacts/byzantine-mosaic.jpg",
    model3d: "/models/byzantine-mosaic.glb",
    curatorNoteEn: "Constructed using more than two million native stone tesserae harvested directly from the wadis of central Jordan.",
    curatorNoteAr: "صُنعت الخارطة التاريخية من أكثر من مليوني قطعة حجرية مستخرجة محلياً من أودية ومرتفعات وسط الأردن.",
  },
  {
    id: "ain-ghazal-statue",
    nameEn: "'Ain Ghazal Neolithic Ancestor Statue",
    nameAr: "تمثال عين غزال النيوليتي الأثري",
    eraEn: "Pre-Pottery Neolithic (7500 BCE)",
    eraAr: "العصر الحجري الحديث ما قبل الفخاري (٧٥٠٠ ق.م)",
    dateEn: "c. 7500 BCE (Dawn of Civilization)",
    dateAr: "٧٥٠٠ قبل الميلاد (فجر النحت البشري)",
    provenanceEn: "Amman ('Ain Ghazal Basin · Zarqa River)",
    provenanceAr: "عمّان (حوض عين غزال · نهر الزرقاء)",
    museumEn: "The Jordan Museum · Prehistoric Gallery",
    museumAr: "متحف الأردن · قاعة آثار ما قبل التاريخ",
    materialEn: "Lime plaster over reed bundles with bitumen eye inlays",
    materialAr: "جص كلسي مصقول فوق حزم القصب مع عيون من البيتومين",
    descriptionEn: "The world's oldest monumental human statues, predating Stonehenge and the Giza Pyramids by millennia. Discovered in an underground cache at 'Ain Ghazal, revealing humanity's earliest large-scale figurative art.",
    descriptionAr: "أقدم تماثيل بشرية صرحية مكتشفة على كوكب الأرض، سبقت أهرامات الجيزة وستونهنج بآلاف السنين. صُنعت من الجص الكلسي بمهارة تشكيلية فريدة وعيون محددة بالبتيومين الأسود.",
    image: "/images/artifacts/ain-ghazal-statue.jpg",
    model3d: "/models/ain-ghazal-statue.glb",
    curatorNoteEn: "Unearthed in a ritual burial pit in 1983. Preserved through an ingenious prehistoric composite technique uniting organic reed armatures with pyrotechnic lime plaster.",
    curatorNoteAr: "اكتُشفت في خبيئة طقسية عام ١٩٨٣؛ تمثل إنجازاً تقنياً نادراً جمع بين الهيكل النباتي الداخلي والجص الكلسي المعالج حرارياً.",
  },
];

export default function ArtifactShowcase() {
  const { isArabic, t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [viewMode, setViewMode] = useState<"3d" | "photo">("3d");
  const [isTheaterOpen, setIsTheaterOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const artifact = ARTIFACTS[activeIdx] ?? ARTIFACTS[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isTheaterOpen) {
        setIsTheaterOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTheaterOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || viewMode === "3d") return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = ((centerY - y) / centerY) * 12;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleSelectArtifact = (idx: number) => {
    setActiveIdx(idx);
    setIsZoomed(false);
  };

  return (
    <section className="artifact-section" id="artifacts">
      {/* Section Header */}
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span className="tiny-star">✦</span> {t("3D ARCHAEOLOGICAL VAULT", "الخزانة الأثرية ثلاثية الأبعاد")}
          </p>
          <h2>{t("Interactive 3D Relic Showcase.", "المعرض التفاعلي ثلاثي الأبعاد للقطع الأثرية")}</h2>
        </div>
        <p>
          {t(
            "Explore authentic physical antiquities of Jordan reconstructed in real-time 3D. Rotate, zoom, and inspect historical geometry with millimetric fidelity.",
            "استكشف الشواهد الأثرية التاريخية للأردن بتقنية العرض ثلاثي الأبعاد الحي. قم بتدوير القطعة وتكبير تفاصيلها الدقيقة بدقة واقعية مذهلة.",
          )}
        </p>
      </div>

      {/* Relic Selector Tabs Row with Visual Thumbnails */}
      <div className="artifact-tabs-row" role="tablist" aria-label="Archaeological Relics">
        {ARTIFACTS.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelectArtifact(idx)}
            className={`artifact-tab-btn ${activeIdx === idx ? "is-active" : ""}`}
            role="tab"
            aria-selected={activeIdx === idx}
          >
            <div className="tab-thumb-box">
              <Image
                src={item.image}
                alt={item.nameEn}
                width={46}
                height={46}
                className="tab-thumb-img"
              />
            </div>
            <div className="tab-info-group text-left">
              <span className="tab-era-pill">
                {isArabic ? item.eraAr : item.eraEn}
              </span>
              <h4>{isArabic ? item.nameAr : item.nameEn}</h4>
            </div>
          </button>
        ))}
      </div>

      {/* Featured Relic Badge Banner */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-amber-400/20 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-mono text-amber-300 font-semibold">
            {isArabic ? artifact.eraAr : artifact.eraEn} · {isArabic ? artifact.nameAr : artifact.nameEn}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-white/70">
          <Rotate3d size={14} className="text-amber-400" />
          <span>{t("Real-Time PBR 3D Mesh", "نموذج ثلاثي الأبعاد تفاعلي PBR")}</span>
        </div>
      </div>

      {/* 3D Showcase Workbench */}
      <div className="artifact-workbench">
        {/* Interactive 3D Stage */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="artifact-3d-stage"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="artifact-3d-card relative flex flex-col"
            animate={{
              rotateX: viewMode === "3d" ? 0 : rotation.x,
              rotateY: viewMode === "3d" ? 0 : rotation.y,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* View Mode Switcher (Always 3D by default) */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 rounded-full border border-amber-400/30 shadow-2xl">
              <button
                type="button"
                onClick={() => setViewMode("3d")}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  viewMode === "3d"
                    ? "bg-amber-400 text-black font-semibold shadow-md"
                    : "text-amber-200/80 hover:text-white"
                }`}
              >
                <Sparkles size={11} />
                <span>3D Relic</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("photo")}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  viewMode === "photo"
                    ? "bg-amber-400 text-black font-semibold shadow-md"
                    : "text-amber-200/80 hover:text-white"
                }`}
              >
                <Eye size={11} />
                <span>Photo</span>
              </button>
              <button
                type="button"
                onClick={() => setIsTheaterOpen(true)}
                className="p-1.5 rounded-full text-amber-200/80 hover:text-white hover:bg-white/10 transition-colors ml-0.5"
                title={t("Expand 3D Theater Mode", "توسيع العرض ثلاثي الأبعاد")}
                aria-label="Theater Mode"
              >
                <Maximize2 size={13} />
              </button>
            </div>

            {/* Visual Media or 3D Stage */}
            {viewMode === "3d" ? (
              <div className="w-full h-full min-h-[480px] relative rounded-2xl overflow-hidden">
                <ModelViewer3D
                  key={artifact.id}
                  relicId={artifact.id}
                  modelUrl={artifact.model3d}
                  posterImage={artifact.image}
                  alt={isArabic ? artifact.nameAr : artifact.nameEn}
                />
              </div>
            ) : (
              <div className="artifact-media-wrap">
                <Image
                  src={artifact.image}
                  alt={isArabic ? artifact.nameAr : artifact.nameEn}
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 700px"
                  className={`object-cover transition-transform duration-700 ${isZoomed ? "scale-150" : "scale-105"}`}
                />
                <div className="artifact-media-gradient" />
                <div className="artifact-specular-sheen" />

                <div className="artifact-media-badge">
                  <Sparkles size={13} className="text-amber-300" />
                  <span>{isArabic ? artifact.materialAr : artifact.materialEn}</span>
                </div>

                {/* Zoom & Inspect Trigger */}
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="artifact-inspect-btn"
                  title={isZoomed ? t("Reset View", "إعادة العرض") : t("Macro Lens Zoom", "تكبير بالعدسة المجهرية")}
                >
                  <Search size={14} />
                  <span>{isZoomed ? t("Reset", "إلغاء التكبير") : t("Inspect 2X", "معاينة مقربة")}</span>
                </button>
              </div>
            )}

            {/* Footer Metadata */}
            <div className="artifact-card-footer">
              <span className="artifact-provenance">
                <MapPin size={12} className="text-amber-400" />
                {isArabic ? artifact.provenanceAr : artifact.provenanceEn}
              </span>
              <span className="artifact-date">
                <Clock size={12} className="text-amber-400" />
                {isArabic ? artifact.dateAr : artifact.dateEn}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Archaeological Curatorial Dossier */}
        <div className="artifact-curation-pane">
          <div className="curation-card">
            <span className="curation-eyebrow">
              <ShieldCheck size={13} className="text-amber-300" />
              {t("CURATORIAL DOSSIER", "السجل الأثري المعتمد")}
            </span>
            <h3 className="curation-title">
              {isArabic ? artifact.nameAr : artifact.nameEn}
            </h3>
            <span className="curation-museum">
              {isArabic ? artifact.museumAr : artifact.museumEn}
            </span>

            <p className="curation-desc">
              {isArabic ? artifact.descriptionAr : artifact.descriptionEn}
            </p>

            <div className="curation-specs-grid">
              <div className="spec-box">
                <span className="spec-label">{t("Material Composition", "المادة والتصنيع")}</span>
                <strong className="spec-val">
                  {isArabic ? artifact.materialAr : artifact.materialEn}
                </strong>
              </div>

              <div className="spec-box">
                <span className="spec-label">{t("Historical Horizon", "الأفق الزمني")}</span>
                <strong className="spec-val">
                  {isArabic ? artifact.dateAr : artifact.dateEn}
                </strong>
              </div>
            </div>

            <div className="curator-insight-box">
              <div className="flex items-start gap-2.5">
                <Layers size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-xs font-semibold text-sand mb-0.5">
                    {t("Field Excavator Note", "ملاحظة بعثة التنقيب")}:
                  </strong>
                  <p className="text-xs text-white/85 leading-relaxed">
                    {isArabic ? artifact.curatorNoteAr : artifact.curatorNoteEn}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen 3D Theater Modal */}
      <AnimatePresence>
        {isTheaterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col p-4 md:p-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-amber-400/20">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-lg md:text-2xl font-serif text-amber-100 font-semibold">
                  {isArabic ? artifact.nameAr : artifact.nameEn}
                </h3>
                <span className="text-xs font-mono text-amber-300 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                  {isArabic ? artifact.eraAr : artifact.eraEn}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsTheaterOpen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={t("Close Theater (Esc)", "إغلاق (Esc)")}
                aria-label="Close Theater"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 w-full relative rounded-2xl overflow-hidden mt-4">
              {viewMode === "3d" ? (
                <ModelViewer3D
                  relicId={artifact.id}
                  modelUrl={artifact.model3d}
                  posterImage={artifact.image}
                  alt={isArabic ? artifact.nameAr : artifact.nameEn}
                />
              ) : (
                <div className="w-full h-full relative">
                  <Image
                    src={artifact.image}
                    alt={isArabic ? artifact.nameAr : artifact.nameEn}
                    fill
                    quality={95}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
