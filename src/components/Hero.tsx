"use client";

import { motion } from "framer-motion";
import { heroTagline } from "@/lib/animations";

// Split text into individual characters for subtle event horizon effect
function EventHorizonText({
  text,
  style,
  accent,
}: {
  text: string;
  style?: React.CSSProperties;
  accent?: boolean;
}) {
  return (
    <span style={style}>
      {text.split("").map((char, i) => {
        const seed = i * 7.3 + (accent ? 50 : 0);
        // Very subtle — barely perceptible drift
        const driftX = Math.sin(seed) * 0.8;
        const driftY = Math.cos(seed * 0.7) * 0.5;
        const blurAmount = Math.abs(Math.sin(seed * 0.3)) * 0.4;
        const delay = 1.8 + i * 0.04;

        return (
          <motion.span
            key={i}
            className="inline-block"
            style={{ display: char === " " ? "inline" : "inline-block" }}
            initial={{
              opacity: 0,
              filter: "blur(12px)",
              y: -20,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
            }}
            transition={{
              duration: 1.2,
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.span
              className="inline-block"
              animate={{
                x: [0, driftX, -driftX * 0.5, driftX * 0.3, 0],
                y: [0, driftY, -driftY * 0.7, driftY * 0.4, 0],
                filter: [
                  "blur(0px)",
                  `blur(${blurAmount}px)`,
                  "blur(0px)",
                  `blur(${blurAmount * 0.3}px)`,
                  "blur(0px)",
                ],
              }}
              transition={{
                duration: 10 + Math.sin(seed) * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </motion.span>
        );
      })}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* === OMINOUS BACKGROUND LAYERS === */}

      {/* Layer 1: Deep void — breathing darkness with visible contrast */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 50% 45% at 50% 50%, #141414 0%, #000000 70%)" }}
        animate={{
          scale: [1, 1.15, 1.05, 1.2, 1],
          opacity: [1, 0.9, 1, 0.85, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 2: Amber nebula — the ominous presence */}
      <motion.div
        className="pointer-events-none absolute"
        aria-hidden="true"
        style={{
          width: "120%",
          height: "120%",
          top: "-10%",
          left: "-10%",
          background:
            "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(196, 154, 42, 0.12) 0%, rgba(140, 100, 20, 0.04) 40%, transparent 65%)",
        }}
        animate={{
          scale: [0.8, 1.1, 0.9, 1.15, 0.8],
          x: [0, 30, -20, 15, 0],
          y: [0, -20, 15, -10, 0],
          opacity: [0.5, 0.9, 0.7, 1, 0.5],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 3: Secondary cold mass — drifts opposite to the amber */}
      <motion.div
        className="pointer-events-none absolute"
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse 35% 35% at 40% 55%, rgba(60, 60, 80, 0.15) 0%, transparent 60%)",
        }}
        animate={{
          x: [0, -40, 20, -30, 0],
          y: [0, 25, -15, 20, 0],
          scale: [1, 1.2, 0.95, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Layer 4: Smoke tendrils — slow horizontal bands */}
      {[...Array(4)].map((_, i) => {
        const yPos = 25 + i * 15;
        return (
          <motion.div
            key={`smoke-${i}`}
            className="pointer-events-none absolute"
            aria-hidden="true"
            style={{
              top: `${yPos}%`,
              left: "-20%",
              width: "140%",
              height: "15%",
              background: `linear-gradient(90deg, transparent 0%, rgba(196, 154, 42, ${0.02 + i * 0.01}) 30%, rgba(196, 154, 42, ${0.04 + i * 0.015}) 50%, rgba(196, 154, 42, ${0.02 + i * 0.01}) 70%, transparent 100%)`,
              filter: "blur(40px)",
            }}
            animate={{
              x: i % 2 === 0 ? [0, 80, -40, 60, 0] : [0, -60, 40, -80, 0],
              opacity: [0.3, 0.7, 0.5, 0.8, 0.3],
            }}
            transition={{
              duration: 16 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        );
      })}

      {/* Layer 5: Gravitational lensing streaks — brighter */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => {
          const yPos = 20 + i * 12;
          const delay = i * 3;
          return (
            <motion.div
              key={`lens-${i}`}
              className="absolute"
              style={{
                top: `${yPos}%`,
                left: "-10%",
                right: "-10%",
                height: "1px",
                background: `linear-gradient(90deg, transparent 0%, rgba(196, 154, 42, 0.08) 15%, rgba(196, 154, 42, 0.18) 50%, rgba(196, 154, 42, 0.08) 85%, transparent 100%)`,
              }}
              animate={{
                opacity: [0, 0.5, 0.8, 0.4, 0],
                scaleX: [0.2, 0.9, 0.7, 1, 0.2],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            />
          );
        })}
      </div>

      {/* Layer 6: Particles — dust and embers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(18)].map((_, i) => {
          const size = 1 + (i % 3);
          const xStart = 5 + ((i * 7.3) % 90);
          const duration = 12 + (i % 5) * 3;
          const delay = i * 1.2;
          const isEmber = i % 4 === 0;

          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${xStart}%`,
                backgroundColor: isEmber
                  ? "rgba(196, 154, 42, 0.5)"
                  : "rgba(180, 180, 180, 0.15)",
                boxShadow: isEmber
                  ? "0 0 4px rgba(196, 154, 42, 0.3)"
                  : "none",
              }}
              animate={{
                y: ["-5vh", "105vh"],
                x: [0, Math.sin(i) * 20, Math.cos(i) * -15, 0],
                opacity: [0, 0.8, 1, 0.5, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
            />
          );
        })}
      </div>

      {/* === TEXT === */}

      {/* Title — subtle event horizon deconstruction */}
      <h1
        className="font-display relative z-10 text-center font-bold uppercase leading-none"
        style={{
          fontSize: "clamp(1.8rem, 8vw, 7rem)",
          letterSpacing: "0.3em",
        }}
      >
        <EventHorizonText text="Dead Pixel" />
        <br />
        <EventHorizonText
          text="Design"
          accent
          style={{ color: "var(--color-accent)" }}
        />
      </h1>

      {/* Tagline */}
      <motion.p
        className="font-mono relative z-10 mt-8 text-center text-sm tracking-[0.2em] uppercase md:text-base"
        style={{ color: "var(--color-text-secondary)" }}
        variants={heroTagline}
        initial="hidden"
        animate="visible"
      >
        We don&apos;t optimize. We haunt.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator absolute bottom-10 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <span
          className="font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--color-text-dim)" }}
        >
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ color: "var(--color-text-dim)" }}
        >
          <path d="M8 0 L8 20 M2 14 L8 20 L14 14" />
        </svg>
      </motion.div>

      {/* Horizontal accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-accent-dim) 50%, transparent 100%)",
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 0.4, scaleX: 1 }}
        transition={{ delay: 3.5, duration: 1.5, ease: "easeOut" as const }}
      />
    </section>
  );
}
