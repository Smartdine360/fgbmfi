import { siteImages } from "@/data/images";
import { getEvents } from "@/lib/events-store";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { EventsBrowser } from "@/components/sections/EventsBrowser";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = pageMetadata({
  title: "Events",
  description: "Upcoming and past FGBMFI Singapore events — fellowship breakfasts, prayer gatherings, conferences and outreach. Guests are always welcome.",
  path: "/events",
});

export default async function EventsPage() {
  // Events are added and removed in the admin panel (/admin, "Events" tab).
  const events = await getEvents();
  return (
    <>
      <PageHero medium serif title="Where the fellowship gathers." image={siteImages.eventsHero} crumbs={[{ label: "Events" }]} />
      <section className="section-y bg-sand">
        <div className="container-page">
          <EventsBrowser events={events} />
        </div>
      </section>
      <CTASection title="Planning to come along?" lead="Tell us which event you are interested in and we will save you a seat and send you the details." primary={{ label: "Register Your Interest", href: "/contact" }} secondary={{ label: "View the Gallery", href: "/gallery" }} />
    </>
  );
}
