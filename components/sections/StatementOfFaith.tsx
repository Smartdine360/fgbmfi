"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { siteImages } from "@/data/images";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

// The ten points of the statement of faith. `title` is a short label; `text` is the statement itself.
const faith = [
  { title: "One God", text: "We believe in one God, Maker of all things and being in the Trinity of Father, Son and Holy Spirit." },
  { title: "Jesus Christ", text: "We believe that the Son of God, Jesus Christ, became incarnate, was begotten by the Holy Spirit, born of the Virgin Mary, and is true God and true man." },
  { title: "The Bible", text: "We believe the Bible, in its entirety, to be the inspired Word of God and the only infallible rule of faith and conduct." },
  { title: "Resurrection", text: "We believe in the resurrection of the dead, the eternal happiness of the saved, and the eternal punishment of the lost." },
  { title: "Salvation", text: "We believe in personal salvation of believers through the shed blood of Christ." },
  { title: "Sanctification", text: "We believe in sanctification by the blood of Christ, in personal holiness of heart and life, and in separation from the world." },
  { title: "Divine Healing", text: "We believe in divine healing, through faith, and that healing is included in the Atonement." },
  {
    title: "Baptism in the Holy Ghost",
    text: "We believe in the baptism in the Holy Ghost, accompanied by the initial physical sign of speaking with other tongues as the Spirit of God gives utterance, (Acts 2:4) as distinct from the new birth, and in the nine gifts of the Spirit, listed in 1 Corinthians 12, as now available to believers.",
  },
  { title: "The Christian's Hope", text: "We believe in the Christian's hope - the imminent, personal return of the Lord Jesus Christ." },
  { title: "World Evangelism", text: "We believe in intensive world-evangelism and missionary work in accordance with the Great Commission, with signs following." },
];

const two = (n: number) => String(n).padStart(2, "0");
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Statement of faith told by scrolling: the group photograph and heading stay in place on the left while the ten
 * points rise into view one by one on the right. The point crossing the middle of the screen is lit and named on
 * the photograph; the others are dimmed.
 */
export function StatementOfFaith() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-y relative isolate bg-gradient-to-br from-[#fff4ea] via-[#ffeadb] to-[#ffdccb]">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 text-flame-700">
            <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
            What we believe
          </p>
          <h2 className="mt-6 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-navy-900 sm:text-6xl lg:text-[4rem]">
            Statement of <em className="bg-sunset bg-clip-text pr-1 text-transparent">Faith</em>
          </h2>
          <span aria-hidden className="bg-sunset mx-auto mt-7 block h-[3px] w-16 rounded-full" />
        </Reveal>
      </div>

      <div className="container-page mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
        <div>
          {/* Stays put on wide screens while the points scroll past: the whole photograph, with the point now on show beneath it */}
          <Reveal delay={0.1} className="overflow-hidden rounded-[2rem] bg-navy-900 text-white shadow-[0_40px_80px_-40px_rgba(20,11,51,0.7)] lg:sticky lg:top-24">
            <div className="relative aspect-[3/2]">
              <Image src={siteImages.contactHero.src} alt={siteImages.contactHero.alt} fill sizes="(min-width: 1024px) 46vw, 92vw" className="object-cover" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900 to-transparent" />
            </div>
            {/* The point now on show, and how far through the ten the reader is */}
            <div aria-hidden className="hidden px-8 pb-8 pt-3 lg:block">
              <p className="eyebrow text-flame-300">Now reading</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <AnimatePresence mode="wait">
                  <motion.p key={active} className="font-serif text-3xl leading-tight" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }}>
                    {faith[active].title}
                  </motion.p>
                </AnimatePresence>
                <p className="shrink-0 font-serif text-xl text-white/70">
                  {two(active + 1)} <span className="text-white/40">/ {two(faith.length)}</span>
                </p>
              </div>
              <div className="mt-5 h-0.5 overflow-hidden rounded-full bg-white/20">
                <div className="bg-sunset h-full rounded-full transition-[width] duration-500 ease-premium" style={{ width: `${((active + 1) / faith.length) * 100}%` }} />
              </div>
            </div>
          </Reveal>
        </div>

        <ol className="lg:pb-[10vh]">
          {faith.map(({ title, text }, i) => (
            // The outer item watches the middle band of the screen to decide which point is lit
            <motion.li key={title} viewport={{ margin: "-45% 0px -45% 0px" }} onViewportEnter={() => setActive(i)} className="border-t border-navy-900/10 first:border-t-0">
              {/* The inner block rises into place the first time the point is scrolled to */}
              <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -15% 0px" }} transition={{ duration: 0.8, ease: EASE }}>
                <div className={cn("flex gap-5 py-9 transition-opacity duration-500 sm:gap-8 lg:py-14", i !== active && "lg:opacity-35")}>
                  <span aria-hidden className="bg-sunset w-14 shrink-0 bg-clip-text font-serif text-5xl leading-none text-transparent sm:w-20 sm:text-6xl">
                    {two(i + 1)}
                  </span>
                  <div>
                    <h3 className="eyebrow font-sans text-flame-700">{title}</h3>
                    <p className="mt-3 font-serif text-[1.35rem] leading-snug text-navy-900 sm:text-[1.75rem]">{text}</p>
                  </div>
                </div>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
