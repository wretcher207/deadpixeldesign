"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import ScanLines from "@/components/tv/ScanLines";
import StaticCanvas from "@/components/tv/StaticCanvas";
import ChannelTransition from "@/components/layout/ChannelTransition";
import { CHANNELS } from "@/lib/channels";
import { heroTitle, heroTagline, fadeIn } from "@/lib/animations";

export default function HomeContent() {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  const handleTransitionComplete = useCallback(() => {
    setTransitioning(false);
    if (pendingRoute) {
      router.push(pendingRoute);
      setPendingRoute(null);
    }
  }, [pendingRoute, router]);

  return (
    <>
      <ChannelTransition
        active={transitioning}
        onComplete={handleTransitionComplete}
      />

      {/* === THE TV — Full Viewport === */}
      <section className="relative w-full h-[100dvh] -mt-14 overflow-hidden">
        {/* Background: The TV scene image */}
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/images/tv-main-mobile.webp"
          />
          <img
            src="/images/tv-main.webp"
            alt="A battered CRT television with static on screen, set against a dark, atmospheric backdrop"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Dark overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 40% 45%, transparent 30%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* === Rolling static — desktop only for performance === */}
        <div
          className="absolute z-10 pointer-events-none overflow-hidden hidden md:block"
          style={{
            left: "25%",
            top: "28.7%",
            width: "39%",
            height: "68%",
            borderRadius: "8px",
            mixBlendMode: "overlay",
            opacity: 0.4,
          }}
        >
          <StaticCanvas intensity={1} pixelSize={3} speed={1} />
        </div>

        {/* === Subtle scan lines over the whole scene === */}
        <ScanLines opacity={0.06} gap={3} />

        {/* === Logo + Title + Tagline === */}
        {/* Mobile: centered full-screen. Desktop: positioned over TV screen */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6
                     md:left-[28%] md:top-[30%] md:right-auto md:bottom-auto md:w-[33%] md:h-[62%] md:px-0"
        >
          <motion.img
            src="/images/logo-badge-transparent.png"
            alt="Dead Pixel Design logo"
            width={180}
            height={180}
            variants={fadeIn}
            initial={{ opacity: 1 }}
            animate="visible"
            className="mb-5"
            style={{
              filter:
                "brightness(4) contrast(1.3) drop-shadow(0 0 2px rgba(0,0,0,0.9)) drop-shadow(0 0 1px rgba(0,0,0,0.8)) drop-shadow(0 0 20px rgba(255,255,255,0.5))",
              opacity: 1,
              maxWidth: "clamp(100px, 22vw, 180px)",
              height: "auto",
            }}
          />

          <motion.h1
            className="crt-text-strong text-center"
            variants={heroTitle}
            initial={{ opacity: 1, letterSpacing: "-0.02em", filter: "blur(0px)" }}
            animate="visible"
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              mixBlendMode: "screen",
              textShadow:
                "0 0 2px rgba(0,0,0,0.9), 0 0 1px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.7), 1px -1px 0 rgba(0,0,0,0.7), -1px 1px 0 rgba(0,0,0,0.7), 1px 1px 0 rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.4), -1px 0 rgba(255,80,80,0.2), 1px 0 rgba(80,80,255,0.15)",
            }}
          >
            Dead Pixel Design
          </motion.h1>

          <motion.p
            variants={heroTagline}
            initial={{ opacity: 0.7, y: 0 }}
            animate="visible"
            className="text-center mt-3"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.2em",
              mixBlendMode: "screen",
              textShadow: "0 0 20px rgba(255,255,255,0.15)",
            }}
          >
            We don&apos;t optimize. We haunt.
          </motion.p>
        </div>

        {/* === Mobile: Channel navigation buttons === */}
        <div
          className="absolute bottom-0 left-0 right-0 md:hidden z-30"
          style={{
            background:
              "linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 100%)",
            padding: "3rem 1rem 2rem",
          }}
        >
          <div className="flex justify-center gap-3 flex-wrap">
            {CHANNELS.filter((c) => c.route !== "/").map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  setPendingRoute(ch.route);
                  setTransitioning(true);
                }}
                className="cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "10px 18px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  letterSpacing: "0.15em",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                }}
              >
                {ch.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* === BELOW THE FOLD — SEO Content === */}
      <section
        className="relative z-10"
        style={{
          background: "var(--color-bg-void)",
          padding: "var(--spacing-section) 0",
        }}
      >
        <div className="content-container" style={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p className="heading-section mb-4">SIGNAL ORIGIN</p>
            <h2
              className="heading-display crt-text mb-6"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
                color: "var(--color-text-primary)",
                maxWidth: "700px",
              }}
            >
              We build systems that stay with you.
            </h2>
            <p
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
            </p>
            <p
              className="body-text mb-8"
              style={{ maxWidth: "600px", textAlign: "center" }}
            >
              Custom websites that actually drive calls. Mixes and masters that
              translate across every speaker. MIDI programming that breathes. AI
              workflows that cut hours off your week. One person, no middlemen —{" "}
              <Link
                href="/services"
                style={{
                  color: "var(--color-text-primary)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                just the work
              </Link>
              .
            </p>

            <div
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
                <Link key={item.label} href={item.href} className="group block">
                  <h3
                    style={{
                      fontFamily: "var(--font-brand)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.label}
                  </h3>
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
            </div>

            <p
              className="body-text"
              style={{ maxWidth: "600px", textAlign: "center" }}
            >
              Based in Maine, working with clients across the country.{" "}
              <Link
                href="/work"
                style={{
                  color: "var(--color-text-primary)",
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
                  color: "var(--color-text-primary)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                book a free consultation
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
