"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageShell from "@/components/layout/PageShell";
import { fadeUp, staggerDeep, viewportOnce } from "@/lib/animations";

const PROJECTS = [
  {
    category: "Web Application",
    year: "2026",
    title: "Aether",
    description:
      "A full-stack cannabis strain encyclopedia powered by AI. Users search strains, get detailed profiles, and explore recommendations. Built with authentication, database, and intelligent search.",
    tech: ["Next.js", "Supabase", "AI Integration", "Full-Stack"],
    url: "https://loveaether.com/",
    thumbnail: "/images/work/aether.webp",
    highlights: [
      "AI-powered strain search and recommendations",
      "Full authentication and user accounts",
      "Database-driven strain profiles",
    ],
  },
  {
    category: "Spec Site",
    year: "2026",
    title: "GaleGrid",
    description:
      "A full B2B SaaS spec site for an AI workflow automation company. Built to demonstrate how to sell a technical product without losing people in the jargon — clean enterprise design, sharp copy, and a complete multi-page product presence.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "SaaS Design"],
    url: "https://galegrid-spec.netlify.app",
    thumbnail: "/images/work/galegrid.webp",
    highlights: [
      "Full multi-page SaaS site: product, solutions, about, contact",
      "Enterprise design with video hero and animated metrics",
      "Spec pitch — built on spec to show range",
    ],
  },
  {
    category: "Sample Site",
    year: "2026",
    title: "Cozy Cafe Template",
    description:
      "A warm, character-driven cafe website built to feel inviting, tactile, and easy to browse. Designed as a sample concept for food and hospitality clients who need charm without clutter.",
    tech: ["Cafe", "Hospitality", "Responsive Design"],
    url: "https://cozy-cafe-template.netlify.app",
    thumbnail: "/images/work/cozy-cafe.webp",
    highlights: [
      "Cozy hospitality-focused design",
      "Mobile-friendly menu and location flow",
      "Strong atmosphere and customer-facing clarity",
    ],
  },
  {
    category: "Audio Tool",
    year: "2025",
    title: "Dehumanizer Pro",
    description:
      "Open-source REAPER plugin that humanizes programmed drums. Adds timing drift, velocity variation, and ghost notes to make MIDI drums feel like a real player.",
    tech: ["Lua", "REAPER", "Open Source"],
    url: "https://github.com/wretcher207/dead-pixel-design",
    highlights: [
      "Timing drift and velocity humanization",
      "Ghost note injection",
      "Open source — free for everyone",
    ],
  },
  {
    category: "Creative Tech",
    year: "2025",
    title: "Claude Visualizer",
    description:
      "Real-time ambient visualizer for Claude Code. Tycho-inspired aesthetic with generative visuals that respond to AI activity. A tool for making the invisible visible.",
    tech: ["WebGL", "Generative Art", "Real-Time"],
    url: "https://github.com/wretcher207/claude-visualizer",
    highlights: [
      "Real-time generative visuals",
      "Responds to Claude Code activity",
      "Tycho-inspired ambient aesthetic",
    ],
  },
  {
    category: "Sample Site",
    year: "2026",
    title: "Editorial Service Template",
    description:
      "A refined editorial-style service website built around elegant typography, spacious composition, and a premium content-first presentation. Designed as a sample for service businesses that need authority without stiffness.",
    tech: ["Editorial Design", "Service Business", "Responsive UI"],
    url: "https://editorial-service-template.netlify.app",
    thumbnail: "/images/work/editorial.webp",
    highlights: [
      "Editorial-inspired visual hierarchy",
      "Premium typography and spacing",
      "Built for service brands with a polished voice",
    ],
  },
  {
    category: "Small Business",
    year: "2026",
    title: "Freedom Painting",
    description:
      "An ultra-fast static site built as an unsolicited spec pitch. Sent it cold, won the client. Proof that showing beats telling every time.",
    tech: ["Static HTML", "Performance", "Spec Pitch"],
    url: "https://freedompainting.us/",
    thumbnail: "/images/work/freedom-painting.webp",
    highlights: [
      "Cold pitch that landed the client",
      "Lightning-fast static build",
      "Clean, professional design focused on trust signals",
    ],
  },
  {
    category: "Audio Tool",
    year: "2026",
    title: "The Rhythm Apparatus",
    description:
      "Browser-based drum pattern generator built for metal. Over 43 grooves, MIDI export, and a tactile interface. Designed to break the repetitive loop of programmed drums.",
    tech: ["Web Audio", "MIDI", "Generative", "React"],
    highlights: [
      "43+ drum grooves with variations",
      "MIDI export for DAW integration",
      "Generative engine — never the same pattern twice",
    ],
  },
  {
    category: "Sample Site",
    year: "2026",
    title: "Restaurant Sample",
    description:
      "A sample restaurant website built to demonstrate clean layout, appetizing design, and mobile-friendly structure. A proof of concept for food service clients.",
    tech: ["HTML", "CSS", "Responsive Design"],
    url: "https://restaurant-sample-01.netlify.app/home_page/code.html",
    thumbnail: "/images/work/restaurant.webp",
    highlights: [
      "Clean, appetizing layout",
      "Mobile-friendly design",
      "Built as a demo for prospective clients",
    ],
  },
  {
    category: "Audio / Music",
    year: "Ongoing",
    title: "Wretcher",
    description:
      "Solo extreme metal project — 7 EPs and counting. Writing, recording, engineering, mixing, mastering, and MIDI programming. All handled in-house. This is where the audio engineering chops get sharpened.",
    url: "https://wretcher.bandcamp.com/music",
    tech: ["REAPER", "Audio Engineering", "MIDI", "Mixing/Mastering"],
    highlights: [
      "7 EPs written, recorded, and produced solo",
      "Full mixing and mastering pipeline",
      "MIDI drum programming from scratch",
    ],
  },
];

