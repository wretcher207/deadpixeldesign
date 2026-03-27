"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import ProjectCard from "./ProjectCard";

const PROJECTS = [
  {
    title: "Aether",
    description:
      "A living cannabis strain encyclopedia. Search, compare, and explore strains with AI-powered insights. Full-stack app with authentication, database-backed strain profiles, and intelligent search.",
    category: "Web App",
    year: "2026",
    tech: ["Next.js", "Supabase", "Vercel", "Claude API"],
    highlights: [
      "AI-powered strain recommendations and comparisons",
      "Real-time search with database-backed profiles",
      "User authentication and personalized experiences",
      "Live at loveaether.com",
    ],
  },
  {
    title: "Northern Softwash Plus",
    description:
      "Professional exterior cleaning service in Northern Maine. A clean, conversion-focused site designed to generate leads and build trust from the first scroll. Built for speed and clarity.",
    category: "Client Site",
    year: "2026",
    tech: ["Next.js", "Responsive", "SEO"],
    highlights: [
      "Conversion-optimized layout and calls to action",
      "Mobile-first design for on-the-go homeowners",
      "Service area targeting for local search",
    ],
  },
  {
    title: "Freedom Painting",
    description:
      "A painting contractor in Maine. Lightning-fast static site deployed on GitHub Pages. Built as an unsolicited spec pitch that won the job — proof that the right site sells itself.",
    category: "Client Site",
    year: "2026",
    tech: ["Static HTML", "CSS", "GitHub Pages"],
    highlights: [
      "Sub-second load times — no frameworks, no bloat",
      "Spec pitch that converted to a paying client",
      "Portfolio gallery showcasing completed work",
    ],
  },
  {
    title: "Wretcher",
    description:
      "Solo instrumental death metal / deathcore project. 7 EPs released across all platforms. A growing community of listeners who came for the breakdowns and stayed for the blast beats.",
    category: "Music / Brand",
    year: "2024–",
    tech: ["REAPER", "Production", "Distribution"],
    highlights: [
      "7 EPs released independently",
      "~1,500 TikTok followers, ~400 YouTube subscribers",
      "All production, mixing, and mastering done in-house",
    ],
  },
];

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="work" className="section-padding" style={{ backgroundColor: "var(--color-bg-section)" }}>
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
            Work
          </h2>
          <div
            className="h-px flex-1"
            style={{ backgroundColor: "rgba(68, 68, 68, 0.3)" }}
          />
        </motion.div>

        {/* Project grid */}
        <motion.div
          ref={ref}
          className="grid gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
