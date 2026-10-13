"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays } from "lucide-react";
import { eventCategories, type FellowshipEvent } from "@/data/events";
import { EventCard } from "@/components/cards/EventCard";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "upcoming", label: "Upcoming Events" },
  { id: "past", label: "Past Events" },
] as const;
type Tab = (typeof tabs)[number]["id"];

// Today's date in Singapore as YYYY-MM-DD. It is read in the browser only, so the page itself can be cached.
const singaporeToday = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Singapore" });
const noChange = () => () => {};

/** Upcoming / past tabs with a category filter. An event moves to "Past" the day after its date. */
export function EventsBrowser({ events }: { events: FellowshipEvent[] }) {
  // Until the page has loaded in the browser every event counts as upcoming.
  const today = useSyncExternalStore(noChange, singaporeToday, () => null);
  const isPast = (e: FellowshipEvent) => today !== null && e.date < today;

  const [chosen, setChosen] = useState<Tab | null>(null);
  const tab: Tab = chosen ?? (events.some((e) => !isPast(e)) || events.length === 0 ? "upcoming" : "past");
  const [category, setCategory] = useState("All");
  const list = events
    .filter((e) => (tab === "past") === isPast(e) && (category === "All" || e.category === category))
    .sort((a, b) => (tab === "upcoming" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line lg:flex-row lg:items-end lg:justify-between">
        <div role="tablist" aria-label="Events" className="flex gap-6 sm:gap-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="events-panel"
              onClick={() => setChosen(t.id)}
              className={cn("relative min-h-12 pb-4 font-serif text-2xl transition-colors sm:text-4xl", tab === t.id ? "text-navy-900" : "text-navy-900/40 hover:text-navy-900/70")}
            >
              {t.label}
              {tab === t.id && <motion.span layoutId="events-tab" className="bg-sunset absolute inset-x-0 -bottom-px h-0.5" />}
            </button>
          ))}
        </div>
        <div className="-mx-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <ul aria-label="Filter by type" className="flex w-max gap-2">
            {["All", ...eventCategories].map((c) => (
              <li key={c}>
                <button
                  type="button"
                  aria-pressed={c === category}
                  onClick={() => setCategory(c)}
                  className={cn("min-h-11 rounded-full border px-5 text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-colors", c === category ? "border-navy-900 bg-navy-900 text-white" : "border-navy-900/20 text-navy-900 hover:border-navy-900")}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="events-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-10 min-h-[20rem]">
        <AnimatePresence mode="wait">
          <motion.div key={tab + category} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            {list.length ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {list.map((event) => (
                  <li key={event.id}>
                    <EventCard event={event} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center rounded-3xl border border-dashed border-navy-900/20 bg-white/50 px-6 py-16 text-center">
                <span aria-hidden className="bg-sunset grid size-14 place-items-center rounded-full text-on-flame">
                  <CalendarDays className="size-6" />
                </span>
                <p className="mt-6 font-serif text-2xl text-navy-900 sm:text-3xl">{tab === "upcoming" ? "No upcoming events just now." : "No past events to show yet."}</p>
                <p className="mt-3 max-w-md leading-relaxed text-slate">{tab === "upcoming" ? "New gatherings will be announced here. Please check back soon, or get in touch and we will let you know." : "Events appear here once their date has passed."}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
