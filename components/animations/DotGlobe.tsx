"use client";

import { useEffect, useRef } from "react";
import { LAND_ROWS } from "@/data/land-mask";
import { cn } from "@/lib/utils";

const RAD = Math.PI / 180;
// Singapore, marked on the globe and kept in view as it sways.
const HOME = { lat: 1.35, lon: 103.82 };
const TILT = 12 * RAD;
const SWAY = 38 * RAD;

type Dot = { sin: number; cos: number; lon: number };

/** One dot for each patch of land, spaced evenly over the sphere rather than bunching at the poles. */
function landDots(): Dot[] {
  const dots: Dot[] = [];
  LAND_ROWS.forEach((row, r) => {
    const lat = (89 - 2 * r) * RAD;
    const n = Math.max(1, Math.round(180 * Math.cos(lat)));
    for (let i = 0; i < n; i++) {
      const lon = -180 + ((i + 0.5) * 360) / n;
      const col = Math.min(179, Math.floor((lon + 180) / 2));
      if ((parseInt(row[col >> 2], 16) >> (3 - (col & 3))) & 1) dots.push({ sin: Math.sin(lat), cos: Math.cos(lat), lon: lon * RAD });
    }
  });
  return dots;
}

/** A dotted globe drawn on a canvas: land as dots over a fine grid, swaying gently around Singapore. */
export function DotGlobe({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dots = landDots();
    const accent = getComputedStyle(canvas).getPropertyValue("--color-flame-300").trim() || "#ff9a6b";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let size = 0;
    let frame = 0;
    let visible = true;

    const draw = (t: number) => {
      const r = size / 2 - 2;
      if (r <= 0) return;
      const c = size / 2;
      const lon0 = HOME.lon * RAD + SWAY * Math.sin(t * 0.12);
      const sin0 = Math.sin(TILT);
      const cos0 = Math.cos(TILT);
      // Orthographic projection: returns the depth, which is positive on the near side.
      const project = (sin: number, cos: number, lon: number, out: { x: number; y: number }) => {
        const d = lon - lon0;
        const cd = Math.cos(d);
        out.x = c + r * cos * Math.sin(d);
        out.y = c - r * (cos0 * sin - sin0 * cos * cd);
        return sin0 * sin + cos0 * cos * cd;
      };
      const p = { x: 0, y: 0 };

      ctx.clearRect(0, 0, size, size);

      const body = ctx.createRadialGradient(c - r * 0.35, c - r * 0.4, r * 0.1, c, c, r);
      body.addColorStop(0, "#241763");
      body.addColorStop(1, "#0b0620");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.fill();

      // Grid of meridians and parallels
      ctx.strokeStyle = "rgba(255,255,255,0.11)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      const line = (at: (s: number) => [number, number]) => {
        let pen = false;
        for (let s = 0; s <= 360; s += 4) {
          const [lat, lon] = at(s);
          const z = project(Math.sin(lat * RAD), Math.cos(lat * RAD), lon * RAD, p);
          if (z > 0) {
            if (pen) ctx.lineTo(p.x, p.y);
            else ctx.moveTo(p.x, p.y);
          }
          pen = z > 0;
        }
      };
      for (let lon = -180; lon < 180; lon += 20) line((s) => [s / 2 - 90, lon]);
      for (let lat = -60; lat <= 60; lat += 20) line((s) => [lat, s - 180]);
      ctx.stroke();

      // Land
      const dot = Math.max(0.7, r * 0.0065);
      ctx.fillStyle = "#cfc6ff";
      for (const d of dots) {
        const z = project(d.sin, d.cos, d.lon, p);
        if (z <= 0) continue;
        ctx.globalAlpha = 0.2 + 0.8 * z;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dot, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.stroke();

      // Singapore: a dot with a ring that pulses outward
      if (project(Math.sin(HOME.lat * RAD), Math.cos(HOME.lat * RAD), HOME.lon * RAD, p) > 0) {
        const pulse = still ? 0.4 : (t * 0.6) % 1;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 1 - pulse;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dot * 3 + pulse * r * 0.09, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dot * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      draw(now / 1000);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      if (still || !visible) draw(0);
      else frame = requestAnimationFrame(loop);
    };

    const resize = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      start();
    });
    resize.observe(canvas);
    // Stop drawing while the globe is scrolled out of view
    const watch = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    watch.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      watch.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={cn("block aspect-square", className)} />;
}
