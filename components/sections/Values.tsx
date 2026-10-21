"use client";

import { useState } from "react";
import Image from "next/image";
import { siteImages } from "@/data/images";
import { values } from "@/data/site";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

// One photograph behind each value, in the same order as `values` in data/site.ts.
const photos = [siteImages.valueLove, siteImages.valueIntegrity, siteImages.valueRelationship, siteImages.valueCommitment, siteImages.valueNetworking, siteImages.valueTraining, siteImages.valueTransforming];
// The Training photograph is portrait, so it is cropped from near the top to keep the speaker's face in the panel.
const photoPosition: Record<number, string> = { 5: "50% 22%" };

const two = (n: number) => String(n).padStart(2, "0");

/**
 * The seven core values as a gallery of photographic panels. On wide screens the panels stand side by side and the
 * one under the pointer (or focused, or tapped) opens out to show its meaning; on phones they stack, all open.
 */
export function Values() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-y relative isolate overflow-hidden bg-gradient-to-br from-[#f0f9f3] via-[#e3f4ec] to-[#d5eee8] text-navy-900">
      <div aria-hidden className="absolute -left-48 top-0 -z-10 size-[38rem] rounded-full bg-white/60 blur-3xl" />
      <div aria-hidden className="absolute -bottom-48 -right-40 -z-10 size-[36rem] rounded-full bg-[#bfe6dc]/60 blur-3xl" />

      <div className="container-page">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-navy-900/10 bg-white/70 px-4 py-2 text-flame-700">
              <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
              Our values
            </p>
            <h2 className="mt-6 font-serif text-[2.75rem] font-normal leading-[1.02] tracking-[-0.01em] sm:text-6xl lg:text-[4.5rem]">
              7 Core <em className="bg-sunset bg-clip-text pr-1 text-transparent">Values</em>
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-slate lg:text-right">The values every chapter of the fellowship holds to, in every nation where it meets.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="mt-12 flex flex-col gap-3 lg:mt-16 lg:h-[min(34rem,72svh)] lg:flex-row">
            {values.map(({ title, description, icon: Icon }, i) => {
              const open = i === active;
              return (
                <li key={title} className={cn("relative h-52 min-w-0 overflow-hidden rounded-3xl text-white shadow-[0_30px_60px_-35px_rgba(20,11,51,0.6)] transition-[flex-grow] duration-700 ease-premium lg:h-auto lg:basis-0", open ? "lg:grow-[6]" : "lg:grow")}>
                  <button type="button" aria-expanded={open} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className="group absolute inset-0 block w-full text-left">
                    <Image src={photos[i].src} alt="" fill sizes="(min-width: 1024px) 50vw, 92vw" style={{ objectPosition: photoPosition[i] }} className={cn("object-cover transition-transform duration-[1400ms] ease-premium", open ? "scale-100" : "scale-110")} />
                    <span aria-hidden className={cn("absolute inset-0 transition-colors duration-700", open ? "bg-navy-950/25" : "bg-navy-950/25 lg:bg-navy-950/70")} />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />

                    {/* Closed panel on wide screens: the number, and the name running up the side */}
                    <span aria-hidden className={cn("absolute inset-0 hidden flex-col items-center justify-between py-7 transition-opacity duration-300 lg:flex", open ? "opacity-0" : "opacity-100 delay-300")}>
                      <span className="font-serif text-2xl text-flame-300">{two(i + 1)}</span>
                      <span className="rotate-180 whitespace-nowrap font-serif text-2xl tracking-wide [writing-mode:vertical-rl]">{title}</span>
                    </span>

                    {/* Open panel: always shown on phones */}
                    <span className={cn("absolute inset-x-0 bottom-0 block w-full p-6 transition-opacity duration-500 sm:p-8 lg:w-[34rem] lg:max-w-none", open ? "lg:opacity-100 lg:delay-300" : "lg:opacity-0")}>
                      <span className="flex items-center gap-4">
                        <span aria-hidden className="bg-sunset grid size-12 shrink-0 place-items-center rounded-full text-on-flame">
                          <Icon strokeWidth={1.6} className="size-6" />
                        </span>
                        <span className="eyebrow text-flame-300">
                          {two(i + 1)} <span className="text-white/50">/ {two(values.length)}</span>
                        </span>
                      </span>
                      <span className="mt-4 block font-serif text-4xl leading-none sm:text-5xl lg:text-6xl">{title}</span>
                      <span className="mt-3 block max-w-md leading-relaxed text-white/85 lg:text-lg">{description}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
