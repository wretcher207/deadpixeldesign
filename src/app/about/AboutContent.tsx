"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

export default function AboutContent() {
  return (
    <PageShell
      bgImage="/images/tv-eyes-2.webp"
      bgImageMobile="/images/tv-eyes-2-mobile.webp"
      bgAlt="Eyes watching through CRT television static"
    >
      <div style={{ marginTop: "-2rem" }}>
        <p className="heading-section mb-3">ORIGIN</p>
        <h1
          className="heading-display crt-text mb-6"
          style={{
            fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
            color: "var(--color-text-primary)",
          }}
        >
          Who&apos;s Behind the Static
        </h1>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12"
        >
          {/* Main story */}
          <motion.div variants={fadeUp}>
            <div className="body-text space-y-5" style={{ maxWidth: "600px" }}>
              <p>
                Dead Pixel Design is a one-person studio based in Maine. I&apos;m
                David — I build websites, engineer audio, and make tools that
                solve problems I&apos;ve actually run into.
              </p>
              <p>
                I came to this through music. I&apos;ve been writing and producing
                extreme metal for years under the name Wretcher — all
                self-recorded, self-mixed, self-mastered. That work forced me to
                learn audio engineering the hard way: by doing it wrong a hundred
                times until it sounded right.
              </p>
              <p>
                The web side grew out of the same instinct. I needed tools that
                didn&apos;t exist, so I built them. I needed a site for my music, so
                I learned front-end design. Then someone asked me to build
                something for them. Then someone else did. Now here we are.
              </p>
              <p>
                I work with small businesses and musicians — people who need
                something real but don&apos;t have the budget for an agency or the
                patience for corporate process. You talk to me directly. I build
                the thing. We go back and forth until it&apos;s right. No account
                managers, no ticket systems, no bloat.
              </p>
              <p style={{ color: "var(--color-text-primary)" }}>
                &quot;We don&apos;t optimize. We haunt.&quot; isn&apos;t just a tagline. It means
                the work should leave a mark. A website that actually brings in
                calls. A mix that sounds like you, but better. A tool that saves
                real time. Things that matter after the browser tab closes.
              </p>
            </div>
          </motion.div>

          {/* Sidebar — Quick facts */}
          <motion.div variants={fadeUp}>
            <div
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "1.5rem",
              }}
            >
              <p className="heading-section mb-4">THE SPECS</p>

              {[
                { label: "Location", value: "Maine, USA" },
                { label: "Focus", value: "Web Design + Audio Engineering" },
                { label: "Music", value: "Wretcher (Extreme Metal)" },
                { label: "DAW", value: "REAPER" },
                { label: "Stack", value: "Next.js, React, Tailwind" },
                { label: "Approach", value: "Direct. No middlemen." },
              ].map((item) => (
                <div key={item.label} className="mb-3">
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: "var(--color-text-ghost)",
                      textTransform: "uppercase",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Philosophy */}
            <div
              className="mt-6"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "1.5rem",
              }}
            >
              <p className="heading-section mb-4">THE PHILOSOPHY</p>
              {[
                "Show, don't pitch.",
                "Build it right the first time.",
                "If it doesn't serve the work, cut it.",
                "Clear, direct communication — always.",
                "Leave things better than you found them.",
              ].map((line) => (
                <p
                  key={line}
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-text-dim)",
                    lineHeight: 1.6,
                  }}
                >
                  &mdash; {line}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageShell>
  );
}
