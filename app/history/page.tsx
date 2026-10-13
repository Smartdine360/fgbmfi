import Image from "next/image";
import { siteImages } from "@/data/images";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { FounderSection } from "@/components/sections/FounderSection";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Our History",
  description: "The story of the Full Gospel Business Men's Fellowship International, founded in Los Angeles in 1952 by Demos Shakarian, and of the fellowship in Singapore.",
  path: "/history",
});

/**
 * International milestones are drawn from published reference material about
 * FGBMFI. Please confirm the wording with FGBMFI International before launch.
 */
const timeline = [
  { year: "1952", title: "A fellowship begins in Los Angeles", text: "Demos Shakarian, a California rancher, founds the Full Gospel Business Men's Fellowship International with a simple idea: business people telling other business people what God has done in their lives." },
  { year: "The early years", title: "A slow start, then a voice", text: "For its first year the original group met weekly with little visible result. Then a gift of $1,000 made it possible to launch a small publication, Full Gospel Business Men's Voice, and the stories began to travel." },
  { year: "1972", title: "A movement of hundreds of thousands", text: "Twenty years on, membership had grown to around 300,000 as chapters multiplied from city to city." },
  { year: "1988", title: "Across ninety nations", text: "By 1988 the fellowship counted some 3,000 chapters in 90 countries — a network of local gatherings held together by a shared purpose." },
  { year: "1993", title: "A new generation of leadership", text: "Following the death of Demos Shakarian, his son Richard Shakarian assumed leadership of the organisation." },
  { year: "2023", title: "The work continues", text: "Francis Owusu was elected international president, as the fellowship continues its work around the world." },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        medium
        serif
        title="Where it all began."
        image={siteImages.joinHero}
        imageClassName="object-[center_45%]"
        crumbs={[{ label: "History" }]}
      />

      <FounderSection showLink={false} />

      {/* The founder's vision, as a pull quote */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-sand via-ivory to-flame-200/50 py-16 md:py-24">
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[32rem] rounded-full bg-navy-600/15 blur-3xl" />
        <Reveal className="container-page mx-auto max-w-5xl text-center">
          <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 text-flame-700">
            <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
            The vision
          </p>
          <blockquote className="mt-8 font-serif text-[1.75rem] leading-[1.2] tracking-[-0.01em] text-navy-900 sm:text-4xl lg:text-[2.75rem]">
            “I saw millions of men around the world… Their faces were dead, lifeless. Then the vision changed. The men were now joyous, with hands raised, praising God.{" "}
            <em className="bg-sunset bg-clip-text pr-1 text-transparent">They were the happiest people on earth!”</em>
          </blockquote>
          <p className="eyebrow mt-7 text-slate">Demos Shakarian</p>
          <span aria-hidden className="bg-sunset mx-auto mt-8 block h-[3px] w-16 rounded-full" />
          <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-slate sm:text-[1.05rem]">
            This vision gave birth to a movement that crossed denominations, cultures and nationalities. The same spirit fuels FGBMFI Singapore today, as laymen hear the personal testimonies of FGB men from chapters across Asia.
          </p>
        </Reveal>
      </section>

      {/* Milestones: cards alternating either side of a central line, over a photograph of the fellowship */}
      <section className="section-y relative isolate overflow-hidden bg-navy-950 text-white">
        <Image src={siteImages.introGroup.src} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950 via-navy-950/80 to-navy-950" />
        <div aria-hidden className="absolute -right-40 top-1/3 -z-10 size-[36rem] rounded-full bg-flame-500/20 blur-3xl" />
        <div className="container-page">
          <Reveal className="text-center">
            <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-flame-300 backdrop-blur-sm">
              <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
              Milestones
            </p>
            <h2 className="mt-6 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] sm:text-6xl lg:text-[4rem]">
              Seven decades, <em className="pr-1 text-flame-300">one calling.</em>
            </h2>
          </Reveal>

          <ol className="relative mt-14 space-y-8 lg:mt-20 lg:space-y-0">
            <span aria-hidden className="absolute bottom-4 left-[1.1rem] top-4 w-px bg-gradient-to-b from-flame-400 via-white/25 to-transparent lg:left-1/2" />
            {timeline.map((t, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal as="li" key={t.year} className="group relative pl-14 lg:grid lg:grid-cols-2 lg:pl-0 lg:[&:not(:first-child)]:-mt-10">
                  {/* Marker on the line */}
                  <span aria-hidden className="bg-sunset absolute left-0 top-8 grid size-9 place-items-center rounded-full font-serif text-sm text-on-flame shadow-[0_0_0_6px_var(--color-navy-950)] lg:left-1/2 lg:-translate-x-1/2">
                    {i + 1}
                  </span>
                  <div className={cn("rounded-3xl border border-white/15 bg-white/[0.07] p-7 backdrop-blur-md transition-[transform,border-color,background-color] duration-500 ease-premium group-hover:-translate-y-1 group-hover:border-flame-300/50 group-hover:bg-white/10 sm:p-8", right ? "lg:col-start-2 lg:ml-14" : "lg:mr-14 lg:text-right")}>
                    <p className="font-serif text-5xl leading-none text-flame-300 sm:text-6xl">{t.year}</p>
                    <h3 className="mt-5 font-serif text-2xl font-normal leading-snug tracking-normal sm:text-[1.75rem]">{t.title}</h3>
                    <p className="mt-3 leading-relaxed text-white/75">{t.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <CTASection title="Be part of what comes next." lead="The next page of this story will be written by the people who show up. We would be glad for you to be one of them." />
    </>
  );
}
