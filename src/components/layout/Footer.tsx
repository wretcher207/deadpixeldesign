"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{
        borderTop: "1px solid rgba(212,168,83,0.06)",
        padding: "2.5rem 0",
        background: "var(--color-bg-void)",
      }}
    >
      <div className="content-container flex flex-col items-center gap-4">
        {/* Navigation */}
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          aria-label="Footer navigation"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {[
            { label: "Work", href: "/work" },
            { label: "Services", href: "/services" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-dim"
              style={{ padding: "10px 4px", minHeight: "44px", display: "flex", alignItems: "center" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo + copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-badge-sm.png"
              alt="Dead Pixel Design"
              width={20}
              height={20}
              style={{ opacity: 0.4 }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.1em",
              }}
            >
              &copy; {new Date().getFullYear()} Dead Pixel Design
            </span>
          </div>

          <div
            className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              color: "var(--color-text-secondary)",
              letterSpacing: "0.1em",
            }}
          >
            <span style={{ padding: "8px 0" }}>Maine, USA</span>
            <span style={{ opacity: 0.3 }} className="hidden sm:inline">|</span>
            <a
              href="mailto:david@deadpixeldesign.com"
              className="link-dim"
              style={{ padding: "8px 0", minHeight: "44px", display: "flex", alignItems: "center", wordBreak: "break-all" }}
            >
              david@deadpixeldesign.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
