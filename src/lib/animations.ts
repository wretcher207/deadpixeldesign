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
    filter: "blur(6px)",
    y: 10,
  },
  enter: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: smooth },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    y: -5,
    transition: { duration: 0.3, ease: snappy },
  },
};

export const cosmicHero: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: smooth, delay: 0.3 },
  },
};

export const starReveal: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: smooth },
  },
};

export const constellationStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 1.0,
    },
  },
};

export const cardHover = {
  rest: {
    borderColor: "rgba(212,168,83,0.04)",
    transition: { duration: 0.3 },
  },
  hover: {
    borderColor: "rgba(212,168,83,0.2)",
    transition: { duration: 0.3 },
  },
};

export const viewportOnce = {
  once: true,
  margin: "-80px" as `${number}px`,
};
