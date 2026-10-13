import Image from "next/image";
import type { SiteImage } from "@/data/images";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Parallax } from "@/components/animations/Parallax";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  image: SiteImage;
  crumbs: Crumb[];
  /** A shorter header, for pages whose main content should be visible straight away. */
  compact?: boolean;
  /** A slightly shorter header that keeps the full-size title. */
  medium?: boolean;
  /** Sets the title and lead in the display serif, with the last word of the title in accent italics. */
  serif?: boolean;
  /** Extra classes for the photograph, e.g. an object-position that keeps the faces in view. */
  imageClassName?: string;
};

/** Dark, image-led header used at the top of every inner page. The title uses the same headline face as the home page. */
export function PageHero({ eyebrow, title, lead, image, crumbs, compact, medium, serif, imageClassName }: Props) {
  return (
    <section className={cn("relative isolate flex items-end overflow-hidden bg-navy-950", compact ? "min-h-[18rem] pb-9 pt-28 lg:min-h-[21rem] lg:pb-11 lg:pt-32" : medium ? "min-h-[23rem] pb-10 pt-32 sm:min-h-[26rem] md:pb-12 lg:min-h-[30rem] lg:pt-40" : "min-h-[26rem] pb-12 pt-36 sm:min-h-[30rem] md:pb-16 lg:min-h-[36rem] lg:pt-48")}>
      <Parallax className="-z-10" amount={6}>
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className={cn("object-cover", imageClassName)} />
      </Parallax>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/45" />
      {/* The serif title is lighter in weight, so the side it sits on is darkened a little more */}
      {serif && <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/80 via-navy-950/35 to-transparent" />}
      <div className="container-page">
        <Reveal y={12}>
          <Breadcrumbs items={crumbs} />
        </Reveal>
        {eyebrow && (
          <p className={cn("eyebrow mb-4 flex items-center gap-4 text-flame-300", compact ? "mt-5" : "mt-8")}>
            <span aria-hidden className="h-px w-10 bg-current" />
            {eyebrow}
          </p>
        )}
        <TextReveal
          as="h1"
          immediate
          delay={0.15}
          text={title}
          accentClassName={serif ? "pr-[0.06em] italic text-flame-300" : undefined}
          className={cn(
            "max-w-4xl text-white",
            !eyebrow && "mt-6",
            serif ? "font-serif font-normal leading-[1.04] tracking-[-0.01em]" : "font-headline font-semibold leading-[1.1] tracking-[-0.035em]",
            compact ? "text-3xl sm:text-4xl" : serif ? "text-[2.6rem] sm:text-6xl lg:text-7xl" : "text-[2.1rem] sm:text-5xl lg:text-6xl",
          )}
        />
        {lead && (
          <Reveal delay={0.5} y={16}>
            <p className={cn("max-w-2xl", serif ? "font-serif text-xl italic leading-snug text-white/85 sm:text-2xl" : "text-base leading-relaxed text-white/75", compact ? "mt-4" : serif ? "mt-5" : "mt-6 sm:text-lg")}>{lead}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
