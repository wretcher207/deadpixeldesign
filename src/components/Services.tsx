"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const SERVICES = [
  {
    title: "Web",
    description: "Sites that work as hard as you do.",
    details:
      "From single-page pitches to full-stack applications. Fast, dark, and built to convert. No templates. No bloat.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="4" width="28" height="20" rx="1" />
        <line x1="2" y1="18" x2="30" y2="18" />
        <line x1="12" y1="24" x2="20" y2="28" />
      </svg>
    ),
  },
  {
    title: "Audio Tools",
    description: "Production tools built by someone who uses them.",
    details:
      "REAPER scripts, MIDI generators, dynamics processors. Built in the trenches of extreme metal production, not a boardroom.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="4" y="2" width="4" height="28" rx="1" />
        <rect x="14" y="8" width="4" height="22" rx="1" />
        <rect x="24" y="5" width="4" height="25" rx="1" />
      </svg>
    ),
  },
  {
    title: "AI & Automation",
    description: "Make the machine do the boring parts.",
    details:
      "Workflows, bots, and intelligent pipelines. If you're doing it by hand and it can be automated, we'll make it disappear.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="16" cy="16" r="12" />
        <circle cx="16" cy="16" r="4" />
        <line x1="16" y1="4" x2="16" y2="8" />
        <line x1="16" y1="24" x2="16" y2="28" />
        <line x1="4" y1="16" x2="8" y2="16" />
        <line x1="24" y1="16" x2="28" y2="16" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="services"
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg-section)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          className="mb-16 flex items-center gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-display text-sm font-medium uppercase tracking-[0.4em]"
            style={{ color: "var(--color-text-dim)" }}
          >
            Services
          </h2>
          <div
            className="h-px flex-1"
            style={{ backgroundColor: "rgba(68, 68, 68, 0.3)" }}
          />
        </motion.div>

        {/* Service cards */}
        <motion.div
          ref={ref}
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              className="group border p-8 md:p-10 transition-colors"
              style={{
                backgroundColor: "var(--color-bg-elevated)",
                borderColor: "rgba(68, 68, 68, 0.15)",
              }}
              variants={fadeUp}
            >
              {/* Icon */}
              <div
                className="mb-8"
                style={{ color: "var(--color-accent-dim)" }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3
                className="font-display text-xl font-bold uppercase tracking-[0.15em] mb-3"
                style={{ color: "var(--color-text-primary)" }}
              >
                {service.title}
              </h3>

              {/* Tagline */}
              <p
                className="font-mono text-sm italic mb-4"
                style={{ color: "var(--color-accent-dim)" }}
              >
                {service.description}
              </p>

              {/* Details */}
              <p
                className="font-mono text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {service.details}
              </p>

              {/* Bottom accent */}
              <div
                className="mt-8 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
