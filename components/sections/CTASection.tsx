import Image from "next/image";
import { siteImages } from "@/data/images";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

type Props = { title?: string; lead?: string; primary?: { label: string; href: string }; secondary?: { label: string; href: string } };

/** Closing call to action shown above the footer on every page. */
export function CTASection({
  title = "There is a place for you at the table.",
  lead = "Whether you lead a company or are just starting your career, you are welcome. Come to a meeting, bring a friend and see what God might do.",
  primary = { label: "Join the Fellowship", href: "/contact" },
  secondary = { label: "Upcoming Events", href: "/events" },
}: Props) {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="container-page">
        <Reveal className="relative isolate grid overflow-hidden rounded-[2rem] bg-navy-900 text-white shadow-[0_50px_100px_-50px_rgba(20,11,51,0.7)] lg:grid-cols-2">
          <div aria-hidden className="absolute -left-32 -top-32 -z-10 size-[26rem] rounded-full bg-flame-400/25 blur-3xl" />
          <div aria-hidden className="absolute -bottom-40 left-1/3 -z-10 size-[24rem] rounded-full bg-navy-600/50 blur-3xl" />
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="eyebrow mb-5 flex items-center gap-4 text-flame-300">
              <span aria-hidden className="h-px w-10 bg-current" />
              Get connected
            </p>
            <h2 className="text-3xl leading-[1.1] sm:text-4xl xl:text-5xl">{title}</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">{lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href={primary.href} fullOnMobile>
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="outline-light" fullOnMobile>
                {secondary.label}
              </Button>
            </div>
          </div>

          <div className="group relative min-h-64 overflow-hidden lg:min-h-full">
            <Image src={siteImages.cta.src} alt={siteImages.cta.alt} fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover transition-transform duration-[1600ms] ease-premium group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/10 to-transparent lg:bg-gradient-to-r lg:via-navy-900/20" />
            <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-navy-950/70 py-3 pl-3 pr-5 backdrop-blur-md sm:bottom-7 sm:right-7">
              <Image src="/images/logo.webp" alt="" width={640} height={598} sizes="48px" className="h-11 w-auto" />
              <p className="leading-tight">
                <span className="block text-sm font-semibold text-white">Everyone is welcome</span>
                <span className="mt-0.5 block text-xs text-white/65">Members and guests alike</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
