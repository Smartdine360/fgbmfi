import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/history", "/evangelism", "/prayer-altar-2026", "/initiatives", "/events", "/gallery", "/contact", "/privacy", "/terms"];
 return pages.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" || path === "/events" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
