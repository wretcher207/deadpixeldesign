"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

const SOCIALS = [
  {
    name: "GitHub",
    url: "https://github.com/wretcher207",
    label: "github.com/wretcher207",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/wretcher207/",
    label: "@wretcher207",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@wretcher207",
    label: "@wretcher207",
  },
  {
    name: "Bandcamp",
    url: "https://wretcher.bandcamp.com/music",
    label: "wretcher.bandcamp.com",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61578454917550",
    label: "Dead Pixel Design",
  },
];

export default function ContactContent() {
  return (
    <PageShell
      bgImage="/images/tv-eyes-1.webp"
      bgImageMobile="/images/tv-eyes-1-mobile.webp"
      bgAlt="Eyes watching through CRT television static — contact Dead Pixel Design"
    >
      <div style={{ marginTop: "-2rem" }}>
        <p className="heading-section mb-3">TRANSMIT</p>
        <h1
          className="heading-display crt-text mb-4"
          style={{
            fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
            color: "var(--color-text-primary)",
          }}
        >
          Lock In
        </h1>
        <p className="body-text mb-12" style={{ maxWidth: "500px" }}>
          Got a project? Got a question? Got a half-baked idea that might be
          something? Reach out. First consultation is free — no pitch, no
          pressure, just a conversation about what you need.
        </p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Direct contact */}
          <motion.div
            variants={fadeUp}
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid rgba(255,255,255,0.04)",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            <p className="heading-section mb-6">DIRECT LINE</p>

            {/* Phone */}
            <div className="mb-6">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--color-text-ghost)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Phone
              </p>
              <a
                href="tel:+12076948691"
                className="crt-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  display: "block",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                (207) 694-8691
              </a>
            </div>

            {/* Email */}
            <div className="mb-6">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--color-text-ghost)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Email
              </p>
              <a
                href="mailto:david@deadpixeldesign.com"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-secondary)")
                }
              >
                david@deadpixeldesign.com
              </a>
            </div>

            {/* Location */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--color-text-ghost)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Based In
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Maine, USA
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-text-ghost)",
                  marginTop: "0.25rem",
                }}
              >
                Working with clients nationally
              </p>
            </div>
          </motion.div>

          {/* Social + Music */}
          <motion.div variants={fadeUp} className="space-y-8">
            {/* Social links */}
            <div
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              <p className="heading-section mb-5">FIND US</p>
              <div className="space-y-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group"
                    style={{
                      textDecoration: "none",
                      padding: "6px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.03)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        color: "var(--color-text-dim)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        transition: "color 0.2s",
                      }}
                      className="group-hover:!text-[var(--color-text-secondary)]"
                    >
                      {social.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "var(--color-text-ghost)",
                        transition: "color 0.2s",
                      }}
                      className="group-hover:!text-[var(--color-text-dim)]"
                    >
                      {social.label} &nearr;
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Spotify Embed */}
            <div
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              <p className="heading-section mb-4">LISTEN</p>
              <iframe
                style={{ borderRadius: 8 }}
                src="https://open.spotify.com/embed/artist/3LVWQJO9cup6fLLP4tEmXj?utm_source=generator&theme=0"
                width="100%"
                height="180"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Wretcher on Spotify"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-text-ghost)",
              letterSpacing: "0.1em",
            }}
          >
            Response time: usually within 24 hours.
          </p>
        </motion.div>
      </div>
    </PageShell>
  );
}
