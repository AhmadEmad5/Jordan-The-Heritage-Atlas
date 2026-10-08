"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { usePathname } from "next/navigation";

export type HeritageThemeKey =
  | "default"
  | "petra"
  | "wadi-rum"
  | "jerash"
  | "amman-citadel"
  | "dead-sea"
  | "ajloun"
  | "umm-qais";

export interface HeritageTheme {
  key: HeritageThemeKey;
  name: string;
  nameAr: string;
  glow1: string;
  glow2: string;
  glow3: string;
  glow4: string;
  contourStroke: string;
  particleColors: string[];
}

export const HERITAGE_THEMES: Record<HeritageThemeKey, HeritageTheme> = {
  default: {
    key: "default",
    name: "Jordan Heritage Atlas",
    nameAr: "أطلس التراث الأردني",
    glow1: "radial-gradient(circle, rgba(179, 84, 70, 0.22) 0%, rgba(139, 58, 58, 0.08) 55%, transparent 75%)",
    glow2: "radial-gradient(circle, rgba(197, 160, 89, 0.18) 0%, rgba(212, 155, 106, 0.06) 55%, transparent 75%)",
    glow3: "radial-gradient(circle, rgba(27, 122, 130, 0.16) 0%, rgba(15, 76, 92, 0.05) 55%, transparent 80%)",
    glow4: "radial-gradient(circle, rgba(194, 94, 59, 0.12) 0%, transparent 65%)",
    contourStroke: "rgba(226, 199, 153, 0.075)",
    particleColors: [
      "rgba(226, 199, 153, ",
      "rgba(212, 155, 106, ",
      "rgba(251, 251, 251, ",
    ],
  },
  petra: {
    key: "petra",
    name: "Petra · The Rose City",
    nameAr: "البتراء · المدينة الوردية",
    glow1: "radial-gradient(circle, rgba(179, 84, 70, 0.32) 0%, rgba(139, 58, 58, 0.12) 55%, transparent 75%)",
    glow2: "radial-gradient(circle, rgba(212, 155, 106, 0.24) 0%, rgba(194, 94, 59, 0.08) 60%, transparent 75%)",
    glow3: "radial-gradient(circle, rgba(120, 40, 40, 0.38) 0%, rgba(22, 25, 23, 0.2) 65%, transparent 80%)",
    glow4: "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 65%)",
    contourStroke: "rgba(226, 199, 153, 0.09)",
    particleColors: [
      "rgba(226, 199, 153, ",
      "rgba(212, 155, 106, ",
      "rgba(245, 158, 11, ",
    ],
  },
  "wadi-rum": {
    key: "wadi-rum",
    name: "Wadi Rum · Valley of the Moon",
    nameAr: "وادي رم · وادي القمر",
    glow1: "radial-gradient(circle, rgba(210, 95, 55, 0.30) 0%, rgba(184, 74, 57, 0.10) 55%, transparent 75%)",
    glow2: "radial-gradient(circle, rgba(139, 38, 22, 0.26) 0%, rgba(42, 22, 37, 0.15) 60%, transparent 80%)",
    glow3: "radial-gradient(circle, rgba(17, 24, 39, 0.90) 0%, rgba(11, 14, 20, 0.6) 65%, transparent 85%)",
    glow4: "radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, transparent 65%)",
    contourStroke: "rgba(226, 199, 153, 0.085)",
    particleColors: [
      "rgba(245, 158, 11, ",
      "rgba(255, 237, 213, ",
      "rgba(210, 95, 55, ",
    ],
  },
  jerash: {
    key: "jerash",
    name: "Jerash · Pompeii of the East",
    nameAr: "جرش · بومبي الشرق",
    glow1: "radial-gradient(circle, rgba(197, 160, 89, 0.28) 0%, rgba(226, 199, 153, 0.10) 55%, transparent 75%)",
    glow2: "radial-gradient(circle, rgba(154, 105, 45, 0.20) 0%, rgba(122, 102, 67, 0.08) 60%, transparent 75%)",
    glow3: "radial-gradient(circle, rgba(31, 36, 33, 0.55) 0%, rgba(22, 25, 23, 0.3) 65%, transparent 80%)",
    glow4: "radial-gradient(circle, rgba(226, 199, 153, 0.15) 0%, transparent 65%)",
    contourStroke: "rgba(226, 199, 153, 0.08)",
    particleColors: [
      "rgba(226, 199, 153, ",
      "rgba(197, 160, 89, ",
      "rgba(251, 251, 251, ",
    ],
  },
  "amman-citadel": {
    key: "amman-citadel",
    name: "Amman Citadel · Jabal Al-Qal'a",
    nameAr: "جبل القلعة · قلب عمّان الخالد",
    glow1: "radial-gradient(circle, rgba(184, 74, 57, 0.26) 0%, rgba(154, 59, 59, 0.10) 55%, transparent 75%)",
    glow2: "radial-gradient(circle, rgba(212, 155, 106, 0.20) 0%, rgba(197, 160, 89, 0.08) 60%, transparent 75%)",
    glow3: "radial-gradient(circle, rgba(31, 36, 33, 0.50) 0%, rgba(22, 25, 23, 0.3) 65%, transparent 80%)",
    glow4: "radial-gradient(circle, rgba(179, 84, 70, 0.14) 0%, transparent 65%)",
    contourStroke: "rgba(212, 155, 106, 0.08)",
    particleColors: [
      "rgba(226, 199, 153, ",
      "rgba(212, 155, 106, ",
      "rgba(184, 74, 57, ",
    ],
  },
  "dead-sea": {
    key: "dead-sea",
    name: "Dead Sea · The Mineral Abyss",
    nameAr: "البحر الميت · مهبط الأملاح والمعادن",
    glow1: "radial-gradient(circle, rgba(27, 122, 130, 0.32) 0%, rgba(15, 76, 92, 0.12) 55%, transparent 75%)",
    glow2: "radial-gradient(circle, rgba(67, 146, 151, 0.24) 0%, rgba(92, 163, 157, 0.08) 60%, transparent 75%)",
    glow3: "radial-gradient(circle, rgba(6, 8, 9, 0.75) 0%, rgba(18, 38, 43, 0.3) 65%, transparent 80%)",
    glow4: "radial-gradient(circle, rgba(251, 251, 251, 0.14) 0%, transparent 65%)",
    contourStroke: "rgba(92, 163, 157, 0.09)",
    particleColors: [
      "rgba(251, 251, 251, ",
      "rgba(92, 163, 157, ",
      "rgba(224, 242, 241, ",
    ],
  },
  ajloun: {
    key: "ajloun",
    name: "Ajloun · Castle in the Pines",
    nameAr: "عجلون · قلعة بين أشجار الصنوبر",
    glow1: "radial-gradient(circle, rgba(45, 74, 62, 0.30) 0%, rgba(27, 46, 38, 0.12) 55%, transparent 75%)",
    glow2: "radial-gradient(circle, rgba(63, 94, 77, 0.22) 0%, rgba(82, 110, 93, 0.08) 60%, transparent 75%)",
    glow3: "radial-gradient(circle, rgba(7, 10, 8, 0.75) 0%, rgba(15, 26, 20, 0.3) 65%, transparent 80%)",
    glow4: "radial-gradient(circle, rgba(185, 156, 106, 0.10) 0%, transparent 65%)",
    contourStroke: "rgba(163, 190, 169, 0.08)",
    particleColors: [
      "rgba(163, 190, 169, ",
      "rgba(226, 199, 153, ",
      "rgba(251, 251, 251, ",
    ],
  },
  "umm-qais": {
    key: "umm-qais",
    name: "Umm Qais · Ancient Gadara",
    nameAr: "أم قيس · جدارا وبحر طبريا",
    glow1: "radial-gradient(circle, rgba(42, 54, 59, 0.32) 0%, rgba(31, 36, 33, 0.12) 55%, transparent 75%)",
    glow2: "radial-gradient(circle, rgba(31, 80, 95, 0.22) 0%, rgba(44, 93, 99, 0.08) 60%, transparent 75%)",
    glow3: "radial-gradient(circle, rgba(8, 9, 10, 0.75) 0%, rgba(20, 24, 26, 0.3) 65%, transparent 80%)",
    glow4: "radial-gradient(circle, rgba(59, 82, 73, 0.12) 0%, transparent 65%)",
    contourStroke: "rgba(180, 200, 195, 0.08)",
    particleColors: [
      "rgba(180, 200, 195, ",
      "rgba(226, 199, 153, ",
      "rgba(251, 251, 251, ",
    ],
  },
};

