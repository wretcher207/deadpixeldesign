# Dead Pixel Design — Site Refinement & New Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden responsiveness and SEO, add an AI customer service chatbot (Groq + Gemma), and build a markdown-powered blog system with homepage integration.

**Architecture:** Next.js 16 App Router with server page components handling metadata and client `*Content.tsx` components handling rendering. New API route for chatbot. Blog uses filesystem-based markdown with `gray-matter` + `remark`. Chat widget lives in root layout for sitewide persistence.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion, Groq SDK, gray-matter, remark, remark-html

---

## File Structure

### New files
```
src/
  app/
    api/chat/route.ts              — Groq API relay, rate limiting, system prompt injection
    blog/
      page.tsx                      — Blog index server component (metadata + BlogContent)
      BlogContent.tsx               — Blog listing client component
      [slug]/
        page.tsx                    — Article detail server component (metadata + ArticleContent)
        ArticleContent.tsx          — Article rendering client component
  components/
    chat/
      ChatWidget.tsx                — Floating chat bubble + expandable panel
      ChatEmbed.tsx                 — Inline chat for contact page
      ChatProvider.tsx              — React context for chat state persistence across nav
      ChatMessages.tsx              — Message list rendering (shared by widget + embed)
      ChatInput.tsx                 — Input field + send button (shared)
  content/
    blog/
      integrating-claude-into-small-business.md  — First article
  data/
    chatbot-knowledge.md            — Bot training knowledge base (David approves all content)
  lib/
    blog.ts                         — getAllPosts(), getPostBySlug(), markdown rendering
    chat.ts                         — Message types, constants (max messages, rate limits)
```

### Modified files
```
src/app/layout.tsx                  — Add ChatProvider + ChatWidget, add blog to nav consideration
src/app/HomeContent.tsx             — Add "Latest Articles" section before bottom CTA
src/app/contact/ContactContent.tsx  — Add ChatEmbed below booking form, move webhook URL to env var
src/app/sitemap.ts                  — Add /blog route, update lastDeploy date
src/components/seo/JsonLd.tsx       — Add ArticleJsonLd component
src/components/layout/Footer.tsx    — Add Blog link to footer nav
src/lib/channels.ts                 — Add blog channel
src/components/layout/ConstellationNav.tsx — Add blog star position
package.json                        — Add groq-sdk, gray-matter, remark, remark-html
.env.local                          — GROQ_API_KEY, NEXT_PUBLIC_WEBHOOK_URL (created, not committed)
.gitignore                          — Ensure .env.local is listed
```

---

## Task 1: Install Dependencies & Environment Setup

**Files:**
- Modify: `package.json`
- Create: `.env.local`
- Modify: `.gitignore`

- [ ] **Step 1: Install new dependencies**

```bash
cd /c/dead-pixel-design/web-forge/personal/dead-pixel-redesign-3
npm install groq-sdk gray-matter remark remark-html
npm install -D @types/remark-html
```

- [ ] **Step 2: Create .env.local**

```bash
cat > .env.local << 'ENVEOF'
GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE
NEXT_PUBLIC_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/26768975/unqhe52/
ENVEOF
```

- [ ] **Step 3: Verify .gitignore includes .env.local**

Check `.gitignore` for `.env.local`. If missing, add it.

- [ ] **Step 4: Verify build still works**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "feat: add groq-sdk, gray-matter, remark dependencies for chatbot and blog"
```

---

## Task 2: Contact Form — Move Webhook URL to Env Var

**Files:**
- Modify: `src/app/contact/ContactContent.tsx:8`

- [ ] **Step 1: Replace hardcoded webhook URL**

In `src/app/contact/ContactContent.tsx`, replace line 8:

```typescript
// Old:
const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/26768975/unqhe52/";

// New:
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || "";
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Builds cleanly. The env var is available client-side via `NEXT_PUBLIC_` prefix.

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/ContactContent.tsx
git commit -m "fix: move Zapier webhook URL to environment variable"
```

---

## Task 3: Responsiveness Audit & Fixes

**Files:**
- Modify: `src/app/HomeContent.tsx`
- Modify: `src/app/about/AboutContent.tsx`
- Modify: `src/app/services/ServicesContent.tsx`
- Modify: `src/app/work/WorkContent.tsx`
- Modify: `src/app/contact/ContactContent.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Start dev server and audit each page at 375px, 768px, 1024px, 1440px**

```bash
npm run dev
```

