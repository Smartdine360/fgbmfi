import { siteImages } from "@/data/images";
import { Reveal } from "@/components/animations/Reveal";

// The vision of the fellowship, and its mission (the six-point mission statement is given in full on the About page).
export const VISION = "We see business people on every continent working together to transform their communities, cities, and nations.";
export const MISSION =
  "A vast global movement of laymen comprising men being used mightily by God to bring this last great harvest through the outpouring of God's Holy Spirit before the return of our Lord Jesus Christ.";
// Where the accented closing words of the vision begin ("communities, cities, and nations.").
const VISION_ACCENT_AT = VISION.indexOf("communities");

export function VisionMission() {
  return (
    <section className="section-y relative overflow-hidden">
      <p aria-hidden className="pointer-events-none absolute -top-[0.12em] left-1/2 -translate-x-1/2 select-none font-serif text-[24vw] leading-none text-navy-900/[0.045]">
        VISION
      </p>
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 text-flame-700">
            <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
            Our vision
          </p>
          {/* The closing words of the vision are picked out in accent italics */}
          <h2 aria-label={VISION} className="mt-7 font-serif text-[2rem] font-normal leading-[1.12] tracking-[-0.01em] text-navy-900 sm:text-5xl lg:text-[3.75rem]">
            {VISION.slice(0, VISION_ACCENT_AT)}
            <em className="bg-sunset bg-clip-text pr-1 text-transparent">{VISION.slice(VISION_ACCENT_AT)}</em>
          </h2>
          <span aria-hidden className="bg-sunset mx-auto mt-8 block h-[3px] w-16 rounded-full" />
        </Reveal>

        <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Mission video (/public/missionvideo.mp4): plays silently on a loop; the controls let a visitor turn the sound on */}
          <Reveal className="overflow-hidden rounded-3xl bg-navy-900 shadow-[0_40px_80px_-40px_rgba(20,11,51,0.7)] lg:col-span-7">
            <video src="/missionvideo.mp4" poster={siteImages.visionWorship.src} autoPlay muted loop playsInline controls preload="metadata" aria-label="FGBMFI mission video" className="block aspect-[848/480] w-full object-cover" />
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="eyebrow mb-5 flex items-center gap-4 text-flame-700">
              <span aria-hidden className="h-px w-10 bg-current" />
              Our mission
            </p>
            <h3 className="font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] text-navy-900 sm:text-5xl">
              A lasting <em className="bg-sunset bg-clip-text pr-1 text-transparent">global impact.</em>
            </h3>
            <p className="mt-5 leading-relaxed text-slate sm:text-[1.05rem]">{MISSION}</p>
            <blockquote className="mt-7 border-l-2 border-flame-400 pl-5">
              <p className="font-serif text-xl italic leading-snug text-navy-900">&ldquo;One Generation shall commend their Works to another, they shall tell of their mighty acts.&rdquo;</p>
              <cite className="eyebrow mt-3 block not-italic text-flame-700">Psalm 145:4</cite>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
