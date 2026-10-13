import Image from "next/image";
import { siteImages } from "@/data/images";
import { purposes, site } from "@/data/site";
import { ImageReveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function Purpose() {
  return (
    <section className="section-y bg-sand">
      <div className="container-page">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow="What we do"
            title="The Work of FGBMFI Around the World."
            lead="FGBMFI Singapore is one part of a worldwide organisation. These are the activities of FGBMFI International, which every national fellowship, including ours, belongs to."
          />
          <ImageReveal className="aspect-[16/10] bg-navy-900 lg:col-span-5">
            <Image src={siteImages.purposePrayer.src} alt={siteImages.purposePrayer.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </ImageReveal>
        </div>

        <Stagger as="ul" className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {purposes.map(({ title, description, icon: Icon }, i) => (
            <StaggerItem as="li" key={title} className="group relative overflow-hidden border-b border-r border-line p-7 transition-colors duration-500 ease-premium hover:bg-navy-900 sm:p-9">
              <div className="flex items-start justify-between">
                <span className="grid size-14 place-items-center border border-flame-500/50 text-flame-700 transition-colors duration-500 group-hover:border-flame-300/60 group-hover:text-flame-300">
                  <Icon aria-hidden className="size-6" strokeWidth={1.4} />
                </span>
                <span aria-hidden className="font-display text-sm text-slate/70 transition-colors duration-500 group-hover:text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-8 text-2xl text-navy-900 transition-colors duration-500 group-hover:text-white">{title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-slate transition-colors duration-500 group-hover:text-white/70">{description}</p>
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-flame-400 transition-transform duration-700 ease-premium group-hover:scale-x-100" />
            </StaggerItem>
          ))}
        </Stagger>

        {/* The international organisation these activities belong to */}
        <div className="mt-10 flex flex-col gap-6 rounded-3xl bg-navy-900 p-7 text-white sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-flame-300">{site.international.motto}</p>
            <p className="mt-3 font-display text-2xl font-semibold leading-snug">{site.international.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              International President {site.international.president} · Headquarters in {site.international.headquarters} · Founded 1952
            </p>
          </div>
          <Button href={site.internationalUrl} external className="shrink-0">
            Visit fgbmfi.org
          </Button>
        </div>
      </div>
    </section>
  );
}
