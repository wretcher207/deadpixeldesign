"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, glowHover } from "@/lib/animations";

const TOOLS = [
  {
    name: "The Rhythm Apparatus",
    status: "Coming Soon",
    statusColor: "var(--color-accent)",
    statusTextColor: "var(--color-accent-dim)",
    description:
      "A web-based drum pattern generator built for extreme metal. Pick a subgenre, choose a groove, tweak the feel, and download a MIDI file straight from your browser. No DAW required. No account needed.",
    details: [
      "43+ grooves across 12 metal subgenres — death metal, slam, black metal, grindcore, metalcore, doom, prog, thrash, and more",
      "Full humanization engine — velocity variation, timing drift, push/pull feel controls",
      "Audio preview before you download — hear the pattern, not just see it",
      "One-click MIDI export — drag it into any DAW and start writing",
    ],
    features: ["12 Subgenres", "Humanization Engine", "MIDI Export", "Audio Preview", "Free Tier"],
  },
  {
    name: "Dehumanizer Pro",
    status: "Available — Free & Open Source",
    statusColor: "#4a7a4a",
    statusTextColor: "#5a8a5a",
    description:
      "Velocity and timing dynamics shaping for REAPER. Dual engine system that transforms rigid programmed drums into something that breathes. Makes your MIDI sound like a human sat behind the kit.",
    details: [
      "Velocity curve engine — shape dynamics across an entire performance",
      "Per-role timing variance — kick, snare, hats all drift independently",
      "Non-destructive processing — original MIDI stays intact",
      "Lightweight ReaImGui interface with real-time visual feedback",
    ],
    features: ["Velocity Shaping", "Timing Variance", "Per-Role Control", "REAPER 6.0+"],
    url: "https://github.com/wretcher207",
  },
  {
    name: "Dead Pixel Drum Apparatus",
    status: "Available — Free & Open Source",
    statusColor: "#4a7a4a",
    statusTextColor: "#5a8a5a",
    description:
      "The REAPER-native predecessor to The Rhythm Apparatus. A full-featured drum pattern generator with an enormous groove library, built from years of programming drums for extreme metal.",
    details: [
      "43 built-in grooves across 12 categories — from blast beats to breakdowns",
      "4 MIDI map presets (Odeholm, RS Monarch, Ultimate Heavy Drums, Sleep Token II)",
      "Timeline capture — record a pattern from your project and save it as a reusable groove",
      "Custom groove system with persistent storage — build your own library over time",
    ],
    features: ["43 Grooves", "4 MIDI Maps", "Timeline Capture", "Custom Grooves", "ReaPack"],
    url: "https://github.com/wretcher207",
  },
];

export default function Arsenal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="arsenal" className="section-padding">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          className="mb-6 flex items-center gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-display text-sm font-medium uppercase tracking-[0.4em]"
            style={{ color: "var(--color-text-dim)" }}
          >
            The Arsenal
          </h2>
          <div
            className="h-px flex-1"
            style={{ backgroundColor: "rgba(68, 68, 68, 0.3)" }}
          />
        </motion.div>

        {/* Subheading */}
        <motion.p
          className="font-mono mb-16 text-sm tracking-[0.15em] uppercase"
          style={{ color: "var(--color-text-secondary)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Tools for people who make heavy things.
        </motion.p>

        {/* Tools */}
        <motion.div
          ref={ref}
          className="grid gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {TOOLS.map((tool) => {
            const cardContent = (
              <motion.div
                className="group relative border p-8 md:p-12 transition-colors"
                style={{
                  backgroundColor: "var(--color-bg-elevated)",
                  borderColor: "rgba(68, 68, 68, 0.15)",
                }}
                variants={fadeUp}
                whileHover={glowHover}
              >
                {/* Status badge */}
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: tool.statusColor }}
                  />
                  <span
                    className="font-mono text-xs uppercase tracking-[0.2em]"
                    style={{ color: tool.statusTextColor }}
                  >
                    {tool.status}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="font-display text-3xl font-bold uppercase tracking-[0.08em] md:text-4xl"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {tool.name}
                </h3>

                {/* Description */}
                <p
                  className="font-mono mt-4 text-sm leading-relaxed max-w-3xl md:text-base"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {tool.description}
                </p>

                {/* Detailed breakdown */}
                <ul className="mt-6 space-y-2">
                  {tool.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: tool.statusColor }}
                      />
                      <span
                        className="font-mono text-sm leading-relaxed"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Feature tags */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {tool.features.map((feature) => (
                    <span
                      key={feature}
                      className="font-mono border px-3 py-1.5 text-xs uppercase tracking-[0.1em]"
                      style={{
                        borderColor: "rgba(68, 68, 68, 0.3)",
                        color: "var(--color-text-dim)",
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
                  style={{ backgroundColor: tool.statusColor }}
                />
              </motion.div>
            );

            if (tool.url) {
              return (
                <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer">
                  {cardContent}
                </a>
              );
            }
            return <div key={tool.name}>{cardContent}</div>;
          })}
        </motion.div>
      </div>
    </section>
  );
}
