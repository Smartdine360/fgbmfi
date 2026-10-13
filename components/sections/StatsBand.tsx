import Image from "next/image";
import { Flame, Globe, MapPin, Users } from "lucide-react";
import { siteImages } from "@/data/images";
import { stats } from "@/data/site";
import { Counter } from "@/components/animations/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// One look per entry in `stats`, in the same order: flame, glass, light, photograph.
const looks = [
  { icon: Globe, card: "bg-gradient-to-br from-flame-400 to-flame-700 text-on-flame shadow-[0_30px_60px_-25px_color-mix(in_srgb,var(--color-flame-400)_80%,transparent)]", chip: "bg-on-flame/15 text-on-flame", label: "text-on-flame", note: "text-on-flame/80", mark: "text-on-flame/10" },
  { icon: Users, card: "border border-white/15 bg-white/[0.07] text-white backdrop-blur-md", chip: "bg-flame-400/20 text-flame-300", label: "text-flame-300", note: "text-white/65", mark: "text-white/[0.06]" },
  { icon: Flame, card: "bg-ivory text-navy-900 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]", chip: "bg-flame-400 text-on-flame", label: "text-flame-700", note: "text-slate", mark: "text-navy-900/[0.06]" },
  { icon: MapPin, card: "text-white", chip: "bg-white/20 text-white backdrop-blur-sm", label: "text-flame-300", note: "text-white/80", mark: "text-white/10", photo: true },
];

export function StatsBand() {
  return (
    <section aria-label="FGBMFI at a glance" className="relative isolate overflow-hidden bg-navy-950 py-14 text-white md:py-20">
      {/* Group photograph of the Singapore fellowship, under a dark overlay so the figures stay readable */}
      <Image src={siteImages.introGroup.src} alt="" fill sizes="100vw" className="-z-20 object-cover object-[center_35%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/55" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-navy-950/40" />
      <div aria-hidden className="absolute -left-40 top-1/2 -z-10 size-[36rem] -translate-y-1/2 rounded-full bg-flame-400/15 blur-3xl" />
      {/* Globe rings in the top-right corner */}
      <div aria-hidden className="absolute -right-48 -top-64 -z-10 hidden size-[44rem] rounded-full border border-white/10 lg:block" />
      <div aria-hidden className="absolute -right-24 -top-40 -z-10 hidden size-[30rem] rounded-full border border-white/10 lg:block" />

      <div className="container-page">
        {/* Heading on the left, with the link to the About page level with it on wide screens */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-3xl">
            <p className="eyebrow flex items-center gap-4 text-flame-300">
              <span aria-hidden className="h-px w-10 bg-current opacity-70" />
              FGBMFI at a glance
            </p>
            <h2 className="mt-5 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] sm:text-6xl lg:text-[4rem]">
              One fellowship, <em className="pr-1 text-flame-300">in many nations.</em>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">A worldwide family of business people and professionals, with a home in Singapore.</p>
          </Reveal>
          <Reveal delay={0.2} className="shrink-0">
            <Button href="/about">Our story</Button>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {stats.map((s, i) => {
            const look = looks[i % looks.length];
            const Icon = look.icon;
            return (
              <StaggerItem
                as="li"
                key={s.label}
                className={cn("group relative isolate overflow-hidden rounded-3xl p-6 transition-transform duration-500 ease-premium hover:-translate-y-1.5", look.card)}
              >
                {look.photo && (
                  <>
                    <Image src={siteImages.singapore.src} alt="" fill sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 92vw" className="-z-20 object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-110" />
                    <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20" />
                  </>
                )}
                <Icon aria-hidden strokeWidth={1} className={cn("absolute -bottom-8 -right-8 -z-10 size-36 transition-transform duration-700 ease-premium group-hover:rotate-12 group-hover:scale-110", look.mark)} />
                <div className="flex items-center gap-3">
                  <span aria-hidden className={cn("grid size-10 shrink-0 place-items-center rounded-full", look.chip)}>
                    <Icon className="size-[1.125rem]" />
                  </span>
                  <p className={cn("eyebrow", look.label)}>{s.label}</p>
                </div>
                <p className="mt-6 font-serif text-5xl font-normal leading-none tracking-[-0.01em]">
                  {s.value !== undefined ? <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} plain={s.plainYear} /> : s.text}
                </p>
                <p className={cn("mt-3 text-sm leading-relaxed", look.note)}>{s.note}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
