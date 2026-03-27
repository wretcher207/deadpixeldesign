import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dead Pixel Design",
  description:
    "We don't optimize. We haunt. — Web design, audio production tools, and AI automation from the static between signals.",
  openGraph: {
    title: "Dead Pixel Design",
    description: "We don't optimize. We haunt.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased">
        {/* Atmospheric layers */}
        <div className="grain-overlay" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}
