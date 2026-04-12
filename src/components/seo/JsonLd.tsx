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
    priceRange: "$$",
    image: "https://deadpixeldesign.com/images/og-image.webp",
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
    alternateName: "Dead Pixel Design",
    url,
    description:
      "Web design, audio production, and creative technology from Maine.",
    publisher: {
      "@type": "Organization",
      name: "Dead Pixel Design",
    },
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
    foundingDate: "2025",
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

export function ServicesPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dead Pixel Design Services",
    provider: {
      "@type": "ProfessionalService",
      name: "Dead Pixel Design",
      url: "https://deadpixeldesign.com",
    },
    areaServed: [
      { "@type": "State", name: "Maine" },
      { "@type": "Country", name: "United States" },
    ],
    hasOfferCatalog: [
      {
        "@type": "OfferCatalog",
        name: "Web Design",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Starter Web Design Package",
            description: "3 to 5 pages, mobile friendly, basic SEO setup, contact form, Google Business Profile setup, 1 revision round. Good for solo tradespeople, small local businesses, first time website owners.",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: 500,
              maxPrice: 800,
              priceCurrency: "USD",
            },
          },
          {
            "@type": "Offer",
            name: "Standard Web Design Package",
            description: "6 to 8 pages, mobile friendly, full SEO setup, copywriting help, photo optimization, Google Analytics, 2 revision rounds. Good for dental practices, contractors, auto repair, tourism businesses.",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: 1000,
              maxPrice: 1500,
              priceCurrency: "USD",
            },
          },
          {
            "@type": "Offer",
            name: "Premium Web Design Package",
            description: "Full custom build, content strategy, SEO setup and implementation, 60 days post-launch support, unlimited revisions. For established businesses ready for a new site.",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: 1500,
              maxPrice: 3000,
              priceCurrency: "USD",
            },
          },
          {
            "@type": "Offer",
            name: "Monthly Website Maintenance",
            description: "Security updates, minor edits, hosting management.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              minPrice: 100,
              maxPrice: 200,
              priceCurrency: "USD",
              unitCode: "MON",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Audio Engineering",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Single Song Mix",
            description: "Up to 32 tracks, WAV and MP3 delivery, 5 to 7 day turnaround, 1 revision included.",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 50,
              priceCurrency: "USD",
            },
          },
          {
            "@type": "Offer",
            name: "Single Song Master",
            description: "Leveled, clear, and ready to upload anywhere. 3 to 5 day turnaround, 1 revision included.",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 30,
              priceCurrency: "USD",
            },
          },
          {
            "@type": "Offer",
            name: "Mix and Master Bundle",
            description: "Both mixing and mastering on one song, 5 to 7 day turnaround, 1 revision each.",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 70,
              priceCurrency: "USD",
            },
          },
          {
            "@type": "Offer",
            name: "EP Package",
            description: "3 to 5 songs, full mix and master on every track, unlimited revisions, about 2 weeks turnaround.",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 250,
              priceCurrency: "USD",
            },
          },
          {
            "@type": "Offer",
            name: "Album Package",
            description: "6 to 12 songs, full mix and master on every track, unlimited revisions, about 3 to 4 weeks turnaround.",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 450,
              priceCurrency: "USD",
            },
          },
          {
            "@type": "Offer",
            name: "Podcast Editing",
            description: "Cleanup, leveling, noise reduction, intro and outro assembly, 48 hour turnaround, 1 revision included.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: 25,
              priceCurrency: "USD",
              unitCode: "MON",
              unitText: "per episode",
            },
          },
          {
            "@type": "Offer",
            name: "Remote Recording Consultation",
            description: "1 hour video call, mic placement, room setup, interface settings, notes sent after the call.",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 40,
              priceCurrency: "USD",
            },
          },
          {
            "@type": "Offer",
            name: "Home Studio Setup and Mix",
            description: "Remote consultation plus a full mix of one song. Good starting point if you are new to recording at home.",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 120,
              priceCurrency: "USD",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "David",
    jobTitle: "Web Designer & Audio Engineer",
    url: "https://deadpixeldesign.com/about",
    worksFor: {
      "@type": "ProfessionalService",
      name: "Dead Pixel Design",
      url: "https://deadpixeldesign.com",
    },
    sameAs: [
      "https://github.com/wretcher207",
      "https://www.instagram.com/wretcher207/",
      "https://www.youtube.com/@wretcher207",
      "https://wretcher.bandcamp.com/music",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author = "David",
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
      url: "https://deadpixeldesign.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Dead Pixel Design",
      url: "https://deadpixeldesign.com",
      logo: {
        "@type": "ImageObject",
        url: "https://deadpixeldesign.com/images/favicon-512.png",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PortfolioItemListJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dead Pixel Design Portfolio",
    description: "Websites, tools, and sounds built by Dead Pixel Design.",
    url: "https://deadpixeldesign.com/work",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "SoftwareApplication",
          name: "Claude Visualizer",
          description: "Real-time ambient visualizer for Claude Code. Tycho-inspired aesthetic with generative visuals that respond to AI activity.",
          url: "https://github.com/wretcher207/claude-visualizer",
          applicationCategory: "DeveloperApplication",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "WebApplication",
          name: "Aether",
          description: "A full-stack cannabis strain encyclopedia powered by AI. Users search strains, get detailed profiles, and explore recommendations.",
          url: "https://loveaether.com/",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "SoftwareApplication",
          name: "Dehumanizer Pro",
          description: "Open-source REAPER plugin that humanizes programmed drums. Adds timing drift, velocity variation, and ghost notes.",
          url: "https://github.com/wretcher207/dead-pixel-design",
          applicationCategory: "MultimediaApplication",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "WebApplication",
          name: "The Rhythm Apparatus",
          description: "Browser-based drum pattern generator built for metal. Over 43 grooves, MIDI export, and a tactile interface.",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "MusicGroup",
          name: "Wretcher",
          description: "Solo extreme metal project — 7 EPs written, recorded, engineered, mixed, mastered, and MIDI programmed in-house.",
          url: "https://wretcher.bandcamp.com/music",
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "WebSite",
          name: "Freedom Painting",
          description: "Ultra-fast static site for a painting contractor. Cold pitch that landed the client.",
          url: "https://freedompainting.us/",
        },
      },
      {
        "@type": "ListItem",
        position: 7,
        item: {
          "@type": "WebSite",
          name: "Restaurant Sample",
          description: "Sample restaurant website demonstrating clean layout, appetizing design, and mobile-friendly structure.",
          url: "https://restaurant-sample-01.netlify.app/home_page/code.html",
        },
      },
      {
        "@type": "ListItem",
        position: 8,
        item: {
          "@type": "WebSite",
          name: "Editorial Service Template",
          description: "A refined editorial-style service website built around elegant typography, spacious composition, and a premium content-first presentation.",
          url: "https://editorial-service-template.netlify.app",
        },
      },
      {
        "@type": "ListItem",
        position: 9,
        item: {
          "@type": "WebSite",
          name: "Cozy Cafe Template",
          description: "A warm, character-driven cafe website built to feel inviting, tactile, and easy to browse. Designed as a sample for food and hospitality clients.",
          url: "https://cozy-cafe-template.netlify.app",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
