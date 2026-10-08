"use client";
import React, { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export const CometCard = ({
  rotateDepth = 14,
  translateDepth = 16,
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 260 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    shouldReduceMotion
      ? ["0deg", "0deg"]
      : [`-${rotateDepth}deg`, `${rotateDepth}deg`],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    shouldReduceMotion
      ? ["0deg", "0deg"]
      : [`${rotateDepth}deg`, `-${rotateDepth}deg`],
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    shouldReduceMotion
      ? ["0px", "0px"]
      : [`-${translateDepth}px`, `${translateDepth}px`],
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    shouldReduceMotion
      ? ["0px", "0px"]
      : [`${translateDepth}px`, `-${translateDepth}px`],
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [10, 90]);

  const glareBackground = useMotionTemplate`radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(229, 185, 143, 0.32) 0%, rgba(255, 255, 255, 0.16) 28%, transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={cn("relative [perspective:1200px] h-full", className)}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          mounted
            ? {
                rotateX,
                rotateY,
                translateX,
                translateY,
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 18px 45px -10px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(229, 185, 143, 0.12)",
              }
            : {
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 18px 45px -10px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(229, 185, 143, 0.12)",
              }
        }
        initial={{ scale: 1 }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.025,
                transition: { duration: 0.25, ease: "easeOut" },
              }
        }
        className="relative h-full w-full rounded-2xl overflow-hidden group bg-[var(--surface-card,#131a16)] p-[1.5px]"
      >
        {/* Animated Orbiting Comet Border Beam */}
        <div className="pointer-events-none absolute -inset-[100%] m-auto aspect-square opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
          <motion.div
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(229,185,143,0.3) 310deg, #e5b98f 345deg, #ffffff 360deg)`,
            }}
          />
        </div>

        {/* Inner Card Layer */}
        <div className="relative h-full w-full rounded-[14px] z-20 overflow-hidden bg-[var(--surface-card,#131a16)]">
          {children}

          {/* Dynamic Comet Glare Reflection */}
          {mounted && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-40 h-full w-full rounded-[14px] mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: glareBackground,
              }}
            />
          )}

          {/* Subtle Ambient Border */}
          <div className="pointer-events-none absolute inset-0 z-30 rounded-[14px] border border-white/10 group-hover:border-[rgba(229,185,143,0.3)] transition-colors duration-400" />
        </div>
      </motion.div>
    </div>
  );
};
