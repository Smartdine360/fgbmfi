"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Users } from "lucide-react";
import { siteImages } from "@/data/images";
import { Button } from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: EASE } });

/** The video hero of the About page. `scrollHref` is the section its "Our Story" button and "Scroll" link jump to. */
export function Hero({ scrollHref = "#founder" }: { scrollHref?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-950 pt-28">
      {/* Background video (/public/home1.mp4); the skyline photograph shows while it loads */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20 will-change-transform">
        <video src="/home1.mp4" poster={siteImages.hero.src} autoPlay muted loop playsInline preload="auto" aria-hidden className="absolute inset-0 size-full object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/30" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/85 via-navy-950/30 to-transparent" />

      <div className="container-page pb-10 lg:pb-14">
        <div className="max-w-5xl">
          <motion.p {...fadeUp(0.2)} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 py-2 pl-3 pr-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            <Users aria-hidden className="size-4 text-flame-300" />
            About Us
            <span aria-hidden className="size-1 rounded-full bg-flame-300" />
            FGBMFI Singapore
          </motion.p>
          <motion.h1 {...fadeUp(0.35)} className="max-w-4xl font-serif text-[2.6rem] font-normal leading-[1.04] tracking-[-0.01em] text-white sm:text-6xl lg:text-7xl">
            Who we are and why we <em className="pr-[0.06em] text-flame-300">gather.</em>
          </motion.h1>
          <motion.p {...fadeUp(0.6)} className="mt-6 max-w-2xl font-serif text-xl italic leading-snug text-white/85 sm:text-2xl">
            Our mission, our vision, and the man who leads us.
          </motion.p>
          <motion.div {...fadeUp(0.9)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href={scrollHref} fullOnMobile>
              Our Story
            </Button>
            <Button href="/contact" variant="outline-light" fullOnMobile>
              Join the Fellowship
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.a
        {...fadeUp(1.1)}
        href={scrollHref}
        className="absolute bottom-10 right-5 hidden min-h-11 items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/80 hover:text-white sm:right-8 sm:flex lg:bottom-14 lg:right-12"
      >
        Scroll
        <span aria-hidden className="relative block h-8 w-px overflow-hidden bg-white/25">
          <motion.span className="absolute inset-x-0 top-0 h-3 bg-flame-300" animate={{ y: [-12, 32] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </motion.a>
    </section>
  );
}
