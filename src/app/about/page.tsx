import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import { BreadcrumbJsonLd, PersonJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About — The Studio Behind the Static",
  description:
    "Dead Pixel Design is a one-person web design and audio engineering studio based in Maine. Founded by David — musician, engineer, and builder of tools that solve real problems.",
  keywords: [
    "Maine web designer",
    "freelance audio engineer Maine",
    "Dead Pixel Design founder",
    "David Maine web developer",
    "one-person web studio",
    "independent audio engineer",
  ],
  openGraph: {
    title: "About | Dead Pixel Design",
    description: "Who's behind the static — and why it matters.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Dead Pixel Design — The Studio Behind the Static",
      },
    ],
  },
  alternates: {
    canonical: "https://deadpixeldesign.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PersonJsonLd />
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
