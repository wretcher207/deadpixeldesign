"use client";

interface ScanLinesProps {
  /** Opacity of the scan lines (0-1) */
  opacity?: number;
  /** Gap between lines in pixels */
  gap?: number;
  /** Extra CSS classes */
  className?: string;
}

/**
 * CRT scan line overlay.
 * Renders thin horizontal lines across the element to simulate
 * the look of an old CRT monitor/TV.
 */
export default function ScanLines({
  opacity = 0.08,
  gap = 4,
  className = "",
}: ScanLinesProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 ${className}`}
      style={{
        opacity,
        background: `repeating-linear-gradient(
          to bottom,
          transparent 0px,
          transparent ${gap - 1}px,
          rgba(0, 0, 0, 0.4) ${gap - 1}px,
          rgba(0, 0, 0, 0.4) ${gap}px
        )`,
        mixBlendMode: "multiply",
      }}
      aria-hidden="true"
    />
  );
}
