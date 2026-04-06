"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";

interface PageShellProps {
  children: React.ReactNode;
  backgroundVideo?: string;
  backgroundPoster?: string;
}

export default function PageShell({ children, backgroundVideo, backgroundPoster }: PageShellProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const showVideo = !!backgroundVideo && !reducedMotion && !videoError;

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background video layer */}
      {showVideo && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundPoster}
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: videoReady ? 1 : 0,
              transition: "opacity 1.5s ease",
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          {/* Dark overlay — atmospheric depth, keeps text readable */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, rgba(3,3,8,0.72) 0%, rgba(3,3,8,0.88) 55%, rgba(3,3,8,0.96) 100%)",
            }}
          />
        </div>
      )}

      {/* Top gradient — subtle cosmic depth */}
      <div
        className="w-full h-32"
        style={{
          position: "relative",
          zIndex: 1,
          background: showVideo
            ? "linear-gradient(to bottom, var(--color-bg-elevated), transparent)"
            : "linear-gradient(to bottom, var(--color-bg-elevated), var(--color-bg-void))",
        }}
      />

      {/* Page Content */}
      <div
        className="relative z-10"
        style={{
          background: showVideo ? "transparent" : "var(--color-bg-void)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="content-container">{children}</div>
      </div>
    </motion.div>
  );
}
