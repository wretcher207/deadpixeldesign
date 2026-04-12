import type { Metadata } from "next";
import WorkContent from "./WorkContent";
import { BreadcrumbJsonLd, PortfolioItemListJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Our Work — Web Design, Audio Tools & Creative Projects",
  description:
    "Portfolio of Dead Pixel Design: custom websites for small businesses, audio production tools for musicians, and creative technology projects. Based in Maine, serving clients nationally.",
  keywords: [
    "web design portfolio Maine",
    "audio engineering portfolio",
    "custom web applications",
    "REAPER plugins",
    "small business websites Maine",
  ],
  openGraph: {
    title: "Our Work | Dead Pixel Design",
    description:
      "Custom websites, audio tools, and creative tech — see what we've built.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Dead Pixel Design — Portfolio of Web Design and Audio Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | Dead Pixel Design",
    description:
      "Custom websites, audio tools, and creative tech — see what we've built.",
    images: ["/images/og-image.webp"],
  },
  alternates: {
    canonical: "https://deadpixeldesign.com/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <PortfolioItemListJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://deadpixeldesign.com" },
          { name: "Work", url: "https://deadpixeldesign.com/work" },
        ]}
      />
      <WorkContent />
    </>
  );
}
