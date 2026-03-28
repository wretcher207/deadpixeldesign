import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Services — Web Design, Mixing & Mastering, MIDI Programming, AI Automation",
  description:
    "Dead Pixel Design offers web design and development, audio mixing and mastering, MIDI drum programming, audio production tools, and AI automation workflows. Based in Maine, working with clients nationally.",
  openGraph: {
    title: "Services | Dead Pixel Design",
    description:
      "Web design, mixing & mastering, MIDI programming, and more.",
    images: [{ url: "/images/og-image.webp" }],
  },
  alternates: {
    canonical: "https://deadpixeldesign.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://deadpixeldesign.com" },
          { name: "Services", url: "https://deadpixeldesign.com/services" },
        ]}
      />
      <ServicesContent />
    </>
  );
}
