"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Sparkles,
  Headphones,
  Gauge,
  Globe,
  Radio,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ambientEngine } from "@/lib/ambientSound";

export interface NarrationTrack {
  id: string;
  actTitleEn: string;
  actTitleAr: string;
  periodEn?: string;
  periodAr?: string;
  textEn: string;
  textAr: string;
}

interface VoiceNarrationPlayerProps {
  tracks: NarrationTrack[];
  activeTrackIndex: number;
  onTrackChange?: (index: number) => void;
  destinationNameEn: string;
  destinationNameAr: string;
}

export default function VoiceNarrationPlayer({
  tracks,
  activeTrackIndex,
  onTrackChange,
  destinationNameEn,
  destinationNameAr,
}: VoiceNarrationPlayerProps) {
  const { isArabic, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(0.95); // 0.95x documentary pacing
  const [isExpanded, setIsExpanded] = useState(false);
  const [supported, setSupported] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize SpeechSynthesis
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
      const updateVoices = () => {
        const v = window.speechSynthesis.getVoices();
        setAvailableVoices(v);
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    } else {
      setSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const currentTrack = tracks[activeTrackIndex] || tracks[0];

  const stopNarration = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
  }, []);

  const playNarration = useCallback(
    (index: number = activeTrackIndex) => {
      if (!synthRef.current || !supported) return;

      synthRef.current.cancel();

      const track = tracks[index];
      if (!track) return;

      const text = isArabic ? `${track.actTitleAr}. ${track.textAr}` : `${track.actTitleEn}. ${track.textEn}`;

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      utterance.rate = playbackRate;
      utterance.pitch = 0.95; // slightly lower documentary timbre

      // Select voice
      const targetLang = isArabic ? "ar" : "en";
      const voices = availableVoices.filter((v) => v.lang.startsWith(targetLang));

      if (voices.length > 0) {
        // Prefer natural / premium voices if available
        const preferred =
          voices.find(
            (v) =>
              v.name.includes("Natural") ||
              v.name.includes("Google") ||
              v.name.includes("Daniel") ||
              v.name.includes("Arthur") ||
              v.name.includes("Maged")
          ) || voices[0];
        utterance.voice = preferred;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        // Advance to next track if available
        if (index < tracks.length - 1) {
          if (onTrackChange) onTrackChange(index + 1);
        }
      };

      utterance.onerror = (e) => {
        if (e.error !== "canceled" && e.error !== "interrupted") {
          setIsPlaying(false);
        }
      };

      synthRef.current.speak(utterance);
    },
    [activeTrackIndex, availableVoices, isArabic, onTrackChange, playbackRate, supported, tracks]
  );

  const togglePlay = () => {
    if (isPlaying) {
      stopNarration();
    } else {
      playNarration(activeTrackIndex);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeTrackIndex + 1) % tracks.length;
    if (onTrackChange) onTrackChange(nextIdx);
    if (isPlaying) playNarration(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = activeTrackIndex === 0 ? tracks.length - 1 : activeTrackIndex - 1;
    if (onTrackChange) onTrackChange(prevIdx);
    if (isPlaying) playNarration(prevIdx);
  };

  const cycleRate = () => {
    const rates = [0.85, 0.95, 1.1];
    const currIdx = rates.indexOf(playbackRate);
    const nextRate = rates[(currIdx + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (isPlaying) {
      stopNarration();
      setTimeout(() => playNarration(activeTrackIndex), 100);
    }
  };

  if (!supported || tracks.length === 0) return null;

  return (
    <div className="voice-narration-hud fixed bottom-6 left-6 z-40">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-[#121915]/95 border border-[#d49b6a]/35 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden text-[#f5efe6]"
      >
        {/* Main HUD Bar */}
        <div className="flex items-center gap-3 px-3.5 py-2.5">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isPlaying
                ? "bg-[#d49b6a] text-black shadow-[0_0_15px_rgba(212,155,106,0.6)]"
                : "bg-black/40 text-[#d49b6a] border border-[#d49b6a]/30 hover:border-[#d49b6a] hover:bg-[#d49b6a]/15"
            }`}
            aria-label={isPlaying ? "Pause documentary narration" : "Play documentary voice narration"}
            title={isPlaying ? "Pause Narration" : "Play Documentary Voice"}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
          </button>

          {/* Equalizer animation when playing */}
          <div className="flex items-center gap-1 h-5 px-1">
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={`w-0.5 rounded-full bg-[#d49b6a] transition-all duration-300 ${
                  isPlaying
                    ? `animate-[pulse_0.6s_ease-in-out_infinite] h-${bar + 2}`
                    : "h-1 opacity-30"
                }`}
                style={{
                  height: isPlaying ? `${Math.max(4, (bar * 5) % 18)}px` : "3px",
                  animationDelay: `${bar * 0.15}s`,
                }}
              />
            ))}
          </div>

          {/* Active Track Title & Destination */}
          <div
            onClick={() => setIsExpanded((prev) => !prev)}
            className="cursor-pointer max-w-[140px] sm:max-w-[200px] truncate pr-1"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono tracking-wider text-[#d49b6a] uppercase">
                {t("DOCU GUIDE", "دليل صوتي")}
              </span>
              <span className="text-[9px] text-stone-500 font-mono">
                {activeTrackIndex + 1}/{tracks.length}
              </span>
            </div>
            <h5 className="text-xs font-serif font-semibold truncate text-[#f5efe6]">
              {isArabic ? currentTrack.actTitleAr : currentTrack.actTitleEn}
            </h5>
          </div>

          {/* Skip buttons */}
          <div className="flex items-center gap-1 border-l border-white/10 pl-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1 rounded-lg text-stone-400 hover:text-white"
              title="Previous Act"
            >
              <SkipBack size={13} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1 rounded-lg text-stone-400 hover:text-white"
              title="Next Act"
            >
              <SkipForward size={13} />
            </button>
          </div>

          {/* Pacing Speed Chip */}
          <button
            type="button"
            onClick={cycleRate}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-stone-700/60 text-stone-300 hover:text-amber-300 hover:border-amber-400/40"
            title="Toggle playback speed"
          >
            {playbackRate}x
          </button>
        </div>

        {/* Expanded Details Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 py-3 border-t border-[rgba(212,155,106,0.15)] bg-black/40 max-w-sm text-xs"
            >
              <div className="flex items-center justify-between text-[11px] text-[#d49b6a] mb-2 font-mono">
                <span>{isArabic ? destinationNameAr : destinationNameEn}</span>
                <span>{isArabic ? currentTrack.periodAr : currentTrack.periodEn}</span>
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed line-clamp-3 font-light">
                {isArabic ? currentTrack.textAr : currentTrack.textEn}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
