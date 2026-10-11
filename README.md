# 🇯🇴 Jordan — The Heritage Atlas
### *أطلس التراث الأردني · An Immersive Museum-Grade Digital Expedition*

<p align="center">
  <img src="public/screenshots/01-hero-atlas.png" alt="Jordan Heritage Atlas — Interactive Cartographic Gateway" width="100%" style="border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.6);" />
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.3.8%20(Turbopack)-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2.8-20232A?style=for-the-badge&logo=react" alt="React" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.x-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
  <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-WebGL_PBR-000000?style=for-the-badge&logo=three.js" alt="Three.js" /></a>
  <a href="https://greensock.com/"><img src="https://img.shields.io/badge/GSAP-3.15%20ScrollTrigger-88CE02?style=for-the-badge&logo=greensock" alt="GSAP" /></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Vitest-4.1.11-6E9F18?style=for-the-badge&logo=vitest" alt="Vitest" /></a>
  <a href="https://playwright.dev/"><img src="https://img.shields.io/badge/Playwright-1.63-2EAD33?style=for-the-badge&logo=playwright" alt="Playwright" /></a>
  <a href="https://www.w3.org/WAI/standards-guidelines/wcag/"><img src="https://img.shields.io/badge/WCAG_2.2-AAA_Compliant-gold?style=for-the-badge" alt="Accessibility" /></a>
</p>

<p align="center">
  <strong>منصة وثائقية أثرية تفاعلية تجمع بين 12,000 عام من الحضارة وعمارة الأنباط وتضاريس الأردن في تجربة رقمية فائقة التطور.</strong><br>
  <em>A museum-grade digital odyssey uniting 12,000 years of civilization, Nabataean hydraulic engineering, and Jordan's dramatic topography.</em>
</p>

<p align="center">
  <a href="#-visual-tour--interface-showcase">معرض لقطات الشاشة</a> •
  <a href="#-core-features">الميزات الرئيسية</a> •
  <a href="#-3d--spatial-architecture">المجسمات ثلاثية الأبعاد</a> •
  <a href="#-motion--performance-engineering">محرك الحركة والأداء</a> •
  <a href="#-technology-stack">التقنيات المستخدمة</a> •
  <a href="#-getting-started">التشغيل المحلي</a> •
  <a href="#-testing--quality-assurance">الاختبارات</a>
</p>

---

## 🏛️ الرؤية والمنهج (Vision & Manifesto)

**Jordan: The Heritage Atlas** يهدف إلى إعادة صياغة استكشاف التراث الرقمي والسياحة الثقافية عبر تجاوز مفاهيم الكتيبات والمواقع التقليدية، مقدماً تجربة **استكشاف كارتوغرافي**، و**سرد زمني سينمائي (Cinematic Scrollytelling)**، و**فحص أثري ثلاثي الأبعاد بالضوء الحقيقي (PBR WebGL)**.

تمت هندسة التطبيق ليعمل بمعدل **60 إطاراً في الثانية (60fps)** بدون أي هبوط في الأداء، مع دعم ثنائي اللغة (العربية والإنجليزية)، ومراعاة أعلى معايير الوصول الرقمي (`WCAG 2.2 AAA`)، وتجربة مستخدم فاخرة مستوحاة من رمال وادي رم الوردية وحجارة البتراء المنحوتة في الصخر.

---

## 📸 Visual Tour & Interface Showcase (معرض الشاشات)

### 1. البوابة الكارتوغرافية والخريطة التفاعلية (Interactive Cartography & Map Gateway)
خريطة طوبوغرافية حية للمملكة الأردنية الهاشمية مبنية بحسابات إسقاط إحداثي دقيق (`Latitude/Longitude`)، تدعم خطوط الإشارة الدقيقة للمواقع المتقاربة في الشمال (جرش، عجلون، أم قيس)، مع فلاتر المسارات السياحية الثلاثة (عجائب قديمة، طبيعة برية، تراث حي)، ومؤشرات التلمس المغناطيسي وشارة البحث `⌘K`.

<p align="center">
  <img src="public/screenshots/01-hero-atlas.png" alt="Jordan Topographic Map and Visual Gateway" width="100%" style="border-radius: 8px; border: 1px solid rgba(226, 199, 153, 0.2);" />
</p>

---

### 2. السرد الوثائقي الزمني عبر 5 حقب تاريخية (Cinematic 5-Epoch Scrollytelling)
رحلة سردية عبر آلاف السنين في كل موقع أثري (مثل البتراء)، مدعومة بمحرك **GSAP ScrollTrigger** وشريط المسار الزمني الجانبي التفاعلي (**Vertical Era Scrubber Rail**) مع نبضات ذهبية حية، وبطاقات التلميح ثنائية اللغة، ووضع السينما الغامرة (**Cinema Immersion Mode**)، والتعليق الصوتي الوثائقي التلقائي.

