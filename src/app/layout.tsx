import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import AmbientStatic from "@/components/audio/AmbientStatic";
import {
  LocalBusinessJsonLd,
  WebSiteJsonLd,
  OrganizationJsonLd,
} from "@/components/seo/JsonLd";

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-body",
  weight: "400",
  display: "swap",
});

const cryptScript = localFont({
  src: [
    { path: "../fonts/CryptScript-AllCaps.ttf", weight: "700" },
    { path: "../fonts/CryptScript-Regular.ttf", weight: "400" },
  ],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deadpixeldesign.com"),
  title: {
    default: "Dead Pixel Design — Web Design, Audio Engineering & Creative Technology | Maine",
    template: "%s | Dead Pixel Design",
  },
  description:
    "Web design, audio engineering, mixing, mastering, MIDI programming, and AI automation services based in Maine. We build sites, tools, and sounds that stay with you.",
  keywords: [
    "web design Maine",
    "web developer Maine",
    "audio engineering Maine",
    "mixing and mastering",
    "MIDI programming",
    "web design for musicians",
    "small business web design",
    "freelance web designer",
    "AI automation",
    "audio production tools",
    "Dead Pixel Design",
  ],
  applicationName: "Dead Pixel Design",
  authors: [{ name: "Dead Pixel Design" }],
  creator: "Dead Pixel Design",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deadpixeldesign.com",
    siteName: "Dead Pixel Design",
    title: "Dead Pixel Design — We don't optimize. We haunt.",
    description:
      "Web design, audio engineering, mixing, mastering, and creative technology from Maine. We build things that stay with you.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Dead Pixel Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dead Pixel Design",
    description:
      "Web design, audio engineering, and creative technology from Maine.",
    images: ["/images/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${vt323.variable} ${cryptScript.variable}`}
    >
      <head>
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        <OrganizationJsonLd />
      </head>
      <body className="scanlines grain-overlay vignette">
        <Navigation />
        <AmbientStatic volume={0.06} />
        <main className="min-h-screen pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
