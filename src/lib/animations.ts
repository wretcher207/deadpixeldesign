import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const scaleHover = {
  scale: 1.02,
  transition: { duration: 0.3, ease: "easeOut" as const },
};

export const glowHover = {
  boxShadow: "0 0 30px rgba(196, 154, 42, 0.15), 0 0 60px rgba(196, 154, 42, 0.05)",
  borderColor: "rgba(196, 154, 42, 0.3)",
  transition: { duration: 0.3, ease: "easeOut" as const },
};

// Hero-specific sequence
export const heroTitle: Variants = {
  hidden: {
    opacity: 0,
    letterSpacing: "0.5em",
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    letterSpacing: "0.3em",
    filter: "blur(0px)",
    transition: {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const heroTagline: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 0.6,
    y: 0,
    transition: {
      duration: 1.2,
      delay: 1.4,
      ease: "easeOut",
    },
  },
};

// Line-by-line manifesto reveal
export const manifestoLine: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
