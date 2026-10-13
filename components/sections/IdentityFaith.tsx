import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";

const identity = [
  { term: "Full Gospel Business", text: "means no subject has to be avoided, whatever a person's experience - salvation, healing, deliverance - it can be shared, just as it happened; and" },
  { term: "Men's Fellowship", text: "traditionally for laymen in every marketplace with special invitation to spouses for Ladies of Fellowship group" },
  { term: "International", text: "World's nations, Regional countries and every corners of our cosmic territories, all races, backgrounds and denominations." },
];

const pill = "eyebrow inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-flame-700";
const heading = "mt-6 font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.01em] text-navy-900 sm:text-6xl lg:text-[4rem]";
const accent = "bg-sunset bg-clip-text pr-1 text-transparent";

/** Our identity: what each part of the name FGBMFI means. */
export function Identity() {
  return (
    <section className="section-y">
      <div className="container-page grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <Reveal>
            <p className={`${pill} bg-sand`}>
              <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
              Our Identity
            </p>
            <h2 className={heading}>
              Who we are &amp; <em className={accent}>what we believe.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-9 flex items-center gap-5 rounded-3xl border border-line bg-white p-6">
            <Image src="/images/logo.webp" alt="FGBMFI logo" width={640} height={598} sizes="96px" className="h-20 w-auto shrink-0" />
            <p className="leading-snug">
              <span className="block font-serif text-3xl font-normal tracking-[0.04em] text-navy-900">FGBMFI</span>
              <span className="mt-1 block text-slate">is an organization where...</span>
            </p>
          </Reveal>
        </div>

        <Stagger as="ul" className="space-y-4 lg:col-span-7">
          {identity.map(({ term, text }, i) => (
            <StaggerItem as="li" key={term} className="flex gap-6 rounded-3xl border border-line bg-white p-7 transition-[transform,box-shadow] duration-500 ease-premium hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(20,11,51,0.5)] sm:p-8">
              <span aria-hidden className={`font-serif text-4xl font-normal leading-none ${accent}`}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-serif text-2xl font-normal tracking-normal text-navy-900 sm:text-[1.75rem]">{term}</h3>
                <p className="mt-3 leading-relaxed text-slate">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export { StatementOfFaith } from "./StatementOfFaith";