export default function WorkContent() {
  return (
    <PageShell backgroundVideo="/videos/bg-4.mp4" backgroundPoster="/videos/bg-4-poster.webp">
      <div style={{ marginTop: "-2rem" }}>
        <p className="heading-section mb-3">PORTFOLIO</p>
        <h1
          className="heading-display mb-4"
          style={{
            fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
            color: "var(--color-text-primary)",
          }}
        >
          Our Work
        </h1>
        <p className="body-text mb-12" style={{ maxWidth: "550px" }}>
          Websites, tools, and sounds. Each project exists because someone
          needed something real — not a template with a fresh coat of paint.
        </p>

        {/* Project Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8"
          variants={staggerDeep}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              className="group relative card-cosmic"
              initial="rest"
              whileHover="hover"
              animate="rest"
              style={{
                transition: "border-color 0.3s var(--ease-snappy), background 0.3s var(--ease-snappy), transform 0.3s var(--ease-snappy)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,168,83,0.15)";
                e.currentTarget.style.background = "rgba(14,14,26,0.85)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,168,83,0.04)";
                e.currentTarget.style.background = "";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className={`flex flex-col ${project.thumbnail ? "md:flex-row md:gap-6 md:items-stretch" : ""}`}>
                {/* Thumbnail */}
                {project.thumbnail && (
                  <div className="relative w-full md:w-[260px] lg:w-[320px] shrink-0 mb-4 md:mb-0 overflow-hidden rounded" style={{ border: "1px solid rgba(212,168,83,0.08)", minHeight: "0" }}>
                    <div className="relative aspect-[16/10] md:h-full md:min-h-[180px]" style={{ position: "relative" }}>
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} preview`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                        style={{ background: "linear-gradient(135deg, rgba(3,3,8,0.3) 0%, transparent 60%)" }}
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header row */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <span className="heading-section">
                      {project.category}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6rem",
                        color: "var(--color-text-ghost)",
                      }}
                    >
                      {project.year}
                    </span>
                  </div>

                  <h2
                    className="heading-display mb-3"
                    style={{
                      fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "inherit", textDecoration: "none" }}
                        className="hover:underline"
                      >
                        {project.title}
                        <span
                          style={{
                            fontSize: "0.7em",
                            marginLeft: "0.5em",
                            opacity: 0.4,
                          }}
                        >
                          {"\u2197"}
                        </span>
                      </a>
                    ) : (
                      project.title
                    )}
                  </h2>

                  <p className="body-text mb-4" style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>{project.description}</p>

                  {/* Highlights */}
                  <ul
                    className="mb-4"
                    style={{
                      listStyle: "none",
                      padding: 0,
                    }}
                  >
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 mb-1.5"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.78rem",
                          color: "var(--color-text-dim)",
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--color-text-ghost)",
                            marginTop: "0.15em",
                          }}
                        >
                          &mdash;
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.08em",
                          color: "var(--color-text-dim)",
                          padding: "4px 10px",
                          border: "1px solid rgba(212,168,83,0.08)",
                          textTransform: "uppercase",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </PageShell>
  );
}
