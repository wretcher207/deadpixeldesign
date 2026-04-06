import type { Variants } from "framer-motion";

/* ── Easing Curves ──
   The signature motion system. Every animation on the site
   references one of these four curves for consistency.
*/
export const cinematic = [0.16, 1, 0.3, 1] as const;   // dramatic ease-out — hero reveals, page enters
export const smooth = [0.25, 0.1, 0.25, 1] as const;    // general content — fades, staggers
export const snappy = [0.4, 0, 0.2, 1] as const;        // exits, micro-interactions, hovers
export const drift = [0.37, 0, 0.63, 1] as const;       // slow parallax-like motions

/* ── Core Variants ── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smooth },
  },
};

export const fadeUpSubtle: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smooth },
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.0, ease: cinematic },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: cinematic },
  },
};

/* ── Stagger Variants ── */

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

export const staggerDeep: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/* ── Page Transitions ── */

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cinematic },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: { duration: 0.25, ease: snappy },
  },
};

export const cosmicHero: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: cinematic, delay: 0.2 },
  },
};

/* ── Navigation ── */

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

/* ── Interactive ── */

export const cardHover = {
  rest: {
    borderColor: "rgba(212,168,83,0.04)",
    y: 0,
    transition: { duration: 0.3, ease: snappy },
  },
  hover: {
    borderColor: "rgba(212,168,83,0.2)",
    y: -2,
    transition: { duration: 0.3, ease: snappy },
  },
};

/* ── Viewport Config ── */

export const viewportOnce = {
  once: true,
  margin: "-80px" as `${number}px`,
};
