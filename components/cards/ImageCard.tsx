import Image from "next/image";
import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";

type Props = { image: SiteImage; caption?: string; label?: string; className?: string; sizes?: string; priority?: boolean };

/** Framed photograph with an optional caption that rises on hover. */
export function ImageCard({ image, caption, label, className, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw", priority }: Props) {
  return (
    <figure className={cn("group relative overflow-hidden bg-navy-900", className)}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.05]" />
      {(caption || label) && (
        <>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            {label && <span className="eyebrow block text-flame-300">{label}</span>}
            {caption && <span className="mt-1.5 block font-display text-lg leading-snug text-white sm:text-xl">{caption}</span>}
          </figcaption>
        </>
      )}
    </figure>
  );
}
