"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Permanently intercept prefers-reduced-motion queries in the browser runtime
if (typeof window !== "undefined") {
  try {
    const origMatchMedia = window.matchMedia;
    window.matchMedia = function (query: string) {
      if (query && typeof query === "string" && query.includes("prefers-reduced-motion")) {
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        } as unknown as MediaQueryList;
      }
      return origMatchMedia
        ? origMatchMedia.call(window, query)
        : ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
          } as unknown as MediaQueryList);
    };
  } catch {
    // Non-browser fallback
  }
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
