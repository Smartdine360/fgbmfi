import Image from "next/image";
import { Anchor, Building2, Globe2, Landmark, MonitorSmartphone, Scale, TrendingDown, Users } from "lucide-react";
import { siteImages } from "@/data/images";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ImageReveal, Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Marketplace Evangelism",
  description: "Bringing faith, integrity and transformation into the corporate spheres of Singapore, guided by an understanding of our unique geopolitical landscape.",
  path: "/evangelism",
});

// The setting for marketplace evangelism in Singapore, period by period.
// `points`, where given, are the numbered elements of the era; `after` is the paragraph that follows them.
const periods: Array<{ years: string; title: string; text: string; points?: Array<{ title: string; text: string }>; after?: string; icon: typeof Globe2 }> = [
  {
    years: "2000 - 2010",
    title: "Global Integration & Rapid Expansion",
    text: "In the year 2000, Singapore was navigating the aftermath of the Asian Financial Crisis. Key elements shaping this era included:",
    points: [
      {
        title: "Navigating Regional Security",
        text: "Indonesia and Malaysia experienced domestic political transitions and internal challenges following the 1997 Asian Financial Crisis, creating a sense of regional disarray that affected Singapore.",
      },
      {
        title: "Pioneering new Free Trade Pacts & Global Economic Outreach",
        text: "Singapore actively laid the groundwork for further trade pacts with nations including Japan, Australia, and the United States to anchor foreign interests in its security.",
      },
      {
        title: "Securing International Representation",
        text: "Singapore hosted the ASEAN informal summit in November 2000 and launched the initiative for ASEAN integration to support newer members like Vietnam, Laos, Cambodia and Myanmar.",
      },
    ],
    after:
      "As the nation rapidly integrated into the global economy, it positioned itself as a hyper-connected financial hub. The influx of multi-national corporations created unprecedented wealth, but also introduced a high-pressure, performance-driven culture where identities became tied solely to corporate success.",
    icon: Globe2,
  },
  {
    years: "2011 - 2019",
    title: "Strategic Balancing & Digital Shift",
    text: "Amidst rising geopolitical tensions between East and West, Singapore maintained a delicate neutral balance, acting as a crucial bridge for global trade. The rapid digitalization of the economy transformed industries, requiring modern professionals to adapt constantly, increasing stress and the search for deeper meaning.",
    icon: Scale,
  },
  {
    years: "2020 - 2026",
    title: "Economic Fragmentation & Unprecedented Volatility",
    text: "The global pandemic thoroughly disrupted traditional supply chains, setting the stage for a highly volatile decade. Today, in 2026, Singapore's geopolitical landscape is explicitly defined by extreme economic fragmentation. This is directly fueled by active, ongoing conflicts in the Middle East and stringent trade barriers—most notably a heavy 12.5% US import tariff on Singaporean exports. Amidst these compounding global uncertainties, there is an urgent demand for corporate resilience and ethical leadership, creating a critical window for marketplace evangelism to offer hope and unwavering stability.",
    icon: TrendingDown,
  },
];

const challenges = [
  { title: "Generational Succession and Youth Engagement", text: "Passing the baton to the next generation of marketplace leaders amidst a changing corporate culture.", icon: Users },
  { title: "Digital Transformation and Modern Outreach", text: "Leveraging Singapore's ultra-fast digital infrastructures to expand and modernize ministry efforts.", icon: MonitorSmartphone },
  { title: "Economic Pressures on Business and FGB Leaders", text: "Enduring trade fragmentation, import tariffs, and rising operational costs without losing spiritual focus.", icon: Building2 },
  { title: "Navigating Regional and Religious Restrictions", text: "Operating with profound wisdom and sensitivity within an increasingly complex geopolitical and cultural climate.", icon: Landmark },
  { title: "Maintaining Core Identity vs. Modern Relevance", text: "Staying firmly anchored to foundational Christian truths while adapting to the intense demands of the 2026 marketplace.", icon: Anchor },
];

// One photograph per challenge, in the same order as `challenges`.
const challengePhotos = [siteImages.evangelismYouth, siteImages.evangelismOutreach, siteImages.evangelismLeaders, siteImages.evangelismNations, siteImages.evangelismIdentity];

// Shared looks for the section labels and headings on this page.
const pill = "eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 text-flame-700";
const heading = "mt-6 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-navy-900 sm:text-6xl lg:text-[4rem]";
const accent = "bg-sunset bg-clip-text pr-1 text-transparent";
const dot = <span aria-hidden className="bg-sunset size-1.5 rounded-full" />;

