"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

interface AmbientSoundscapeProps {
  destinationSlug: string;
}

interface SoundscapeTheme {
  titleEn: string;
  titleAr: string;
  type: "wind" | "saline" | "canyon" | "highland";
  filterFreq: number;
  droneFreq: number;
}

const SOUNDSCAPES: Record<string, SoundscapeTheme> = {
  "wadi-rum": {
    titleEn: "Desert Wind & Solitude",
    titleAr: "نسيم رمال وادي رم",
    type: "wind",
    filterFreq: 260,
    droneFreq: 108, // Sub-bass desert resonance
  },
  petra: {
    titleEn: "Siq Echoes & Sandstone Flute",
    titleAr: "صدى السيق ونغمات الأنباط",
    type: "canyon",
    filterFreq: 480,
    droneFreq: 216, // Meditative canyon drone
  },
  "dead-sea": {
    titleEn: "Saline Lapping & Mineral Calm",
    titleAr: "أمواج البحر الميت الهادئة",
    type: "saline",
    filterFreq: 320,
    droneFreq: 144, // Subdued brine water resonance
  },
  ajloun: {
    titleEn: "Highland Pine Whispers",
    titleAr: "حفيف غابات عجلون الجبلية",
    type: "highland",
    filterFreq: 650,
    droneFreq: 288, // Forest canopy resonance
  },
  jerash: {
    titleEn: "Decapolis Stone & Wind",
    titleAr: "نسيم أعمدة جرش الرومانية",
    type: "highland",
    filterFreq: 520,
    droneFreq: 192,
  },
  dana: {
    titleEn: "Valley Breeze & Canyon Air",
    titleAr: "هواء وادي ضانا البري",
    type: "wind",
    filterFreq: 340,
    droneFreq: 128,
  },
  "umm-qais": {
    titleEn: "Lake Horizon & Galilean Air",
    titleAr: "أفق بحيرة طبريا وهواء الجولان",
    type: "highland",
    filterFreq: 580,
    droneFreq: 240,
  },
};

export default function AmbientSoundscape({ destinationSlug }: AmbientSoundscapeProps) {
  const { isArabic, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<any[]>([]);

  const theme = SOUNDSCAPES[destinationSlug] || SOUNDSCAPES["wadi-rum"];

  // Stop sound if tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      } else if (!document.hidden && isPlaying && audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isPlaying]);

  // Teardown on unmount or slug change
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
        audioCtxRef.current = null;
      }
    };
  }, [destinationSlug]);

  const initAndStartAudio = async () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        setIsSupported(false);
        return;
      }

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      // Master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 1.8);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Generate 6 seconds procedural Brownian / pink noise buffer for realistic nature wind/waves
      const bufferSize = ctx.sampleRate * 6;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brownian noise filter
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Gain compensation
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // 2. Resonant bandpass filter
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(theme.filterFreq, ctx.currentTime);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      // 3. LFO to simulate organic slow wind swells and wave laps
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.09, ctx.currentTime); // 11-second natural swell cycle
      lfoGain.gain.setValueAtTime(theme.filterFreq * 0.45, ctx.currentTime);
      lfo.connect(filter.frequency);

      noiseSource.connect(filter);
      filter.connect(masterGain);

      // 4. Meditative harmonic ambient drone (432Hz harmonic series)
      const droneOsc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      droneOsc.type = "sine";
      droneOsc.frequency.setValueAtTime(theme.droneFreq, ctx.currentTime);
      droneGain.gain.setValueAtTime(0.04, ctx.currentTime);

      const droneOscDetune = ctx.createOscillator();
      const droneGainDetune = ctx.createGain();
      droneOscDetune.type = "sine";
      droneOscDetune.frequency.setValueAtTime(theme.droneFreq + 0.75, ctx.currentTime); // 0.75Hz binaural pulsation
      droneGainDetune.gain.setValueAtTime(0.03, ctx.currentTime);

      droneOsc.connect(droneGain);
      droneOscDetune.connect(droneGainDetune);
      droneGain.connect(masterGain);
      droneGainDetune.connect(masterGain);

      // Start all voices
      noiseSource.start();
      lfo.start();
      droneOsc.start();
      droneOscDetune.start();

      nodesRef.current = [noiseSource, lfo, droneOsc, droneOscDetune, masterGain];
      setIsPlaying(true);
    } catch (err) {
      console.warn("Ambient Audio initialization prevented or unsupported:", err);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (!audioCtxRef.current || !masterGainRef.current) {
      setIsPlaying(false);
      return;
    }
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    try {
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      setTimeout(() => {
        nodesRef.current.forEach((n) => {
          try {
            n.stop?.();
            n.disconnect?.();
          } catch {}
        });
        nodesRef.current = [];
        setIsPlaying(false);
      }, 1250);
    } catch {
      setIsPlaying(false);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      initAndStartAudio();
    }
  };

  if (!isSupported) return null;

  return (
    <div className="relative inline-flex items-center">
      <motion.button
        type="button"
        onClick={togglePlayback}
        className={`ambient-audio-toggle ${isPlaying ? "is-active" : ""}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={
          isPlaying
            ? t("Mute ambient soundscape", "كتم الصوت المحيطي")
            : t("Play ambient soundscape", "تشغيل الصوت المحيطي")
        }
        title={
          isPlaying
            ? `${isArabic ? theme.titleAr : theme.titleEn} (${t("Playing", "يعمل الآن")})`
            : `${t("Atmosphere", "الأجواء")}: ${isArabic ? theme.titleAr : theme.titleEn}`
        }
      >
        {isPlaying ? (
          <div className="flex items-center gap-1.5">
            <Volume2 size={13} className="text-amber-300 animate-pulse" />
            <div className="audio-bars-wave" aria-hidden="true">
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 opacity-80">
            <VolumeX size={13} className="text-sand/80" />
            <span className="text-[10px] tracking-wide font-medium">
              {t("Audio", "صوت")}
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
