"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ConstellationNav from "@/components/layout/ConstellationNav";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

function useVideoFadeLoop(ref: React.RefObject<HTMLVideoElement | null>, fadeDuration = 1.5) {
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const video = ref.current;
    if (!video || !video.duration) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    const timeLeft = video.duration - video.currentTime;
    if (timeLeft <= fadeDuration) {
      video.style.opacity = String(timeLeft / fadeDuration);
    } else if (video.currentTime <= fadeDuration) {
      video.style.opacity = String(Math.min(1, video.currentTime / fadeDuration));
    } else {
      video.style.opacity = "1";
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [ref, fadeDuration]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.style.opacity = "0";
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ref, tick]);
}

interface LatestPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function HomeContent({ latestPosts }: { latestPosts?: LatestPost[] }) {
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  useVideoFadeLoop(mobileVideoRef);
  useVideoFadeLoop(desktopVideoRef);

  return (
    <>
      {/* === HERO — Full Viewport Video === */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-[var(--color-bg-void)]" aria-label="Hero">
        {/* Mobile video */}
        <video
          ref={mobileVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover md:hidden"
          poster="/videos/bg-1-poster.webp"
        >
          <source src="/videos/black-hole.mp4" type="video/mp4" />
        </video>

        {/* Desktop video */}
        <video
          ref={desktopVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          poster="/videos/bg-1-poster.webp"
        >
          <source src="/videos/black-hole-desktop.mp4" type="video/mp4" />
        </video>

        {/* Subtle overlay for depth */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 20%, rgba(3,3,8,0.4) 70%, rgba(3,3,8,0.7) 100%)",
          }}
        />

        {/* Constellation navigation */}
        <ConstellationNav variant="hero" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex md:flex-col md:items-center md:gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "var(--color-text-dim)",
            }}
          >
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "1px",
              height: "24px",
              background:
                "linear-gradient(to bottom, var(--color-accent-gold), transparent)",
            }}
          />
        </motion.div>
      </section>

      {/* === BELOW THE FOLD — SEO Content === */}
      <section
        className="relative z-10 page-bottom-clearance"
        aria-label="About Dead Pixel Design"
        style={{
          background: "var(--color-bg-void)",
          padding: "var(--spacing-section) 0",
        }}
      >
        {/* Gradient transition from hero — taller for smoother flow */}
        <div
          className="absolute top-0 left-0 right-0 h-48 -translate-y-full pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--color-bg-void) 10%, transparent)",
          }}
        />

        <div className="content-container" style={{ textAlign: "center" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <motion.p variants={fadeUp} className="heading-section mb-4">
              ORIGIN POINT
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="heading-display mb-6"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
                color: "var(--color-text-primary)",
                maxWidth: "700px",
              }}
            >
              We build systems that stay with you.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="body-text mb-4"
              style={{ maxWidth: "600px", textAlign: "center" }}
            >
              Dead Pixel Design is a{" "}
              <strong>
                web design and audio engineering studio based in Maine
              </strong>
              . We partner with small businesses, musicians, and independent
              creators who want something built from scratch — not a recycled
              template with a new coat of paint.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="body-text mb-8"
              style={{ maxWidth: "600px", textAlign: "center" }}
            >
              Custom websites that actually drive calls. Mixes and masters that
              translate across every speaker. MIDI programming that breathes. AI
              workflows that cut hours off your week. One person, no middlemen —{" "}
              <Link
                href="/services"
                style={{
                  color: "var(--color-accent-gold)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                just the work
              </Link>
              .
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 w-full"
              style={{ maxWidth: "700px", textAlign: "left" }}
            >
              {[
                {
                  label: "Web Design",
                  desc: "Handbuilt sites for small businesses and musicians — designed to convert, fast to load, impossible to ignore.",
                  href: "/services",
                },
                {
                  label: "Audio Engineering",
                  desc: "Full-service mixing, mastering, and MIDI drum programming. Your tracks, finished right.",
                  href: "/services",
                },
                {
                  label: "AI & Automation",
                  desc: "Custom workflows, smart pipelines, and tools that handle the boring stuff so you don't have to.",
                  href: "/services",
                },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="group block" style={{ minHeight: "44px" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.label}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      color: "var(--color-text-dim)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </p>
                </Link>
              ))}
            </motion.div>

            {latestPosts && latestPosts.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="w-full mb-10"
                style={{ maxWidth: "700px" }}
              >
                <p
                  className="heading-section mb-5"
                  style={{ textAlign: "left" }}
                >
                  LATEST
                </p>
                <div className="flex flex-col gap-4">
                  {latestPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group card-cosmic block"
                      style={{
                        padding: "1.25rem 1.5rem",
                        textDecoration: "none",
                      }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.05rem",
                            fontWeight: 600,
                            color: "var(--color-text-primary)",
                            lineHeight: 1.3,
                            letterSpacing: "-0.02em",
                          }}
                          className="group-hover:text-[var(--color-accent-gold)] transition-colors duration-200"
                        >
                          {post.title}
                        </h3>
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.65rem",
                            color: "var(--color-text-dim)",
                            letterSpacing: "0.1em",
                            whiteSpace: "nowrap",
                            marginTop: "0.2rem",
                            flexShrink: 0,
                          }}
                        >
                          {post.date}
                        </span>
                      </div>
                      {post.excerpt && (
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.9rem",
                            color: "var(--color-text-dim)",
                            lineHeight: 1.6,
                          }}
                        >
                          {post.excerpt}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
                <div style={{ textAlign: "right", marginTop: "0.75rem" }}>
                  <Link
                    href="/blog"
                    className="link-gold"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    All posts →
                  </Link>
                </div>
              </motion.div>
            )}

            <motion.p
              variants={fadeUp}
              className="body-text"
              style={{ maxWidth: "600px", textAlign: "center" }}
            >
              Based in Maine, working with clients across the country.{" "}
              <Link
                href="/work"
                style={{
                  color: "var(--color-accent-gold)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                See what we&apos;ve built
              </Link>{" "}
              or{" "}
              <Link
                href="/contact"
                style={{
                  color: "var(--color-accent-gold)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                book a free consultation
              </Link>
              .
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
