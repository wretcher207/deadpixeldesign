import type { Variants } from "framer-motion";

const smooth = [0.25, 0.1, 0.25, 1] as const;
const snappy = [0.4, 0, 0.2, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: smooth },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: smooth },
  },
};

export const fadeInSlow: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: smooth },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    filter: "brightness(3) contrast(0.3) blur(2px)",
  },
  enter: {
    opacity: 1,
    filter: "brightness(1) contrast(1) blur(0px)",
    transition: { duration: 0.5, ease: snappy, delay: 0.1 },
  },
  exit: {
    opacity: 0,
    filter: "brightness(4) contrast(0) blur(4px)",
    transition: { duration: 0.25, ease: snappy },
  },
};

export const staticBurst: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1, 0.85, 1, 0.9, 0],
    transition: { duration: 0.5, times: [0, 0.05, 0.2, 0.4, 0.7, 1] },
  },
};

export const cardHover = {
  rest: {
    borderColor: "rgba(255,255,255,0.04)",
    transition: { duration: 0.3 },
  },
  hover: {
    borderColor: "rgba(255,255,255,0.1)",
    transition: { duration: 0.3 },
  },
};

export const heroTitle: Variants = {
  hidden: {
    opacity: 0,
    letterSpacing: "0.3em",
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    letterSpacing: "-0.02em",
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: smooth },
  },
};

export const heroTagline: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 0.7,
    y: 0,
    transition: { duration: 1, ease: smooth, delay: 1.2 },
  },
};

export const viewportOnce = {
  once: true,
  margin: "-80px" as `${number}px`,
};
