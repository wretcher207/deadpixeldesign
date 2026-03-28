"use client";

import { useRef, useEffect, useCallback } from "react";

interface StaticCanvasProps {
  /** Opacity of the static noise (0-1) */
  intensity?: number;
  /** Pixel size — larger = chunkier, more CRT-like */
  pixelSize?: number;
  /** Speed multiplier */
  speed?: number;
  /** Extra CSS classes */
  className?: string;
  /** Whether the static is actively animating */
  active?: boolean;
}

/**
 * Animated CRT static noise rendered on a canvas.
 *
 * How it works:
 * - Creates a small offscreen buffer (for performance)
 * - Fills it with random grayscale pixels each frame
 * - Draws it scaled up to the canvas, creating the chunky CRT static look
 * - Adds horizontal distortion bands that drift down the screen
 */
export default function StaticCanvas({
  intensity = 0.5,
  pixelSize = 3,
  speed = 1,
  className = "",
  active = true,
}: StaticCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const draw = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Match canvas internal size to display size
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      // Small buffer for performance — gets scaled up for chunky pixels
      const bufW = Math.ceil(w / pixelSize);
      const bufH = Math.ceil(h / pixelSize);

      const imageData = ctx.createImageData(bufW, bufH);
      const data = imageData.data;

      // Time for animated distortion bands
      timeRef.current += 16 * speed;
      const t = timeRef.current;

      for (let y = 0; y < bufH; y++) {
        // Horizontal distortion bands that move down the screen
        const bandOffset = Math.sin((y * 0.3 + t * 0.002) * 0.5) * 0.15;
        // Occasional bright scan line
        const scanBright =
          Math.sin((y * 2.5 + t * 0.01) * 0.3) > 0.97 ? 0.3 : 0;

        for (let x = 0; x < bufW; x++) {
          const i = (y * bufW + x) * 4;

          // Base static noise
          let val = Math.random() * 255;

          // Apply band distortion
          val = val * (1 + bandOffset) + scanBright * 255;

          // Clamp
          val = Math.min(255, Math.max(0, val));

          data[i] = val;     // R
          data[i + 1] = val; // G
          data[i + 2] = val; // B
          data[i + 3] = 255; // A
        }
      }

      // Draw the small buffer, then scale it up
      // Create a temporary canvas for the small buffer
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = bufW;
      tempCanvas.height = bufH;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.putImageData(imageData, 0, 0);

        // Disable smoothing for crisp pixel scaling
        ctx.imageSmoothingEnabled = false;

        // Clear and draw scaled
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(tempCanvas, 0, 0, bufW, bufH, 0, 0, w, h);
      }

      if (active) {
        frameRef.current = requestAnimationFrame(draw);
      }
    },
    [pixelSize, speed, active]
  );

  useEffect(() => {
    if (active) {
      frameRef.current = requestAnimationFrame(draw);
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [draw, active]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        opacity: intensity,
        display: "block",
      }}
    />
  );
}
