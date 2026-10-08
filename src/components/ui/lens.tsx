"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: {
    x: number;
    y: number;
  };
  isStatic?: boolean;
  isFocusing?: () => void;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
  className?: string;
  lensRing?: boolean;
  lensRingColor?: string;
}

export const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 1.3,
  lensSize = 180,
  isStatic = false,
  position = { x: 200, y: 150 },
  hovering,
  setHovering,
  className,
  lensRing = true,
  lensRingColor = "rgba(226, 199, 153, 0.65)",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localIsHovering, setLocalIsHovering] = useState(false);

  const isHovering = hovering !== undefined ? hovering : localIsHovering;
  const setIsHovering = setHovering || setLocalIsHovering;

  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-3xl z-20", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {isStatic ? (
        <div className="pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden pointer-events-none z-50"
            style={{
              maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                position.x
              }px ${position.y}px, black 98%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                position.x
              }px ${position.y}px, black 98%, transparent 100%)`,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none bg-[#09080c] rounded-3xl"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${position.x}px ${position.y}px`,
              }}
            >
              {children}
            </div>
          </motion.div>
          {lensRing && (
            <div
              className="pointer-events-none absolute z-[60] rounded-full"
              style={{
                width: lensSize,
                height: lensSize,
                left: position.x - lensSize / 2,
                top: position.y - lensSize / 2,
                border: `1.5px solid ${lensRingColor}`,
                boxShadow: `0 0 25px rgba(226, 199, 153, 0.4), inset 0 0 15px rgba(226, 199, 153, 0.2)`,
              }}
            />
          )}
        </div>
      ) : (
        <AnimatePresence>
          {isHovering && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 overflow-hidden z-50 rounded-3xl"
                style={{
                  maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                    mousePosition.x
                  }px ${mousePosition.y}px, black 99%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(circle ${
                    lensSize / 2
                  }px at ${mousePosition.x}px ${
                    mousePosition.y
                  }px, black 99%, transparent 100%)`,
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none bg-[#09080c] rounded-3xl"
                  style={{
                    transform: `scale(${zoomFactor})`,
                    transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                  }}
                >
                  {children}
                </div>
              </motion.div>

              {lensRing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="pointer-events-none absolute z-[60] rounded-full"
                  style={{
                    width: lensSize,
                    height: lensSize,
                    left: mousePosition.x - lensSize / 2,
                    top: mousePosition.y - lensSize / 2,
                    border: `1.5px solid ${lensRingColor}`,
                    boxShadow: `0 0 25px rgba(226, 199, 153, 0.45), inset 0 0 16px rgba(226, 199, 153, 0.2)`,
                    background: `radial-gradient(circle, transparent 65%, rgba(226, 199, 153, 0.08) 100%)`,
                  }}
                />
              )}
            </>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Lens;
