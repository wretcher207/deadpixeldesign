"use client";

import { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ChannelTransition from "./ChannelTransition";
import { CHANNELS } from "@/lib/channels";

/**
 * Main site navigation.
 *
 * Desktop: Horizontal nav bar fixed at top.
 * Mobile: Hamburger menu with full-screen overlay.
 *
 * All navigation triggers the static burst channel transition
 * before routing to the new page.
 */
export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  const navigate = useCallback(
    (route: string) => {
      if (route === pathname) {
        setMobileOpen(false);
        return;
      }
      setMobileOpen(false);
      setPendingRoute(route);
      setTransitioning(true);
    },
    [pathname]
  );

  const handleTransitionComplete = useCallback(() => {
    setTransitioning(false);
    if (pendingRoute) {
      router.push(pendingRoute);
      setPendingRoute(null);
    }
  }, [pendingRoute, router]);

  const navLinks = CHANNELS.filter((c) => c.route !== "/");

  return (
    <>
      <ChannelTransition
        active={transitioning}
        onComplete={handleTransitionComplete}
      />

      {/* Desktop + Mobile nav bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          background: "rgba(5, 5, 5, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="flex items-center justify-between h-14 w-full max-w-[700px] mx-auto px-6" style={{ transform: "translateX(-5vw)" }}>
          {/* Logo / Home link */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 group cursor-pointer"
            style={{ background: "none", border: "none" }}
          >
            <img
              src="/images/logo-badge-sm.png"
              alt="Dead Pixel Design"
              width={28}
              height={28}
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <span
              className="hidden sm:inline crt-text"
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "var(--color-text-primary)",
              }}
            >
              DEAD PIXEL DESIGN
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((channel) => {
              const isActive = pathname === channel.route;
              return (
                <button
                  key={channel.id}
                  onClick={() => navigate(channel.route)}
                  className="cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: isActive
                      ? "var(--color-text-primary)"
                      : "var(--color-text-dim)",
                    transition: "color 0.2s ease",
                    position: "relative",
                    padding: "4px 0",
                  }}
                  onMouseEnter={(e) =>
                    !isActive &&
                    (e.currentTarget.style.color = "var(--color-text-secondary)")
                  }
                  onMouseLeave={(e) =>
                    !isActive &&
                    (e.currentTarget.style.color = "var(--color-text-dim)")
                  }
                >
                  {channel.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: "var(--color-text-secondary)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden cursor-pointer flex flex-col justify-center items-center"
            style={{
              background: "none",
              border: "none",
              width: 32,
              height: 32,
              gap: mobileOpen ? 0 : 5,
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: "block",
                width: 18,
                height: 1.5,
                background: "var(--color-text-secondary)",
                transition: "all 0.3s ease",
                transform: mobileOpen
                  ? "rotate(45deg) translateY(0.75px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 18,
                height: 1.5,
                background: "var(--color-text-secondary)",
                transition: "all 0.3s ease",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 18,
                height: 1.5,
                background: "var(--color-text-secondary)",
                transition: "all 0.3s ease",
                transform: mobileOpen
                  ? "rotate(-45deg) translateY(-0.75px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] md:hidden"
            style={{
              background: "rgba(5, 5, 5, 0.97)",
              paddingTop: "5rem",
            }}
          >
            <div className="flex flex-col items-center gap-8">
              {CHANNELS.map((channel) => {
                const isActive = pathname === channel.route;
                return (
                  <motion.button
                    key={channel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: channel.id * 0.05 }}
                    onClick={() => navigate(channel.route)}
                    className="cursor-pointer"
                    style={{
                      background: "none",
                      border: "none",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: isActive
                        ? "var(--color-text-primary)"
                        : "var(--color-text-dim)",
                      padding: "12px 24px",
                    }}
                  >
                    {channel.label}
                    <div
                      style={{
                        width: isActive ? "100%" : 0,
                        height: 1,
                        background: "var(--color-text-secondary)",
                        marginTop: 4,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
