import Image from "next/image";
import { HeartHandshake, Megaphone, ShieldCheck } from "lucide-react";
import { siteImages } from "@/data/images";
import { nationalLeader } from "@/data/leadership";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

const pillars = [
  { icon: HeartHandshake, title: "Fellowship", note: "Meeting over a meal to pray and encourage one another." },
  { icon: ShieldCheck, title: "Integrity", note: "Leaders strengthened to act rightly when it is costly." },
  { icon: Megaphone, title: "Witness", note: "Good news shared by people who know your world." },
];

export function Intro() {
  return (
    <section id="introduction" className="section-y relative isolate scroll-mt-16 overflow-hidden">
      <div aria-hidden className="absolute -left-48 top-1/3 -z-10 size-[34rem] rounded-full bg-flame-400/10 blur-3xl" />
      <div aria-hidden className="absolute -right-40 -top-32 -z-10 size-[30rem] rounded-full bg-navy-600/10 blur-3xl" />

      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="relative mx-auto w-full max-w-md pb-10 lg:col-span-5 lg:max-w-none">
          {/* Tilted accent panel behind the photograph */}
          <div aria-hidden className="bg-sunset absolute inset-x-0 bottom-10 top-0 -rotate-3 rounded-[2.25rem] opacity-90" />
          {/* Portrait crop held a little to the right of the photograph, where he stands */}
          <ImageReveal className="aspect-[4/5] w-full rounded-[2rem] bg-navy-900 shadow-[0_40px_80px_-40px_rgba(20,11,51,0.7)]">
            <Image src={siteImages.introPortrait.src} alt={siteImages.introPortrait.alt} fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover object-[70%_center]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <p className="eyebrow text-flame-300">{nationalLeader.position}</p>
              <p className="mt-1 font-serif text-3xl font-normal sm:text-4xl">{nationalLeader.name}</p>
              <p className="mt-1 text-sm text-white/75">FGBMFI Singapore</p>
            </div>
          </ImageReveal>
          <ImageReveal delay={0.25} className="absolute! -right-2 bottom-0 aspect-square w-[36%] rounded-3xl border-[6px] border-ivory bg-navy-900 shadow-xl sm:-right-6">
            <Image src={siteImages.introDetail.src} alt={siteImages.introDetail.alt} fill sizes="(min-width: 1024px) 15vw, 34vw" className="object-cover" />
          </ImageReveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2.5 rounded-full bg-sand px-4 py-2 text-flame-700">
              <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
              Who we are
            </p>
            <h2 className="mt-6 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-navy-900 sm:text-6xl lg:text-[4rem]">
              A fellowship built to <em className="bg-sunset bg-clip-text pr-1 text-transparent">make an impact.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 border-l-2 border-flame-400 pl-5 sm:pl-6">
            <p className="text-lg font-medium leading-relaxed text-navy-900 sm:text-xl">
              FGBMFI Singapore is part of a global fellowship of Christian business leaders, professionals and believers who seek to live out their faith in their families, workplaces and communities.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-7 space-y-5 text-base leading-relaxed text-slate">
            <p>
              We gather around a simple conviction: that faith in Jesus Christ belongs in the whole of life — in the boardroom and on the shop floor as much as in church on Sunday. So we meet, usually over a meal, to encourage one another, to pray, and to hear honest
              stories of what God has done.
            </p>
            <p>
              Out of that fellowship comes something larger. People grow spiritually. Leaders are strengthened to act with integrity when it is costly. Friendships form across industries and generations. And men and women who might never walk into a church hear the
              good news from someone who understands their world.
            </p>
          </Reveal>

          <Stagger as="ul" className="mt-9 grid gap-4 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, note }) => (
              <StaggerItem as="li" key={title} className="rounded-2xl border border-line bg-white/70 p-5 transition-transform duration-500 ease-premium hover:-translate-y-1">
                <span aria-hidden className="bg-sunset grid size-10 place-items-center rounded-xl text-on-flame">
                  <Icon className="size-5" />
                </span>
                <p className="mt-4 font-serif text-xl font-normal text-navy-900">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{note}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-10">
            <Button href="/about" variant="navy">
              More about the fellowship
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
