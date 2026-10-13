import type { SiteImage } from "./images";

export type EventCategory = "Fellowship" | "Prayer" | "Conference" | "Outreach";

/**
 * An event shown on the Events page. Events are added and removed in the admin
 * panel (/admin, "Events" tab), not in this file; lib/events-store.ts reads them.
 */
export type FellowshipEvent = {
  id: string;
  title: string;
  /** ISO date, YYYY-MM-DD. Events dated before today are listed under "Past". */
  date: string;
  /** Free text, e.g. "7:30 pm" or "13–15 August 2026". May be empty. */
  time: string;
  /** May be empty. */
  location: string;
  category: EventCategory;
  /** A short description. May be empty. */
  summary: string;
  image: SiteImage;
};

export const eventCategories: EventCategory[] = ["Fellowship", "Prayer", "Conference", "Outreach"];
