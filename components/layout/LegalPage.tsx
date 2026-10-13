import { siteImages } from "@/data/images";
import { PageHero } from "./PageHero";

export type LegalSection = { heading: string; paragraphs: string[] };

/** Shared layout for the Privacy Policy and Terms pages. */
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} image={siteImages.contactHero} crumbs={[{ label: title }]} />
      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <p className="border border-dashed border-flame-500/60 bg-white p-5 text-sm leading-relaxed text-slate">
              <strong className="text-navy-900">Draft.</strong> This text is a starting point and has not been reviewed by a lawyer. Please have it checked and completed before the site goes live.
            </p>
            <p className="mt-8 font-display text-2xl leading-snug text-navy-900">{intro}</p>
            {sections.map((s) => (
              <div key={s.heading} className="mt-10">
                <h2 className="text-3xl text-navy-900">{s.heading}</h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-slate">
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
