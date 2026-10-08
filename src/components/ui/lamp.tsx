"use client";
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Aceternity-inspired Lamp Effect Fixture
 * Casts a majestic overhead radiant light beam, illuminated top filament line,
 * and atmospheric golden glow onto any card, dossier, or quote block.
 */
export const LampEffect = ({
  className,
  color = "#e5b98f",
  accentColor = "#d07b62",
  size = "md",
}: {
  className?: string;
  color?: string;
  accentColor?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const shouldReduceMotion = useReducedMotion();

  const heightClass =
    size === "sm" ? "h-16" : size === "lg" ? "h-36" : "h-24";
  const lineWidth = size === "sm" ? "75%" : size === "lg" ? "95%" : "85%";
  const blurSize = size === "sm" ? "blur-md" : "blur-xl";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 overflow-hidden z-0 select-none",
        heightClass,
        className,
      )}
      aria-hidden="true"
    >
      {/* Conic Lamp Beams: Left and Right Cones meeting at top center */}
      <div className="absolute inset-0 flex items-start justify-center opacity-70 group-hover:opacity-95 transition-opacity duration-500">
        {/* Left Conic Light Beam */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0.6, width: "65%" }
              : { opacity: 0.3, width: "35%" }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 0.6, width: "65%" }
              : { opacity: 0.85, width: "65%" }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-6 right-1/2 h-32 w-1/2"
          style={{
            background: `conic-gradient(from 75deg at 100% 0%, ${color} 0deg, ${accentColor} 20deg, transparent 65deg, transparent 360deg)`,
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 15%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 15%, transparent 95%)",
          }}
        />

        {/* Right Conic Light Beam */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0.6, width: "65%" }
              : { opacity: 0.3, width: "35%" }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 0.6, width: "65%" }
              : { opacity: 0.85, width: "65%" }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-6 left-1/2 h-32 w-1/2"
          style={{
            background: `conic-gradient(from 285deg at 0% 0%, transparent 0deg, transparent 295deg, ${accentColor} 340deg, ${color} 360deg)`,
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 15%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 15%, transparent 95%)",
          }}
        />
      </div>

      {/* Central Ambient Glow Pool */}
      <div
        className={cn(
          "absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-18 rounded-full opacity-60 group-hover:opacity-85 transition-opacity duration-500",
          blurSize,
        )}
        style={{
          background: `radial-gradient(circle, ${color} 0%, ${accentColor} 50%, transparent 80%)`,
        }}
      />

      {/* Radiant Top Filament Beam */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { width: lineWidth, opacity: 0.8 }
            : { width: "25%", opacity: 0.3 }
        }
        animate={{ width: lineWidth, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[1.5px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color} 25%, #ffffff 50%, ${color} 75%, transparent 100%)`,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${accentColor}`,
        }}
      />
    </div>
  );
};

/**
 * LampCard: A luxury museum-grade illuminated card container
 * Integrates the Aceternity Lamp lighting fixture with glassmorphism and golden borders.
 */
export const LampCard = ({
  children,
  className,
  color = "#e5b98f",
  accentColor = "#d07b62",
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  accentColor?: string;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden group border border-[rgba(229,185,143,0.18)] bg-[rgba(14,20,17,0.82)] backdrop-blur-md shadow-2xl transition-all duration-400 hover:border-[rgba(229,185,143,0.4)]",
        className,
      )}
    >
      <LampEffect color={color} accentColor={accentColor} size={size} />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

/**
 * Full-section / Hero Lamp Container from Aceternity UI
 * Enhanced with Jordanian desert rose/gold palette and reduced-motion support.
 */
export const LampContainer = ({
  children,
  className,
  color = "#e5b98f",
  accentColor = "#d07b62",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  accentColor?: string;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden bg-[#0d1310] w-full rounded-md z-0",
        className,
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0.8, width: "30rem" }
              : { opacity: 0.4, width: "15rem" }
          }
          animate={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            background: `conic-gradient(from 70deg at 50% 0%, ${color} 0deg, ${accentColor} 25deg, transparent 70deg, transparent 360deg)`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] text-white"
        >
          <div className="absolute w-full left-0 bg-[#0d1310] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-[#0d1310] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0.8, width: "30rem" }
              : { opacity: 0.4, width: "15rem" }
          }
          animate={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            background: `conic-gradient(from 290deg at 50% 0%, transparent 0deg, transparent 290deg, ${accentColor} 335deg, ${color} 360deg)`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] text-white"
        >
          <div className="absolute w-40 h-full right-0 bg-[#0d1310] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-[#0d1310] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#0d1310] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: color }}
        />
        <motion.div
          initial={{ width: "8rem" }}
          animate={{ width: "16rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ background: accentColor }}
        />
        <motion.div
          initial={{ width: "15rem" }}
          animate={{ width: "30rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, #fff, ${color}, transparent)`,
            boxShadow: `0 0 14px ${color}`,
          }}
        />
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#0d1310]" />
      </div>

      <div className="relative z-50 flex -translate-y-36 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-[#f5efe6] to-[#e5b98f] py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl font-serif"
      >
        Jordan <br /> Living Heritage
      </motion.h1>
    </LampContainer>
  );
}
