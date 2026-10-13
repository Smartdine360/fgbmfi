import Image from "next/image";
import { Building2, Flame, Globe2, Landmark, Lightbulb, Users } from "lucide-react";
import { numbered, siteImages } from "@/data/images";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Asia Pacific Prayer Altar 2026",
  description: "A regional movement calling men and women across the Asia Pacific to stand in the gap, seeking God's transformative power for our nations, marketplaces, and leaders.",
  path: "/prayer-altar-2026",
});

// What the altar stands in the gap for, from the opening statement.
const standingFor = [
  { label: "Our nations", icon: Landmark },
  { label: "Our marketplaces", icon: Building2 },
  { label: "Our leaders", icon: Users },
];

const focus = [
  { title: "Regional Unity", text: "Bringing together chapters from across the Asia Pacific region to pray with one voice, transcending borders and cultural differences.", icon: Globe2, image: numbered("gallery", 2, "Men praying together, hand in hand"), position: "object-[45%_center]" },
  { title: "Marketplace Revival", text: "Interceding for an outpouring of the Holy Spirit in our workplaces, transforming corporate environments with integrity and faith.", icon: Flame, image: numbered("gallery", 1, "A member in prayer, hands pressed together"), position: "object-center" },
  { title: "Leadership & Wisdom", text: "Seeking Godly wisdom for our national and business leaders as they navigate the complexities of global and regional challenges.", icon: Lightbulb, image: numbered("gallery", 3, "A leader in worship among the members"), position: "object-[64%_center]" },
];

// Shared looks for the section labels and headings on this page.
const pill = "eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 text-flame-700";
const heading = "mt-6 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-navy-900 sm:text-6xl lg:text-[4rem]";
const accent = "bg-sunset bg-clip-text pr-1 text-transparent";

