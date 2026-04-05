"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {/* Top gradient — subtle cosmic depth */}
      <div
        className="w-full h-32"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-bg-elevated), var(--color-bg-void))",
        }}
      />

      {/* Page Content */}
      <div
        className="relative z-10"
        style={{
          background: "var(--color-bg-void)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="content-container">{children}</div>
      </div>
    </motion.div>
  );
}