export default function EvangelismPage() {
  return (
    <>
      <PageHero medium serif title="Marketplace Evangelism." image={siteImages.evangelismHero} crumbs={[{ label: "Evangelism" }]} />

      {/* The call to action, set large */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-sand via-ivory to-flame-200/50 py-16 md:py-24">
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[32rem] rounded-full bg-navy-600/15 blur-3xl" />
        <div className="container-page">
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className={pill}>
              {dot}
              Our Call to Action
            </p>
            <p className="mt-8 font-serif text-[1.75rem] leading-[1.2] tracking-[-0.01em] text-navy-900 sm:text-4xl lg:text-[2.75rem]">
              Bringing <em className={accent}>faith, integrity, and transformation</em> into the corporate spheres of Singapore, guided by an understanding of our unique geopolitical landscape.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Context and opportunity: the overview, beside a photograph */}
      <section className="section-y relative isolate overflow-hidden">
        <div aria-hidden className="absolute -right-40 top-10 -z-10 size-[30rem] rounded-full bg-flame-400/10 blur-3xl" />
        <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className={cn(pill, "bg-sand")}>
                {dot}
                Context &amp; Opportunity
              </p>
              <h2 className={cn(heading, "lg:text-[3.5rem]")}>
                Singapore Geopolitical Scenarios <em className={cn(accent, "whitespace-nowrap")}>(2000 - 2026)</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 border-l-2 border-flame-400 pl-5 leading-relaxed text-slate sm:pl-6 sm:text-[1.05rem]">
              <p>
                Singapore&apos;s strategic position has shaped an incredible, yet demanding corporate environment over the past two decades. Recognized as one of the most dynamic and prosperous nations globally, characterized by the ultra-fast deployment of digital
                infrastructures, our commercial sectors, housing, transportation networks, and healthcare systems are in a state of continuous restructuring and upgrading. However, we now face new transitional challenges as leadership passes to a younger cabinet tasked
                with realigning policies—primarily to navigate escalating geopolitical uncertainties around the world. Understanding this profound evolution highlights the urgent need for spiritual grounding and steadfast fellowship in the modern marketplace.
              </p>
            </Reveal>
          </div>
          <div className="relative lg:col-span-5">
            {/* Tilted accent panel behind the photograph */}
            <div aria-hidden className="bg-sunset absolute inset-0 rotate-2 rounded-[2.25rem] opacity-90" />
            <ImageReveal className="aspect-[4/5] rounded-[2rem] bg-navy-900 shadow-[0_40px_80px_-40px_rgba(20,11,51,0.7)]">
              <Image src={siteImages.evangelismSpeaker.src} alt={siteImages.evangelismSpeaker.alt} fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover" />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* The three periods as a timeline down a line */}
      <section className="section-y relative isolate overflow-hidden bg-navy-950 text-white">
        <div aria-hidden className="absolute -left-48 top-0 -z-10 size-[38rem] rounded-full bg-navy-600/30 blur-3xl" />
        <div aria-hidden className="absolute -bottom-48 -right-40 -z-10 size-[36rem] rounded-full bg-flame-500/20 blur-3xl" />
        <div className="container-page">
          <ol className="relative space-y-16 lg:space-y-24">
            <span aria-hidden className="absolute bottom-2 left-7 top-2 w-px bg-gradient-to-b from-flame-400 via-white/20 to-transparent lg:left-[calc(33.333%+1.75rem)]" />
            {periods.map(({ years, title, text, points, after, icon: Icon }) => (
              <Reveal as="li" key={years} className="relative grid gap-6 pl-20 lg:grid-cols-3 lg:gap-0 lg:pl-0">
                {/* Marker on the line */}
                <span aria-hidden className="bg-sunset absolute left-0 top-0 grid size-14 place-items-center rounded-full text-on-flame shadow-[0_0_0_8px_var(--color-navy-950)] lg:left-1/3">
                  <Icon className="size-6" />
                </span>
                <p className="font-serif text-5xl leading-none text-flame-300 lg:pr-12 lg:pt-1 lg:text-right lg:text-6xl">{years}</p>
                <div className="lg:col-span-2 lg:pl-28">
                  <h3 className="font-serif text-3xl font-normal leading-tight tracking-normal sm:text-4xl">{title}</h3>
                  <p className="mt-5 leading-relaxed text-white/80 sm:text-[1.05rem]">{text}</p>
                  {points && (
                    <ol className="mt-6 space-y-4">
                      {points.map((point, n) => (
                        <li key={point.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:gap-4 sm:p-5">
                          <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-flame-400/25 font-serif text-flame-300">
                            {n + 1}
                          </span>
                          <p className="leading-relaxed text-white/80">
                            <strong className="font-semibold text-white">{point.title}</strong>—{point.text}
                          </p>
                        </li>
                      ))}
                    </ol>
                  )}
                  {after && <p className="mt-6 leading-relaxed text-white/80 sm:text-[1.05rem]">{after}</p>}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Why this matters, and the five challenges running in parallel */}
      <section className="section-y relative isolate overflow-hidden bg-gradient-to-br from-[#fff4ea] via-[#ffeadb] to-[#ffdccb]">
        <div className="container-page">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className={pill}>
              {dot}
              Standing in the gap
            </p>
            <h2 className={heading}>
              Why This Matters for <em className={accent}>Evangelism</em>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-navy-900/85 sm:text-xl">
              In a landscape defined by rapid economic shifts, geopolitical pressures, and intense corporate demands, leaders and workers alike are searching for an anchor. FGBMFI Singapore stands in the gap, equipping men to live out their faith authentically,
              bringing integrity, peace, and the transformative power of the Holy Spirit directly into the offices and boardrooms shaping our nation&apos;s future.
            </p>
          </Reveal>

          {/* The 73rd-year statement as a banner, then the five challenges as photographs along a winding path */}
          <Reveal delay={0.1} className="relative isolate mx-auto mt-14 flex max-w-4xl flex-col items-center gap-5 overflow-hidden rounded-[2rem] bg-navy-900 px-8 py-7 text-center text-white shadow-[0_40px_80px_-45px_rgba(20,11,51,0.8)] sm:flex-row sm:gap-8 sm:rounded-full sm:px-12 sm:text-left lg:mt-16">
            <div aria-hidden className="absolute -right-20 top-1/2 -z-10 size-72 -translate-y-1/2 rounded-full bg-flame-400/30 blur-3xl" />
            <p className="shrink-0 font-serif text-7xl leading-none text-flame-300">73</p>
            <span aria-hidden className="hidden h-14 w-px shrink-0 bg-white/20 sm:block" />
            <p className="font-serif text-xl leading-snug sm:text-2xl">The challenges for FGBMFI, now in its 73rd year of existence, are running in parallel with these national shifts:</p>
          </Reveal>

          {/* The five challenges as rows: photograph on one side, words on the other, swapping sides each row */}
          <ol className="mt-16 space-y-14 lg:mt-24 lg:space-y-24">
            {challenges.map(({ title, text, icon: Icon }, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={title} className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
                  <div className={cn("relative", flip && "lg:order-2")}>
                    {/* Tilted accent panel behind the photograph, leaning the opposite way on alternate rows */}
                    <div aria-hidden className={cn("bg-sunset absolute inset-0 rounded-[2.25rem] opacity-90 transition-transform duration-700 ease-premium", flip ? "rotate-2 group-hover:rotate-3" : "-rotate-2 group-hover:-rotate-3")} />
                    <ImageReveal className="aspect-[16/10] rounded-[2rem] bg-navy-900 shadow-[0_40px_80px_-40px_rgba(20,11,51,0.7)]">
                      <Image src={challengePhotos[i].src} alt={challengePhotos[i].alt} fill sizes="(min-width: 1024px) 44vw, 92vw" className="object-cover transition-transform duration-[1600ms] ease-premium group-hover:scale-105" />
                    </ImageReveal>
                    <span aria-hidden className={cn("absolute -bottom-6 grid size-20 place-items-center rounded-full border-[6px] border-[#ffeadb] bg-navy-900 text-flame-300 shadow-xl", flip ? "left-8" : "right-8")}>
                      <Icon strokeWidth={1.5} className="size-8" />
                    </span>
                  </div>

                  <Reveal delay={0.1} className={cn("pt-4 lg:pt-0", flip && "lg:order-1")}>
                    <p aria-hidden className={cn("font-serif text-7xl leading-none sm:text-8xl", accent)}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-6 font-serif text-3xl font-normal leading-[1.1] tracking-[-0.01em] text-navy-900 sm:text-[2.5rem]">{title}</h3>
                    <p className="mt-5 border-l-2 border-flame-400 pl-5 text-lg leading-relaxed text-slate">{text}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <CTASection title="Take faith to work with us." lead="Meet men who are living out their faith in Singapore's marketplace, and find your place alongside them." primary={{ label: "Connect With Us", href: "/contact" }} secondary={{ label: "Our Initiatives", href: "/initiatives" }} />
    </>
  );
}
