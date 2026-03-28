"use client";

import { motion } from "framer-motion";
import StaticCanvas from "@/components/tv/StaticCanvas";
import ScanLines from "@/components/tv/ScanLines";
import { pageTransition } from "@/lib/animations";

interface PageShellProps {
  /** Desktop background image path */
  bgImage: string;
  /** Mobile background image path */
  bgImageMobile: string;
  /** Alt text for the background image */
  bgAlt: string;
  /** Page content */
  children: React.ReactNode;
}

/**
 * Shared shell for inner pages (Work, Services, About, Contact).
 *
 * Structure:
 * 1. TV image hero at top with animated static overlay
 * 2. Content area below
 * 3. Page enter animation (CRT-style brightness flash)
 */
export default function PageShell({
  bgImage,
  bgImageMobile,
  bgAlt,
  children,
}: PageShellProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {/* TV Hero Banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(220px, 40vh, 420px)" }}
      >
        <picture>
          <source media="(max-width: 768px)" srcSet={bgImageMobile} />
          <img
            src={bgImage}
            alt={bgAlt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
            loading="eager"
          />
        </picture>

        {/* Static overlay on the TV image */}
        <div className="absolute inset-0">
          <StaticCanvas intensity={0.15} pixelSize={4} speed={0.7} />
        </div>

        <ScanLines opacity={0.1} gap={3} />

        {/* Gradient fade to content */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to top, var(--color-bg-void) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Page Content */}
      <div
        className="relative z-10"
        style={{
          background: "var(--color-bg-void)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="content-container">{children}</div>
      </div>
    </motion.div>
  );
}
