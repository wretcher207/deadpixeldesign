import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";
import { BreadcrumbJsonLd, ServicesPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Services & Pricing — Web Design and Audio Engineering | Dead Pixel Design",
  description:
    "Web design packages starting at $800 and audio engineering services starting at $30. Dead Pixel Design is based in Maine and works with clients remotely.",
  keywords: [
    "web design pricing Maine",
    "audio engineering rates",
    "mixing mastering price",
    "website packages small business",
    "MIDI programming service",
    "affordable web design Maine",
  ],
  openGraph: {
    title: "Services & Pricing | Dead Pixel Design",
    description:
      "Web design and audio engineering out of Maine. Clear pricing, no surprises.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Dead Pixel Design — Services & Pricing",
      },
    ],
  },
  alternates: {
    canonical: "https://deadpixeldesign.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesPageJsonLd />
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
