import type { Metadata } from "next";
import { Cormorant, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ConstellationNav from "@/components/layout/ConstellationNav";
import Footer from "@/components/layout/Footer";
import ChatProvider from "@/components/chat/ChatProvider";
import ChatWidget from "@/components/chat/ChatWidget";
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
    default: "Dead Pixel Design — Web Design & Audio Engineering | Maine",
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
    title: "Custom Web Design, Audio Engineering, and AI Systems — Dead Pixel Design",
    description:
      "Custom web design, audio engineering, and AI systems from Maine. We build things that stay with you.",
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
    title: "Custom Web Design, Audio Engineering, and AI Systems — Dead Pixel Design",
    description:
      "Custom web design, audio engineering, and AI systems from Maine.",
    images: ["/images/og-image.webp"],
  },
  other: {
    "geo.region": "US-ME",
    "geo.placename": "Houlton, Maine",
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
        <ChatProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:text-sm"
            style={{
              background: "var(--color-bg-primary)",
              color: "var(--color-accent-gold)",
              border: "1px solid var(--color-accent-gold)",
            }}
          >
            Skip to content
          </a>
          <ConstellationNav />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
          <ChatWidget />
        </ChatProvider>
        <Analytics />
      </body>
    </html>
  );
}
