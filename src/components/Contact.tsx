"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/wretcher207" },
  { label: "TikTok", url: "https://www.tiktok.com/@wretcher_band" },
  { label: "YouTube", url: "https://www.youtube.com/@wretcher_band" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="contact" className="section-padding relative">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-32"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent-dim), transparent)",
          opacity: 0.3,
        }}
      />

      <motion.div
        ref={ref}
        className="mx-auto max-w-4xl px-6 text-center"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* CTA */}
        <h2
          className="font-display text-3xl font-bold uppercase tracking-[0.15em] md:text-5xl lg:text-6xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          Let&apos;s build something
          <br />
          <span className="text-accent">that haunts.</span>
        </h2>

        {/* Email */}
        <a
          href="mailto:david@deadpixeldesign.com"
          className="font-mono mt-10 inline-block text-lg tracking-[0.1em] transition-colors md:text-xl"
          style={{ color: "var(--color-text-secondary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--color-accent)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--color-text-secondary)")
          }
        >
          david@deadpixeldesign.com
        </a>

        {/* Social links */}
        <div className="mt-12 flex items-center justify-center gap-8">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] transition-colors"
              style={{ color: "var(--color-text-dim)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-dim)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