/**
 * Dispatch a global theme preview or reset event from any component
 * (e.g., hovering map pins or destination cards).
 */
export function setHeritageTheme(theme: HeritageThemeKey | null) {
  if (typeof window === "undefined") return;
  if (theme) {
    window.dispatchEvent(
      new CustomEvent("heritage-theme-change", { detail: { theme } })
    );
  } else {
    window.dispatchEvent(new CustomEvent("heritage-theme-reset"));
  }
}

interface MoteParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  colorIdx: number;
}

interface HeritageCanvasBackgroundProps {
  themeOverride?: HeritageThemeKey;
  className?: string;
}

export function HeritageCanvasBackground({
  themeOverride,
  className = "",
}: HeritageCanvasBackgroundProps) {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derive base theme from pathname
  const routeThemeKey = useMemo<HeritageThemeKey>(() => {
    if (themeOverride && themeOverride in HERITAGE_THEMES) {
      return themeOverride;
    }
    if (!pathname) return "default";
    const match = pathname.match(/\/destinations\/([a-z0-9-]+)/);
    if (match && match[1] && match[1] in HERITAGE_THEMES) {
      return match[1] as HeritageThemeKey;
    }
    return "default";
  }, [pathname, themeOverride]);

  // Hover / preview override from event listeners
  const [previewKey, setPreviewKey] = useState<HeritageThemeKey | null>(null);
  const activeKey = previewKey ?? routeThemeKey;

  // Support interactive hover preview events (e.g. Map pins or Cards)
  useEffect(() => {
    function handleThemeChange(event: Event) {
      const custom = event as CustomEvent<{ theme: HeritageThemeKey }>;
      if (custom.detail?.theme && custom.detail.theme in HERITAGE_THEMES) {
        setPreviewKey(custom.detail.theme);
      }
    }
    function handleThemeReset() {
      setPreviewKey(null);
    }

    window.addEventListener("heritage-theme-change", handleThemeChange);
    window.addEventListener("heritage-theme-reset", handleThemeReset);
    return () => {
      window.removeEventListener("heritage-theme-change", handleThemeChange);
      window.removeEventListener("heritage-theme-reset", handleThemeReset);
    };
  }, []);

  const activeTheme = HERITAGE_THEMES[activeKey] || HERITAGE_THEMES.default;

  // Layer 1 & 2: Canvas Topography Elevation Waves + Desert Dust Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number | null = null;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Track scroll offset & mouse coordinates with smooth lerp
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;
    let scrollY = 0;

    // Reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;

    function onMediaChange(e: MediaQueryListEvent) {
      prefersReducedMotion = e.matches;
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onMediaChange);
    } else {
      mediaQuery.addListener(onMediaChange);
    }

    // Allocate particle pool (fixed size to avoid GC churn)
    const PARTICLE_COUNT = 38;
    const particles: MoteParticle[] = [];

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.48) * 0.22,
          vy: -(0.15 + Math.random() * 0.3), // gentle upward desert twilight draft
          size: 0.9 + Math.random() * 1.6,
          baseAlpha: 0.2 + Math.random() * 0.45,
          pulseSpeed: 0.0015 + Math.random() * 0.002,
          pulsePhase: Math.random() * Math.PI * 2,
          colorIdx: Math.floor(Math.random() * 3),
        });
      }
    }

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.setTransform(1, 0, 0, 1, 0, 0);
      ctx?.scale(dpr, dpr);

      if (particles.length === 0) {
        initParticles();
      } else {
        // Adjust bounds proportionally
        for (const p of particles) {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        }
      }

      if (prefersReducedMotion) {
        renderStaticFrame();
      }
    }

    function onMouseMove(e: MouseEvent) {
      targetMouseX = e.clientX / Math.max(width, 1);
      targetMouseY = e.clientY / Math.max(height, 1);
    }

    function onScroll() {
      scrollY = window.scrollY || window.pageYOffset || 0;
    }

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    resize();

    // Static frame renderer for accessibility fallback
    function renderStaticFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      drawTopographicContours(0, 0.5, 0.5, 0);
    }

    function drawTopographicContours(
      time: number,
      mx: number,
      my: number,
      scrollVal: number
    ) {
      if (!ctx) return;
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = activeTheme.contourStroke;

      const numContours = 7;
      const xStep = Math.max(18, Math.floor(width / 50));

      for (let i = 0; i < numContours; i++) {
        const baseY = (height / (numContours + 1)) * (i + 1);
        const phase = time * 0.00032 + i * 0.75;
        const scrollOffset = (scrollVal * (0.035 + i * 0.012)) % (height * 0.5);

        ctx.beginPath();
        for (let x = 0; x <= width + xStep; x += xStep) {
          const nx = x / Math.max(width, 1);

          // Multi-frequency harmonic elevation formulas
          const wave1 = Math.sin(nx * 4.2 + phase) * 26;
          const wave2 = Math.cos(nx * 8.6 - phase * 0.7 + i * 0.4) * 14;
          const wave3 = Math.sin(nx * 15.4 + phase * 0.3) * 6;

          // Subtle curvature pull towards mouse
          const dx = nx - mx;
          const mouseInfluence =
            Math.exp(-dx * dx * 16) * ((my * height - baseY) * 0.06);

          const y = baseY + wave1 + wave2 + wave3 + mouseInfluence - scrollOffset;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    function loop(time: number) {
      const effectiveTime = prefersReducedMotion ? time * 0.3 : time;

      // Smooth lerp mouse tracking
      currentMouseX += (targetMouseX - currentMouseX) * 0.045;
      currentMouseY += (targetMouseY - currentMouseY) * 0.045;

      if (ctx) {
        ctx.clearRect(0, 0, width, height);

        // Layer 1: Topographic Elevation Contours
        drawTopographicContours(effectiveTime, currentMouseX, currentMouseY, scrollY);

        // Layer 2: Desert Dust & Starlight Particle System
        const colors = activeTheme.particleColors;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Advance particle position
          p.x += p.vx + Math.sin(effectiveTime * 0.0008 + p.pulsePhase) * 0.16;
          p.y += p.vy;

          // Boundary wrapping
          if (p.y < -15) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -15) p.x = width + 10;
          if (p.x > width + 15) p.x = -10;

          // Gentle breathing opacity
          const alpha =
            p.baseAlpha *
            (0.55 + 0.45 * Math.sin(effectiveTime * p.pulseSpeed + p.pulsePhase));

          const prefix = colors[p.colorIdx % colors.length] || colors[0];
          ctx.fillStyle = `${prefix}${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", onMediaChange);
      } else {
        mediaQuery.removeListener(onMediaChange);
      }
    };
  }, [activeTheme]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
      role="presentation"
      style={{
        transform: "translate3d(0, 0, 0)",
        willChange: "transform",
      }}
    >
      {/* LAYER 0: Base Mesh & Heritage Light Pools */}
      <div className="absolute inset-0 bg-[#09090b] transition-colors duration-1200 ease-out" />

      {/* Atmospheric Glow Pool 1 - Top Left Primary */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[68vw] h-[68vw] max-w-[950px] max-h-[950px] rounded-full blur-[130px] opacity-75 transition-all duration-1200 ease-out"
        style={{
          background: activeTheme.glow1,
          transform: "translate3d(0, 0, 0)",
          willChange: "opacity, background",
        }}
      />

      {/* Atmospheric Glow Pool 2 - Center / Right Accent */}
      <div
        className="absolute top-[22%] -right-[15%] w-[62vw] h-[62vw] max-w-[880px] max-h-[880px] rounded-full blur-[140px] opacity-65 transition-all duration-1200 ease-out"
        style={{
          background: activeTheme.glow2,
          transform: "translate3d(0, 0, 0)",
          willChange: "opacity, background",
        }}
      />

      {/* Atmospheric Glow Pool 3 - Lower Ambient Foundation */}
      <div
        className="absolute -bottom-[20%] left-[15%] w-[75vw] h-[75vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[150px] opacity-70 transition-all duration-1200 ease-out"
        style={{
          background: activeTheme.glow3,
          transform: "translate3d(0, 0, 0)",
          willChange: "opacity, background",
        }}
      />

      {/* Atmospheric Glow Pool 4 - Dynamic Secondary Highlight */}
      <div
        className="absolute top-[52%] left-[8%] w-[48vw] h-[48vw] max-w-[680px] max-h-[680px] rounded-full blur-[125px] opacity-45 transition-all duration-1200 ease-out"
        style={{
          background: activeTheme.glow4,
          transform: "translate3d(0, 0, 0)",
          willChange: "opacity, background",
        }}
      />

      {/* LAYER 1 & 2: Topographic Elevation Contours + Ambient Dust Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{
          mixBlendMode: "screen",
          opacity: 0.88,
        }}
      />

      {/* LAYER 3: Micro-noise Grain & Cinematic Radial Vignette */}
      {/* SVG feTurbulence tactile stone/sand micro-texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.038,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='jordanSandGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23jordanSandGrain)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          transform: "translateZ(0)",
        }}
      />

      {/* Cinematic Radial Vignette to focus foreground reading */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 46%, transparent 36%, rgba(9, 9, 11, 0.45) 72%, rgba(6, 6, 8, 0.88) 100%)",
        }}
      />
    </div>
  );
}

export default HeritageCanvasBackground;
