"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past the hero (100vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="fixed top-0 left-0 right-0 z-30 border-b"
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.85)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(68, 68, 68, 0.2)",
          }}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            {/* Logo mark */}
            <a href="#" className="relative h-8 w-8 opacity-70 hover:opacity-100 transition-opacity">
              <Image
                src="/logo-mark.png"
                alt="Dead Pixel Design"
                width={32}
                height={32}
                className="invert brightness-75"
              />
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-[0.2em] transition-colors"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-secondary)")
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block h-px w-5 transition-all"
                style={{
                  backgroundColor: "var(--color-text-secondary)",
                  transform: mobileOpen ? "rotate(45deg) translateY(4px)" : "none",
                }}
              />
              <span
                className="block h-px w-5 transition-all"
                style={{
                  backgroundColor: "var(--color-text-secondary)",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-px w-5 transition-all"
                style={{
                  backgroundColor: "var(--color-text-secondary)",
                  transform: mobileOpen ? "rotate(-45deg) translateY(-4px)" : "none",
                }}
              />
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                className="md:hidden border-t px-6 py-6 flex flex-col gap-4"
                style={{
                  backgroundColor: "rgba(10, 10, 10, 0.95)",
                  borderColor: "rgba(68, 68, 68, 0.2)",
                }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-mono text-sm uppercase tracking-[0.2em]"
                    style={{ color: "var(--color-text-secondary)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
