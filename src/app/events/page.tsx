import PageHero from "@/components/PageHero";
import EventCard from "@/components/EventCard";
import { getEvents } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const events = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.event_date >= today);
  const past = events.filter((e) => e.event_date < today);

  return (
    <div>
      <PageHero
        eyebrow="What's On"
        title="Events"
        subtitle="Swap meets, night exhibitions, and hands-on workshops -- all held right on the museum floor."
      />

      <div className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-display text-3xl text-espresso">Upcoming</h2>
        <div className="mt-6 space-y-6">
          {upcoming.length > 0 ? (
            upcoming.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="text-ink/60">No upcoming events scheduled right now -- check back soon.</p>
          )}
        </div>

        {past.length > 0 && (
          <>
            <h2 className="font-display mt-14 text-3xl text-espresso">Past Events</h2>
            <div className="mt-6 space-y-6 opacity-70">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
