import Link from "next/link";
import { contact, footerNav, site, socials } from "@/data/site";
import { Logo } from "@/components/ui/Logo";

const linkClass = "inline-flex min-h-9 items-center text-[0.95rem] text-white/70 transition-colors hover:text-flame-300";

export function Footer() {
  // Social links are only shown once a real URL has been supplied in data/site.ts.
  const activeSocials = socials.filter((s): s is { label: string; url: string } => Boolean(s.url));

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <p aria-hidden className="pointer-events-none absolute -bottom-[0.22em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[26vw] leading-none text-white/[0.03]">
        FGBMFI
      </p>
      <div className="container-page relative pb-7 pt-12 md:pt-16">
        <div className="grid gap-x-10 gap-y-9 border-b border-white/10 pb-11 sm:grid-cols-2 lg:grid-cols-[1.6fr_0.8fr_0.9fr_1.2fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo light />
            {/* Tagline in the display serif, with the last word in accent italics */}
            <p className="mt-6 font-serif text-3xl leading-[1.15] tracking-[-0.01em] text-white sm:text-4xl">
              Faith. Fellowship.
              <br />
              Leadership. <em className="pr-1 text-flame-300">Impact.</em>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {site.fullName}. Part of a global fellowship of Christian business leaders, professionals and believers.
            </p>
          </div>

          <nav aria-label="Explore">
            <h2 className="eyebrow mb-3 font-sans text-flame-300">Explore</h2>
            <ul>
              {footerNav.explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Fellowship">
            <h2 className="eyebrow mb-3 font-sans text-flame-300">Fellowship</h2>
            <ul>
              {footerNav.fellowship.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-3 font-sans text-flame-300">Connect</h2>
            <ul>
              {contact.address && (
                <li className="mb-2 mt-1.5 text-[0.95rem] leading-relaxed text-white/70">
                  {contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </li>
              )}
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={linkClass}>
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className={linkClass}>
                    {contact.email}
                  </a>
                </li>
              )}
              {activeSocials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/contact" className={linkClass}>
                  Send an enquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 FGBMFI Singapore. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="inline-flex min-h-10 items-center hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="inline-flex min-h-10 items-center hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
