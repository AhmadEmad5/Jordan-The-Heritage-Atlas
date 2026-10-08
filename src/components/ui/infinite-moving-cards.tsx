"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

export interface InfiniteMovingItem {
  quote?: string;
  name?: string;
  title?: string;
  [key: string]: unknown;
}

export interface InfiniteMovingCardsProps<T = InfiniteMovingItem> {
  items?: T[];
  renderItem?: (item: T, idx: number) => React.ReactNode;
  children?: React.ReactNode;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}

export function InfiniteMovingCards<T extends InfiniteMovingItem = InfiniteMovingItem>({
  items,
  renderItem,
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  itemClassName,
}: InfiniteMovingCardsProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  // Duplicate in pure React render so synthetic event listeners (Lens, Hover, Clicks)
  // are fully preserved on all duplicated cards
  const duplicatedItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    return [...items, ...items];
  }, [items]);

  const setupAnimation = useCallback(() => {
    if (!containerRef.current) return;

    // Set direction
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    // Set speed
    const duration =
      speed === "fast" ? "24s" : speed === "normal" ? "45s" : "85s";
    containerRef.current.style.setProperty("--animation-duration", duration);

    setStart(true);
  }, [direction, speed]);

  useEffect(() => {
    setupAnimation();
  }, [setupAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {children ? (
          children
        ) : duplicatedItems.length > 0 ? (
          duplicatedItems.map((item, idx) => (
            <li
              key={idx}
              className={cn(
                "relative w-[380px] max-w-full shrink-0 rounded-2xl border border-[rgba(226,199,153,0.18)] bg-[rgba(16,15,18,0.85)] p-6 md:w-[460px] backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-[rgba(226,199,153,0.4)]",
                itemClassName
              )}
            >
              {renderItem ? (
                renderItem(item, idx)
              ) : (
                <blockquote>
                  <span className="relative z-20 text-sm leading-[1.65] font-normal text-stone-200">
                    {item.quote}
                  </span>
                  <div className="relative z-20 mt-6 flex flex-row items-center">
                    <span className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-amber-200/90">
                        {item.name}
                      </span>
                      <span className="text-xs text-stone-400">
                        {item.title}
                      </span>
                    </span>
                  </div>
                </blockquote>
              )}
            </li>
          ))
        ) : null}
      </ul>
    </div>
  );
}

export default InfiniteMovingCards;
