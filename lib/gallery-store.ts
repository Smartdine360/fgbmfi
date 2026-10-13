import { cacheTag } from "next/cache";
import type { GalleryCategory, GalleryItem } from "@/data/gallery";
import { listEntries } from "@/lib/media-store";

/** Gallery photographs added through the admin panel. Where they are kept is explained in lib/media-store.ts. */
export const GALLERY_TAG = "gallery-uploads";
export const galleryCategories: GalleryCategory[] = ["Fellowship", "Prayer", "Worship", "Business", "Conferences", "Leadership", "Outreach", "Singapore"];
export const galleryRatios: GalleryItem["ratio"][] = ["portrait", "landscape", "square"];
// A caption is optional; a photograph without one is described like this to screen readers.
const UNCAPTIONED_ALT = "Photograph from an FGBMFI Singapore gathering";

/** Uploaded photographs, newest first, in the shape the gallery uses. Cached until an upload or removal. */
export async function getUploadedGallery(): Promise<GalleryItem[]> {
  "use cache";
  cacheTag(GALLERY_TAG);
  return (await listEntries("gallery")).map(({ id, src, fields }) => {
    const caption = fields.caption ?? "";
    return {
      id,
      image: { src, alt: caption || UNCAPTIONED_ALT },
      caption,
      category: galleryCategories.includes(fields.category as GalleryCategory) ? (fields.category as GalleryCategory) : "Fellowship",
      ratio: galleryRatios.includes(fields.ratio as GalleryItem["ratio"]) ? (fields.ratio as GalleryItem["ratio"]) : "landscape",
    };
  });
}
