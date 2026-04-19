import { useEffect, useRef } from "react";

/**
 * Lightweight flowing “liquid” field — 2D metaball-ish blobs without WebGL weight.
 * Swap for a shader later if you want sharper caustics.
 */
export function LiquidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const blobs = [
      { x: 0.2, y: 0.35, r: 0.22, vx: 0.11, vy: 0.07, hue: 265 },
      { x: 0.75, y: 0.55, r: 0.28, vx: -0.09, vy: 0.05, hue: 280 },
      { x: 0.55, y: 0.2, r: 0.18, vx: 0.06, vy: 0.1, hue: 250 },
      { x: 0.35, y: 0.75, r: 0.2, vx: 0.05, vy: -0.08, hue: 300 },
    ];

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, w, h);

      const t = performance.now() / 1000;
      for (const b of blobs) {
        b.x += b.vx * 0.0022;
        b.y += b.vy * 0.0022;
        b.x += Math.sin(t * 0.35 + b.hue) * 0.0004;
        b.y += Math.cos(t * 0.28 + b.hue) * 0.0004;
        if (b.x < -0.1 || b.x > 1.1) b.vx *= -1;
        if (b.y < -0.1 || b.y > 1.1) b.vy *= -1;
      }

      for (const b of blobs) {
        const cx = b.x * w;
        const cy = b.y * h;
        const rad = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `hsla(${b.hue}, 85%, 55%, 0.35)`);
        g.addColorStop(0.45, `hsla(${b.hue + 20}, 70%, 45%, 0.12)`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(paint);
    };

    raf = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        filter: "saturate(1.1) contrast(1.05)",
      }}
    />
  );
}
