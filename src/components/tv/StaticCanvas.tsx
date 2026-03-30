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
 * Uses a persistent offscreen buffer for performance.
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
  const bufferRef = useRef<HTMLCanvasElement | null>(null);
  const bufferCtxRef = useRef<CanvasRenderingContext2D | null>(null);

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

      // Reuse the buffer canvas instead of creating a new one every frame
      if (
        !bufferRef.current ||
        bufferRef.current.width !== bufW ||
        bufferRef.current.height !== bufH
      ) {
        bufferRef.current = document.createElement("canvas");
        bufferRef.current.width = bufW;
        bufferRef.current.height = bufH;
        bufferCtxRef.current = bufferRef.current.getContext("2d");
      }

      const tempCtx = bufferCtxRef.current;
      if (!tempCtx) return;

      const imageData = tempCtx.createImageData(bufW, bufH);
      const data = imageData.data;

      // Time for animated distortion bands
      timeRef.current += 16 * speed;
      const t = timeRef.current;

      for (let y = 0; y < bufH; y++) {
        const bandOffset = Math.sin((y * 0.3 + t * 0.002) * 0.5) * 0.15;
        const scanBright =
          Math.sin((y * 2.5 + t * 0.01) * 0.3) > 0.97 ? 0.3 : 0;

        for (let x = 0; x < bufW; x++) {
          const i = (y * bufW + x) * 4;

          let val = Math.random() * 255;
          val = val * (1 + bandOffset) + scanBright * 255;
          val = Math.min(255, Math.max(0, val));

          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = 255;
        }
      }

      tempCtx.putImageData(imageData, 0, 0);

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(bufferRef.current!, 0, 0, bufW, bufH, 0, 0, w, h);

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