<p align="center">
  <img src="public/screenshots/03-scrollytelling-cinematic.png" alt="Petra 5-Epoch Historical Chronology Scrollytelling" width="100%" style="border-radius: 8px; border: 1px solid rgba(226, 199, 153, 0.2);" />
</p>

---

### 3. الخزانة الأثرية ثلاثية الأبعاد (3D Virtual Archaeological Relic Showcase)
عارض متحفي واقعي بتقنية **Three.js WebGL** مع خامات PBR عالية الدقة (وعاء الفخار النبطي، عملة جراسا الرومانية، فسيفساء مادبا، وتماثيل عين غزال). يشمل تحكماً كاملاً بالدوران الحر والتكبير الميكروسكوبي، وتبديل الإضاءة الأثرية المائلة (**Archaeological Raking Light**)، ووضع المسرح الموسع بكامل الشاشة (**3D Theater Modal**).

<p align="center">
  <img src="public/screenshots/02-artifact-showcase-3d.png" alt="3D Archaeological Relic Viewer with Museum Lighting" width="100%" style="border-radius: 8px; border: 1px solid rgba(226, 199, 153, 0.2);" />
</p>

---

### 4. مخطط الرحلات البرية التفاعلي (Royal Routes Itinerary Workbench)
أداة ذكية لتخطيط الرحلات وحساب مسافات القيادة وساعات السفر الموصى بها لحظياً عبر الطرق الملكية التاريخية (المثلث الذهبي الجنوبي، الطريق الملوكي، ومدن حلف الديكابولس العشر)، مع إمكانية إعادة ترتيب المحطات والتصدير الفوري لمسار Google Maps.

<p align="center">
  <img src="public/screenshots/04-itinerary-planner.png" alt="Royal Routes Road Trip Itinerary Planner" width="100%" style="border-radius: 8px; border: 1px solid rgba(226, 199, 153, 0.2);" />
</p>

---

### 5. جواز السفر التراثي الملكي ومجمع الأختام (Digital Heritage Passport & Stamps)
كتيب جواز سفر تراثي رقمي يحاكي الوثائق الملكية القديمة بألوان الزمرد والذهب، يمنح الرحالة أختاماً قنصلية كلاسيكية عند زيارة كل موقع أثري مع مؤثرات ارتدادية، ويتيح إصدار شهادة استكشاف رسمية قابلة للمشاركة.

<p align="center">
  <img src="public/screenshots/05-heritage-passport.png" alt="Digital Heritage Passport and Consular Seals" width="100%" style="border-radius: 8px; border: 1px solid rgba(226, 199, 153, 0.2);" />
</p>

---

### 6. لوحة التحكم والبحث المتحفي الشامل (Museum Command Palette · `Ctrl + K`)
نافذة بحث فوري زجاجية فائقة السرعة تتيح الوصول لأي وجهة، أو حقبة تاريخية، أو قطعة أثرية ثلاثية الأبعاد، أو أداة تفاعلية في جزء من الثانية مع دعم كامل للاختصارات ولوحة المفاتيح.

<p align="center">
  <img src="public/screenshots/06-command-palette.png" alt="Global Museum Command Palette" width="100%" style="border-radius: 8px; border: 1px solid rgba(226, 199, 153, 0.2);" />
</p>

---

## 🧭 أبرز ميزات المنصة (Core Features)

