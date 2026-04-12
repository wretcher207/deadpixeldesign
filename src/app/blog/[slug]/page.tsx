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
      images: [{ url: "/images/og-image.webp", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/images/og-image.webp"],
    },
    alternates: { canonical: `https://deadpixeldesign.com/blog/${slug}` },
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
