"use client";

import { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CHANNELS } from "@/lib/channels";

const NAV_CHANNELS = CHANNELS.filter((c) => c.route !== "/");

/* ── Star positions (percentage-based for responsive scaling) ── */
const STAR_POSITIONS: Record<string, { x: number; y: number }> = {
  "/work": { x: 22, y: 32 },
  "/services": { x: 74, y: 26 },
  "/about": { x: 18, y: 70 },
  "/contact": { x: 76, y: 68 },
};

/* ── Constellation connecting lines (pairs of routes) ── */
const CONSTELLATION_LINES: [string, string][] = [
  ["/work", "/services"],
  ["/work", "/about"],
  ["/services", "/contact"],
  ["/about", "/contact"],
  ["/work", "/contact"],
];

/* ── Compact overlay positions for inner pages ── */
const OVERLAY_POSITIONS: Record<string, { x: number; y: number }> = {
  "/work": { x: 20, y: 25 },
  "/services": { x: 80, y: 20 },
  "/about": { x: 15, y: 75 },
  "/contact": { x: 85, y: 70 },
};

const OVERLAY_LINES: [string, string][] = [
  ["/work", "/services"],
  ["/work", "/about"],
  ["/services", "/contact"],
  ["/about", "/contact"],
];

/* ============================================
   CONSTELLATION NAV
   ============================================ */

interface ConstellationNavProps {
  variant?: "hero" | "overlay";
}

export default function ConstellationNav({ variant }: ConstellationNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  const handleNav = useCallback(
    (route: string) => {
      setMobileOpen(false);
      router.push(route);
    },
    [router]
  );

  /* In layout.tsx (no variant prop), skip rendering on homepage */
  const resolvedVariant = variant ?? (pathname === "/" ? null : "overlay");
  if (!resolvedVariant) return null;

  if (resolvedVariant === "hero") {
    return (
      <>
        <DesktopConstellation
          positions={STAR_POSITIONS}
          lines={CONSTELLATION_LINES}
          hoveredRoute={hoveredRoute}
          setHoveredRoute={setHoveredRoute}
          currentRoute={pathname}
          onNav={handleNav}
        />
        <MobileNav
          open={mobileOpen}
          setOpen={setMobileOpen}
          currentRoute={pathname}
          onNav={handleNav}
        />
      </>
    );
  }

  /* Overlay variant for inner pages */
  return (
    <>
      <OverlayConstellation
        positions={OVERLAY_POSITIONS}
        lines={OVERLAY_LINES}
        hoveredRoute={hoveredRoute}
        setHoveredRoute={setHoveredRoute}
        currentRoute={pathname}
        onNav={handleNav}
      />
      <MobileNav
        open={mobileOpen}
        setOpen={setMobileOpen}
        currentRoute={pathname}
        onNav={handleNav}
      />
    </>
  );
}

/* ============================================
   DESKTOP HERO CONSTELLATION (full viewport)
   ============================================ */