| الميزة | الوصف التقني | المكون المسؤول |
| :--- | :--- | :--- |
| **الخريطة الكارتوغرافية** | إسقاط SVG تفاعلي للمملكة مع خطوط إرشادية شمالية لمنع تداخل النقاط واستهداف لمسي `44×44px` | `InteractiveMap.tsx` |
| **السرد الزمني السينمائي** | تجربة سكروليتيلينج من 5 حقب مع شريط تعقب عمودي وتثبيت مشاهد GSAP وتلاشٍ بصري سلس | `Scrollytelling.tsx` |
| **المعرض الأثري ثلاثي الأبعاد** | عارض Three.js مع إضاءة بيئية PBR وظلال ناعمة وإضاءة مائلة وفحص مجسمات واقعية | `ModelViewer3D.tsx` |
| **الخلفية الحية التفاعلية** | كانفاس هجين يحاكي أمواج التضاريس مع فيزياء تشتت مغناطيسي لمؤشر الفأرة وأمواج الصدمة | `HeritageCanvasBackground.tsx` |
| **الصوت المحيطي الطبيعي** | محرك صوتي اصطناعي عبر Web Audio API يولد أصوات الرياح والصحراء والمياه بدون ملفات خارجية (0KB) | `AmbientSoundscape.tsx` |
| **التعليق الصوتي الوثائقي** | قراءة وثائقية ذكية باللغتين العربية والإنجليزية مع خفض ذكي للصوت المحيطي أثناء الحديث | `VoiceNarrationPlayer.tsx` |
| **مترجم الخط النبطي** | تحويل فوري للنصوص العربية والإنجليزية إلى نقوش الآرامية النبطية (22 حرفاً متجهاً من صخور البتراء) | `NabataeanTranslator.tsx` |
| **حاسبة الساعات الذهبية** | معادلات فلكية لحساب شروق وغروب الشمس وساعات التصوير الذهبية والزرقاء لكل موقع بدقة | `SolarTelemetryCard.tsx` |
| **تطبيق الويب التقدمي (PWA)** | دعم كامل للعمل بلا إنترنت (Offline Mode) في الأودية والصحاري بفضل Service Worker | `sw.js` |

---

## 🏺 الهندسة ثلاثية الأبعاد (3D & Spatial Architecture)

تمت ترقية نظام عرض القطع الأثرية في الأطلس ليعتمد أعلى معايير الرندرة الواقعية الفيزيائية (**PBR**):

1. **تصحيح المواد غير المعدنية (Dielectric Material Calibration):**
   - تم ضبط معامل المعدنية `metalness: 0.03 - 0.04` والخشونة `roughness: 0.78 - 0.88` لمعالجة الخلل الشائع في تصدير مجسمات الفخار والجص، مما منح الأواني النبطية وتماثيل عين غزال مظهرها الطيني الحقيقي بدلاً من اللمعان المعدني الزائف.
2. **انعكاسات بيئية متحفية (PMREM RoomEnvironment):**
   - توليد خرائط انعكاس بيئية داخلية عالية الدقة باستخدام `PMREMGenerator` لمحاكاة قاعات المتاحف الكبرى.
3. **إضاءة المسح الأثري المائل (Archaeological Raking Light):**
   - شعاع جانبي بزاوية منخفضة حادة يبرز تفاصيل الحفر والضربات الإزميلية والنقوش اليونانية على العملات والفسيفساء.
4. **توفير استهلاك المعالج وموارد الطاقة (Viewport & Visibility Culling):**
   - إيقاف حلقة التصيير WebGL تلقائياً عبر `IntersectionObserver` بمجرد خروج العارض من الشاشة أو تحويل التبويب، وتحديد دقة البكسل بـ `2.0` كحد أقصى لمنع استنزاف البطارية على شاشات Retina و 4K.

---

## ⚡ محرك الأداء وسلاسة الحركة (Motion & Performance)

```
┌────────────────────────────────────────────────────────┐
│                   USER SCROLL INPUT                    │
└───────────────────────────┬────────────────────────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
   [prefers-reduced-motion: no]   [prefers-reduced-motion: reduce]
               │                         │
               ▼                         ▼
    GSAP ScrollTrigger Engine      Accessible Editorial Mode
    • 60fps GPU Compositor         • Zero forced transforms
    • transform: translate3d       • Clean vertical reading flow
    • Zero Layout Reflows          • Instant state transitions
    • Timeline pinning & scrub     • Preserved chapter hierarchy
               │                         │
               └────────────┬────────────┘
                            ▼
            [IN-APP CINEMATIC OVERRIDE DOCK]
       Users can toggle between Cinematic & Reading 
       modes at any time regardless of OS settings
```

- **انعدام عبء منظف الذاكرة (Zero Allocation Canvas):** تم تحويل رسم الجزيئات في الخلفية إلى استخدام `ctx.globalAlpha` وأكواد ألوان Hex ثابتة، مما ألغى أكثر من 2,500 كائن نصي كان يتم إنشاؤه في كل ثانية.
- **كبح الحركات الخفية (Hover-Gated Animations):** في بطاقات `CometCard`، لا تدور التدرجات المخروطية إلا عند اقتراب المؤشر منها فقط، مما حرر المعالج الرسومي من تدوير عشرات الطبقات الخفية في الخلفية.
- **فصل تمرير المتصفح عن GSAP:** ضبط `html { scroll-behavior: auto; }` لضمان عدم تعارض المحركين أثناء التمرير الزمني.

---

## 🛠️ التقنيات المستخدمة (Technology Stack)