Open browser, use DevTools responsive mode. Check each page for:
- Horizontal overflow (scroll left/right should not be possible)
- Text overflow or truncation
- Touch target sizes (minimum 44x44px on interactive elements)
- Card grid behavior at awkward breakpoints
- Image aspect ratios
- Video background coverage

- [ ] **Step 2: Fix HomeContent.tsx responsive issues**

Check the 3-column grid (`grid-cols-1 sm:grid-cols-3`) at ~500px. If cards stack oddly, ensure `sm:` breakpoint is appropriate. Check hero scroll indicator doesn't overlap content on short viewports.

- [ ] **Step 3: Fix AboutContent.tsx responsive issues**

The `lg:grid-cols-[2fr_1fr]` layout collapses to single column at `<1024px`. Verify sidebar cards don't get too wide when stacked. Ensure body text `maxWidth: 600px` doesn't cause awkward centering on tablet.

- [ ] **Step 4: Fix ServicesContent.tsx responsive issues**

Package cards use `repeat(auto-fit, minmax(min(260px, 100%), 1fr))`. Test at 500-700px to ensure cards don't get squished. The maintenance card uses `display: flex, flexWrap: wrap` — verify it wraps cleanly on mobile.

- [ ] **Step 5: Fix WorkContent.tsx responsive issues**

Project cards with thumbnails use `md:flex-row md:gap-6`. On mobile the thumbnail should stack above content at full width. Verify thumbnail `aspect-[16/10]` works on all widths. Check tech tags don't overflow on narrow screens.

- [ ] **Step 6: Fix ContactContent.tsx responsive issues**

The 2-column grid (`md:grid-cols-2`) for direct contact + social cards. Verify booking form is comfortable on mobile. Check social link touch targets. Ensure Spotify embed doesn't overflow on narrow viewports.

- [ ] **Step 7: Fix any global CSS issues found**

If any global spacing, font sizing, or layout issues are found, fix them in `globals.css`.

- [ ] **Step 8: Screenshot verification at all breakpoints**

Take screenshots at 375, 768, 1024, 1440 for each page. Verify no regressions.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "fix: responsiveness improvements across all pages"
```

---

## Task 4: SEO Hardening

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/page.tsx` (if needed)
- Modify: `src/app/about/page.tsx` (if needed)
- Modify: `src/app/work/page.tsx` (if needed)
- Modify: `src/components/seo/JsonLd.tsx` (if needed)

- [ ] **Step 1: Audit all page metadata**

Read each `page.tsx` server component. Verify:
- Unique `<title>` per page
- Unique `<meta description>` per page (under 160 chars)
- OpenGraph title, description, image
- Twitter card tags
- Canonical URL via `alternates.canonical`

- [ ] **Step 2: Fix any missing or weak metadata**

Check `src/app/about/page.tsx` and `src/app/work/page.tsx` for canonical URLs and Twitter cards. Add if missing.

- [ ] **Step 3: Update sitemap.ts lastDeploy date**

In `src/app/sitemap.ts`, change:
```typescript
const lastDeploy = new Date("2026-04-09");
// to:
const lastDeploy = new Date("2026-04-12");
```

- [ ] **Step 4: Verify JSON-LD pricing matches ServicesContent.tsx**

Cross-check every price in `ServicesPageJsonLd()` against the `WEB_PACKAGES` and `AUDIO_PACKAGES` arrays in `ServicesContent.tsx`. Fix any mismatches.

- [ ] **Step 5: Check all image alt text**

Grep for `<Image` and `<img` tags. Verify every image has meaningful alt text. Pay special attention to work page thumbnails.

- [ ] **Step 6: Verify heading hierarchy**

Each page must have exactly one `<h1>`. H2s should be logical children of H1. H3s children of H2s. No skipped levels.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "fix: SEO hardening — metadata, sitemap, alt text, heading hierarchy"
```

---

## Task 5: Blog — Markdown Utilities

**Files:**
- Create: `src/lib/blog.ts`

- [ ] **Step 1: Create blog utility module**

Create `src/lib/blog.ts`:

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  sources: string[];
  tags: string[];
  published: boolean;
  content: string;       // raw markdown
  htmlContent?: string;  // rendered HTML
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(BLOG_DIR, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || "",
        sources: data.sources || [],
        tags: data.tags || [],
        published: data.published !== false,
        content,
      } satisfies BlogPost;
    })
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    sources: data.sources || [],
    tags: data.tags || [],
    published: data.published !== false,
    content,
  };
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npm run build
```

