import Image from "next/image";
import { Quote } from "lucide-react";
import { nationalLeader } from "@/data/leadership";
import { ImageReveal, Reveal } from "@/components/animations/Reveal";

/** Feature on the Chapter President of FGBMFI Singapore. Content lives in data/leadership.ts. */
export function LeaderSpotlight() {
  const { name, position, image, intro, message } = nationalLeader;
  return (
    <section className="section-y relative overflow-hidden bg-sand">
      <div aria-hidden className="absolute -right-40 -top-40 size-[30rem] rounded-full bg-flame-400/10 blur-3xl" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <ImageReveal className="aspect-[3/2] w-full overflow-hidden rounded-3xl bg-navy-900 shadow-[0_40px_80px_-40px_rgba(20,11,51,0.6)]">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 48vw, 92vw" className="object-cover object-right" />
          </ImageReveal>
          <Reveal delay={0.3} className="absolute -bottom-6 left-5 rounded-2xl bg-navy-900 px-6 py-4 text-white shadow-xl sm:left-8">
            <p className="eyebrow text-flame-300">{position}</p>
            {name && <p className="mt-1 font-display text-xl font-semibold">{name}</p>}
          </Reveal>
        </div>

        <div className="pt-6 lg:col-span-6 lg:pt-0">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 text-flame-700">
              <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
              {position}
            </p>
            <h2 className="mt-6 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-navy-900 sm:text-6xl lg:text-[4rem]">{name ?? "A worldwide fellowship, led locally."}</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-3">
            <p className="font-display text-lg font-medium text-flame-700 sm:text-xl">{position}, FGBMFI Singapore</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-6 space-y-5 text-base leading-relaxed text-slate sm:text-[1.05rem]">
            {intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          {message && (
            <Reveal delay={0.2} className="mt-8 flex gap-4 border-l-2 border-flame-400 pl-5">
              <Quote aria-hidden className="mt-1 size-6 shrink-0 text-flame-500" />
              <p className="font-display text-xl leading-snug text-navy-900">{message}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
