import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/blog";
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
    description: "Thoughts on web design, audio engineering, and AI automation.",
    images: [{ url: "/images/og-image.webp", width: 1200, height: 630, alt: "Dead Pixel Design Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Dead Pixel Design",
    description: "Thoughts on web design, audio engineering, and AI automation.",
    images: ["/images/og-image.webp"],
  },
  alternates: { canonical: "https://deadpixeldesign.com/blog" },
};

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
