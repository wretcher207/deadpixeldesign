"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

const SERVICES = [
  {
    label: "WEB DESIGN & DEVELOPMENT",
    title: "Websites That Work As Hard As You Do",
    description:
      "Not templates. Not drag-and-drop. Custom-built sites designed around what your business actually needs — whether that's turning visitors into phone calls, showcasing a portfolio, or selling a product. Every site is fast, mobile-ready, and built with search engines in mind from day one.",
    details: [
      "Custom design tailored to your brand and audience",
      "Mobile-first responsive development",
      "SEO baked into the foundation — not bolted on after",
      "Conversion-focused layouts that drive real results",
      "Ongoing support and maintenance available",
    ],
    forWho: "Small businesses, contractors, restaurants, musicians, creators",
  },
  {
    label: "MIXING & MASTERING",
    title: "Your Tracks, Finished Right",
    description:
      "You've written the songs. You've tracked the parts. Now you need someone who understands how to make it all hit — without losing what made it yours in the first place. Whether it's a single, an EP, or a full album, every mix gets the attention it deserves.",
    details: [
      "Full mixing from stems or multitrack sessions",
      "Stereo mastering for streaming and physical release",
      "Genre-aware processing — not a one-size-fits-all chain",
      "Revision rounds included — we dial it in together",
      "Delivered in all formats you need (WAV, MP3, FLAC)",
    ],
    forWho: "Bands, solo artists, producers, podcasters",
  },
  {
    label: "MIDI PROGRAMMING",
    title: "Drums That Don't Sound Programmed",
    description:
      "If you've ever fought with a drum plugin trying to make it feel human, you know the pain. We program MIDI drums that groove, breathe, and hit like a real player. Built in REAPER with custom humanization tools we developed in-house.",
    details: [
      "Full drum programming from scratch to your song structure",
      "Humanized timing, velocity, and ghost notes",
      "Custom groove templates for your style",
      "Compatible with any drum plugin or sampler",
      "Delivered as MIDI files you own and can edit",
    ],
    forWho: "Solo artists, home recorders, producers without a drummer",
  },
  {
    label: "AUDIO PRODUCTION TOOLS",
    title: "Tools Built by Musicians, for Musicians",
    description:
      "We build software that solves real problems in the recording workflow. Drum pattern generators, humanization plugins, REAPER scripts — all born from actual production needs, not hypothetical feature lists.",
    details: [
      "Custom REAPER scripts and extensions",
      "Browser-based audio tools",
      "MIDI utilities and generators",
      "Open-source contributions to the audio community",
    ],
    forWho: "REAPER users, producers, audio engineers",
  },
  {
    label: "AI & AUTOMATION",
    title: "Make the Machines Work For You",
    description:
      "Repetitive tasks eat your time. We build automated workflows, AI-powered pipelines, and smart tools that handle the boring stuff so you can focus on the work that matters. Not hype — practical automation that saves real hours.",
    details: [
      "Custom AI-powered workflows and assistants",
      "Process automation for repetitive tasks",
      "Data pipelines and content processing",
      "Integration between your existing tools",
    ],
    forWho: "Small businesses, content creators, anyone drowning in busywork",
  },
];

export default function ServicesContent() {
  return (
    <PageShell
      bgImage="/images/tv-shadow-1.webp"
      bgImageMobile="/images/tv-shadow-1-mobile.webp"
      bgAlt="A dark silhouette visible through CRT television static"
    >
      <div style={{ marginTop: "-2rem" }}>
        <p className="heading-section mb-3">FREQUENCY</p>
        <h1
          className="heading-display crt-text mb-4"
          style={{
            fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
            color: "var(--color-text-primary)",
          }}
        >
          What We Build
        </h1>
        <p className="body-text mb-12" style={{ maxWidth: "550px" }}>
          Every service starts with a conversation. Tell us what you need, and
          we&apos;ll tell you honestly what it takes to get there.
        </p>

        <motion.div
          className="grid grid-cols-1 gap-10"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.label}
              variants={fadeUp}
              className="relative"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              <p className="heading-section mb-3">{service.label}</p>

              <h2
                className="heading-display mb-3"
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                  color: "var(--color-text-primary)",
                }}
              >
                {service.title}
              </h2>

              <p className="body-text mb-5">{service.description}</p>

              {/* What's included */}
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.25rem" }}>
                {service.details.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 mb-1.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--color-text-dim)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: "var(--color-text-ghost)" }}>+</span>
                    {d}
                  </li>
                ))}
              </ul>

              {/* Who it's for */}
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  color: "var(--color-text-ghost)",
                }}
              >
                FOR: {service.forWho}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p
            className="heading-display crt-text mb-4"
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.8rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Got a project in mind?
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
              padding: "12px 32px",
              border: "1px solid rgba(255,255,255,0.15)",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Start a Conversation
          </a>
        </motion.div>
      </div>
    </PageShell>
  );
}
