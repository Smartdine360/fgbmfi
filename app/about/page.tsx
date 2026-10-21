import Image from "next/image";
import { siteImages } from "@/data/images";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/Hero";
import { LeaderSpotlight } from "@/components/sections/LeaderSpotlight";
import { VisionMission } from "@/components/sections/VisionMission";
import { Values } from "@/components/sections/Values";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";

export const metadata = pageMetadata({
  title: "About",
  description: "FGBMFI Singapore: our mission, the Chapter President, and the latest from the fellowship.",
  path: "/about",
});

const mission = [
  "To reach men in all nations for Jesus Christ.",
  "To call men back to God.",
  "To help believers to be baptized in The Holy Spirit and to grow spiritually.",
  "To train and equip men to fulfill the Great Commission.",
  "To provide an opportunity for Christian fellowship.",
  "To bring unity among all people in the body of Christ.",
];

const pill = "eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 text-flame-700";
const heading = "mt-6 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-navy-900 sm:text-6xl lg:text-[4rem]";
const accent = "bg-sunset bg-clip-text pr-1 text-transparent";
const dot = <span aria-hidden className="bg-sunset size-1.5 rounded-full" />;

export default function AboutPage() {
  return (
    <>
      <Hero scrollHref="#mission" />

      {/* Mission statement: the heading beside the group photograph, then the six points as a compact grid */}
      <section id="mission" className="section-y relative isolate scroll-mt-16 overflow-hidden bg-gradient-to-br from-sand via-ivory to-flame-200/50">
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[32rem] rounded-full bg-navy-600/15 blur-3xl" />
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal>
                <p className={pill}>
                  {dot}
                  Our Mission Statement
                </p>
                <h2 className={heading}>
                  Six things we are <em className={accent}>here to do.</em>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="relative lg:col-span-5">
              {/* Tilted accent panel behind the photograph */}
              <div aria-hidden className="bg-sunset absolute inset-0 rotate-2 rounded-[2.25rem] opacity-90" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-navy-900 shadow-[0_40px_80px_-40px_rgba(20,11,51,0.7)]">
                <Image src={siteImages.aboutGroup.src} alt={siteImages.aboutGroup.alt} fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover" />
              </div>
            </Reveal>
          </div>

          <Stagger as="ol" className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {mission.map((m, i) => (
              <StaggerItem
                as="li"
                key={m}
                className="group relative flex items-start gap-5 overflow-hidden rounded-3xl border border-line bg-white p-7 transition-[transform,box-shadow] duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgba(20,11,51,0.5)]"
              >
                {/* Sunset bar that draws across the top on hover */}
                <span aria-hidden className="bg-sunset absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-premium group-hover:scale-x-100" />
                <span aria-hidden className={`font-serif text-5xl leading-[0.9] ${accent}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-serif text-xl leading-snug text-navy-900">{m}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The Chapter President of FGBMFI Singapore */}
      <LeaderSpotlight />

      {/* Our vision and mission, with the mission video */}
      <VisionMission />

      {/* The seven core values: the same section as on the home page */}
      <Values />

      <CTASection />
    </>
  );
}