export default function PrayerAltarPage() {
  return (
    <>
      <PageHero
        medium
        serif
        title="Asia Pacific Prayer Altar 2026."
        image={siteImages.purposePrayer}
        crumbs={[{ label: "Prayer Altar 2026" }]}
      />

      {/* The opening statement, set large, with what the altar stands in the gap for beneath it */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-sand via-ivory to-flame-200/50 py-16 md:py-24">
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[32rem] rounded-full bg-navy-600/15 blur-3xl" />
        <div className="container-page">
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className={pill}>
              <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
              United in Intercession
            </p>
            <p className="mt-8 font-serif text-[1.75rem] leading-[1.2] tracking-[-0.01em] text-navy-900 sm:text-4xl lg:text-[2.75rem]">
              A regional movement calling men and women across the Asia Pacific to <em className={accent}>stand in the gap,</em> seeking God&apos;s transformative power for our nations, marketplaces, and leaders.
            </p>
          </Reveal>
          <Stagger as="ul" className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {standingFor.map(({ label, icon: Icon }) => (
              <StaggerItem as="li" key={label} className="flex items-center gap-4 rounded-full border border-line bg-white/80 py-2.5 pl-2.5 pr-6 shadow-[0_20px_40px_-30px_rgba(20,11,51,0.5)]">
                <span aria-hidden className="bg-sunset grid size-11 shrink-0 place-items-center rounded-full text-on-flame">
                  <Icon className="size-5" />
                </span>
                <span className="font-serif text-xl text-navy-900">{label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The vision for 2026: photograph on the left, the words on the right */}
      <section className="section-y relative isolate overflow-hidden">
        <div aria-hidden className="absolute -right-40 top-10 -z-10 size-[30rem] rounded-full bg-flame-400/10 blur-3xl" />
        <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="relative lg:col-span-6">
            {/* Tilted accent panel behind the photograph */}
            <div aria-hidden className="bg-sunset absolute inset-0 -rotate-2 rounded-[2.25rem] opacity-90" />
            <ImageReveal className="aspect-[4/3] rounded-[2rem] bg-navy-900 shadow-[0_40px_80px_-40px_rgba(20,11,51,0.7)]">
              <Image src={siteImages.visionWorship.src} alt="People united in prayer" fill sizes="(min-width: 1024px) 48vw, 92vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <p className="eyebrow text-flame-300">Asia Pacific</p>
                <p className="mt-1 font-serif text-2xl sm:text-3xl">People united in prayer</p>
              </div>
            </ImageReveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <p className={cn(pill, "bg-sand")}>
                <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
                Our Vision for 2026
              </p>
              <h2 className={heading}>
                A united <em className={accent}>spiritual front.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 border-l-2 border-flame-400 pl-5 sm:pl-6">
              <p className="text-lg font-medium leading-relaxed text-navy-900 sm:text-xl">As we approach 2026 amidst geopolitical shifts and economic fragmentation, the need for a united spiritual front has never been greater.</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-6 leading-relaxed text-slate sm:text-[1.05rem]">
              <p>The Asia Pacific Prayer Altar is a dedicated space and time for believers to seek divine guidance, protection, and revival for our communities.</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-9">
              <Button href="#join" variant="navy">
                Join the Altar
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The three prayer focuses: arched photographs on a dark ground, with the words beneath each */}
      <section className="section-y relative isolate overflow-hidden bg-navy-950 text-white">
        <div aria-hidden className="absolute -left-48 top-0 -z-10 size-[38rem] rounded-full bg-navy-600/30 blur-3xl" />
        <div aria-hidden className="absolute -bottom-48 -right-40 -z-10 size-[36rem] rounded-full bg-flame-500/20 blur-3xl" />
        <div className="container-page">
          <Reveal className="text-center">
            <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-flame-300">
              <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
              What we are praying for
            </p>
            <h2 className="mt-6 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] sm:text-6xl lg:text-[4rem]">
              Three fires on <em className="pr-1 text-flame-300">one altar.</em>
            </h2>
          </Reveal>

          {/* Three arched frames, like windows in a chapel; the middle one sits a little lower */}
          <Stagger as="ol" className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-12">
            {focus.map(({ title, text, icon: Icon, image, position }, i) => (
              <StaggerItem as="li" key={title} className={cn("group flex flex-col items-center text-center", i === 1 && "lg:mt-16", i === 2 && "sm:col-span-2 lg:col-span-1")}>
                <div className="relative w-full max-w-[21rem]">
                  {/* Glow behind the arch, brightening on hover */}
                  <div aria-hidden className="bg-sunset absolute inset-4 -z-10 rounded-t-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
                  {/* The sunset ring is this wrapper's background showing around the photograph */}
                  <div className="bg-sunset rounded-b-[2rem] rounded-t-[10.5rem] p-[3px]">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-b-[calc(2rem-3px)] rounded-t-[calc(10.5rem-3px)] bg-navy-900">
                      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 21rem, 92vw" className={cn("object-cover transition-transform duration-[1600ms] ease-premium group-hover:scale-110", position)} />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                      <span aria-hidden className="absolute inset-x-0 bottom-12 font-serif text-7xl leading-none text-white/90">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <span aria-hidden className="bg-sunset absolute -bottom-7 left-1/2 grid size-16 -translate-x-1/2 place-items-center rounded-full border-[5px] border-navy-950 text-on-flame">
                    <Icon className="size-6" />
                  </span>
                </div>
                <h3 className="mt-14 font-serif text-3xl font-normal tracking-normal sm:text-4xl">{title}</h3>
                <span aria-hidden className="bg-sunset mt-5 block h-[3px] w-12 rounded-full transition-[width] duration-500 ease-premium group-hover:w-24" />
                <p className="mt-5 max-w-sm leading-relaxed text-white/75">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="join" className="section-y scroll-mt-10">
        <div className="container-page">
          <Reveal className="bg-sunset relative isolate grid items-center gap-8 overflow-hidden rounded-[2rem] p-8 text-on-flame shadow-[0_50px_100px_-50px_color-mix(in_srgb,var(--color-flame-400)_80%,transparent)] sm:p-12 lg:grid-cols-12 lg:p-16">
            {/* Altar rings */}
            <div aria-hidden className="absolute -right-24 top-1/2 -z-10 size-[30rem] -translate-y-1/2 rounded-full border border-on-flame/20" />
            <div aria-hidden className="absolute -right-8 top-1/2 -z-10 size-[20rem] -translate-y-1/2 rounded-full border border-on-flame/20" />
            <Flame aria-hidden strokeWidth={1} className="absolute right-10 top-1/2 -z-10 hidden size-40 -translate-y-1/2 text-on-flame/15 lg:block" />
            <div className="lg:col-span-8">
              <p className="eyebrow inline-flex items-center gap-2.5 rounded-full bg-on-flame/15 px-4 py-2">
                <span aria-hidden className="size-1.5 rounded-full bg-on-flame" />
                Join the Altar
              </p>
              <h2 className="mt-6 font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
                Prepare your hearts and <em>stand with us.</em>
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-on-flame/90 sm:text-lg">Regular virtual prayer gatherings and localized physical altars will be established leading up to and throughout 2026.</p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Button href="/contact" variant="navy">
                Register Your Interest
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
