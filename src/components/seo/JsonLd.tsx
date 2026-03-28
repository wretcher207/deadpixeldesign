/**
 * JSON-LD structured data components for SEO.
 *
 * These render invisible <script> tags that tell Google
 * what the business is, where it's located, and what it does.
 * Think of it as a machine-readable business card.
 */

interface LocalBusinessProps {
  name?: string;
  url?: string;
  email?: string;
  phone?: string;
  description?: string;
  address?: {
    state: string;
    country: string;
  };
  services?: string[];
}

export function LocalBusinessJsonLd({
  name = "Dead Pixel Design",
  url = "https://deadpixeldesign.com",
  email = "david@deadpixeldesign.com",
  phone = "+12076948691",
  description = "Web design, audio engineering, mixing, mastering, MIDI programming, and AI automation services based in Maine. We build sites, tools, and sounds that stay with you.",
  address = { state: "ME", country: "US" },
  services = [
    "Web Design",
    "Web Development",
    "Audio Engineering",
    "Mixing and Mastering",
    "MIDI Programming",
    "AI Automation",
  ],
}: LocalBusinessProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    url,
    email,
    telephone: phone,
    description,
    address: {
      "@type": "PostalAddress",
      addressRegion: address.state,
      addressCountry: address.country,
    },
    areaServed: [
      { "@type": "State", name: "Maine" },
      { "@type": "Country", name: "United States" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((service, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
        position: i + 1,
      })),
    },
    sameAs: [
      "https://github.com/wretcher207",
      "https://www.instagram.com/wretcher207/",
      "https://www.youtube.com/@wretcher207",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebSiteJsonLdProps {
  name?: string;
  url?: string;
}

export function WebSiteJsonLd({
  name = "Dead Pixel Design",
  url = "https://deadpixeldesign.com",
}: WebSiteJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description:
      "Web design, audio production, and creative technology from Maine.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dead Pixel Design",
    url: "https://deadpixeldesign.com",
    logo: "https://deadpixeldesign.com/images/favicon-512.png",
    email: "david@deadpixeldesign.com",
    telephone: "+12076948691",
    description:
      "Web design, audio engineering, and creative technology studio based in Maine.",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: "ME",
        addressCountry: "US",
      },
    },
    sameAs: [
      "https://github.com/wretcher207",
      "https://www.instagram.com/wretcher207/",
      "https://www.youtube.com/@wretcher207",
      "https://wretcher.bandcamp.com/music",
      "https://www.facebook.com/profile.php?id=61578454917550",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+12076948691",
      contactType: "customer service",
      email: "david@deadpixeldesign.com",
      areaServed: "US",
      availableLanguage: "English",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ContactPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Dead Pixel Design",
    url: "https://deadpixeldesign.com/contact",
    mainEntity: {
      "@type": "ProfessionalService",
      name: "Dead Pixel Design",
      telephone: "+12076948691",
      email: "david@deadpixeldesign.com",
      address: {
        "@type": "PostalAddress",
        addressRegion: "ME",
        addressCountry: "US",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+12076948691",
          contactType: "sales",
          availableLanguage: "English",
        },
        {
          "@type": "ContactPoint",
          email: "david@deadpixeldesign.com",
          contactType: "customer service",
          availableLanguage: "English",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
