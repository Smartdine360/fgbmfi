/**
 * Generates the labelled placeholder photographs in /public/images.
 *
 * These are stand-ins only. Replace each file with a real photograph of the
 * same name (or change the path in data/images.ts) and the whole site updates.
 *
 *   npm run placeholders
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "images");

// [file, label, width, height, kind, tone]
const IMAGES = [
  ["hero", "Hero — Singapore skyline at dusk", 2400, 1500, "skyline", 0],
  ["hero-leaders", "Business leaders in conversation", 1200, 1500, "group", 1],
  ["intro-fellowship", "Fellowship meeting — members around a table", 1400, 1700, "group", 2],
  ["intro-detail", "Open Bible on a boardroom table", 900, 900, "light", 1],
  ["purpose-prayer", "Men praying together", 1600, 1100, "group", 3],
  ["singapore-skyline", "Singapore skyline — Marina Bay", 2400, 1400, "skyline", 2],
  ["vision-worship", "Worship at a fellowship gathering", 1800, 1200, "light", 0],
  ["about-hero", "Fellowship gathering — wide shot", 2400, 1200, "group", 0],
  ["about-story", "Members greeting one another", 1400, 1600, "group", 1],
  ["about-global", "International convention audience", 1800, 1200, "light", 2],
  ["vision-hero", "Sunrise over the city", 2400, 1200, "skyline", 3],
  ["mission-leaders", "Leaders mentoring younger professionals", 1400, 1600, "group", 2],
  ["history-hero", "Archive photograph — early fellowship", 2400, 1200, "light", 3],
  ["history-archive", "Archive — founding era gathering", 1400, 1600, "group", 3],
  ["leadership-hero", "Leadership team portrait", 2400, 1200, "group", 1],
  ["chapters-hero", "Chapter breakfast meeting", 2400, 1200, "group", 2],
  ["events-hero", "Conference audience", 2400, 1200, "light", 1],
  ["testimonies-hero", "Speaker sharing a testimony", 2400, 1200, "light", 2],
  ["gallery-hero", "Fellowship moments collage", 2400, 1200, "group", 0],
  ["news-hero", "Singapore city at dawn", 2400, 1200, "skyline", 1],
  ["join-hero", "Welcome at a fellowship meeting", 2400, 1200, "group", 3],
  ["join-welcome", "Handshake — a warm welcome", 1400, 1600, "group", 0],
  ["contact-hero", "Singapore business district", 2400, 1200, "skyline", 0],
  ["cta", "Hands raised in worship", 2400, 1100, "light", 3],
  ["og", "FGBMFI Singapore", 1200, 630, "skyline", 0],
  ...Array.from({ length: 6 }, (_, i) => [`leader-${i + 1}`, `Leader portrait ${i + 1}`, 900, 1125, "portrait", i % 4]),
  ...Array.from({ length: 4 }, (_, i) => [`testimony-${i + 1}`, `Testimony portrait ${i + 1}`, 1000, 1250, "portrait", (i + 2) % 4]),
  ...Array.from({ length: 4 }, (_, i) => [`chapter-${i + 1}`, `Chapter meeting ${i + 1}`, 1400, 1000, "group", i % 4]),
  ...["Marketplace breakfast", "Prayer gathering", "Leadership conference", "Testimony dinner", "Outreach day", "Annual convention"].map(
    (l, i) => [`event-${i + 1}`, `Event — ${l}`, 1500, 1000, i % 2 ? "light" : "group", i % 4],
  ),
  ...["New website", "First meeting", "Testimony in the marketplace", "Praying for your workplace", "Leading with integrity"].map(
    (l, i) => [`news-${i + 1}`, `News — ${l}`, 1600, 1000, ["skyline", "group", "light"][i % 3], (i + 1) % 4],
  ),
  ...[
    ["Fellowship meeting", 1200, 1500, "group"],
    ["Prayer", 1500, 1000, "group"],
    ["Worship", 1500, 1000, "light"],
    ["Business gathering", 1200, 1200, "group"],
    ["Conference", 1500, 1000, "light"],
    ["Leadership", 1200, 1500, "portrait"],
    ["Community outreach", 1500, 1000, "group"],
    ["Singapore event", 1500, 1000, "skyline"],
    ["Fellowship dinner", 1200, 1200, "group"],
    ["Prayer breakfast", 1200, 1500, "group"],
    ["Convention worship", 1500, 1000, "light"],
    ["Marketplace outreach", 1500, 1000, "skyline"],
  ].map(([l, w, h, k], i) => [`gallery-${i + 1}`, `Gallery — ${l}`, w, h, k, i % 4]),
];

const TONES = [
  ["#071226", "#12305c", "#c9a66b"],
  ["#0a1a33", "#1d3a66", "#d8bd8c"],
  ["#06101f", "#173153", "#b8935a"],
  ["#0d1f3a", "#274571", "#e0c79c"],
];

// Small deterministic random so the artwork is stable between runs.
function rng(seed) {
  let s = seed * 9301 + 49297;
  return () => ((s = (s * 9301 + 49297) % 233280), s / 233280);
}

function art(kind, w, h, seed, accent) {
  const r = rng(seed + 1);
  if (kind === "skyline") {
    let x = -20;
    let out = "";
    while (x < w) {
      const bw = w * (0.02 + r() * 0.045);
      const bh = h * (0.12 + r() * 0.42);
      out += `<rect x="${x.toFixed(0)}" y="${(h - bh).toFixed(0)}" width="${bw.toFixed(0)}" height="${bh.toFixed(0)}" fill="#040b18" opacity="${(0.55 + r() * 0.4).toFixed(2)}"/>`;
      for (let i = 0; i < 5; i++) {
        out += `<rect x="${(x + r() * bw * 0.8).toFixed(0)}" y="${(h - bh + r() * bh * 0.8).toFixed(0)}" width="${(w * 0.003).toFixed(1)}" height="${(h * 0.006).toFixed(1)}" fill="${accent}" opacity="${(0.25 + r() * 0.5).toFixed(2)}"/>`;
      }
      x += bw + w * 0.004;
    }
    return `<circle cx="${w * 0.72}" cy="${h * 0.42}" r="${h * 0.5}" fill="url(#glow)"/>${out}`;
  }
  const person = (cx, base, s, o) =>
    `<g opacity="${o}" fill="#040b18"><circle cx="${cx}" cy="${base - s * 1.55}" r="${s * 0.38}"/><path d="M${cx - s} ${base} q0 ${-s * 1.1} ${s} ${-s * 1.1} q${s} 0 ${s} ${s * 1.1} z"/></g>`;
  if (kind === "portrait") {
    return `<circle cx="${w / 2}" cy="${h * 0.38}" r="${h * 0.5}" fill="url(#glow)"/>${person(w / 2, h * 1.02, w * 0.42, 0.8)}`;
  }
  if (kind === "group") {
    let out = `<circle cx="${w * 0.6}" cy="${h * 0.35}" r="${h * 0.55}" fill="url(#glow)"/>`;
    const n = 5;
    for (let i = 0; i < n; i++) {
      const s = Math.min(w, h) * (0.15 + r() * 0.06);
      out += person(w * (0.12 + (i / (n - 1)) * 0.76), h * 1.02, s, 0.6 + r() * 0.3);
    }
    return out;
  }
  // "light": soft rays
  let out = `<circle cx="${w / 2}" cy="${h * 0.1}" r="${h * 0.8}" fill="url(#glow)"/>`;
  for (let i = 0; i < 9; i++) {
    const a = -0.9 + (i / 8) * 1.8;
    out += `<path d="M${w / 2} ${-h * 0.1} L${w / 2 + Math.sin(a - 0.05) * h * 1.6} ${h * 1.2} L${w / 2 + Math.sin(a + 0.05) * h * 1.6} ${h * 1.2} z" fill="${accent}" opacity="${(0.03 + r() * 0.05).toFixed(3)}"/>`;
  }
  return out;
}

function svg([name, label, w, h, kind, tone], seed) {
  const [a, b, accent] = TONES[tone];
  const fs = Math.max(16, Math.round(Math.min(w, h) * 0.026));
  const m = Math.round(Math.min(w, h) * 0.045);
  const esc = label.replace(/&/g, "&amp;");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></linearGradient>
    <radialGradient id="glow"><stop offset="0" stop-color="${accent}" stop-opacity=".38"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#040b18" stop-opacity="0"/><stop offset="1" stop-color="#040b18" stop-opacity=".75"/></linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${art(kind, w, h, seed, accent)}
  <rect width="${w}" height="${h}" fill="url(#shade)"/>
  <rect x="${m}" y="${m}" width="${w - m * 2}" height="${h - m * 2}" fill="none" stroke="${accent}" stroke-opacity=".28" stroke-width="1.5"/>
  <text x="${m * 1.8}" y="${m * 2.4}" font-family="Inter, DejaVu Sans, sans-serif" font-size="${fs * 0.62}" letter-spacing="${fs * 0.2}" fill="${accent}" opacity=".9">PLACEHOLDER PHOTOGRAPH</text>
  <text x="${m * 1.8}" y="${m * 2.4 + fs * 1.5}" font-family="Inter, DejaVu Sans, sans-serif" font-size="${fs}" fill="#ffffff" opacity=".86">${esc}</text>
  <text x="${m * 1.8}" y="${m * 2.4 + fs * 2.7}" font-family="Inter, DejaVu Sans, sans-serif" font-size="${fs * 0.6}" fill="#ffffff" opacity=".5">/public/images/${name}.jpg · ${w}×${h}</text>
</svg>`;
}

await mkdir(OUT, { recursive: true });
await Promise.all(
  IMAGES.map((img, i) =>
    sharp(Buffer.from(svg(img, i)))
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(OUT, `${img[0]}.jpg`)),
  ),
);
console.log(`Generated ${IMAGES.length} placeholder images in public/images`);
