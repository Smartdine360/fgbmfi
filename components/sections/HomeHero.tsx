import { AE, AM, AU, BD, CN, FJ, GB, HK, HU, IL, IN, JP, KH, LK, MM, MY, NP, NZ, PH, PK, PL, SG, TH, TL, TW, VN } from "country-flag-icons/react/3x2";
import Image from "next/image";
import { siteImages } from "@/data/images";
import { DotGlobe } from "@/components/animations/DotGlobe";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Three rows of nations drifting behind the globe: the same countries as the flags in the Global Leadership picture.
const rows = [
  [
    { Flag: SG, name: "Singapore" },
    { Flag: MY, name: "Malaysia" },
    { Flag: AU, name: "Australia" },
    { Flag: PH, name: "Philippines" },
    { Flag: TH, name: "Thailand" },
    { Flag: VN, name: "Vietnam" },
    { Flag: KH, name: "Cambodia" },
    { Flag: MM, name: "Myanmar" },
    { Flag: TL, name: "Timor-Leste" },
  ],
  [
    { Flag: IN, name: "India" },
    { Flag: NP, name: "Nepal" },
    { Flag: LK, name: "Sri Lanka" },
    { Flag: BD, name: "Bangladesh" },
    { Flag: PK, name: "Pakistan" },
    { Flag: CN, name: "China" },
    { Flag: HK, name: "Hong Kong" },
    { Flag: TW, name: "Taiwan" },
    { Flag: JP, name: "Japan" },
  ],
  [
    { Flag: NZ, name: "New Zealand" },
    { Flag: FJ, name: "Fiji" },
    { Flag: GB, name: "United Kingdom" },
    { Flag: AE, name: "United Arab Emirates" },
    { Flag: AM, name: "Armenia" },
    { Flag: IL, name: "Israel" },
    { Flag: HU, name: "Hungary" },
    { Flag: PL, name: "Poland" },
  ],
];
// Each row is fainter than the one above, so the nations fade away behind the globe.
const rowLooks = ["opacity-100", "opacity-70 [animation-direction:reverse] [--marquee-duration:95s]", "opacity-35 [--marquee-duration:110s]"];

/** Home page hero: nations drifting past a dotted globe centred on Singapore, with the headline beneath. */
export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-950 pt-28 text-white">
      <div aria-hidden className="absolute -left-40 top-0 -z-20 size-[40rem] rounded-full bg-navy-600/35 blur-3xl" />
      <div aria-hidden className="absolute -right-40 top-1/3 -z-20 size-[36rem] rounded-full bg-flame-500/15 blur-3xl" />

      {/* Flags of the nations, fading out at both edges of the screen */}
      <div aria-hidden className="absolute inset-x-0 top-28 -z-10 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] lg:top-32">
        {rows.map((row, r) => (
          <div key={r} className={cn("marquee flex w-max", rowLooks[r])}>
            {/* The row is laid out twice so that the loop has no seam */}
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 gap-4 pr-4">
                {row.map(({ Flag, name }) => (
                  <li key={name} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] py-2 pl-2.5 pr-5 text-sm font-medium text-white/80 backdrop-blur-sm">
                    <Flag className="h-5 w-[1.875rem] rounded-[3px] object-cover" />
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>

      {/*
        The globe with the cut-out portrait in front of it, kept together in one box. On wide screens the box stands on
        the foot of the hero, between the headline and the button, sized from the screen height; on phones it sits
        under the flags and fades out behind the headline.
      */}
      <div className="absolute left-1/2 top-[12rem] -z-10 w-[min(88vw,58svh,34rem)] -translate-x-1/2 lg:bottom-0 lg:top-auto lg:w-[min(42vw,68svh)]">
        <div aria-hidden className="absolute left-1/2 top-[-9%] w-[108%] -translate-x-1/2">
          <div className="absolute inset-[12%] rounded-full bg-navy-600/50 blur-3xl" />
          <DotGlobe className="relative w-full [mask-image:linear-gradient(to_bottom,black_55%,transparent_92%)]" />
        </div>
        {/* An oval fade melts the shoulders and arms into the background, so the edges of the cut-out never show */}
        <div className="relative [mask-image:radial-gradient(ellipse_58%_76%_at_50%_34%,black_58%,transparent_100%)]">
          <Image src={siteImages.heroPortrait.src} alt={siteImages.heroPortrait.alt} width={1188} height={1324} priority sizes="(min-width: 1024px) 42vw, 88vw" className="h-auto w-full" />
        </div>
      </div>
      {/* Dark overlay across the foot of the hero: it covers where the portrait ends and keeps the text readable */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[46%] bg-gradient-to-t from-navy-950 via-navy-950/75 to-transparent lg:h-[34%]" />

      <div className="container-page flex flex-col gap-6 pb-10 lg:flex-row lg:items-end lg:justify-between lg:pb-14">
        <h1 className="max-w-[22rem] font-serif text-[2.4rem] font-normal leading-[1.04] tracking-[-0.01em] sm:text-5xl xl:max-w-[26rem] xl:text-6xl">
          A global fellowship in <em className="pr-[0.06em] text-flame-300">Singapore.</em>
        </h1>

        <div className="shrink-0 lg:max-w-xs [&_a]:whitespace-nowrap">
          <p className="leading-relaxed text-white/75">Christian business leaders and professionals, in over 95 nations.</p>
          <div className="mt-5">
            <Button href="/contact" fullOnMobile>
              Join the Fellowship
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
