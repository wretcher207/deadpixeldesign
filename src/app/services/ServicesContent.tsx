"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { fadeUp, scaleReveal, stagger, staggerDeep, viewportOnce } from "@/lib/animations";

const WEB_PACKAGES = [
  {
    name: "Starter",
    price: "$800–$1,000",
    details: [
      "3 to 5 pages, mobile friendly",
      "Basic SEO setup",
      "Contact form",
      "Google Business Profile setup",
      "1 revision round",
    ],
    forWho: "Solo tradespeople, small local businesses, first time website owners",
  },
  {
    name: "Standard",
    price: "$1,700–$2,500",
    details: [
      "6 to 8 pages, mobile friendly",
      "Full SEO setup",
      "Copywriting help",
      "Photo optimization",
      "Google Analytics connected",
      "2 revision rounds",
    ],
    forWho: "Dental practices, contractors, auto repair, tourism businesses",
  },
  {
    name: "Premium",
    price: "$3,500–$5,000",
    details: [
      "Full custom build",
      "Content strategy",
      "SEO setup and implementation",
      "60 days of post-launch support",
      "Unlimited revisions",
    ],
    forWho: "Established businesses ready for a new site",
  },
];

const AUDIO_PACKAGES = [
  {
    name: "Single Song Mix",
    price: "$50",
    details: [
      "Up to 32 tracks",
      "WAV and MP3 delivery",
      "5 to 7 day turnaround",
      "1 revision included",
    ],
    forWho: null,
  },
  {
    name: "Single Song Master",
    price: "$30",
    details: [
      "Leveled, clear, and ready to upload anywhere",
      "3 to 5 day turnaround",
      "1 revision included",
    ],
    forWho: null,
  },
  {
    name: "Mix and Master Bundle",
    price: "$70",
    details: [
      "Both services on one song",
      "5 to 7 day turnaround",
      "1 revision each",
    ],
    forWho: null,
  },
  {
    name: "EP Package",
    price: "$250",
    details: [
      "3 to 5 songs",
      "Full mix and master on every track",
      "Unlimited revisions",
      "About 2 weeks turnaround",
    ],
    forWho: null,
  },
  {
    name: "Album Package",
    price: "$450",
    details: [
      "6 to 12 songs",
      "Full mix and master on every track",
      "Unlimited revisions",
      "About 3 to 4 weeks turnaround",
    ],
    forWho: null,
  },
  {
    name: "Podcast Editing",
    price: "$25/episode",
    details: [
      "Cleanup, leveling, noise reduction",
      "Intro and outro assembly",
      "48 hour turnaround",
      "1 revision included",
    ],
    forWho: null,
  },
  {
    name: "Remote Recording Consultation",
    price: "$40",
    details: [
      "1 hour video call",
      "Mic placement, room setup, interface settings",
      "Notes sent after the call",
    ],
    forWho: null,
  },
  {
    name: "Home Studio Setup and Mix",
    price: "$120",
    details: [
      "Remote consultation plus a full mix of one song",
      "Good starting point if you're new to recording at home",
    ],
    forWho: null,
  },
];

function PackageCard({
  name,
  price,
  details,
  forWho,
}: {
  name: string;
  price: string;
  details: string[];
  forWho: string | null;
}) {
  return (
    <motion.div
      variants={scaleReveal}
      className="relative flex flex-col card-cosmic"
      whileHover={{
        borderColor: "rgba(212,168,83,0.15)",
        y: -2,
        transition: { duration: 0.3 },
      }}
    >
      <p
        className="heading-section mb-2"
        style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}
      >
        {name.toUpperCase()}
      </p>

      <p
        className="heading-display mb-4"
        style={{
          fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
          color: "var(--color-text-primary)",
          lineHeight: 1.1,
        }}
      >
        {price}
      </p>

      <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.25rem", flex: 1 }}>
        {details.map((d) => (
          <li
            key={d}
            className="flex items-start gap-2 mb-1.5"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              color: "var(--color-text-dim)",
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "var(--color-accent-gold)", flexShrink: 0, opacity: 0.5 }}>+</span>
            {d}
          </li>
        ))}
      </ul>

      {forWho && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            color: "var(--color-text-dim)",
            marginTop: "auto",
          }}
        >
          GOOD FOR: {forWho}
        </p>
      )}
    </motion.div>
  );
}

export default function ServicesContent() {
  return (
    <PageShell>
      <div style={{ marginTop: "-2rem" }}>
        {/* Page header */}
        <p className="heading-section mb-3">SERVICES</p>
        <h1
          className="heading-display mb-4"
          style={{
            fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
            color: "var(--color-text-primary)",
          }}
        >
          Services &amp; Pricing
        </h1>
        <p className="body-text mb-16" style={{ maxWidth: "520px" }}>
          We do web design and audio engineering out of Maine. Here&apos;s what
          we offer and what it costs.
        </p>

        {/* Web Design */}
        <div className="mb-20">
          <p className="heading-section mb-2">WEB DESIGN</p>
          <p className="body-text mb-8" style={{ maxWidth: "480px" }}>
            A good website should be easy to find and easy to use. We handle the
            technical side so you don&apos;t have to.
          </p>

          <motion.div
            className="grid grid-cols-1 gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            }}
            variants={staggerDeep}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {WEB_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} {...pkg} />
            ))}
          </motion.div>

          {/* Maintenance */}
          <motion.div
            className="mt-6 card-cosmic"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                className="heading-section mb-1"
                style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}
              >
                MONTHLY MAINTENANCE
              </p>
              <p
                className="heading-display"
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  color: "var(--color-text-primary)",
                }}
              >
                $100–$200/mo
              </p>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.73rem",
                color: "var(--color-text-dim)",
                maxWidth: "420px",
                lineHeight: 1.6,
              }}
            >
              Security updates, minor edits, hosting management. We keep things
              running while you focus on your work.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(212,168,83,0.08)",
            marginBottom: "4rem",
          }}
        />

        {/* Audio Engineering */}
        <div className="mb-20">
          <p className="heading-section mb-2">AUDIO ENGINEERING</p>
          <p className="body-text mb-8" style={{ maxWidth: "480px" }}>
            All remote. We work with artists, podcasters, and home studio
            musicians wherever you are.
          </p>

          <motion.div
            className="grid grid-cols-1 gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
            }}
            variants={staggerDeep}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {AUDIO_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} {...pkg} />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p
            className="heading-display mb-4"
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.8rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Ready to get started?
          </p>
          <Link href="/contact" className="btn-ghost">
            Head to the contact page
          </Link>
        </motion.div>
      </div>
    </PageShell>
  );
}