| الطبقة | التقنية | الإصدار | الوظيفة |
| :--- | :--- | :--- | :--- |
| **إطار العمل الأساسي** | [Next.js](https://nextjs.org/) | `16.3.8` (Turbopack) | App Router، رندرة ثابتة فائقة السرعة (`SSG`)، تحسين الصور |
| **مكتبة الواجهة** | [React](https://react.dev/) | `19.2.8` | المكونات التفاعلية وحالة التطبيق المتزامنة |
| **لغة البرمجة** | [TypeScript](https://www.typescriptlang.org/) | `5.x` | أمان برمجي صارم للإحداثيات والبيانات التراثية |
| **التنسيق والتصميم** | [Tailwind CSS](https://tailwindcss.com/) | `v4.x` | تصميم حديث قائم على متغيرات CSS والطبقات المتسلسلة |
| **محرك الرسوميات ثلاثية الأبعاد** | [Three.js](https://threejs.org/) | `0.183.x` | عارض WebGL المتقدم للقطع الأثرية مع OrbitControls و PBR |
| **حركة التمرير والتثبيت** | [GSAP](https://greensock.com/) + `@gsap/react` | `3.15.0` | `ScrollTrigger`, `Timeline` لتجربة السكروليتيلينج الوثائقية |
| **حركات الواجهة التفاعلية** | [Motion](https://motion.dev/) | `14.0.0` | فيزياء النوابض وتأثيرات الظهور والانتقال |
| **الصوت المحيطي** | Web Audio API | Native | توليد صوتي إجرائي محلي في المتصفح بحجم 0KB |
| **التعليق الصوتي** | Web Speech API | Native | قراءة وثائقية بالإنجليزية والعربية مع خاصية خفض الصوت |
| **فحص واختبار الوحدات** | [Vitest](https://vitest.dev/) | `4.1.11` | اختبارات المكونات والرياضيات الكارتوغرافية والحركة |
| **اختبارات المتصفح الشاملة** | [Playwright](https://playwright.dev/) | `1.63.0` | اختبارات متعددة الأجهزة (Desktop 1440px و iPhone 390px) |

---

## 🚀 التشغيل المحلي (Getting Started & Local Development)

### المتطلبات المسبقة
- **Node.js**: الإصدار `v20.x` أو أحدث.
- **مدير الحزم**: `npm`، `pnpm`، أو `bun`.

### خطوات التثبيت والتشغيل

```bash
# 1. استنساخ المستودع
git clone https://github.com/AhmadEmad5/Jordan-The-Heritage-Atlas.git
cd Jordan-The-Heritage-Atlas

# 2. تثبيت الحزم والاعتماديات
npm install

# 3. تشغيل خادم التطوير المحلي
npm run dev
```

افتح المتصفح على الرابط: [http://localhost:3000](http://localhost:3000)

### بناء نسخة الإنتاج (Production Build)

```bash
# تجميع وتحسين ملفات الإنتاج عبر Next.js Turbopack
npm run build

# تشغيل خادم الإنتاج
npm run start
```

---

## 🧪 الاختبارات والجودة (Testing & Quality Assurance)

```bash
# 1. فحص الأنواع الصارم (TypeScript Check)
npm run typecheck

# 2. تشغيل اختبارات الوحدات وحالات الحركة (Vitest - 26/26 Tests)
npm test

# 3. تشغيل اختبارات المتصفح الشاملة (Playwright E2E)
npx playwright install chromium
npm run test:e2e

# 4. التقاط لقطات الشاشة التوثيقية المحدثة
node scripts/capture-showcase.mjs
```

---

## 📜 التوثيق الثقافي والحقوق (Cultural Attribution & Preservation)

- **توثيق البيانات:** تستند المعلومات التاريخية والأثرية إلى أبحاث وسجلات **دائرة الآثار العامة الأردنية** و**هيئة تنشيط السياحة (JTB)** ومركز التراث العالمي لليونسكو.
- **التصوير الأثري:** جميع الصور المدمجة تراعي المعالم الطبيعية والتقاليد المجتمعية. حقوق الصور ومصادرها موثقة في [`public/image-credits.txt`](public/image-credits.txt).
- **الخصوصية:** منصة الأطلس لا تجمع أي بيانات شخصية أو بنكية، وتوجه الزوار إلى المواقع والخدمات المحلية المعتمدة عبر خرائط Google مباشرة.

---

<p align="center">
  <sub>صُنِعَ بإجلالٍ لتاريخ الأردن العريق وسحر أرضه الخالدة · مبني بأحدث تقنيات الويب الحديثة.</sub><br>
  <sub>Crafted with reverence for Jordan’s enduring heritage · Built with Next.js, Three.js, GSAP, and Tailwind CSS.</sub>
</p>