# 🇯🇴 Jordan — The Heritage Atlas

### *أطلس التراث الأردني · An Immersive Digital Expedition*

[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1.11-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-1.63-2EAD33?style=for-the-badge&logo=playwright)](https://playwright.dev/)
[![Accessibility](https://img.shields.io/badge/WCAG_2.2-AAA_Compliant-gold?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)

> **A museum-grade interactive digital odyssey bringing 12,000 years of civilization, Nabataean engineering, and breathtaking topography to the modern web.**

[Explore Destinations](#-core-features) • [Motion Architecture](#-motion--ux-architecture) • [Tech Stack](#-technology-stack) • [Getting Started](#-getting-started--local-development) • [Testing & Verification](#-testing--verification)

---

## 🏛️ Vision & Manifesto

**Jordan: The Heritage Atlas** is an interactive cultural expedition platform engineered to bridge historical preservation with cutting-edge web craftsmanship. Rather than serving static brochure pages, the platform reimagines tourism through **spatial storytelling**, **cartographic exploration**, and **cinematic scrollytelling**.

Every destination—from the rose-red sandstone clefts of **Petra** and the Martian stillness of **Wadi Rum** to the mineral shores of the **Dead Sea** and the Roman colonnades of **Jerash**—is treated as a living museum exhibit. 

Built with principles from `ui-ux-pro-max`, `motion`, and GreenSock (`gsap-ai-skills`), the Atlas blends rigorous performance engineering (60fps GPU compositor budgeting) with editorial typographic restraint, deep bilingual cultural authenticity (English / Arabic), and ethical, verified visitor discovery.

---

## 🧭 Core Features

### 1. Interactive Topographic Map (Visual Gateway)
* **Geographic Cartography Engine**: An SVG-projected national outline of the Hashemite Kingdom of Jordan featuring mathematically anchored destination waypoints calculated from real geographic coordinates (`latitude` / `longitude`).
* **Northern Cluster Leader Lines**: To solve dense waypoint collision in Jordan’s northern highlands (Jerash, Ajloun, Umm Qais), the map implements an intelligent callout system with leader lines, guaranteeing minimum 44×44 CSS-pixel accessible touch targets (`Apple HIG` & `WCAG 2.2 AAA`).
* **Dynamic Category Filtering**: Fluidly filters regions across three curated journeys:
  * 🏛️ *Ancient Wonders* (Petra, Jerash, Umm Qais)
  * 🏜️ *Wild Landscapes* (Wadi Rum, Dana Biosphere Reserve, Dead Sea)
  * 🌿 *Living Heritage* (Ajloun Castle & Forest, local community culinary tables)
* **Micro-Interactive Telemetry**: Beacon pulses, magnetic cursor glows, elevation contour accents, and keyboard tab-through indexing with live preview drawers.

---

### 2. Cinematic 3-Act Scrollytelling
Every destination page features a three-act documentary narrative driven by scroll position:
* **Act I: The Arrival** — Setting the scene, geographical entry, and emotional resonance.
* **Act II: The Marvel** — The architectural, hydraulic, or geological triumph of the site.
* **Act III: The Living Legacy** — Modern Bedouin stewardship, conservation, and cultural continuity.
* **Scroll-Bound Camera Movement**: Built on GSAP `ScrollTrigger` with `scrub: 1`, delivering natural inertia, reversible camera zooms, and tactile spatial transitions.
* **Scroll-Drawn Field-Notes Diagrams**: Archaeological technical sketches that dynamically draw their SVG strokes (`stroke-dashoffset`) in sync with the user's scroll depth.

---

### 3. Slide Snapping Engine & Dynamic HUD
* **Viewport Snapping Geometry**: Dedicated viewport management for dramatic, full-bleed storytelling with smooth scroll-jacking prevention and trackpad dampening.
* **Dynamic HUD Chapter Rail**: Real-time chapter progress bars, active coordinate readout, and one-click scrub jump points.
* **Historical Chronology Matrix (`HistoricalTimeline.tsx`)**: Interactive horizontal era browser traversing the Nabataean, Roman, Byzantine, Islamic, and Modern epochs with artifacts, architecture styles, and verified archaeological dates.

---

### 4. Living Canvas Ambiance (`HeritageCanvasBackground.tsx`)
* **Procedural Topographic Contours**: Hardware-accelerated HTML5 Canvas rendering fluid, undulating elevation waves that react to user scroll trajectory.
* **Atmospheric Particulate Simulation**: Subtle desert dust and star mist generated using procedural noise without stressing the CPU.
* **Adaptive Heritage Color System**: Canvas and lighting ambient hues dynamically adapt per destination:
  * *Petra*: Rose sandstone (`#e2c799`), oxidized terracotta (`#b35446`).
  * *Wadi Rum*: Desert dusk obsidian (`#0d110f`), solar amber (`#f5a623`).
  * *Dead Sea*: Mineral salt lapis (`#2a4d69`), saline cyan (`#79a7d3`).
  * *Ajloun*: Highland pine emerald (`#1e3f20`), wet stone slate (`#4a5859`).
* **Aceternity Lens Magnifier (`lens.tsx`)**: Real-time virtual magnifying lens revealing macro details of rock textures, mosaic tesserae, and inscriptions.

---

### 5. Elevated Stay & Provider Discovery Suite
* **Native-Integrated Dark Date Cards**: Replaces browser-default white pickers with frosted glass date cards (`.date-field-card`), custom gold indicators (`::-webkit-calendar-picker-indicator`), and `color-scheme: dark`.
* **Quick Stay Presets**: One-tap duration chips: *Tonight (1n)*, *Weekend (2n)*, and *Retreat (3n)* with automated check-in/check-out calculation.
* **Dynamic Duration Badge**: Real-time badge computing stay duration (e.g. `✨ 2 nights stay in Wadi Rum` / `ليلتان في وادي رم`).
* **Ethical Verification**: Direct routing to verified providers via Google Maps queries; does not scrape or harvest private booking credentials.

---

### 6. Ambient Spatial Audio Engine (`AmbientSoundscape.tsx`)
* **Procedural Acoustic Synthesis**: Leverages the native `Web Audio API` to generate organic, destination-tailored acoustic soundscapes directly in the browser with **zero external audio file downloads (0KB overhead)**.
* **Bespoke Natural Ambience**:
  * *Wadi Rum & Dana*: Organic Brownian-noise desert wind gusts and sub-bass resonance.
  * *Petra*: Meditative sandstone canyon flute drone (432Hz harmonic series) with binaural acoustic pulsation.
  * *Dead Sea*: Gentle low-frequency mineral saline wave lapping.
  * *Ajloun & Jerash*: Highland forest canopy breeze and ancient stone whispers.
* **Interactive Navigation Dock**: Elegant floating toggle with live pulsing gold equalizer wave animation (`audio-bars-wave`) and automatic battery-saving sleep when tab is hidden.

---

### 7. Smart Road Expedition & Itinerary Planner (`ItineraryPlanner.tsx`)
* **Curated Royal Routes**: Quick-load historical expeditions including *The Golden Desert Triangle (3 Days · 380 km)*, *The King's Highway Expedition (4 Days · 460 km)*, and *Northern Decapolis & Highlands (2 Days · 210 km)*.
* **Interactive Waypoint Workbench**: Allows travelers to customize, reorder, or append waypoints across all 7 destinations with live recalculation of total distance (km), scenic driving hours, and recommended trip duration.
* **One-Click Export**: Generates a pre-filled Google Maps multi-stop GPS navigation route or copies a structured travel itinerary to the clipboard.

---

### 8. Atmospheric Telemetry & Dark-Sky Canopy (`DesertTelemetryCard.tsx`)
* **International Bortle Dark-Sky Scale**: Real astronomical classification for each site (e.g. *Wadi Rum Class 1 Primal Dark Sky Sanctuary* with 99% nocturnal transparency).
* **Topographic Elevation Profiles**: Real meters & feet elevation tracking (from *-430m* beneath sea level at the Dead Sea to *+1,500m* at Dana’s Great Rift).
* **Astrophotographer Telemetry**: Seasonal travel windows, temperature swings, and celestial alignments (Milky Way galactic core over Ad-Deir, Orion over Jerash Roman colonnades).

---

### 9. 3D Virtual Archaeological Relic Showcase (`ArtifactShowcase.tsx`)
* **Interactive Perspective Tilt**: Micro-interactive 3D cards reacting to pointer coordinates with specular light reflections (`Specular Sheen`).
* **Authentic Curated Artifacts**:
  * 🏺 *Nabataean Eggshell Painted Bowl* (1st Century CE · Petra) sourced from The Metropolitan Museum of Art Open Access archives.
  * 🪙 *Decapolis Bronze Medallion of Gerasa* (c. 165 CE · Marcus Aurelius Reign).
  * 🗺️ *Madaba Mosaic Map Compass Tessera* (c. 560 CE · Church of St. George).
* **2X Macro Inspection**: Dedicated optical zoom button allowing micro-inspection of chiseled stone, clay walls, and Greek inscriptions.

---

### 10. Progressive Web App & Offline Field Guide Mode
* **Standalone PWA Architecture**: Equipped with `public/manifest.json`, high-resolution app icons, and mobile status bar theming (`#0d110f`).
* **Offline Resilient Service Worker (`public/sw.js`)**: Caches critical UI assets, cartography layers, and destination dossiers so explorers can navigate heritage records in remote desert or mountain valleys with zero internet connectivity.

---

### 11. Global Museum Command Palette (`Ctrl + K` · `CommandPalette.tsx`)
* **Instant Keyboard Gateway**: Accessible via `Ctrl + K`, `Cmd + K`, or `/` from any surface of the platform.
* **Unified Heritage Index**: Blazing-fast fuzzy search across all 7 destinations, 5 historical eras, 3D museum relics, culinary traditions, and interactive tools.
* **Museum Aesthetics**: Frosted glass backdrop (`backdrop-blur-2xl`), category filter pills (*Destinations*, *Eras*, *Relics*, *Cuisine*, *Tools*), and arrow-key navigation with breadcrumbs and keyboard shortcuts.

---

### 12. Golden Hour & Solar Telemetry (`SolarTelemetryCard.tsx` · `solarCalculator.ts`)
* **Astronomical Mathematical Engine**: Computes real-time astronomical solar position, elevation, and azimuth angles tailored to each destination's geographic coordinates.
* **Photographer's Window Matrix**: Calculates exact local time for Dawn Blue Hour, Morning Golden Hour, Solar Noon, Evening Golden Hour, and Dusk Blue Hour with live countdown timers.
* **Celestial Trajectory Arc**: Interactive SVG trajectory visualizer rendering the sun's path across the desert horizon with a glowing disc indicating current position.
* **Curator's Field Lighting Guide**: Destination-specific lighting windows and lens recommendations (e.g. 8:30 AM direct Siq illumination on Petra's Treasury facade, low-angle raking light across Wadi Rum dunes).

---

### 13. Nabataean Script Visualizer & Inscription Studio (`NabataeanTranslator.tsx`)
* **Ancient Epigraphic Engine**: Accurate mapping of the ancient 22-consonant Nabataean Aramaic alphabet (U+10880 – U+1089F) — the direct evolutionary ancestor of modern Arabic calligraphy.
* **Vector Glyph Precision**: 22 authentic SVG vector letterforms carved from archaeological rock inscriptions across Petra, Hegra, and Umm el-Jimal, ensuring 100% crisp rendering across all devices without font installation requirements.
* **Interactive Stone Relief Tablet**: Live typing transcribed in real-time into chiseled rose-red sandstone relief (rendered right-to-left) with phonetic breakdown and modern Arabic cognates.
* **Royal Presets**: One-click exploration of ancient epigraphic names (*RAQMU*, *HARETAT IV*, *SHAQILAT*, *DUSHARA*, *SHALAM*).

---

### 14. Digital Heritage Passport & Stamp Collector (`HeritagePassport.tsx`)
* **Royal Consular Passport Booklet**: Authentic emerald-and-gold foil embossed passport interface tracking explorer milestones.
* **7 Bespoke Consular Seals**: Custom vintage postal seals for each destination (*Petra's Eagle & Treasury*, *Wadi Rum's Camel Caravan & Orion*, *Dead Sea's Salt Medallion*, *Jerash's Oval Forum*, *Ajloun's Falcon*, *Umm Qais's Basalt*, *Dana's Ibex*).
* **Interactive Stamping**: Stamped upon visiting destinations with rubber-stamp spring animations, gold confetti celebration, and persistent `localStorage` progress tracking.
* **Expedition Certificate**: Generates a shareable, certified Heritage Expedition diploma displaying the traveler's name, issue date, and collected hallmarks.

---

### 15. Documentary Voice Narration Engine (`VoiceNarrationPlayer.tsx`)
* **Immersive Museum Audio Guide**: Web Speech API speech synthesis engine narrating the historical epochs and 3-act narratives across destination scrollytelling scenes.
* **Bilingual Recitation**: Naturally switches between high-fidelity English narrator voices and authentic Arabic recitation.
* **Live Audio Visualizer**: Procedural equalizer wave bars reacting in real time to speech synthesis activity.
* **Intelligent Audio Ducking**: Seamlessly lowers the volume of ambient desert soundscapes while voice narration is active, restoring full volume when paused or finished.

---

## ⚡ Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Core Framework** | [Next.js](https://nextjs.org/) | `16.3.8` | App Router, static generation (`SSG`), server components, optimized assets |
| **Runtime** | [React](https://react.dev/) | `19.2.8` | Concurrent rendering, modern hooks, declarative component model |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.x` | Strict type validation for coordinates, narratives, and accessibility APIs |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4.x` | Next-generation utility-first styling with custom CSS cascade layers |
| **Motion & Scroll** | [GSAP](https://greensock.com/) + `@gsap/react` | `3.15.0` | `ScrollTrigger`, `Observer`, timeline pinning, camera scrub choreography |
| **Micro-Interactions** | [Motion](https://motion.dev/) | `14.0.0` | UI spring physics, exit/enter presence, modal gestures, and drawer transitions |
| **Audio Engine** | Web Audio API | Native | Procedural real-time synthetic soundscapes (0KB bandwidth) |
| **Speech Narration** | Web Speech API | Native | Bilingual documentary narration with audio ducking |
| **Icons** | [Lucide React](https://lucide.dev/) | `1.52.0` | Accessible, consistent SVG stroke icons |
| **Typography** | Cormorant Garamond & Plus Jakarta Sans | Self-Hosted | Zero Google Fonts network dependency; privacy-first editorial typography |
| **Unit Testing** | [Vitest](https://vitest.dev/) | `4.1.11` | Blazing-fast component, router, and motion lifecycle validation |
| **E2E Testing** | [Playwright](https://playwright.dev/) | `1.63.0` | Multi-viewport browser testing (Chromium Desktop + Mobile Safari/iPhone) |

---

## 🎨 Motion & UX Architecture

The platform's interaction engine follows strict guidelines from `ui-ux-pro-max`, `gsap-ai-skills`, and the `motion` design standard:

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
    • opacity & scale only         • Instant state transitions
    • Timeline pinning & scrub     • Preserved chapter hierarchy
               │                         │
               └────────────┬────────────┘
                            ▼
           [IN-APP CINEMATIC OVERRIDE DOCK]
      Users can switch between Cinematic & Reading 
      modes without altering operating system settings
```

### 1. 60fps GPU Compositor Discipline
* **Compositor-Only Mutations**: Animations strictly modify hardware-accelerated CSS properties: `transform` (`translate3d`, `scale`, `rotate`) and `opacity`.
* **Zero Layout Thrashing**: Geometry attributes (`width`, `height`, `top`, `left`, `margin`, `padding`) are never animated during scroll cycles, completely eliminating costly browser reflows and cumulative layout shift (`CLS < 0.02`).
* **Subpixel Antialiasing**: Layers use `will-change: transform` and `backface-visibility: hidden` judiciously to ensure razor-sharp type rendering during scale transforms.

### 2. GSAP Lifecycle & Memory Leak Defense
In modern single-page applications, orphaned animation triggers create ghost scroll-pins and memory leaks. The Atlas implements strict lifecycle safety:
```tsx
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    // Layered camera scrubs
  });
  return () => mm.revert(); // Complete lifecycle cleanup
}, { scope: containerRef });
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
* **Node.js**: `v20.x` or higher
* **Package Manager**: `npm` (v10+), `pnpm`, or `bun`

### Installation

```bash
# 1. Clone repository
git clone https://github.com/AhmadEmad5/Jordan-The-Heritage-Atlas.git
cd Jordan-The-Heritage-Atlas

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the Atlas.

### Production Build

```bash
# Compile and optimize production bundle
npm run build

# Start production server
npm run start
```

---

## 🧪 Testing & Verification

The repository enforces a test-driven standard across unit, component, and full end-to-end integration journeys:

### 1. Type Safety Validation
```bash
npm run typecheck
```

### 2. Unit & Component Suite (Vitest)
Validates waypoint mathematics, coordinate projections, motion preferences, dialog focus management, and calendar state transitions:
```bash
npm test
```

### 3. End-to-End Browser Testing (Playwright)
Launches headless Chromium testing both desktop (1920×1080) and iPhone mobile viewports against a live production build:
```bash
# Ensure Playwright browser binaries are present
npx playwright install chromium

# Execute E2E suite
npm run test:e2e
```

### 4. Automated Visual Regression Captures
Captures multi-device screenshot artifacts directly into `artifacts/`:
```bash
node tests/capture.mjs
```

---

## 📜 Cultural Attribution & Preservation

* **Data Sourcing**: Historical annotations, archaeological dating, and conservation guidelines are aligned with research published by the **Jordan Tourism Board (JTB)** and the **Department of Antiquities of Jordan**.
* **Respectful Imagery**: All imagery highlights landscapes, architectural integrity, and local culinary traditions. Specific image licenses and photographer credits are documented in [`public/image-credits.txt`](public/image-credits.txt).
* **Privacy & Booking Transparency**: The Stay, Taste, and Explore features direct travelers to independent, verified providers on Google Maps. The Atlas never acts as a commercial intermediary or collects personal traveler data.

---

<p align="center">
  <sub>Crafted with reverence for Jordan’s enduring heritage · Built with Next.js, GSAP, and Tailwind CSS.</sub>
</p>