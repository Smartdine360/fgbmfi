import Image from "next/image";
import { siteImages } from "@/data/images";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";

export function SingaporeSection() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-24 text-white md:py-36 lg:py-48">
      <Parallax className="-z-20" amount={10}>
        <Image src={siteImages.singapore.src} alt={siteImages.singapore.alt} fill sizes="100vw" className="object-cover object-right" />
      </Parallax>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/55 to-navy-950/20" />
      <div className="container-page">
        <p className="eyebrow mb-5 flex items-center gap-4 text-flame-300">
          <span aria-hidden className="h-px w-10 bg-current" />
          1.3521° N, 103.8198° E
        </p>
        <TextReveal text="Faith in the Heart of Singapore" className="max-w-3xl text-[2.4rem] leading-[1.05] sm:text-6xl lg:text-7xl" />
        <Reveal delay={0.2} className="mt-7 max-w-xl space-y-4 text-base leading-relaxed text-white/80 sm:text-lg">
          <p>
            Singapore is a city built on enterprise, discipline and ambition. It is also a city where many carry the weight of work alone. FGBMFI Singapore exists so that no Christian professional or business leader has to.
          </p>
          <p>Our desire is to connect believers across industries and across the island — to pray together, to sharpen one another, and to carry the hope of Jesus Christ into the places where this city does its work.</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <Button href="/contact" fullOnMobile>
            Join the Fellowship
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
