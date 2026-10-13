import { siteImages } from "@/data/images";
import { gallery } from "@/data/gallery";
import { getUploadedGallery } from "@/lib/gallery-store";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";

export const metadata = pageMetadata({
  title: "Gallery",
  description: "Photographs from FGBMFI Singapore — fellowship meetings, prayer, worship, conferences, leadership gatherings and community outreach.",
  path: "/gallery",
});

export default async function GalleryPage() {
  // Photographs added through the admin panel come first, then the ones that ship with the site.
  const items = [...(await getUploadedGallery()), ...gallery];
  return (
    <>
      <PageHero medium serif title="The fellowship, in pictures." lead="Meals shared, prayers prayed, songs sung and friendships formed across the city." image={siteImages.galleryHero} crumbs={[{ label: "Gallery" }]} />
      <section className="section-y">
        <div className="container-page">
          <h2 className="sr-only">Photographs</h2>
          <GalleryGrid items={items} />
        </div>
      </section>
    </>
  );
}
