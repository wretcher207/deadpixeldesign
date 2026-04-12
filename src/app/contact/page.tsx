import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import { BreadcrumbJsonLd, ContactPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact — Get a Free Consultation",
  description:
    "Ready to talk? Call or message Dead Pixel Design for a free consultation on web design, mixing and mastering, MIDI programming, or AI automation. Based in Maine, working with clients nationwide.",
  keywords: [
    "contact Dead Pixel Design",
    "hire web designer Maine",
    "book audio engineer",
    "free web design consultation Maine",
  ],
  openGraph: {
    title: "Contact | Dead Pixel Design",
    description:
      "Lock in. Call or message for a free consultation.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Dead Pixel Design — Contact Us for a Free Consultation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Dead Pixel Design",
    description:
      "Call or message for a free consultation on web design or audio engineering.",
    images: ["/images/og-image.webp"],
  },
  alternates: {
    canonical: "https://deadpixeldesign.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://deadpixeldesign.com" },
          { name: "Contact", url: "https://deadpixeldesign.com/contact" },
        ]}
      />
      <ContactPageJsonLd />
      <ContactContent />
    </>
  );
}
