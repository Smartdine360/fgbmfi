import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import type { FellowshipEvent } from "@/data/events";
import { dateParts } from "@/lib/utils";

export function EventCard({ event }: { event: FellowshipEvent }) {
  const { day, month, year } = dateParts(event.date);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-[transform,box-shadow] duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgba(20,11,51,0.5)]">
      <div className="relative aspect-[3/2] overflow-hidden bg-navy-900">
        <Image src={event.image.src} alt={event.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.05]" />
        <time dateTime={event.date} className="absolute left-4 top-4 flex w-[4.5rem] flex-col items-center rounded-2xl bg-ivory py-3 text-navy-900 shadow-lg">
          <span className="font-serif text-3xl leading-none">{day}</span>
          <span className="eyebrow mt-1.5 text-flame-700">{month}</span>
          <span className="mt-0.5 text-[0.65rem] font-semibold text-slate">{year}</span>
        </time>
        <span className="eyebrow bg-sunset absolute right-4 top-4 rounded-full px-3.5 py-1.5 text-on-flame">{event.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-serif text-2xl font-normal leading-tight tracking-normal text-navy-900 sm:text-[1.75rem]">{event.title}</h3>
        {(event.time || event.location) && (
          <ul className="mt-4 space-y-2 text-sm text-slate">
            {event.time && (
              <li className="flex items-start gap-2">
                <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-flame-500" />
                {event.time}
              </li>
            )}
            {event.location && (
              <li className="flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-flame-500" />
                {event.location}
              </li>
            )}
          </ul>
        )}
        {event.summary && <p className="mt-4 whitespace-pre-line border-t border-line pt-4 text-[0.95rem] leading-relaxed text-slate">{event.summary}</p>}
      </div>
    </article>
  );
}