Expected: No type errors. The blog directory doesn't exist yet so `getAllPosts()` returns `[]`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/blog.ts
git commit -m "feat: add blog markdown utilities — getAllPosts, getPostBySlug, renderMarkdown"
```

---

## Task 6: Blog — First Article

**Files:**
- Create: `src/content/blog/integrating-claude-into-small-business.md`

- [ ] **Step 1: Create blog content directory**

```bash
mkdir -p src/content/blog
```

- [ ] **Step 2: Create the first article**

Create `src/content/blog/integrating-claude-into-small-business.md`. David will provide the final content, but we need a placeholder structure to build against:

```markdown
---
title: "Integrating Claude Into Your Small Business"
date: "2026-04-12"
excerpt: "AI assistants like Claude can handle customer questions, draft emails, organize data, and automate the stuff you keep putting off. Here is how small businesses are actually using it."
sources:
  - "Direct experience building AI workflows for Dead Pixel Design and client projects"
tags: ["ai", "small-business", "automation", "claude"]
published: true
---

Content will be generated from the-brain workflow. This is a structural placeholder for build verification.
```

Note: David will replace the body content through the-brain workflow before publishing.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/
git commit -m "feat: add blog content directory with first article placeholder"
```

---

## Task 7: Blog — Index Page

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/BlogContent.tsx`

- [ ] **Step 1: Create blog index server component**

Create `src/app/blog/page.tsx`:

```typescript
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog — Thoughts on Web Design, Audio, and AI",
  description:
    "Articles on web design, audio engineering, AI automation, and building things that matter. Written by Dead Pixel Design.",
  keywords: [
    "web design blog",
    "audio engineering articles",
    "AI small business",
    "Dead Pixel Design blog",
  ],
  openGraph: {
    title: "Blog | Dead Pixel Design",
    description:
      "Thoughts on web design, audio engineering, and AI automation.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Dead Pixel Design Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Dead Pixel Design",
    description:
      "Thoughts on web design, audio engineering, and AI automation.",
    images: ["/images/og-image.webp"],
  },
  alternates: {
    canonical: "https://deadpixeldesign.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://deadpixeldesign.com" },
          { name: "Blog", url: "https://deadpixeldesign.com/blog" },
        ]}
      />
      <BlogContent />
    </>
  );
}
```

- [ ] **Step 2: Create blog listing client component**

Create `src/app/blog/BlogContent.tsx`:

```typescript
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
                      transition:
                        "color var(--duration-base) var(--ease-smooth)",
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
```

- [ ] **Step 3: Wire up server data to client component**

Update `src/app/blog/page.tsx` to pass posts as props. Add to the imports and modify the render:

```typescript
import { getAllPosts } from "@/lib/blog";

// Inside BlogPage():
export default function BlogPage() {
  const posts = getAllPosts().map(({ slug, title, date, excerpt, tags }) => ({
    slug,
    title,
    date,
    excerpt,
    tags,
  }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://deadpixeldesign.com" },
          { name: "Blog", url: "https://deadpixeldesign.com/blog" },
        ]}
      />
      <BlogContent posts={posts} />
    </>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Builds cleanly. `/blog` page renders with the one article.

- [ ] **Step 5: Commit**

```bash
git add src/app/blog/
git commit -m "feat: add blog index page with article listing"
```

---

## Task 8: Blog — Article Detail Page

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/app/blog/[slug]/ArticleContent.tsx`
- Modify: `src/components/seo/JsonLd.tsx` — add `ArticleJsonLd`

- [ ] **Step 1: Add ArticleJsonLd to JsonLd.tsx**

Add to `src/components/seo/JsonLd.tsx`:

```typescript
interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author = "David",
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
      url: "https://deadpixeldesign.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Dead Pixel Design",
      url: "https://deadpixeldesign.com",
      logo: {
        "@type": "ImageObject",
        url: "https://deadpixeldesign.com/images/favicon-512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

- [ ] **Step 2: Create article detail server component**

Create `src/app/blog/[slug]/page.tsx`:

```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, renderMarkdown } from "@/lib/blog";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import ArticleContent from "./ArticleContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: "/images/og-image.webp",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/images/og-image.webp"],
    },
    alternates: {
      canonical: `https://deadpixeldesign.com/blog/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = await renderMarkdown(post.content);

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`https://deadpixeldesign.com/blog/${slug}`}
        datePublished={post.date}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://deadpixeldesign.com" },
          { name: "Blog", url: "https://deadpixeldesign.com/blog" },
          { name: post.title, url: `https://deadpixeldesign.com/blog/${slug}` },
        ]}
      />
      <ArticleContent
        title={post.title}
        date={post.date}
        tags={post.tags}
        sources={post.sources}
        htmlContent={htmlContent}
      />
    </>
  );
}
```

- [ ] **Step 3: Create article rendering client component**

Create `src/app/blog/[slug]/ArticleContent.tsx`:

```typescript
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
        {/* Back link */}
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

        {/* Header */}
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

        {/* Article body */}
        <div
          className="prose-cosmic"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Sources */}
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

        {/* CTA */}
        <div className="mt-12 text-center">
          <p
            className="body-text mb-4"
            style={{ fontSize: "0.85rem", color: "var(--color-text-dim)" }}
          >
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
```

- [ ] **Step 4: Add prose-cosmic styles to globals.css**

Add to `src/app/globals.css` at the end:

```css
/* ============================================
   BLOG PROSE
   ============================================ */

