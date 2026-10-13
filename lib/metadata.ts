import type { Metadata } from "next";
import { site } from "@/data/site";
import { siteImages } from "@/data/images";

type PageMeta = { title: string; description: string; path: string; image?: string };

/** Builds consistent title, canonical, Open Graph and Twitter metadata for a page. */
export function pageMetadata({ title, description, path, image }: PageMeta): Metadata {
  const og = image ?? siteImages.og.src;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_SG",
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [og] },
  };
}
