export interface Channel {
  id: number;
  name: string;
  route: string;
  label: string;
  description: string;
}

export const CHANNELS: Channel[] = [
  {
    id: 0,
    name: "home",
    route: "/",
    label: "HOME",
    description: "Dead Pixel Design — Give me space.",
  },
  {
    id: 1,
    name: "work",
    route: "/work",
    label: "WORK",
    description: "Our work — sites, tools, and sounds that stay with you.",
  },
  {
    id: 2,
    name: "services",
    route: "/services",
    label: "SERVICES",
    description: "What we build — web, audio, automation.",
  },
  {
    id: 3,
    name: "about",
    route: "/about",
    label: "ABOUT",
    description: "Who's behind the signal.",
  },
  {
    id: 4,
    name: "contact",
    route: "/contact",
    label: "CONTACT",
    description: "Let's talk.",
  },
];

export function getChannelByRoute(route: string): Channel | undefined {
  return CHANNELS.find((c) => c.route === route);
}
