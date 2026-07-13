import { getEvents, getGalleryItems, getSiteSettings } from "@/lib/data";
import { isSupabaseAdminConfigured } from "@/lib/supabase-admin";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import GalleryManager from "@/components/admin/GalleryManager";
import EventsManager from "@/components/admin/EventsManager";
import LogoutButton from "@/components/admin/LogoutButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [settings, galleryItems, events] = await Promise.all([
    getSiteSettings(),
    getGalleryItems(),
    getEvents(),
  ]);
  const supabaseReady = isSupabaseAdminConfigured();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-rust">Admin Dashboard</p>
          <h1 className="font-display text-4xl text-espresso">Manage {settings.museum_name}</h1>
        </div>
        <LogoutButton />
      </div>

      {!supabaseReady && (
        <div className="mt-6 border-2 border-rust bg-rust/10 p-4 text-sm text-rust-dark">
          Supabase isn&apos;t connected yet. You can preview the admin UI below, but saving changes is
          disabled until the Supabase environment variables are set (see README.md).
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-display text-2xl text-espresso">Site Settings</h2>
        <SiteSettingsForm settings={settings} disabled={!supabaseReady} />
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-espresso">Gallery</h2>
        <GalleryManager items={galleryItems} disabled={!supabaseReady} />
      </section>

      <section className="mt-14 pb-10">
        <h2 className="font-display text-2xl text-espresso">Events</h2>
        <EventsManager events={events} disabled={!supabaseReady} />
      </section>
    </div>
  );
}
