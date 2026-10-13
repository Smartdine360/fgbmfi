import Image from "next/image";
import type { SiteImage } from "@/data/images";
import { ImageReveal, Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  image: SiteImage;
  children: React.ReactNode;
  /** Put the image on the right on large screens. */
  flip?: boolean;
  tone?: "ivory" | "sand" | "white";
  ratio?: string;
};

/** Editorial image-and-text split used across the inner pages. */
export function SplitSection({ eyebrow, title, image, children, flip, tone = "ivory", ratio = "aspect-[4/5]" }: Props) {
  return (
    <section className={cn("section-y", tone === "sand" && "bg-sand", tone === "white" && "bg-white")}>
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-20">
        <ImageReveal className={cn("bg-navy-900 lg:col-span-5", ratio, "max-lg:aspect-[3/2]", flip && "lg:order-2 lg:col-start-8")}>
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </ImageReveal>
        <div className={cn("lg:col-span-6", flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7")}>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <Reveal delay={0.1} className="mt-7 space-y-5 text-base leading-relaxed text-slate sm:text-[1.05rem]">
            {children}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
