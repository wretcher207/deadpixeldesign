# Dead Pixel Design Site Refinement + New Features

**Date:** 2026-04-12
**Status:** Complete
**Scope:** Responsiveness polish, SEO hardening, AI chatbot, blog system, contact verification

---

## 1. Responsiveness & Polish Pass

### What
Audit every page at mobile (375px), tablet (768px), and desktop (1440px+) breakpoints. Fix layout breaks, spacing issues, font sizing, touch targets, and overflow.

### Pages to audit
- Home (`HomeContent.tsx`) - hero video, below-fold content grid, scroll indicator
- About (`AboutContent.tsx`) - two-column layout collapse, sidebar card stacking
- Services (`ServicesContent.tsx`) - package card grid, maintenance card flex layout
- Work (`WorkContent.tsx`) - project cards with thumbnails, image/text layout on mobile
- Contact (`ContactContent.tsx`) - two-column grid, booking form, social links
- Nav (`ConstellationNav.tsx`) - hero variant vs inner-page variant, mobile menu
- Footer (`Footer.tsx`) - link layout, spacing

### Known areas to check
- `grid-cols-1 md:grid-cols-2` patterns on contact page at tablet widths
- Package cards on services page at awkward middle breakpoints (500-700px)
- Work page thumbnail + content side-by-side layout on small tablets
- Hero video aspect ratio handling on ultra-wide screens
- Touch target sizes on social links and nav items (minimum 44x44px)
- Text overflow on long project descriptions at narrow widths

### Approach
- Run through each page in browser at 375, 768, 1024, 1440 widths
- Fix issues in-place, no architectural changes
- Verify no horizontal scroll at any breakpoint

---

## 2. SEO Hardening

### What
Audit and strengthen existing SEO. The previous session already did a solid pass (H1 fixes, JSON-LD, heading hierarchy, meta tags, sitemap, etc.). This pass focuses on what might still be missing or could be stronger.

### Checklist
- [ ] Verify all pages have unique, descriptive `<title>` and `<meta description>`
- [ ] Confirm heading hierarchy (one H1 per page, logical H2/H3 nesting)
- [ ] Check Open Graph and Twitter Card tags on all inner pages
- [ ] Verify JSON-LD pricing matches current services page data
- [ ] Confirm canonical URLs are correct
- [ ] Check image alt text completeness (especially work page thumbnails)
- [ ] Verify sitemap.ts includes all pages with correct lastmod
- [ ] Test robots.txt accessibility
- [ ] Check Core Web Vitals impact from video backgrounds
- [ ] Add structured data for FAQ if applicable (services page)
- [ ] Confirm all internal links use Next.js `<Link>` for client-side nav

---

## 3. AI Customer Service Chatbot

### Architecture

```
User clicks chat widget
  -> React chat component (client-side)
  -> POST /api/chat (Next.js API route)
  -> Groq API (Gemma model)
  -> Response streamed back to UI
```

### Tech stack
- **Model:** Gemma (via Groq API, free tier)
- **API route:** `src/app/api/chat/route.ts` - handles message relay to Groq
- **Knowledge base:** `src/data/chatbot-knowledge.md` - markdown file with all services, pricing, FAQ, qualification logic. David approves all content.
- **UI component:** `src/components/chat/ChatWidget.tsx` - floating bubble + chat panel
- **Embedded version:** `src/components/chat/ChatEmbed.tsx` - inline version for contact page

### Knowledge base structure (`chatbot-knowledge.md`)
```markdown
# Dead Pixel Design - Chatbot Knowledge Base

## About
- One-person studio, David, based in Maine
- Web design + audio engineering + AI automation

## Web Design Packages
- Starter: $500-$800 (3-5 pages, basic SEO, contact form, 1 revision)
- Standard: $1,000-$1,500 (6-8 pages, full SEO, copywriting, 2 revisions)
- Premium: $1,500-$3,000 (full custom, content strategy, 60 days support, unlimited revisions)
- Monthly Maintenance: $100-$200/mo

## Audio Engineering
- Single Song Mix: $50
- Single Song Master: $30
- Mix and Master Bundle: $70
- EP Package: $250 (3-5 songs)
- Album Package: $450 (6-12 songs)
- Podcast Editing: $25/episode
- Remote Recording Consultation: $40
- Home Studio Setup and Mix: $120

## Lead Qualification
(Instructions for the bot on how to guide conversations toward booking)

## FAQ
(Common questions and answers)
```

