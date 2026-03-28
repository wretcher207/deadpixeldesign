export interface Channel {
  id: number;
  name: string;
  route: string;
  label: string;
  bgImage: string;
  bgImageMobile: string;
  description: string;
}

export const CHANNELS: Channel[] = [
  {
    id: 0,
    name: "home",
    route: "/",
    label: "SIGNAL",
    bgImage: "/images/tv-main.webp",
    bgImageMobile: "/images/tv-main-mobile.webp",
    description: "Dead Pixel Design — We don't optimize. We haunt.",
  },
  {
    id: 1,
    name: "work",
    route: "/work",
    label: "BROADCAST",
    bgImage: "/images/tv-shadow-2.webp",
    bgImageMobile: "/images/tv-shadow-2-mobile.webp",
    description: "Our work — sites, tools, and sounds that stay with you.",
  },
  {
    id: 2,
    name: "services",
    route: "/services",
    label: "FREQUENCY",
    bgImage: "/images/tv-shadow-1.webp",
    bgImageMobile: "/images/tv-shadow-1-mobile.webp",
    description: "What we build — web, audio, automation.",
  },
  {
    id: 3,
    name: "about",
    route: "/about",
    label: "ORIGIN",
    bgImage: "/images/tv-eyes-2.webp",
    bgImageMobile: "/images/tv-eyes-2-mobile.webp",
    description: "Who's behind the static.",
  },
  {
    id: 4,
    name: "contact",
    route: "/contact",
    label: "TRANSMIT",
    bgImage: "/images/tv-eyes-1.webp",
    bgImageMobile: "/images/tv-eyes-1-mobile.webp",
    description: "Lock in. Let's talk.",
  },
];

export function getChannelByRoute(route: string): Channel | undefined {
  return CHANNELS.find((c) => c.route === route);
}

export function getChannelByIndex(index: number): Channel {
  const clamped = Math.max(0, Math.min(index, CHANNELS.length - 1));
  return CHANNELS[clamped];
}
