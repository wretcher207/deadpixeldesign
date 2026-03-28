import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import { BreadcrumbJsonLd, ContactPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact — Get a Free Consultation",
  description:
    "Ready to talk? Call or message Dead Pixel Design for a free consultation on web design, mixing and mastering, MIDI programming, or AI automation. Based in Maine, working with clients nationwide.",
  openGraph: {
    title: "Contact | Dead Pixel Design",
    description:
      "Lock in. Call or message for a free consultation.",
    images: [{ url: "/images/og-image.webp" }],
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
