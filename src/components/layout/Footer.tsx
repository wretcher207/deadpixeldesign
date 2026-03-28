"use client";

export default function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "2.5rem 0",
        background: "var(--color-bg-void)",
      }}
    >
      <div className="content-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo-badge-sm.png"
            alt="Dead Pixel Design"
            width={20}
            height={20}
            style={{ opacity: 0.4 }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--color-text-ghost)",
              letterSpacing: "0.1em",
            }}
          >
            &copy; {new Date().getFullYear()} Dead Pixel Design
          </span>
        </div>

        <div
          className="flex items-center gap-6"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--color-text-ghost)",
            letterSpacing: "0.1em",
          }}
        >
          <span>Maine, USA</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <a
            href="mailto:david@deadpixeldesign.com"
            style={{ color: "var(--color-text-dim)", transition: "color 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text-secondary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-dim)")
            }
          >
            david@deadpixeldesign.com
          </a>
        </div>
      </div>
    </footer>
  );
}
