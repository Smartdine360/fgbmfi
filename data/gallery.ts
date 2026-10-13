import { numbered, type SiteImage } from "./images";

export type GalleryCategory = "Fellowship" | "Prayer" | "Worship" | "Business" | "Conferences" | "Leadership" | "Outreach" | "Singapore";
export type GalleryItem = { id: string; image: SiteImage; caption: string; category: GalleryCategory; ratio: "portrait" | "landscape" | "square" };

/**
 * Photographs from fellowship gatherings (/public/images/gallery-1.webp … 12).
 * When replacing a file, update its caption here. `ratio` should match the
 * photograph's orientation so the masonry layout stays tidy.
 */
const entries: Array<[string, GalleryCategory, GalleryItem["ratio"]]> = [
  ["A moment of prayer", "Prayer", "portrait"],
  ["Praying together, hand in hand", "Prayer", "landscape"],
  ["Worship during the gathering", "Worship", "landscape"],
  ["Listening during a session", "Fellowship", "square"],
  ["A teaching session", "Conferences", "landscape"],
  ["Sharing from the podium", "Leadership", "portrait"],
  ["Members of FGBMFI Singapore", "Fellowship", "landscape"],
  ["An evening meal together", "Singapore", "landscape"],
  ["Friendship beyond the meeting", "Fellowship", "square"],
  ["Sharing with the fellowship", "Leadership", "portrait"],
  ["Worship around the table", "Worship", "landscape"],
  ["Everyone together after the gathering", "Fellowship", "landscape"],
];

export const gallery: GalleryItem[] = entries.map(([caption, category, ratio], i) => ({
  id: `gallery-${i + 1}`,
  image: numbered("gallery", i + 1, caption),
  caption,
  category,
  ratio,
}));