function DesktopConstellation({
  positions,
  lines,
  hoveredRoute,
  setHoveredRoute,
  currentRoute,
  onNav,
}: {
  positions: Record<string, { x: number; y: number }>;
  lines: [string, string][];
  hoveredRoute: string | null;
  setHoveredRoute: (r: string | null) => void;
  currentRoute: string;
  onNav: (route: string) => void;
}) {
  return (
    <div className="absolute inset-0 z-20 hidden md:block pointer-events-none">
      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="star-glow">
            <stop offset="0%" stopColor="var(--color-star-core)" stopOpacity="1" />
            <stop offset="40%" stopColor="var(--color-accent-gold)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {lines.map(([a, b], i) => {
          const pa = positions[a];
          const pb = positions[b];
          const isHighlighted = hoveredRoute === a || hoveredRoute === b;
          return (
            <motion.line
              key={i}
              x1={`${pa.x}%`}
              y1={`${pa.y}%`}
              x2={`${pb.x}%`}
              y2={`${pb.y}%`}
              stroke={
                isHighlighted
                  ? "rgba(212, 168, 83, 0.35)"
                  : "rgba(212, 168, 83, 0.15)"
              }
              strokeWidth={isHighlighted ? 1.5 : 1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.0 + i * 0.15, ease: "easeOut" }}
            />
          );
        })}
      </svg>

      {/* Star points + labels */}
      {NAV_CHANNELS.map((ch, i) => {
        const pos = positions[ch.route];
        if (!pos) return null;
        const isActive = currentRoute === ch.route;
        const isHovered = hoveredRoute === ch.route;

        return (
          <motion.button
            key={ch.id}
            onClick={() => onNav(ch.route)}
            onMouseEnter={() => setHoveredRoute(ch.route)}
            onMouseLeave={() => setHoveredRoute(null)}
            className="absolute pointer-events-auto cursor-pointer flex flex-col items-center gap-2 group"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 + i * 0.15, ease: "easeOut" }}
            aria-label={`Navigate to ${ch.label}`}
          >
            {/* Glow ring */}
            <div
              className="rounded-full transition-all duration-500"
              style={{
                width: isHovered || isActive ? "16px" : "10px",
                height: isHovered || isActive ? "16px" : "10px",
                background: isActive
                  ? "var(--color-accent-gold)"
                  : "var(--color-star-core)",
                boxShadow: isHovered || isActive
                  ? "0 0 14px var(--color-star-glow), 0 0 35px var(--color-accent-glow), 0 0 60px var(--color-accent-warm)"
                  : "0 0 8px var(--color-star-glow), 0 0 20px var(--color-accent-glow)",
              }}
            />

            {/* Label */}
            <span
              className="transition-all duration-300"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: isHovered || isActive
                  ? "var(--color-accent-gold)"
                  : "var(--color-text-primary)",
                textShadow: isHovered
                  ? "0 0 10px var(--color-accent-glow)"
                  : "0 0 8px rgba(0,0,0,0.8)",
              }}
            >
              {ch.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ============================================
   OVERLAY CONSTELLATION (inner pages, desktop)
   ============================================ */

function OverlayConstellation({
  positions,
  lines,
  hoveredRoute,
  setHoveredRoute,
  currentRoute,
  onNav,
}: {
  positions: Record<string, { x: number; y: number }>;
  lines: [string, string][];
  hoveredRoute: string | null;
  setHoveredRoute: (r: string | null) => void;
  currentRoute: string;
  onNav: (route: string) => void;
}) {
  return (
    <nav
      className="fixed top-6 right-6 z-[100] hidden md:block"
      style={{ width: "240px", height: "160px" }}
      aria-label="Site navigation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: "rgba(3, 3, 8, 0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(212, 168, 83, 0.06)",
        }}
      />

      {/* Home link */}
      <button
        onClick={() => onNav("/")}
        className="absolute top-3 left-3 z-10 cursor-pointer flex items-center gap-1.5 group"
        aria-label="Navigate home"
      >
        <div
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: "var(--color-text-dim)",
            boxShadow: "0 0 4px var(--color-accent-glow)",
          }}
        />
        <span
          className="transition-colors duration-300 group-hover:text-[var(--color-accent-gold)]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "var(--color-text-dim)",
          }}
        >
          HOME
        </span>
      </button>

      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        {lines.map(([a, b], i) => {
          const pa = positions[a];
          const pb = positions[b];
          const isHighlighted = hoveredRoute === a || hoveredRoute === b;
          return (
            <line
              key={i}
              x1={`${pa.x}%`}
              y1={`${pa.y}%`}
              x2={`${pb.x}%`}
              y2={`${pb.y}%`}
              stroke={
                isHighlighted
                  ? "rgba(212, 168, 83, 0.2)"
                  : "rgba(212, 168, 83, 0.06)"
              }
              strokeWidth={1}
              style={{ transition: "stroke 0.3s ease" }}
            />
          );
        })}
      </svg>

      {/* Star points */}
      {NAV_CHANNELS.map((ch) => {
        const pos = positions[ch.route];
        if (!pos) return null;
        const isActive = currentRoute === ch.route;
        const isHovered = hoveredRoute === ch.route;

        return (
          <button
            key={ch.id}
            onClick={() => onNav(ch.route)}
            onMouseEnter={() => setHoveredRoute(ch.route)}
            onMouseLeave={() => setHoveredRoute(null)}
            className="absolute cursor-pointer flex flex-col items-center gap-1 group"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            aria-label={`Navigate to ${ch.label}`}
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? "8px" : "5px",
                height: isActive ? "8px" : "5px",
                background: isActive
                  ? "var(--color-accent-gold)"
                  : isHovered
                    ? "var(--color-star-core)"
                    : "var(--color-text-secondary)",
                boxShadow: isActive || isHovered
                  ? "0 0 8px var(--color-star-glow)"
                  : "none",
              }}
            />
            <span
              className="transition-colors duration-300"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.55rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                color: isActive
                  ? "var(--color-accent-gold)"
                  : isHovered
                    ? "var(--color-text-primary)"
                    : "var(--color-text-dim)",
                whiteSpace: "nowrap",
              }}
            >
              {ch.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/* ============================================
   MOBILE NAV (bottom-anchored drawer)
   ============================================ */

function MobileNav({
  open,
  setOpen,
  currentRoute,
  onNav,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentRoute: string;
  onNav: (route: string) => void;
}) {
  return (
    <div className="md:hidden">
      {/* Toggle button — bottom center */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[101] cursor-pointer"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(3, 3, 8, 0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(212, 168, 83, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
      >
        {/* Three-dot constellation icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="4" r="2" fill="var(--color-accent-gold)" opacity={open ? 0.3 : 0.8} />
          <circle cx="4" cy="16" r="2" fill="var(--color-accent-gold)" opacity={open ? 0.3 : 0.8} />
          <circle cx="16" cy="16" r="2" fill="var(--color-accent-gold)" opacity={open ? 0.3 : 0.8} />
          <line x1="10" y1="4" x2="4" y2="16" stroke="var(--color-accent-gold)" strokeWidth="0.5" opacity={open ? 0.15 : 0.3} />
          <line x1="10" y1="4" x2="16" y2="16" stroke="var(--color-accent-gold)" strokeWidth="0.5" opacity={open ? 0.15 : 0.3} />
          <line x1="4" y1="16" x2="16" y2="16" stroke="var(--color-accent-gold)" strokeWidth="0.5" opacity={open ? 0.15 : 0.3} />
        </svg>
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
            style={{
              background: "rgba(3, 3, 8, 0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Home link */}
            <motion.button
              onClick={() => onNav("/")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="cursor-pointer"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.8rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: currentRoute === "/"
                  ? "var(--color-accent-gold)"
                  : "var(--color-text-dim)",
                marginBottom: "1rem",
              }}
            >
              HOME
            </motion.button>

            {/* Nav links */}
            {NAV_CHANNELS.map((ch, i) => {
              const isActive = currentRoute === ch.route;
              return (
                <motion.button
                  key={ch.id}
                  onClick={() => onNav(ch.route)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  {/* Star dot */}
                  <div
                    className="rounded-full"
                    style={{
                      width: isActive ? "10px" : "6px",
                      height: isActive ? "10px" : "6px",
                      background: isActive
                        ? "var(--color-accent-gold)"
                        : "var(--color-star-core)",
                      boxShadow: isActive
                        ? "0 0 12px var(--color-star-glow), 0 0 30px var(--color-accent-glow)"
                        : "0 0 6px var(--color-star-glow)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase" as const,
                      color: isActive
                        ? "var(--color-accent-gold)"
                        : "var(--color-text-primary)",
                    }}
                  >
                    {ch.label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
