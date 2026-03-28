"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

const PROJECTS = [
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
    category: "Web Application",
    year: "2026",
    title: "Aether",
    description:
      "A full-stack cannabis strain encyclopedia powered by AI. Users search strains, get detailed profiles, and explore recommendations. Built with authentication, database, and intelligent search.",
    tech: ["Next.js", "Supabase", "AI Integration", "Full-Stack"],
    url: "https://loveaether.com/",
    highlights: [
      "AI-powered strain search and recommendations",
      "Full authentication and user accounts",
      "Database-driven strain profiles",
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
  {
    category: "Small Business",
    year: "2026",
    title: "Freedom Painting",
    description:
      "An ultra-fast static site built as an unsolicited spec pitch. Sent it cold, won the client. Proof that showing beats telling every time.",
    tech: ["Static HTML", "Performance", "Spec Pitch"],
    url: "https://freedompainting.us/",
    highlights: [
      "Cold pitch that landed the client",
      "Lightning-fast static build",
      "Clean, professional design focused on trust signals",
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
    highlights: [
      "Clean, appetizing layout",
      "Mobile-friendly design",
      "Built as a demo for prospective clients",
    ],
  },
];

export default function WorkContent() {
  return (
    <PageShell
      bgImage="/images/tv-shadow-2.webp"
      bgImageMobile="/images/tv-shadow-2-mobile.webp"
      bgAlt="A shadowy figure visible through CRT television static"
    >
      <div style={{ marginTop: "-2rem" }}>
        <p className="heading-section mb-3">BROADCAST</p>
        <h1
          className="heading-display crt-text mb-4"
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
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              className="group relative"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                transition: "border-color 0.3s ease",
              }}
              whileHover={{
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              {/* Header row */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <span className="heading-section">
                  {project.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
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
                      &nearr;
                    </span>
                  </a>
                ) : (
                  project.title
                )}
              </h2>

              <p className="body-text mb-4">{project.description}</p>

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
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--color-text-dim)",
                      lineHeight: 1.5,
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
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.1em",
                      color: "var(--color-text-ghost)",
                      padding: "3px 8px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      textTransform: "uppercase",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-[1px]"
                style={{
                  width: "0%",
                  background: "var(--color-text-dim)",
                  transition: "width 0.5s ease",
                }}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </PageShell>
  );
}
