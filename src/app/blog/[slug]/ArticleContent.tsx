"use client";

import Link from "next/link";
import PageShell from "@/components/layout/PageShell";

interface ArticleContentProps {
  title: string;
  date: string;
  tags: string[];
  sources: string[];
  htmlContent: string;
}

export default function ArticleContent({
  title,
  date,
  tags,
  sources,
  htmlContent,
}: ArticleContentProps) {
  const readingTime = Math.max(1, Math.ceil(htmlContent.split(/\s+/).length / 200));

  return (
    <PageShell>
      <article style={{ marginTop: "-2rem", maxWidth: "700px" }}>
        <Link
          href="/blog"
          className="link-gold"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "inline-block",
            marginBottom: "2rem",
          }}
        >
          &larr; All Articles
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <time
              dateTime={date}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                color: "var(--color-text-ghost)",
              }}
            >
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                color: "var(--color-text-ghost)",
              }}
            >
              {readingTime} min read
            </span>
          </div>

          <h1
            className="heading-display mb-4"
            style={{
              fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
              color: "var(--color-text-primary)",
            }}
          >
            {title}
          </h1>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
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
          )}
        </header>

        <div
          className="prose-cosmic"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {sources.length > 0 && (
          <footer className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(212,168,83,0.06)" }}>
            <h2 className="heading-section mb-4">SOURCES</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {sources.map((source) => (
                <li
                  key={source}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "var(--color-text-dim)",
                    lineHeight: 1.6,
                    marginBottom: "0.5rem",
                  }}
                >
                  {source}
                </li>
              ))}
            </ul>
          </footer>
        )}

        <div className="mt-12 text-center">
          <p className="body-text mb-4" style={{ fontSize: "0.85rem", color: "var(--color-text-dim)" }}>
            Want to talk about something you read here?
          </p>
          <Link href="/contact" className="btn-ghost">
            Get in touch
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
