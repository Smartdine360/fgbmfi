import { gallery } from "@/data/gallery";
import { ImageCard } from "@/components/cards/ImageCard";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function GalleryPreview() {
  const [a, b, c, d, e] = [gallery[0], gallery[2], gallery[3], gallery[6], gallery[7]];
  return (
    <section className="section-y bg-navy-950 text-white">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Gallery" title="Moments from the fellowship." lead="Meals shared, prayers prayed, friendships formed." light />
          <Reveal delay={0.1} className="shrink-0">
            <Button href="/gallery" variant="outline-light" fullOnMobile>
              View the Gallery
            </Button>
          </Reveal>
        </div>
        <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:grid-rows-2">
          <StaggerItem className="col-span-2 lg:col-span-1 lg:row-span-2">
            <ImageCard image={a.image} label={a.category} caption={a.caption} className="aspect-[3/2] h-full lg:aspect-auto lg:min-h-[34rem]" />
          </StaggerItem>
          <StaggerItem className="col-span-2">
            <ImageCard image={b.image} label={b.category} caption={b.caption} className="aspect-[3/2] lg:aspect-[2/1]" sizes="(min-width: 1024px) 50vw, 100vw" />
          </StaggerItem>
          <StaggerItem>
            <ImageCard image={c.image} label={c.category} className="aspect-square lg:aspect-auto lg:h-full" />
          </StaggerItem>
          <StaggerItem>
            <ImageCard image={d.image} label={d.category} className="aspect-square" />
          </StaggerItem>
          <StaggerItem className="col-span-2 lg:col-span-2">
            <ImageCard image={e.image} label={e.category} caption={e.caption} className="aspect-[3/2] lg:aspect-[2/1]" sizes="(min-width: 1024px) 50vw, 100vw" />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
