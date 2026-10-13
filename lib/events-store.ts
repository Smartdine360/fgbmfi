import { cacheTag } from "next/cache";
import { eventCategories, type EventCategory, type FellowshipEvent } from "@/data/events";
import { listEntries } from "@/lib/media-store";

/** Events added through the admin panel. Where they are kept is explained in lib/media-store.ts. */
export const EVENTS_TAG = "events";
export const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Every event, soonest date first. Cached until an event is added or removed. */
export async function getEvents(): Promise<FellowshipEvent[]> {
  "use cache";
  cacheTag(EVENTS_TAG);
  return (await listEntries("events"))
    .filter(({ fields }) => fields.title && ISO_DATE.test(fields.date ?? ""))
    .map(({ id, src, fields }) => ({
      id,
      title: fields.title,
      date: fields.date,
      time: fields.time ?? "",
      location: fields.location ?? "",
      category: eventCategories.includes(fields.category as EventCategory) ? (fields.category as EventCategory) : "Fellowship",
      summary: fields.summary ?? "",
      image: { src, alt: fields.title },
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
