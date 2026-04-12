import type { Metadata } from "next";
import HomeContent from "./HomeContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Dead Pixel Design — Web Design & Audio Engineering | Maine",
  description:
    "Web design, audio engineering, mixing, mastering, MIDI programming, and AI automation from Maine. Custom websites for small businesses and musicians. Free consultation.",
  openGraph: {
    title: "Dead Pixel Design — We don't optimize. We haunt.",
    description:
      "Web design, audio engineering, mixing, mastering, and creative technology from Maine. Custom sites, real tools, no templates.",
    url: "https://deadpixeldesign.com",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Dead Pixel Design — Web Design & Audio Engineering from Maine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dead Pixel Design — We don't optimize. We haunt.",
    description:
      "Web design, audio engineering, and creative technology from Maine. Custom sites, real tools, no templates.",
    images: ["/images/og-image.webp"],
  },
  alternates: {
    canonical: "https://deadpixeldesign.com",
  },
};

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://deadpixeldesign.com" },
        ]}
      />
      <HomeContent />
    </>
  );
}
