"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import StaticCanvas from "@/components/tv/StaticCanvas";

interface ChannelTransitionProps {
  /** Set to true to trigger the static burst */
  active?: boolean;
  /** Called when the animation finishes */
  onComplete?: () => void;
}

/**
 * Full-screen static burst overlay for channel/page transitions.
 *
 * Can be triggered two ways:
 * 1. Explicitly via the `active` prop (used by the home page knobs)
 * 2. Automatically on route change (via usePathname)
 */
export default function ChannelTransition({
  active = false,
  onComplete,
}: ChannelTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const prevPathRef = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Trigger from explicit `active` prop
  useEffect(() => {
    if (active) {
      setIsVisible(true);

      // Trigger audio burst
      const burst = (window as unknown as Record<string, () => void>)
        .__staticBurst;
      if (typeof burst === "function") burst();

      timerRef.current = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 450);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [active, onComplete]);

  // Trigger on route change (for nav-based navigation)
  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      prevPathRef.current = pathname;
      setIsVisible(true);

      const burst = (window as unknown as Record<string, () => void>)
        .__staticBurst;
      if (typeof burst === "function") burst();

      timerRef.current = setTimeout(() => setIsVisible(false), 450);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] static-burst"
      style={{ pointerEvents: "none" }}
    >
      <StaticCanvas intensity={0.95} pixelSize={2} speed={2} active={true} />
    </div>
  );
}
