"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Sparkles,
  RotateCcw,
  Search,
  Eye,
  ShieldCheck,
  MapPin,
  Clock,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
    provenanceEn: "Petra (Wadi Musa Basin)",
    provenanceAr: "البتراء (حوض وادي موسى)",
    museumEn: "The Jordan Museum · Archaeological Vault",
    museumAr: "متحف الأردن · الخزانة الأثرية الوطنية",
    materialEn: "Terracotta (1.5mm thickness) with iron-oxide paint",
    materialAr: "فخار رقيق (سماكة ١.٥ ملم) مع أكسيد الحديد النباتي",
    descriptionEn: "World-renowned for being as thin as an eggshell. The Nabataeans mastered ultra-fine terracotta pottery adorned with stylized palm fronds and pomegranate motifs.",
    descriptionAr: "اشتهر الخزف النبطي عالمياً برقة جدرانه الشبيهة بقشر البيض، مع زخارف نباتية متقنة ترمز للنخيل والرمان وبركة الصحراء.",
    image: "/images/artifacts/nabataean-bowl.jpg",
    curatorNoteEn: "Excavated near the Great Temple. Demonstrates Nabataean chemical mastery in clay refinement and kiln temperature control.",
    curatorNoteAr: "عُثر عليها بالقرب من المعبد الكبير؛ تشهد على دقة تقنية متقدمة في تنقية الصلصال وضبط أفران الحرق.",
  },
  {
    id: "decapolis-coin",
    nameEn: "Decapolis Bronze Medallion of Gerasa",
    nameAr: "مسكوكة جرش البرونزية (حلف الديكابولس)",
    eraEn: "Roman Decapolis",
    eraAr: "العهد الروماني",
    dateEn: "c. 165 CE · Reign of Marcus Aurelius",
    dateAr: "١٦٥ ميلادي · عهد ماركوس أوريليوس",
    provenanceEn: "Jerash (Cardo Maximus Colonnade)",
    provenanceAr: "جرش (شارع الأعمدة - الكاردو)",
    museumEn: "Jerash Archaeological Museum",
    museumAr: "متحف آثار جرش الميداني",
    materialEn: "Cast & Struck Bronze Alloy",
    materialAr: "برونز مسكوك ومطروق",
    descriptionEn: "Commemorative municipal civic coinage depicting the goddess Artemis as the city's divine guardian, inscribed with Greek civic titles.",
    descriptionAr: "عملة تذكارية تجسد الإلهة أرتميس حامية المدينة الرومانية، محفورة بألقاب الحلف التجاري اليوناني-الروماني.",
    image: "/images/artifacts/decapolis-coin.jpg",
    curatorNoteEn: "Discovered in the drainage system beneath the South Theater, confirming flourishing trans-provincial commerce.",
    curatorNoteAr: "وُجدت في قنوات التصريف الحجرية أسفل المسرح الجنوبي، وتؤكد حركة التبادل التجاري عبر طريق تراجان.",
  },
  {
    id: "byzantine-mosaic",
    nameEn: "Madaba Mosaic Map Compass Tessera",
    nameAr: "مفردة فسيفساء خارطة مأدبا الجغرافية",
    eraEn: "Byzantine Era",
    eraAr: "العصر البيزنطي",
    dateEn: "c. 560 CE · Justinian Reign",
    dateAr: "٥٦٠ ميلادي · العهد الجستنياني",
    provenanceEn: "Madaba (Church of Saint George)",
    provenanceAr: "مأدبا (كنيسة القديس جاورجيوس)",
    museumEn: "Madaba Archaeological Park",
    museumAr: "متنزه مأدبا الأثري",
    materialEn: "Natural colored limestone & Dead Sea bitumen",
    materialAr: "حجارة جيرية طبيعية وبتيومين البحر الميت",
    descriptionEn: "Part of the oldest surviving cartographic depiction of the Holy Land. Natural stone cubes hand-chiseled to portray topographic elevations and watercourses.",
    descriptionAr: "أقدم خارطة جغرافية فسيفسائية أصلية في العالم. صُممت بحبيبات حجرية ملونة ترسم تضاريس الأردن والأنهار بدقة طبوغرافية مدهشة.",
    image: "/images/artifacts/byzantine-mosaic.jpg",
    curatorNoteEn: "Constructed with over two million stone cubes sourced directly from central Jordanian wadi beds.",
    curatorNoteAr: "تحتوي الخارطة الكاملة على أكثر من مليوني قطعة حجرية مستخرجة من أودية البلقاء ومأدبا.",
  },
];

export default function ArtifactShowcase() {
  const { isArabic, t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const artifact = ARTIFACTS[activeIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12; // tilt angle
    const rotateX = ((centerY - y) / centerY) * 12;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className="artifact-section" id="artifacts">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span className="tiny-star">✦</span> {t("ARCHAEOLOGICAL CURATION", "المقتنيات الأثرية التفاعلية")}
          </p>
          <h2>{t("3D Virtual Relic Showcase.", "معرض القطع الأثرية والتفاصيل التراثية")}</h2>
        </div>
        <p>
          {t(
            "Inspect physical remnants of Nabataean engineering, Roman civic coinage, and Byzantine mosaic tesserae.",
            "معاينة تفاعلية حية لأبرز الشواهد المادية والقطع الأثرية التي أبدعتها الحضارات المتعاقبة على أرض الأردن.",
          )}
        </p>
      </div>

      {/* Relic Selector Tabs */}
      <div className="artifact-tabs-row" role="tablist">
        {ARTIFACTS.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveIdx(idx);
              setIsZoomed(false);
            }}
            className={`artifact-tab-btn ${activeIdx === idx ? "is-active" : ""}`}
            role="tab"
            aria-selected={activeIdx === idx}
          >
            <span className="tab-era-pill">
              {isArabic ? item.eraAr : item.eraEn}
            </span>
            <h4>{isArabic ? item.nameAr : item.nameEn}</h4>
          </button>
        ))}
      </div>

      {/* 3D Showcase Card */}
      <div className="artifact-workbench">
        {/* Interactive 3D Card Frame */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="artifact-3d-stage"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="artifact-3d-card"
            animate={{
              rotateX: rotation.x,
              rotateY: rotation.y,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Visual Media with Inspection Mode */}
            <div className="artifact-media-wrap">
              <Image
                src={artifact.image}
                alt={isArabic ? artifact.nameAr : artifact.nameEn}
                fill
                sizes="(max-width: 768px) 100vw, 550px"
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

            {/* Speculative Lighting Reflection Tag */}
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
    </section>
  );
}
