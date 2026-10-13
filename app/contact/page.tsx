import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { siteImages } from "@/data/images";
import { contact } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Reveal } from "@/components/animations/Reveal";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact FGBMFI Singapore at 140 Paya Lebar Road, AZ @ Paya Lebar, by email or through the enquiry form. We would be glad to hear from you.",
  path: "/contact",
});

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;

// The ways to reach the fellowship. A row is left out while its detail is unset.
const ways = [
  contact.address && { icon: MapPin, label: "Visit", lines: contact.address, href: directionsUrl, external: true },
  contact.email && { icon: Mail, label: "Email", lines: [contact.email], href: `mailto:${contact.email}`, external: false },
  contact.phone && { icon: Phone, label: "Call", lines: [contact.phone], href: `tel:${contact.phone.replace(/\s/g, "")}`, external: false },
].filter((w) => !!w);

export default function ContactPage() {
  return (
    <>
      <PageHero
        medium
        serif
        title="We would be glad to hear from you."
        image={siteImages.contactHero}
        imageClassName="object-[center_40%]"
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          {/* One card: contact details on the dark panel, the enquiry form beside it */}
          <Reveal className="grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_40px_80px_-50px_rgba(20,11,51,0.5)] lg:grid-cols-12">
            <div className="relative isolate overflow-hidden bg-navy-900 p-8 text-white sm:p-12 lg:col-span-5">
              <div aria-hidden className="absolute -bottom-40 -right-32 -z-10 size-[26rem] rounded-full bg-flame-400/25 blur-3xl" />
              <div aria-hidden className="absolute -left-24 -top-24 -z-10 size-72 rounded-full border border-white/10" />

              <p className="eyebrow text-flame-300">Get in touch</p>
              <h2 className="mt-5 font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] sm:text-5xl">
                Let&rsquo;s start a <em className="text-flame-300">conversation.</em>
              </h2>

              <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
                {ways.map(({ icon: Icon, label, lines, href, external }) => (
                  <li key={label}>
                    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-start gap-5 py-6">
                      <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 text-flame-300 transition-colors duration-500 group-hover:border-transparent group-hover:bg-flame-400 group-hover:text-on-flame">
                        <Icon className="size-[1.125rem]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="eyebrow block text-white/50">{label}</span>
                        <span className="mt-2 block break-words text-lg leading-snug">
                          {lines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </span>
                      </span>
                      <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-white/40 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flame-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div id="message" className="scroll-mt-24 p-8 sm:p-12 lg:col-span-7">
              <p className="eyebrow text-flame-700">Send a message</p>
              <h2 className="mt-5 font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] text-navy-900 sm:text-5xl">How can we help?</h2>
              <div className="mt-9">
                <EnquiryForm source="contact" subjects={["General enquiry", "Fellowship enquiry", "Event enquiry", "Chapter enquiry"]} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
