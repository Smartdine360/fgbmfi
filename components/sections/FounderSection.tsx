import Image from "next/image";
import { BookOpen, Flame, MapPin, Tractor } from "lucide-react";
import { siteImages } from "@/data/images";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const facts = [
  { icon: MapPin, label: "Born", text: "21 July 1913, of Armenian heritage" },
  { icon: Tractor, label: "By trade", text: "A dairy farmer and businessman in California" },
  { icon: Flame, label: "Founded", text: "The fellowship, in Los Angeles in 1952" },
  { icon: BookOpen, label: "His story", text: "Told in The Happiest People on Earth" },
];

/** Tribute to Demos Shakarian, founder of FGBMFI. */
export function FounderSection({ showLink = true }: { showLink?: boolean }) {
  return (
    <section id="founder" className="section-y relative scroll-mt-16 overflow-hidden bg-sand">
      <div aria-hidden className="absolute -left-40 top-1/3 size-[30rem] rounded-full bg-flame-400/10 blur-3xl" />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          {/* Offset frame behind the portrait */}
          <div aria-hidden className="absolute -bottom-4 -left-4 right-8 top-8 rounded-[2rem] border-2 border-flame-400/60" />
          <ImageReveal className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-navy-900 shadow-[0_40px_80px_-40px_rgba(20,11,51,0.65)]">
            <Image src={siteImages.founder.src} alt={siteImages.founder.alt} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover object-[52%_center]" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/80 to-transparent" />
          </ImageReveal>
          <Reveal delay={0.3} className="absolute -right-2 bottom-8 rounded-2xl bg-navy-900 px-6 py-4 text-white shadow-xl sm:-right-6">
            <p className="eyebrow text-flame-300">Founder</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-tight">1913 – 1993</p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading eyebrow="Our founder" title="Demos Shakarian" />
          <Reveal delay={0.1} className="mt-3">
            <p className="font-display text-lg font-medium text-flame-700 sm:text-xl">Founder, Full Gospel Business Men&apos;s Fellowship International</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-slate sm:text-[1.05rem]">
            <p>
              Demos Shakarian was not a preacher. He was a businessman who believed that working people would listen to someone who shared their world, and that a meal and an honest testimony could reach people a church service never would.
            </p>
            <p>That conviction became the Full Gospel Business Men&apos;s Fellowship International. What began around one table in Los Angeles is today a fellowship in nations across the world, Singapore among them.</p>
          </Reveal>

          <Stagger as="ul" className="mt-9 grid gap-3 sm:grid-cols-2">
            {facts.map(({ icon: Icon, label, text }) => (
              <StaggerItem as="li" key={label} className="flex items-start gap-4 rounded-2xl border border-line bg-ivory p-4 transition-[transform,box-shadow] duration-500 ease-premium hover:-translate-y-1 hover:shadow-[0_20px_40px_-25px_rgba(20,11,51,0.45)]">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-flame-400/10 text-flame-500">
                  <Icon className="size-[1.125rem]" />
                </span>
                <p className="leading-snug">
                  <span className="eyebrow block text-flame-700">{label}</span>
                  <span className="mt-1 block text-sm text-navy-900">{text}</span>
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          {showLink && (
            <Reveal delay={0.2} className="mt-9">
              <Button href="/history" variant="navy">
                Read Our History
              </Button>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
