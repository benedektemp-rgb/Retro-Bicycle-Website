import Image from "next/image";
import Button from "@/components/Button";
import GalleryCard from "@/components/GalleryCard";
import EventCard from "@/components/EventCard";
import { getGalleryItems, getSiteSettings, getUpcomingEvents } from "@/lib/data";

export default async function HomePage() {
  const [settings, galleryItems, upcomingEvents] = await Promise.all([
    getSiteSettings(),
    getGalleryItems(),
    getUpcomingEvents(1),
  ]);

  const featured = galleryItems.slice(0, 3);
  const nextEvent = upcomingEvents[0];

  return (
    <div>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden border-b-4 border-espresso">
        <Image
          src={settings.hero_image_url}
          alt={settings.museum_name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark via-espresso/50 to-espresso/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 text-cream">
          <p className="font-display text-lg tracking-[0.3em] text-mustard">EST. 1994</p>
          <h1 className="font-display max-w-3xl text-5xl leading-none sm:text-7xl">
            {settings.museum_name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-cream/90">{settings.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/gallery">View the Collection</Button>
            <Button href="/events" variant="light">
              Upcoming Events
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-rust">
              The Collection
            </p>
            <h2 className="font-display mt-1 text-4xl text-espresso">
              Nine Decades of Iron, Fully Restored
            </h2>
            <p className="mt-4 leading-relaxed text-ink/80">{settings.about_text}</p>
            <div className="mt-6">
              <Button href="/about" variant="secondary">
                Our Story
              </Button>
            </div>
          </div>
          <div className="badge-stamp mx-auto flex h-48 w-48 flex-col items-center justify-center border-4 border-espresso text-center text-espresso">
            <span className="font-display text-4xl">60+</span>
            <span className="text-xs font-semibold uppercase tracking-widest">
              Restored Motorcycles
            </span>
          </div>
        </div>
      </section>

      <section className="border-y-4 border-espresso bg-parchment-dark/60 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl text-espresso">Featured Machines</h2>
            <Button href="/gallery" variant="secondary">
              See Full Gallery
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {nextEvent && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-rust">Coming Up</p>
          <h2 className="font-display mt-1 text-4xl text-espresso">Next Event</h2>
          <div className="mt-8">
            <EventCard event={nextEvent} />
          </div>
          <div className="mt-6">
            <Button href="/events" variant="secondary">
              All Events
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
