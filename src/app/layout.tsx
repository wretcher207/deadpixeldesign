import type { Metadata } from "next";
import { Cormorant, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ConstellationNav from "@/components/layout/ConstellationNav";
import Footer from "@/components/layout/Footer";
import {
  LocalBusinessJsonLd,
  WebSiteJsonLd,
  OrganizationJsonLd,
} from "@/components/seo/JsonLd";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
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
    title: "Dead Pixel Design — Web Design, Audio Engineering & Creative Technology",
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
      className={`${cormorant.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        <OrganizationJsonLd />
      </head>
      <body>
        <ConstellationNav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
