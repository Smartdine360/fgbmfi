import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { siteImages } from "@/data/images";
import { contact, site } from "@/data/site";
import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "./PageHero";

export type LegalSection = { heading: string; paragraphs?: string[]; points?: string[]; after?: string[] };

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const two = (n: number) => String(n).padStart(2, "0");

/** Shared layout for the Privacy Policy and Terms pages: a contents list beside numbered sections, then how to reach us. */
export function LegalPage({ title, intro, updated, sections }: { title: string; intro: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero medium serif title={title} image={siteImages.contactHero} crumbs={[{ label: title }]} />

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-sand via-ivory to-flame-200/50 py-14 md:py-20">
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[32rem] rounded-full bg-navy-600/15 blur-3xl" />
        <div className="container-page grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Contents: stays in view on wide screens */}
          <aside className="lg:sticky lg:top-28 lg:col-span-4">
            <Reveal className="rounded-[2rem] border border-line bg-white p-7 shadow-[0_40px_80px_-50px_rgba(20,11,51,0.5)] sm:p-8">
              <p className="eyebrow inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-sand px-4 py-2 tracking-[0.14em] text-flame-700">
                <span aria-hidden className="bg-sunset size-1.5 rounded-full" />
                Last updated {updated}
              </p>
              <p className="mt-6 font-serif text-xl leading-snug text-navy-900 sm:text-2xl">{intro}</p>
              <nav aria-label="On this page" className="mt-7 border-t border-line pt-5">
                <p className="eyebrow text-slate">On this page</p>
                <ol className="mt-3">
                  {sections.map((s, i) => (
                    <li key={s.heading}>
                      <a href={`#${slug(s.heading)}`} className="group flex min-h-10 items-center gap-3 text-[0.95rem] text-slate transition-colors hover:text-navy-900">
                        <span aria-hidden className="w-6 shrink-0 font-serif text-flame-500">
                          {two(i + 1)}
                        </span>
                        <span className="flex-1">{s.heading}</span>
                        <ArrowRight aria-hidden className="size-4 -translate-x-1 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-70" />
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          </aside>

          <div className="lg:col-span-8">
            <div className="rounded-[2rem] border border-line bg-white px-7 shadow-[0_40px_80px_-50px_rgba(20,11,51,0.5)] sm:px-10">
              {sections.map((s, i) => (
                <article key={s.heading} id={slug(s.heading)} className="scroll-mt-28 border-b border-line py-9 last:border-b-0 sm:py-11">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span aria-hidden className="bg-sunset bg-clip-text font-serif text-4xl leading-none text-transparent sm:text-5xl">
                      {two(i + 1)}
                    </span>
                    <h2 className="font-serif text-2xl font-normal leading-tight tracking-normal text-navy-900 sm:text-[2rem]">{s.heading}</h2>
                  </div>
                  <div className="mt-5 space-y-4 leading-relaxed text-slate sm:text-[1.05rem]">
                    {s.paragraphs?.map((p) => (
                      <p key={p.slice(0, 32)}>{p}</p>
                    ))}
                    {s.points && (
                      <ul className="space-y-3">
                        {s.points.map((p) => (
                          <li key={p.slice(0, 32)} className="flex gap-3">
                            <span aria-hidden className="bg-sunset mt-[0.65em] size-1.5 shrink-0 rounded-full" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.after?.map((p) => (
                      <p key={p.slice(0, 32)}>{p}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* How to reach us about anything on this page */}
            <Reveal className="relative isolate mt-6 overflow-hidden rounded-[2rem] bg-navy-900 p-8 text-white sm:p-10">
              <div aria-hidden className="absolute -bottom-40 -right-32 -z-10 size-[26rem] rounded-full bg-flame-400/25 blur-3xl" />
              <p className="eyebrow text-flame-300">Questions?</p>
              <h2 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-normal sm:text-4xl">
                We are glad to <em className="text-flame-300">help.</em>
              </h2>
              <ul className="mt-7 grid gap-5 text-white/85 sm:grid-cols-2">
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className="flex items-start gap-3 break-all hover:text-flame-300">
                      <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-flame-300" />
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.phone && (
                  <li>
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 hover:text-flame-300">
                      <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-flame-300" />
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.address && (
                  <li className="flex items-start gap-3 sm:col-span-2">
                    <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-flame-300" />
                    <span>
                      {site.name}, {contact.address.join(", ")}
                    </span>
                  </li>
                )}
              </ul>
              <Link href="/contact" className="bg-sunset mt-8 inline-flex min-h-13 items-center gap-3 rounded-xl px-6 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-on-flame transition-[filter] hover:brightness-110">
                Send an enquiry
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
