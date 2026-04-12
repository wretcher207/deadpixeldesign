"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

interface BlogPostPreview {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export default function BlogContent({ posts }: { posts?: BlogPostPreview[] }) {
  const items = posts || [];

  return (
    <PageShell>
      <div style={{ marginTop: "-2rem" }}>
        <p className="heading-section mb-3">BLOG</p>
        <h1
          className="heading-display mb-4"
          style={{
            fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
            color: "var(--color-text-primary)",
          }}
        >
          Field Notes
        </h1>
        <p className="body-text mb-12" style={{ maxWidth: "550px" }}>
          Thoughts on building websites, engineering audio, and putting AI to
          work for people who have better things to do than fight with
          technology.
        </p>

        {items.length === 0 ? (
          <p className="body-text" style={{ color: "var(--color-text-dim)" }}>
            Articles coming soon.
          </p>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-6"
          >
            {items.map((post) => (
              <motion.article key={post.slug} variants={fadeUp}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block card-cosmic group"
                  style={{ textDecoration: "none" }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <time
                      dateTime={post.date}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        color: "var(--color-text-ghost)",
                      }}
                    >
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.55rem",
                            letterSpacing: "0.08em",
                            color: "var(--color-text-dim)",
                            padding: "2px 8px",
                            border: "1px solid rgba(212,168,83,0.08)",
                            textTransform: "uppercase",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2
                    className="heading-display mb-3 group-hover:text-[var(--color-accent-gold)]"
                    style={{
                      fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                      color: "var(--color-text-primary)",
                      transition: "color var(--duration-base) var(--ease-smooth)",
                    }}
                  >
                    {post.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      color: "var(--color-text-dim)",
                      lineHeight: 1.6,
                    }}
                  >
                    {post.excerpt}
                  </p>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </PageShell>
  );
}
