"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/26768975/unqhe52/";

const PROJECT_TYPES = [
  "New Website",
  "Redesign",
  "Maintenance",
  "Other",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  fontFamily: "var(--font-body)",
  fontSize: "0.85rem",
  color: "var(--color-text-primary)",
  background: "rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(255,255,255,0.08)",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.6rem",
  letterSpacing: "0.15em",
  color: "var(--color-text-ghost)",
  textTransform: "uppercase",
  marginBottom: "0.5rem",
  display: "block",
};

function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    details: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify({
          ...form,
          date: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
        }),
        mode: "no-cors",
      });
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", projectType: "", details: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid rgba(255,255,255,0.04)",
          padding: "clamp(1.5rem, 3vw, 2.5rem)",
          textAlign: "center",
        }}
      >
        <p
          className="heading-section mb-3"
          style={{ color: "var(--color-text-secondary)" }}
        >
          SIGNAL RECEIVED
        </p>
        <p className="body-text">
          Your request came through. I will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid rgba(255,255,255,0.04)",
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
      }}
    >
      <p className="heading-section mb-6">BOOK A PROJECT</p>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" style={labelStyle}>Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" style={labelStyle}>Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" style={labelStyle}>Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          />
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" style={labelStyle}>Project Type *</label>
          <select
            id="projectType"
            name="projectType"
            required
            value={form.projectType}
            onChange={handleChange}
            style={{
              ...inputStyle,
              appearance: "none",
              cursor: "pointer",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <option value="" disabled>Select one</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type} style={{ background: "#111", color: "#eee" }}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Details */}
        <div>
          <label htmlFor="details" style={labelStyle}>Tell me about your project *</label>
          <textarea
            id="details"
            name="details"
            required
            rows={4}
            value={form.details}
            onChange={handleChange}
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            width: "100%",
            padding: "0.85rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-text-primary)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            cursor: status === "sending" ? "wait" : "pointer",
            transition: "all 0.2s",
            opacity: status === "sending" ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (status !== "sending") {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          {status === "sending" ? "Transmitting..." : "Send Request"}
        </button>

        {status === "error" && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "#ff6b6b",
              textAlign: "center",
            }}
          >
            Something went wrong. Try again, or reach out directly.
          </p>
        )}
      </div>
    </form>
  );
}

const SOCIALS = [
  {
    name: "GitHub",
    url: "https://github.com/wretcher207",
    label: "github.com/wretcher207",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/wretcher207/",
    label: "@wretcher207",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@wretcher207",
    label: "@wretcher207",
  },
  {
    name: "Bandcamp",
    url: "https://wretcher.bandcamp.com/music",
    label: "wretcher.bandcamp.com",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61578454917550",
    label: "Dead Pixel Design",
  },
];

export default function ContactContent() {
  return (
    <PageShell
      bgImage="/images/tv-eyes-1.webp"
      bgImageMobile="/images/tv-eyes-1-mobile.webp"
      bgAlt="Eyes watching through CRT television static — contact Dead Pixel Design"
    >
      <div style={{ marginTop: "-2rem" }}>
        <p className="heading-section mb-3">TRANSMIT</p>
        <h1
          className="heading-display crt-text mb-4"
          style={{
            fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
            color: "var(--color-text-primary)",
          }}
        >
          Lock In
        </h1>
        <p className="body-text mb-12" style={{ maxWidth: "500px" }}>
          Got a project? Got a question? Got a half-baked idea that might be
          something? Reach out. First consultation is free — no pitch, no
          pressure, just a conversation about what you need.
        </p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Direct contact */}
          <motion.div
            variants={fadeUp}
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid rgba(255,255,255,0.04)",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            <p className="heading-section mb-6">DIRECT LINE</p>

            {/* Phone */}
            <div className="mb-6">
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--color-text-ghost)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Phone
              </p>
              <a
                href="tel:+12076948691"
                className="crt-text"
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  display: "block",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                (207) 694-8691
              </a>
            </div>

            {/* Email */}
            <div className="mb-6">
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--color-text-ghost)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Email
              </p>
              <a
                href="mailto:david@deadpixeldesign.com"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-secondary)")
                }
              >
                david@deadpixeldesign.com
              </a>
            </div>

            {/* Location */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--color-text-ghost)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Based In
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Maine, USA
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  color: "var(--color-text-ghost)",
                  marginTop: "0.25rem",
                }}
              >
                Working with clients nationally
              </p>
            </div>
          </motion.div>

          {/* Social + Music */}
          <motion.div variants={fadeUp} className="space-y-8">
            {/* Social links */}
            <div
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              <p className="heading-section mb-5">FIND US</p>
              <div className="space-y-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group"
                    style={{
                      textDecoration: "none",
                      padding: "6px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.03)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        color: "var(--color-text-dim)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        transition: "color 0.2s",
                      }}
                      className="group-hover:!text-[var(--color-text-secondary)]"
                    >
                      {social.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.65rem",
                        color: "var(--color-text-ghost)",
                        transition: "color 0.2s",
                      }}
                      className="group-hover:!text-[var(--color-text-dim)]"
                    >
                      {social.label} {"\u2197"}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Spotify Embed */}
            <div
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              <p className="heading-section mb-4">LISTEN</p>
              <iframe
                style={{ borderRadius: 8 }}
                src="https://open.spotify.com/embed/artist/3LVWQJO9cup6fLLP4tEmXj?utm_source=generator&theme=0"
                width="100%"
                height="180"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Wretcher on Spotify"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16"
          style={{ maxWidth: "600px" }}
        >
          <BookingForm />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-text-ghost)",
              letterSpacing: "0.1em",
            }}
          >
            Response time: usually within 24 hours.
          </p>
        </motion.div>
      </div>
    </PageShell>
  );
}