.prose-cosmic {
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.prose-cosmic h2 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.prose-cosmic h3 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose-cosmic p {
  margin-bottom: 1.25rem;
}

.prose-cosmic a {
  color: var(--color-accent-gold);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity var(--duration-base) var(--ease-smooth);
}

.prose-cosmic a:hover {
  opacity: 0.8;
}

.prose-cosmic ul,
.prose-cosmic ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.prose-cosmic li {
  margin-bottom: 0.5rem;
}

.prose-cosmic blockquote {
  border-left: 2px solid rgba(212, 168, 83, 0.2);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: var(--color-text-dim);
  font-style: italic;
}

.prose-cosmic code {
  font-family: var(--font-body);
  font-size: 0.85em;
  background: rgba(212, 168, 83, 0.06);
  padding: 0.15em 0.4em;
  border-radius: 2px;
}

.prose-cosmic pre {
  background: rgba(3, 3, 8, 0.8);
  border: 1px solid rgba(212, 168, 83, 0.06);
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose-cosmic pre code {
  background: none;
  padding: 0;
}

.prose-cosmic strong {
  color: var(--color-text-primary);
  font-weight: 600;
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Builds cleanly. Article page generates statically for the one article.

- [ ] **Step 6: Commit**

```bash
git add src/app/blog/[slug]/ src/components/seo/JsonLd.tsx src/app/globals.css
git commit -m "feat: add blog article detail page with prose styles and JSON-LD"
```

---

## Task 9: Blog — Homepage Integration + Navigation

**Files:**
- Modify: `src/app/HomeContent.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Add latest articles section to HomeContent.tsx**

This requires passing data from a server component. Since `HomeContent` is a client component rendered by `page.tsx` (server), we pass the posts as props.

First update `src/app/page.tsx` to pass latest posts:

```typescript
// Add import:
import { getLatestPosts } from "@/lib/blog";

// In the render, pass posts to HomeContent:
const latestPosts = getLatestPosts(3).map(({ slug, title, date, excerpt }) => ({
  slug, title, date, excerpt,
}));

// Pass as prop: <HomeContent latestPosts={latestPosts} />
```

Then update `HomeContent` to accept and render them. Add a "Latest" section between the existing content and the bottom CTA. Small section — just titles, dates, and excerpts with links to `/blog/[slug]`.

- [ ] **Step 2: Add /blog to sitemap.ts**

Add to the return array in `src/app/sitemap.ts`:

```typescript
{
  url: `${baseUrl}/blog`,
  lastModified: lastDeploy,
  changeFrequency: "weekly" as const,
  priority: 0.8,
},
```

- [ ] **Step 3: Add Blog link to Footer.tsx**

In `src/components/layout/Footer.tsx`, add to the nav links array:

```typescript
{ label: "Blog", href: "/blog" },
```

- [ ] **Step 4: Verify build and navigation**

```bash
npm run build
```

Test: Homepage shows latest articles (if any exist). Footer links to /blog. Sitemap includes /blog.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/HomeContent.tsx src/app/sitemap.ts src/components/layout/Footer.tsx
git commit -m "feat: integrate blog into homepage, footer, and sitemap"
```

---

## Task 10: Chat — Types & Constants

**Files:**
- Create: `src/lib/chat.ts`

- [ ] **Step 1: Create chat types and constants**

Create `src/lib/chat.ts`:

```typescript
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const CHAT_CONFIG = {
  maxMessages: 20,
  maxInputLength: 500,
  model: "gemma2-9b-it",
  maxTokens: 512,
  temperature: 0.7,
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/chat.ts
git commit -m "feat: add chat message types and configuration constants"
```

---

## Task 11: Chat — Knowledge Base

**Files:**
- Create: `src/data/chatbot-knowledge.md`

- [ ] **Step 1: Create the knowledge base**

Create `src/data/chatbot-knowledge.md`. This is the complete training document. David approves all content here before it goes live.

```markdown
# Dead Pixel Design — Chatbot Knowledge Base

## About Us
Dead Pixel Design is a one-person web design and audio engineering studio based in Maine, run by David. We work with small businesses, musicians, and independent creators. No agency overhead, no middlemen. You talk directly to the person building your project.

## Web Design Packages

### Starter — $500 to $800
- 3 to 5 pages, mobile friendly
- Basic SEO setup
- Contact form
- Google Business Profile setup
- 1 revision round
- Best for: Solo tradespeople, small local businesses, first-time website owners

### Standard — $1,000 to $1,500
- 6 to 8 pages, mobile friendly
- Full SEO setup
- Copywriting help
- Photo optimization
- Google Analytics connected
- 2 revision rounds
- Best for: Dental practices, contractors, auto repair shops, tourism businesses

### Premium — $1,500 to $3,000
- Full custom build
- Content strategy
- SEO setup and implementation
- 60 days of post-launch support
- Unlimited revisions
- Best for: Established businesses ready for a serious online presence

### Monthly Maintenance — $100 to $200/month
- Security updates, minor edits, hosting management
- Keeps your site running while you focus on your work

## Audio Engineering Services

### Mixing
- Single Song Mix: $50 (up to 32 tracks, WAV + MP3, 5-7 day turnaround, 1 revision)

### Mastering
- Single Song Master: $30 (3-5 day turnaround, 1 revision)

### Bundles
- Mix and Master Bundle: $70 per song (5-7 day turnaround, 1 revision each)
- EP Package: $250 (3-5 songs, unlimited revisions, ~2 weeks)
- Album Package: $450 (6-12 songs, unlimited revisions, ~3-4 weeks)

### Other Audio Services
- Podcast Editing: $25/episode (cleanup, leveling, noise reduction, intro/outro, 48hr turnaround)
- Remote Recording Consultation: $40 (1 hour video call, mic placement, room setup, notes after)
- Home Studio Setup and Mix: $120 (consultation + full mix of one song)

## AI and Automation
We also build AI workflows and automation tools for small businesses. Custom solutions, not templates. If you are spending hours on repetitive tasks, there is probably a way to automate it.

## Contact Information
- Phone: (207) 694-8691
- Email: david@deadpixeldesign.com
- Location: Maine, USA (work with clients nationally)
- First consultation is always free

## Qualification Questions
When someone seems interested, ask:
1. What kind of project are you thinking about? (website, audio, something else)
2. Do you have an existing site or starting from scratch?
3. What is your timeline?
4. What is your rough budget range?

Based on their answers, recommend the most appropriate package. If they seem ready, direct them to the booking form on the contact page.

## What We Do NOT Do
- We do not build WordPress sites
- We do not do ongoing social media management
- We do not offer web hosting as a standalone service (included with maintenance plans)
- We do not do print design

## Common Questions
Q: How long does a website take?
A: Starter sites typically 1-2 weeks. Standard 2-3 weeks. Premium 3-6 weeks depending on scope.

Q: Do you work with clients outside Maine?
A: Yes. Everything is remote. We work with clients across the country.

Q: Can I update the site myself after it is built?
A: Depends on the build. Some sites include a simple CMS. Others we handle updates through a maintenance plan.

Q: What if I just need small changes to my existing site?
A: Reach out. Small fixes and updates can often be handled quickly and affordably.

Q: Do you offer payment plans?
A: For larger projects, yes. We can split payments across milestones.
```

- [ ] **Step 2: Commit**

```bash
git add src/data/chatbot-knowledge.md
git commit -m "feat: add chatbot knowledge base — services, pricing, FAQ, qualification logic"
```

---

## Task 12: Chat — API Route

**Files:**
- Create: `src/app/api/chat/route.ts`

- [ ] **Step 1: Create the Groq API relay route**

Create `src/app/api/chat/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { CHAT_CONFIG, type ChatMessage } from "@/lib/chat";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30; // requests per hour per IP
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

// Load knowledge base at startup
let knowledgeBase = "";
try {
  knowledgeBase = fs.readFileSync(
    path.join(process.cwd(), "src/data/chatbot-knowledge.md"),
    "utf-8"
  );
} catch {
  knowledgeBase = "You are a helpful assistant for Dead Pixel Design, a web design and audio engineering studio in Maine.";
}

const SYSTEM_PROMPT = `You are the AI assistant for Dead Pixel Design, a web design and audio engineering studio based in Maine, run by David. Your job is to answer questions about services and pricing, help qualify leads, and be a knowledgeable resource.

Rules:
- Be direct and helpful. No corporate fluff. Match the Dead Pixel voice: clear, honest, no bullshit.
- Only answer based on the knowledge base below. Never make up services, prices, or capabilities.
- If you do not know the answer, say so and suggest they contact David directly.
- When someone shows interest, ask qualifying questions to recommend the right package.
- When someone seems ready to book, direct them to the contact page booking form.
- Keep responses concise. 2-3 sentences for simple questions. Longer only if they ask for detail.
- Never discuss competitors or other businesses.
- You are not David. You are the Dead Pixel assistant.

Knowledge Base:
${knowledgeBase}`;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a bit." },
      { status: 429 }
    );
  }

  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    // Enforce message limit
    const trimmed = messages.slice(-CHAT_CONFIG.maxMessages);

    const completion = await groq.chat.completions.create({
      model: CHAT_CONFIG.model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...trimmed.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content.slice(0, CHAT_CONFIG.maxInputLength),
        })),
      ],
      max_tokens: CHAT_CONFIG.maxTokens,
      temperature: CHAT_CONFIG.temperature,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I could not generate a response. Try reaching out to David directly.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again, or contact David directly." },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Builds cleanly. API route compiles.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/chat/
git commit -m "feat: add chat API route — Groq relay with rate limiting and knowledge base"
```

---

## Task 13: Chat — Shared UI Components

**Files:**
- Create: `src/components/chat/ChatMessages.tsx`
- Create: `src/components/chat/ChatInput.tsx`

- [ ] **Step 1: Create ChatMessages component**

Create `src/components/chat/ChatMessages.tsx`:

```typescript
"use client";

import { useRef, useEffect } from "react";
import type { ChatMessage } from "@/lib/chat";

export default function ChatMessages({
  messages,
  isLoading,
}: {
  messages: ChatMessage[];
  isLoading: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {messages.length === 0 && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            color: "var(--color-text-dim)",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          Ask me anything about our services, pricing, or process.
        </p>
      )}

      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%",
            padding: "0.6rem 0.85rem",
            borderRadius: "6px",
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            lineHeight: 1.6,
            background:
              msg.role === "user"
                ? "rgba(212, 168, 83, 0.1)"
                : "rgba(14, 14, 26, 0.8)",
            color:
              msg.role === "user"
                ? "var(--color-text-primary)"
                : "var(--color-text-secondary)",
            border:
              msg.role === "user"
                ? "1px solid rgba(212, 168, 83, 0.15)"
                : "1px solid rgba(212, 168, 83, 0.04)",
          }}
        >
          {msg.content}
        </div>
      ))}

      {isLoading && (
        <div
          style={{
            alignSelf: "flex-start",
            padding: "0.6rem 0.85rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            color: "var(--color-text-ghost)",
          }}
        >
          Thinking...
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
```

- [ ] **Step 2: Create ChatInput component**

Create `src/components/chat/ChatInput.tsx`:

```typescript
"use client";

import { useState } from "react";
import { CHAT_CONFIG } from "@/lib/chat";

export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (message: string) => void;
  disabled: boolean;
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.5rem",
        padding: "0.75rem",
        borderTop: "1px solid rgba(212, 168, 83, 0.06)",
      }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, CHAT_CONFIG.maxInputLength))}
        placeholder="Ask about our services..."
        disabled={disabled}
        className="input-cosmic"
        style={{ flex: 1, fontSize: "0.78rem", padding: "0.5rem 0.75rem" }}
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="btn-ghost"
        style={{
          padding: "0.5rem 1rem",
          fontSize: "0.6rem",
          opacity: disabled || !input.trim() ? 0.4 : 1,
          cursor: disabled || !input.trim() ? "not-allowed" : "pointer",
        }}
      >
        Send
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/chat/
git commit -m "feat: add shared chat UI components — ChatMessages and ChatInput"
```

---

## Task 14: Chat — Provider & Widget

**Files:**
- Create: `src/components/chat/ChatProvider.tsx`
- Create: `src/components/chat/ChatWidget.tsx`
- Create: `src/components/chat/ChatEmbed.tsx`

- [ ] **Step 1: Create ChatProvider for state persistence across navigation**

Create `src/components/chat/ChatProvider.tsx`:

```typescript
"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { ChatMessage } from "@/lib/chat";
import { CHAT_CONFIG } from "@/lib/chat";

interface ChatContextValue {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (content: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}

export default function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      if (isLoading) return;
      if (messages.length >= CHAT_CONFIG.maxMessages) return;

      const userMsg: ChatMessage = { role: "user", content };
      const updated = [...messages, userMsg];
      setMessages(updated);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updated }),
        });

        const data = await res.json();

        if (res.ok && data.reply) {
          setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.error || "Something went wrong. Try reaching out to David directly.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Could not connect. Try again, or contact David directly at (207) 694-8691.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage, isOpen, setIsOpen }}>
      {children}
    </ChatContext.Provider>
  );
}
```

- [ ] **Step 2: Create ChatWidget (floating bubble)**

Create `src/components/chat/ChatWidget.tsx`:

```typescript
"use client";

import { useChatContext } from "./ChatProvider";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { CHAT_CONFIG } from "@/lib/chat";

export default function ChatWidget() {
  const { messages, isLoading, sendMessage, isOpen, setIsOpen } = useChatContext();
  const atLimit = messages.filter((m) => m.role === "user").length >= CHAT_CONFIG.maxMessages;

  return (
    <>
      {/* Floating bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 90,
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "rgba(3, 3, 8, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(212, 168, 83, 0.15)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color var(--duration-base) var(--ease-smooth), transform var(--duration-base) var(--ease-snappy)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.3)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.15)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 91,
            width: "min(360px, calc(100vw - 2rem))",
            height: "min(500px, calc(100dvh - 6rem))",
            background: "rgba(7, 7, 15, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(212, 168, 83, 0.08)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid rgba(212, 168, 83, 0.06)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-dim)",
              }}
            >
              Dead Pixel Assistant
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-ghost)",
                cursor: "pointer",
                padding: "4px",
                fontSize: "1.1rem",
                lineHeight: 1,
              }}
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <ChatMessages messages={messages} isLoading={isLoading} />

          {/* Input or limit message */}
          {atLimit ? (
            <div
              style={{
                padding: "0.75rem",
                borderTop: "1px solid rgba(212, 168, 83, 0.06)",
                textAlign: "center",
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                color: "var(--color-text-dim)",
              }}
            >
              You have reached the message limit. Head to the{" "}
              <a href="/contact" style={{ color: "var(--color-accent-gold)" }}>
                contact page
              </a>{" "}
              to book a project.
            </div>
          ) : (
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          )}
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Create ChatEmbed (inline for contact page)**

Create `src/components/chat/ChatEmbed.tsx`:

```typescript
"use client";

import { useChatContext } from "./ChatProvider";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { CHAT_CONFIG } from "@/lib/chat";

export default function ChatEmbed() {
  const { messages, isLoading, sendMessage } = useChatContext();
  const atLimit = messages.filter((m) => m.role === "user").length >= CHAT_CONFIG.maxMessages;

  return (
    <div
      className="card-cosmic"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <h2 className="heading-section mb-2" style={{ padding: "0.25rem 0" }}>
        ASK THE ASSISTANT
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem",
          color: "var(--color-text-ghost)",
          marginBottom: "0.75rem",
        }}
      >
        Questions about services, pricing, or process? Ask here.
      </p>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(212, 168, 83, 0.04)",
          borderRadius: "4px",
          overflow: "hidden",
          background: "rgba(3, 3, 8, 0.4)",
        }}
      >
        <ChatMessages messages={messages} isLoading={isLoading} />

        {atLimit ? (
          <div
            style={{
              padding: "0.75rem",
              borderTop: "1px solid rgba(212, 168, 83, 0.06)",
              textAlign: "center",
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              color: "var(--color-text-dim)",
            }}
          >
            Message limit reached. Use the booking form above or call David directly.
          </div>
        ) : (
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/chat/
git commit -m "feat: add ChatProvider, ChatWidget, and ChatEmbed components"
```

---

## Task 15: Chat — Wire Into Layout & Contact Page

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/contact/ContactContent.tsx`

- [ ] **Step 1: Add ChatProvider and ChatWidget to root layout**

In `src/app/layout.tsx`, add imports and wrap the body content:

```typescript
// Add imports:
import ChatProvider from "@/components/chat/ChatProvider";
import ChatWidget from "@/components/chat/ChatWidget";

// Wrap body children with ChatProvider, add ChatWidget before </body>:
<body>
  <ChatProvider>
    <a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>
    <ConstellationNav />
    <main id="main-content" className="min-h-screen">{children}</main>
    <Footer />
    <ChatWidget />
  </ChatProvider>
  <Analytics />
</body>
```

Note: `<Analytics />` stays outside `ChatProvider` since it doesn't need chat context.

- [ ] **Step 2: Add ChatEmbed to contact page**

In `src/app/contact/ContactContent.tsx`, add the embed below the booking form section:

```typescript
// Add import:
import ChatEmbed from "@/components/chat/ChatEmbed";

// After the booking form motion.div and before the bottom CTA, add:
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={viewportOnce}
  className="mb-16"
  style={{ maxWidth: "600px", margin: "0 auto" }}
>
  <ChatEmbed />
</motion.div>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Builds cleanly. ChatWidget renders on every page. ChatEmbed renders on contact page.

- [ ] **Step 4: Manual test**

```bash
npm run dev
```

- Open any page — chat bubble should appear bottom-right
- Click bubble — panel opens, can type messages
- Navigate between pages — chat state persists
- Visit /contact — embedded chat section appears below booking form
- Both widget and embed share the same conversation state

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/contact/ContactContent.tsx
git commit -m "feat: wire chat widget into root layout and embed into contact page"
```

---

## Task 16: Add Blog to Navigation

**Files:**
- Modify: `src/lib/channels.ts`
- Modify: `src/components/layout/ConstellationNav.tsx`

- [ ] **Step 1: Add blog channel**

In `src/lib/channels.ts`, add to the CHANNELS array:

```typescript
{
  id: 5,
  name: "blog",
  route: "/blog",
  label: "BLOG",
  description: "Thoughts on web design, audio, and AI.",
},
```

- [ ] **Step 2: Add blog star position to ConstellationNav**

In `src/components/layout/ConstellationNav.tsx`:

Add blog position to `STAR_POSITIONS`:
```typescript
"/blog": { x: 50, y: 50 },
```

Add blog connections to `CONSTELLATION_LINES`:
```typescript
["/blog", "/work"],
["/blog", "/services"],
```

Add blog position to `OVERLAY_POSITIONS`:
```typescript
"/blog": { x: 50, y: 50 },
```

Add blog connections to `OVERLAY_LINES`:
```typescript
["/blog", "/work"],
["/blog", "/services"],
```

- [ ] **Step 3: Verify build and visual check**

```bash
npm run build && npm run dev
```

Check that the blog star appears in both hero and overlay constellation navs. Verify it doesn't overlap other stars or look crowded.

- [ ] **Step 4: Commit**

```bash
git add src/lib/channels.ts src/components/layout/ConstellationNav.tsx
git commit -m "feat: add blog to constellation navigation"
```

---

## Task 17: Set Env Var on Vercel & Final Verification

**Files:** None (Vercel dashboard + final checks)

- [ ] **Step 1: Set GROQ_API_KEY on Vercel**

```bash
npx vercel env add GROQ_API_KEY production
# Enter: YOUR_GROQ_API_KEY_HERE
```

- [ ] **Step 2: Set NEXT_PUBLIC_WEBHOOK_URL on Vercel**

```bash
npx vercel env add NEXT_PUBLIC_WEBHOOK_URL production
# Enter: https://hooks.zapier.com/hooks/catch/26768975/unqhe52/
```

- [ ] **Step 3: Full build verification**

```bash
npm run build
```

Expected: Zero errors, zero warnings.

- [ ] **Step 4: Run dev server and test all features**

```bash
npm run dev
```

Checklist:
- [ ] Homepage loads with latest articles section
- [ ] /blog page lists articles
- [ ] /blog/[slug] renders article with sources and reading time
- [ ] Chat widget appears on all pages
- [ ] Chat widget sends messages and gets responses from Groq
- [ ] Chat state persists across page navigation
- [ ] Contact page has embedded chat below booking form
- [ ] Booking form submits (webhook URL from env var)
- [ ] All pages responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on any page
- [ ] Footer includes Blog link
- [ ] Constellation nav includes Blog star
- [ ] Sitemap includes /blog

- [ ] **Step 5: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final verification fixes"
```

---

## Summary

17 tasks. Each produces a working, committable increment. The implementation order ensures:
1. Dependencies and environment first (Tasks 1-2)
2. Polish existing site (Tasks 3-4)
3. Blog system built bottom-up: utilities → content → pages → integration (Tasks 5-9)
4. Chat system built bottom-up: types → knowledge → API → UI → wiring (Tasks 10-15)
5. Navigation update (Task 16)
6. Production deployment prep (Task 17)
