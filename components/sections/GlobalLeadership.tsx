import Image from "next/image";
import { siteImages } from "@/data/images";
import { ImageReveal, Reveal } from "@/components/animations/Reveal";

/** Home page banner directly under the hero: the global leadership picture, shown whole. */
export function GlobalLeadership() {
  return (
    <section id="global-leadership" className="relative isolate scroll-mt-16 overflow-hidden bg-gradient-to-br from-sand via-ivory to-flame-200/60 py-14 md:py-20">
      {/* Soft pastel washes: lavender on the left, peach on the right */}
      <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[32rem] rounded-full bg-navy-600/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-48 -right-32 -z-10 size-[34rem] rounded-full bg-flame-300/30 blur-3xl" />

      <div className="container-page">
        <Reveal className="text-center">
          <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 text-flame-700">
            <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
            Global Leadership
          </p>
          <h2 className="mt-6 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-navy-900 sm:text-6xl lg:whitespace-nowrap lg:text-[4rem]">
            Many nations, <em className="bg-sunset bg-clip-text pr-1 text-transparent">one fellowship.</em>
          </h2>
          {/* Short accent rule under the heading */}
          <span aria-hidden className="bg-sunset mx-auto mt-7 block h-[3px] w-16 rounded-full" />
        </Reveal>
      </div>

      {/* Edge to edge on phones so the faces stay as large as possible; a framed card from sm up */}
      <div className="mt-9 sm:container-page lg:mt-12">
        <ImageReveal className="aspect-[2064/762] w-full bg-navy-900 sm:rounded-3xl sm:ring-1 sm:ring-navy-900/10 sm:shadow-[0_40px_80px_-40px_rgba(20,11,51,0.55)]">
          <Image src={siteImages.globalLeadership.src} alt={siteImages.globalLeadership.alt} fill sizes="(min-width: 640px) 92vw, 100vw" className="object-cover" />
        </ImageReveal>
      </div>
    </section>
  );
}