### System prompt behavior
The bot should:
- Answer questions about services and pricing accurately
- Ask qualifying questions (what kind of project? timeline? budget range?)
- Recommend a package based on answers
- Push qualified leads toward the booking form
- Be direct, no corporate fluff (match Dead Pixel voice)
- Never make up capabilities or pricing not in the knowledge base
- Identify when it can't answer and suggest contacting David directly

### UI behavior
- **Floating widget:** Small circle button bottom-right, expands to chat panel (~350px wide, ~500px tall). Closable. Persists across page navigation (state in React context or layout).
- **Contact page embed:** Same chat component but rendered inline, larger, no bubble trigger needed. Sits below or alongside the booking form.
- **Conversation limit:** Cap at 20 messages per session to prevent abuse. After that, direct to booking form.
- **No persistent storage:** Conversations are ephemeral. No database needed. Resets on page refresh.

### Environment
- `GROQ_API_KEY` stored in Vercel environment variables
- Local dev: same key in `.env.local`

### Rate limiting
- Simple in-memory rate limit on the API route (e.g., 30 requests per IP per hour)
- Prevents abuse without needing external infrastructure

---

## 4. Blog System

### Architecture

```
src/
  content/
    blog/
      integrating-claude-into-small-business.md
      ...
  app/
    blog/
      page.tsx          <- Blog index (list all articles)
      [slug]/
        page.tsx         <- Individual article page
  lib/
    blog.ts             <- Markdown parsing utilities (frontmatter, content)
```

### Article frontmatter
```markdown
---
title: "Integrating Claude Into Your Small Business"
date: "2026-04-12"
excerpt: "How AI assistants can handle the boring stuff so you can focus on actual work."
sources:
  - "Direct experience building AI workflows for Dead Pixel Design clients"
tags: ["ai", "small-business", "automation"]
published: true
---

Article content here in markdown...
```

### Blog index page (`/blog`)
- Lists all published articles, newest first
- Each entry shows: title, date, excerpt, tags
- Clean, minimal layout matching site design (card-cosmic style)
- SEO metadata for the blog index page

### Article page (`/blog/[slug]`)
- Full article content rendered from markdown
- Shows: title, date, reading time, tags, sources section at bottom
- Proper heading hierarchy for SEO
- JSON-LD Article structured data
- Open Graph tags per article (for social sharing)

### Homepage integration
- "Latest" section between the below-fold content and the bottom CTA
- Shows 2-3 most recent articles: title + excerpt + link to full article
- Minimal footprint, doesn't dominate the page

### Pipeline from the-brain
- David works in the-brain to develop ideas and research
- When an article is ready, Claude generates a polished blog markdown file
- File goes into `src/content/blog/[slug].md`
- David reviews and approves before deploying
- No automated publishing. Manual review every time.

### Markdown rendering
- Use `gray-matter` for frontmatter parsing
- Use `remark` + `remark-html` (or `next-mdx-remote` if we want component support) for rendering
- Keep it simple. No MDX unless David specifically needs interactive elements in articles.

---

## 5. Contact Verification

### What
Verify the existing contact/booking flow works end-to-end.

### Checks
- [ ] Zapier webhook receives form submissions correctly
- [ ] Form validation works (required fields, email format)
- [ ] Success/error states display properly
- [ ] Form resets after successful submission
- [ ] Webhook URL consideration: currently hardcoded at line 8 of ContactContent.tsx. Should move to env var for security (not blocking, but recommended).
- [ ] Test on mobile - touch targets, keyboard behavior, select dropdown

---

## Implementation Order

1. **Contact verification** - quick check, low effort, high importance
2. **Responsiveness pass** - foundation work, affects all pages
3. **SEO hardening** - builds on responsiveness fixes
4. **Blog system** - new feature, independent of chatbot
5. **AI chatbot** - most complex, benefits from blog content being in place (can reference articles)

---

## Dependencies

- `groq-sdk` - Groq API client for the chatbot
- `gray-matter` - Frontmatter parsing for blog posts
- `remark` + `remark-html` - Markdown to HTML rendering for blog

No other new dependencies. Everything else uses existing stack (Next.js, React, Tailwind, Framer Motion).

---

## Out of scope
- CMS dashboard (articles are markdown files, edited in code)
- Chat history persistence (conversations are ephemeral)
- User accounts or authentication
- Comment system on blog posts
- Newsletter/email capture (can add later if needed)
