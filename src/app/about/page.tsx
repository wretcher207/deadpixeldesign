import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About — The Studio Behind the Static",
  description:
    "Dead Pixel Design is a one-person web design and audio engineering studio based in Maine. Founded by David — musician, engineer, and builder of tools that solve real problems.",
  openGraph: {
    title: "About | Dead Pixel Design",
    description: "Who's behind the static — and why it matters.",
    images: [{ url: "/images/og-image.webp" }],
  },
  alternates: {
    canonical: "https://deadpixeldesign.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://deadpixeldesign.com" },
          { name: "About", url: "https://deadpixeldesign.com/about" },
        ]}
      />
      <AboutContent />
    </>
  );
}
