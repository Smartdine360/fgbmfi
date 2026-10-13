import Image from "next/image";
import { siteImages } from "@/data/images";
import { initiatives } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ImageReveal, Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Initiatives",
  description: "The initiatives of FGBMFI Singapore: marketplace evangelism, professional networking and leadership mentoring.",
  path: "/initiatives",
});

// One photograph per initiative, in the same order as `initiatives` in data/site.ts.
const photos = [siteImages.speakerLectern, siteImages.networkingCall, siteImages.globalLeadership];
// Which of those are panoramic and so shown whole across the full width instead of beside the words.
const panoramic = [false, false, true];

export default function InitiativesPage() {
  return (
    <>
      <PageHero
        medium
        serif
        title="Faith in the Marketplace"
        lead="Three ways the Singapore chapter serves business people and professionals in this city."
        image={siteImages.hero}
        crumbs={[{ label: "Initiatives" }]}
      />

      {/* The three initiatives as editorial rows: a large photograph on one side, the words on the other, swapping sides each row */}
      <section className="section-y relative isolate overflow-hidden">
        <div aria-hidden className="absolute -left-48 top-1/4 -z-10 size-[36rem] rounded-full bg-flame-400/10 blur-3xl" />
        <div aria-hidden className="absolute -right-40 bottom-0 -z-10 size-[32rem] rounded-full bg-navy-600/10 blur-3xl" />
        <div className="container-page">
          <Reveal className="text-center">
            <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 text-flame-700">
              <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
              In Singapore
            </p>
            <h2 className="mt-6 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-navy-900 sm:text-6xl lg:text-[4rem]">
              What the chapter <em className="bg-sunset bg-clip-text pr-1 text-transparent">does.</em>
            </h2>
            <span aria-hidden className="bg-sunset mx-auto mt-7 block h-[3px] w-16 rounded-full" />
          </Reveal>

          <ol className="mt-16 space-y-16 lg:mt-24 lg:space-y-28">
            {initiatives.map(({ title, tag, description, icon: Icon }, i) => {
              const image = photos[i % photos.length];
              const flip = i % 2 === 1;
              // A panoramic picture is shown whole across the full width, with the words beneath it.
              const wide = panoramic[i];
              return (
                <li key={title} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
                  <div className={cn("relative", wide ? "lg:col-span-12" : "lg:col-span-7", !wide && flip && "lg:order-2")}>
                    {/* Tilted accent panel behind the photograph, leaning the opposite way on alternate rows */}
                    <div
                      aria-hidden
                      className={cn(
                        "bg-sunset absolute inset-0 rounded-[2.25rem] opacity-90 transition-transform duration-700 ease-premium",
                        wide ? "-rotate-[0.6deg] group-hover:-rotate-1" : flip ? "rotate-2 group-hover:rotate-3" : "-rotate-2 group-hover:-rotate-3",
                      )}
                    />
                    <ImageReveal className={cn("rounded-[2rem] bg-navy-900 shadow-[0_40px_80px_-40px_rgba(20,11,51,0.7)]", wide ? "aspect-[2064/762]" : "aspect-[16/10]")}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes={wide ? "92vw" : "(min-width: 1024px) 55vw, 92vw"}
                        className={cn("object-cover transition-transform duration-[1600ms] ease-premium", !wide && "group-hover:scale-105")}
                      />
                    </ImageReveal>
                    <span aria-hidden className={cn("absolute -bottom-6 grid size-20 place-items-center rounded-full border-[6px] border-ivory bg-navy-900 text-flame-300 shadow-xl", flip ? "left-8" : "right-8", wide && "max-lg:hidden")}>
                      <Icon strokeWidth={1.5} className="size-8" />
                    </span>
                  </div>

                  <Reveal delay={0.1} className={cn("pt-4", wide ? "lg:col-span-12 lg:grid lg:grid-cols-12 lg:items-end lg:gap-16 lg:pt-2" : "lg:col-span-5 lg:pt-0", !wide && flip && "lg:order-1")}>
                    <div className={cn(wide && "lg:col-span-6")}>
                      <div className="flex items-center gap-5">
                        <span aria-hidden className="bg-sunset bg-clip-text font-serif text-7xl leading-none text-transparent sm:text-8xl">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="eyebrow rounded-full bg-sand px-4 py-2 text-flame-700">{tag}</span>
                      </div>
                      <h3 className="mt-6 font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] text-navy-900 sm:text-5xl">{title}</h3>
                    </div>
                    <p className={cn("mt-5 border-l-2 border-flame-400 pl-5 text-lg leading-relaxed text-slate", wide && "lg:col-span-6 lg:mt-0")}>{description}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <CTASection
        title="Get involved."
        lead="Whichever of these speaks to you, the first step is the same: get in touch and come along."
        primary={{ label: "Connect With Us", href: "/contact" }}
        secondary={{ label: "Upcoming Events", href: "/events" }}
      />
    </>
  );
}
