"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || "";

const PROJECT_TYPES = [
  "New Website",
  "Redesign",
  "Maintenance",
  "Other",
];

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
      <div className="card-cosmic" style={{ textAlign: "center" }}>
        <p
          className="heading-section mb-3"
          style={{ color: "var(--color-accent-gold)" }}
        >
          MESSAGE RECEIVED
        </p>
        <p className="body-text">
          Your request came through. I will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-cosmic">
      <h2 className="heading-section mb-6">BOOK A PROJECT</h2>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="label-micro">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="input-cosmic"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="label-micro">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="input-cosmic"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="label-micro">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="input-cosmic"
          />
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="label-micro">Project Type *</label>
          <select
            id="projectType"
            name="projectType"
            required
            value={form.projectType}
            onChange={handleChange}
            className="input-cosmic"
            style={{ appearance: "none", cursor: "pointer" }}
          >
            <option value="" disabled>Select one</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type} style={{ background: "#0e0e1a", color: "#e8e4df" }}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Details */}
        <div>
          <label htmlFor="details" className="label-micro">Tell me about your project *</label>
          <textarea
            id="details"
            name="details"
            required
            rows={4}
            value={form.details}
            onChange={handleChange}
            className="input-cosmic"
            style={{ resize: "vertical" }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
          className="btn-ghost"
          style={{
            width: "100%",
            padding: "0.85rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            opacity: status === "sending" ? 0.5 : 1,
            cursor: status === "sending" ? "wait" : "pointer",
            background: "rgba(212,168,83,0.06)",
          }}
        >
          {status === "sending" ? "Sending..." : "Send Request"}
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
    <PageShell backgroundVideo="/videos/bg-3.mp4" backgroundPoster="/videos/bg-3-poster.webp">
      <div style={{ marginTop: "-2rem" }}>
        <p className="heading-section mb-3">CONTACT</p>
        <h1
          className="heading-display mb-4"
          style={{
            fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
            color: "var(--color-text-primary)",
          }}
        >
          Let&apos;s Talk
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
          <motion.div variants={fadeUp} className="card-cosmic">
            <h2 className="heading-section mb-6">DIRECT LINE</h2>

            {/* Phone */}
            <div className="mb-6">
              <p className="label-micro">Phone</p>
              <a
                href="tel:+12076948691"
                className="block heading-display"
                style={{
                  fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  transition: "opacity var(--duration-base) var(--ease-smooth)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                (207) 694-8691
              </a>
            </div>

            {/* Email */}
            <div className="mb-6">
              <p className="label-micro">Email</p>
              <a
                href="mailto:david@deadpixeldesign.com"
                className="link-gold"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                }}
              >
                david@deadpixeldesign.com
              </a>
            </div>

            {/* Location */}
            <div>
              <p className="label-micro">Based In</p>
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
            <div className="card-cosmic">
              <h2 className="heading-section mb-5">FIND US</h2>
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
                      padding: "8px 0",
                      borderBottom: "1px solid rgba(212,168,83,0.03)",
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
                        transition: "color var(--duration-base) var(--ease-smooth)",
                      }}
                      className="group-hover:!text-[var(--color-accent-gold)]"
                    >
                      {social.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.65rem",
                        color: "var(--color-text-ghost)",
                        transition: "color var(--duration-base) var(--ease-smooth)",
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
            <div className="card-cosmic">
              <h2 className="heading-section mb-4">LISTEN</h2>
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

        {/* Booking Form — centered */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16"
          style={{ maxWidth: "600px", margin: "0 auto" }}
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
