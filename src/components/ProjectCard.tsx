"use client";

import { motion } from "framer-motion";
import { fadeUp, glowHover } from "@/lib/animations";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  year?: string;
  tech?: string[];
  highlights?: string[];
  accentColor?: string;
}

export default function ProjectCard({
  title,
  description,
  category,
  year,
  tech,
  highlights,
  accentColor = "var(--color-accent-dim)",
}: ProjectCardProps) {
  return (
    <motion.div
      className="group relative border p-8 md:p-12 transition-colors"
      style={{
        backgroundColor: "var(--color-bg-elevated)",
        borderColor: "rgba(68, 68, 68, 0.15)",
      }}
      variants={fadeUp}
      whileHover={glowHover}
    >
      {/* Top row: category + year */}
      <div className="flex items-center justify-between mb-6">
        <span
          className="font-mono text-xs uppercase tracking-[0.25em]"
          style={{ color: accentColor }}
        >
          {category}
        </span>
        {year && (
          <span
            className="font-mono text-xs"
            style={{ color: "var(--color-text-dim)" }}
          >
            {year}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="font-display text-3xl font-bold uppercase tracking-[0.1em] md:text-4xl lg:text-5xl"
        style={{ color: "var(--color-text-primary)" }}
      >
        {title}
      </h3>

      {/* Description — expanded, more detail visible */}
      <p
        className="font-mono mt-4 text-sm leading-relaxed max-w-3xl md:text-base"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {description}
      </p>

      {/* Highlights — key details visible without clicking */}
      {highlights && highlights.length > 0 && (
        <ul className="mt-6 space-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span
                className="font-mono text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech stack tags */}
      {tech && tech.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {tech.map((t) => (
            <span
              key={t}
              className="font-mono border px-3 py-1.5 text-xs uppercase tracking-[0.1em]"
              style={{
                borderColor: "rgba(68, 68, 68, 0.3)",
                color: "var(--color-text-dim)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Bottom accent line — grows on hover */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
        style={{ backgroundColor: accentColor }}
      />
    </motion.div>
  );
}
