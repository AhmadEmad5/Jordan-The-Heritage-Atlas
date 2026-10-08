"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Compass, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  destinations,
  projectCoordinates,
  type Category,
  type Destination,
} from "@/data/destinations";
// Simplified border in longitude/latitude; pins and outline share a geographic projection.
const border = [
  [35.57, 32.68],
  [35.68, 32.71],
  [35.83, 32.66],
  [36.03, 32.52],
  [36.83, 32.32],
  [38.79, 33.37],
  [39.2, 32.16],
  [37.0, 31.5],
  [37.98, 30.5],
  [37.66, 30.0],
  [36.07, 29.19],
  [34.97, 29.35],
  [34.98, 29.55],
  [35.16, 30.05],
  [35.36, 30.5],
  [35.47, 31.1],
  [35.56, 31.48],
  [35.55, 31.8],
  [35.52, 32.12],
  [35.57, 32.68],
];
const callouts: Record<string, [number, number]> = {
  "umm-qais": [0, -10],
  ajloun: [-10, 20],
  jerash: [45, -8],
  "amman-citadel": [55, 20],
  "dead-sea": [-10, 40],
};
export default function JordanMap({
  filter = "All places",
  onPreview,
}: {
  filter?: Category | "All places";
  onPreview?: (destination: Destination) => void;
}) {
  const router = useRouter();
  const [preview, setPreview] = useState<Destination | null>(null);
  const points = border
    .map(([lng, lat]) => {
      const p = projectCoordinates({ lng, lat });
      return `${p.x * 7},${p.y * 7}`;
    })
    .join(" ");
  function show(destination: Destination) {
    setPreview(destination);
    onPreview?.(destination);
  }
  return (
    <div
      className="jordan-map"
      aria-label="Interactive destination map of Jordan"
    >
      <svg viewBox="0 0 700 700" aria-hidden="true" className="map-svg">
        <defs>
          <linearGradient id="sand" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#151d19" />
            <stop offset="1" stopColor="#1c2621" />
          </linearGradient>
          <radialGradient id="desert-glow">
            <stop stopColor="#d96b52" stopOpacity=".25" />
            <stop offset="1" stopColor="#d96b52" stopOpacity="0" />
          </radialGradient>
          <clipPath id="jordan-outline">
            <polygon points={points} />
          </clipPath>
          <pattern
            id="grid"
            width="70"
            height="70"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 70 0 L 0 0 0 70"
              fill="none"
              stroke="#e5b98f"
              strokeOpacity=".07"
              strokeWidth=".6"
            />
          </pattern>
        </defs>
        <rect width="700" height="700" fill="url(#grid)" />
        <text x="335" y="70" className="map-country">
          SYRIA
        </text>
        <text x="520" y="400" className="map-country">
          SAUDI ARABIA
        </text>
        <text
          x="6"
          y="285"
          className="map-country"
          transform="rotate(-90 6 285)"
        >
          PALESTINE
        </text>
        <polygon
          points={points}
          fill="url(#sand)"
          stroke="#36453d"
          strokeWidth="1.4"
        />
        <g
          clipPath="url(#jordan-outline)"
          fill="none"
          stroke="#e5b98f"
          strokeOpacity=".15"
          strokeWidth=".8"
        >
          {Array.from({ length: 24 }, (_, i) => (
            <path
              key={i}
              d={`M ${60 + i * 9},30 C ${240 + i * 12},${180 + i * 5} ${-50 + i * 18},${290 + i * 6} ${160 + i * 14},480 S ${380 + i * 11},590 ${200 + i * 19},720`}
            />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <ellipse
              key={`e${i}`}
              cx="375"
              cy="225"
              rx={40 + i * 19}
              ry={25 + i * 15}
              stroke="#d96b52"
              strokeOpacity=".15"
              transform="rotate(-28 375 225)"
            />
          ))}
        </g>
        <ellipse
          cx="270"
          cy="460"
          rx="210"
          ry="240"
          fill="url(#desert-glow)"
          clipPath="url(#jordan-outline)"
        />
        <path
          d="M111 251 Q103 275 110 304 L120 305 Q130 279 121 254Z"
          fill="#315c57"
          stroke="#5ba19b"
          strokeWidth="1.2"
        />
        <path
          d="M139 145 Q173 173 168 235 T110 470 L95 583"
          stroke="#d96b52"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          fill="none"
          opacity=".6"
        />
        <text x="355" y="335" className="map-jordan">
          JORDAN
        </text>
        <text x="338" y="363" className="map-arabic">
          الأردن
        </text>
        <text x="143" y="485" className="map-region">
          SOUTHERN DESERT
        </text>
        <text x="195" y="205" className="map-region">
          NORTHERN HIGHLANDS
        </text>
      </svg>
      {destinations
        .filter((d) => filter === "All places" || d.category === filter)
        .map((destination) => {
          const p = projectCoordinates(destination.coordinates);
          const [dx, dy] = callouts[destination.slug] || [0, 0];
          return (
            <div key={destination.slug}>
              {(dx || dy) !== 0 && (
                <svg
                  aria-hidden="true"
                  className="pin-leader"
                  width="1"
                  height="1"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2={dx}
                    y2={dy}
                    stroke="#9c503c"
                    strokeWidth=".7"
                    strokeOpacity=".6"
                  />
                  <circle r="2" fill="#9c503c" />
                </svg>
              )}
              <motion.button
                type="button"
                className={`map-pin pin-${destination.slug} ${preview?.slug === destination.slug ? "is-active" : ""}`}
                style={{
                  left: `calc(${p.x}% + ${dx}px)`,
                  top: `calc(${p.y}% + ${dy}px)`,
                  width: 44,
                  height: 44,
                }}
                aria-label={`Explore ${destination.name}`}
                onMouseEnter={() => show(destination)}
                onFocus={() => show(destination)}
                onClick={() => router.push(`/destinations/${destination.slug}`)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
              >
                <span className="pin-dot" />
                <span className="pin-label">{destination.name}</span>
              </motion.button>
            </div>
          );
        })}
      <AnimatePresence>
        {preview && (filter === "All places" || preview.category === filter) && (
          <motion.div
            key={preview.slug}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="map-preview"
            role="status"
          >
            <Image src={preview.image} alt="" width={76} height={76} />
            <div>
              <span className="eyebrow">{preview.category}</span>
              <strong>{preview.name}</strong>
              <p>{preview.hook}</p>
            </div>
            <ArrowUpRight size={18} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="map-compass"
        whileHover={{ rotate: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Compass size={31} strokeWidth={1} />
        <span>N</span>
      </motion.div>
      <div className="map-scale">
        <span />0 &nbsp; — &nbsp; 50 km{" "}
        <small>Illustrated geographic atlas</small>
      </div>
    </div>
  );
}
