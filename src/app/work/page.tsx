import type { Metadata } from "next";
import WorkContent from "./WorkContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Our Work — Web Design, Audio Tools & Creative Projects",
  description:
    "Portfolio of Dead Pixel Design: custom websites for small businesses, audio production tools for musicians, and creative technology projects. Based in Maine, serving clients nationally.",
  openGraph: {
    title: "Our Work | Dead Pixel Design",
    description:
      "Custom websites, audio tools, and creative tech — see what we've built.",
    images: [{ url: "/images/og-image.webp" }],
  },
  alternates: {
    canonical: "https://deadpixeldesign.com/work",
  },
};

export default function WorkPage() {
  return (
    <>
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
