"use client";

import Image from "next/image";

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
      <div className="content-container flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
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
          className="flex items-center gap-6"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            color: "var(--color-text-secondary)",
            letterSpacing: "0.1em",
          }}
        >
          <span style={{ padding: "8px 0" }}>Maine, USA</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <a
            href="mailto:david@deadpixeldesign.com"
            className="link-dim"
            style={{ padding: "8px 0" }}
          >
            david@deadpixeldesign.com
          </a>
        </div>
      </div>
    </footer>
  );
}
