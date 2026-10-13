import Image from "next/image";
import type { Leader } from "@/data/leadership";
import { SampleTag } from "@/components/ui/SampleTag";

export function LeaderCard({ leader, showBio = true }: { leader: Leader; showBio?: boolean }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-900">
        <Image src={leader.image.src} alt={leader.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.04]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-flame-400 transition-transform duration-700 ease-premium group-hover:scale-x-100" />
        {leader.isPlaceholder && <SampleTag className="absolute right-3 top-3">Placeholder</SampleTag>}
      </div>
      <div className="pt-5">
        <p className="eyebrow text-flame-700">{leader.position}</p>
        <h3 className="mt-2 text-2xl text-navy-900">{leader.name}</h3>
        {showBio && <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">{leader.bio}</p>}
      </div>
    </article>
  );
}
