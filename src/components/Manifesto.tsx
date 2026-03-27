"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, manifestoLine } from "@/lib/animations";

const LINES = [
  "Built in the static between signals.",
  "We make things that stay with you —",
  "the sites, the tools, the sounds",
  "that don't wash out when the tab closes.",
];

export default function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Accent line top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-32"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent-dim), transparent)",
          opacity: 0.3,
        }}
      />

      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          ref={ref}
          className="space-y-4 md:space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {LINES.map((line, i) => (
            <motion.p
              key={i}
              className="font-display text-2xl font-medium leading-relaxed md:text-4xl lg:text-5xl"
              style={{
                color:
                  i === LINES.length - 1
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
              }}
              variants={manifestoLine}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* Attribution dash */}
        <motion.div
          className="mt-12 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div
            className="h-px flex-1 max-w-16"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          <span
            className="font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--color-accent-dim)" }}
          >
            Dead Pixel Design
          </span>
        </motion.div>
      </div>
    </section>
  );
}
