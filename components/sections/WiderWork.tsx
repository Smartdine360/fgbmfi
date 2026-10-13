import Image from "next/image";
import { siteImages } from "@/data/images";
import { purposes, site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

// Photographs for the international activities, in the same order as `purposes` in data/site.ts.
// They are from the Singapore gatherings and illustrate each activity; they are not pictures of the programmes themselves.
const activityPhotos = [siteImages.joinHero, siteImages.eventsHero, siteImages.purposePrayer, siteImages.galleryHero, siteImages.visionHero, siteImages.leadershipHero];

// Mosaic layout for the six activity tiles on wide screens: one large tile, two small, then three wide.
// A wide tile puts its photograph beside the words; the others put it above.
const tiles = [
  { span: "lg:col-span-2 lg:row-span-2", wide: false },
  { span: "", wide: false },
  { span: "", wide: false },
  { span: "lg:col-span-2", wide: true },
  { span: "lg:col-span-2", wide: true },
  { span: "lg:col-span-2", wide: true },
];

/** The international work of FGBMFI: a mosaic of photograph tiles, then a bar about the organisation. */
export function WiderWork() {
  return (
    <section className="section-y relative overflow-hidden bg-sand">
      <div aria-hidden className="absolute -right-40 top-20 size-[32rem] rounded-full bg-flame-400/10 blur-3xl" />
      <div className="container-page relative">
        <SectionHeading eyebrow="Around the world" title="The wider work we belong to." lead="The Singapore chapter is part of FGBMFI International. These are the activities of the international fellowship." align="center" />

        <Stagger as="ol" className="mt-14 grid gap-4 sm:grid-cols-2 lg:auto-rows-[23rem] lg:grid-cols-4">
          {purposes.map(({ title, description, icon: Icon }, i) => {
            const image = activityPhotos[i % activityPhotos.length];
            const { span, wide } = tiles[i % tiles.length];
            return (
              // The photograph and the words sit side by side or one above the other, never on top of each other.
              <StaggerItem
                as="li"
                key={title}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-[transform,box-shadow] duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgba(20,11,51,0.5)]",
                  wide && "lg:flex-row",
                  span,
                )}
              >
                <div className={cn("relative aspect-[16/10] overflow-hidden bg-navy-900 lg:aspect-auto", wide ? "lg:w-1/2 lg:shrink-0" : "lg:min-h-0 lg:flex-1")}>
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 48vw, (min-width: 640px) 46vw, 92vw" className="object-cover transition-transform duration-[1600ms] ease-premium group-hover:scale-110" />
                </div>
                <div className={cn("flex flex-col justify-center p-6", i === 0 && "lg:p-8")}>
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-flame-400/10 text-flame-500 transition-colors duration-500 group-hover:bg-flame-400 group-hover:text-on-flame">
                      <Icon className="size-[1.125rem]" />
                    </span>
                    <span aria-hidden className="font-display text-sm font-semibold tracking-[0.2em] text-flame-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={cn("mt-4 leading-tight text-navy-900", i === 0 ? "text-2xl sm:text-3xl" : "text-xl")}>{title}</h3>
                  <p className={cn("mt-2 leading-relaxed text-slate", i === 0 ? "text-base" : "text-sm")}>{description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="relative isolate mt-6 grid items-center gap-8 overflow-hidden rounded-3xl bg-navy-900 p-7 text-white sm:p-9 lg:grid-cols-12">
          <div aria-hidden className="absolute -left-24 -top-24 -z-10 size-72 rounded-full bg-flame-400/25 blur-3xl" />
          <div className="flex items-center gap-5 lg:col-span-5">
            <Image src="/images/logo.webp" alt="" width={640} height={598} sizes="72px" className="h-16 w-auto shrink-0" />
            <p className="leading-snug">
              <span className="eyebrow block text-flame-300">{site.international.motto}</span>
              <span className="mt-1.5 block font-display text-xl font-semibold">{site.international.name}</span>
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3 text-center lg:col-span-4 lg:border-x lg:border-white/10 lg:px-6">
            {[
              ["95+", "Nations"],
              ["1952", "Founded"],
              ["7", "Core values"],
            ].map(([value, label]) => (
              <div key={label}>
                <dd className="font-display text-3xl font-bold text-white">{value}</dd>
                <dt className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/55">{label}</dt>
              </div>
            ))}
          </dl>
          <div className="lg:col-span-3 lg:justify-self-end">
            <Button href={site.internationalUrl} external>
              Visit fgbmfi.org
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
