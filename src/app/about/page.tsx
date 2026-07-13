import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getSiteSettings } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <PageHero eyebrow="Our Story" title="About the Museum" />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[1fr_1.2fr] sm:items-start">
        <div className="relative aspect-[4/3] overflow-hidden border-2 border-espresso shadow-[6px_6px_0_0_var(--color-espresso)]">
          <Image
            src={settings.hero_image_url}
            alt={settings.museum_name}
            fill
            sizes="(min-width: 640px) 40vw, 90vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="font-display text-3xl text-espresso">{settings.museum_name}</h2>
          <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-ink/85">
            {settings.about_text}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-6">
            <div className="badge-stamp border-2 border-espresso p-4 text-center">
              <dt className="text-xs font-semibold uppercase tracking-widest text-rust">Founded</dt>
              <dd className="font-display mt-1 text-3xl text-espresso">1994</dd>
            </div>
            <div className="badge-stamp border-2 border-espresso p-4 text-center">
              <dt className="text-xs font-semibold uppercase tracking-widest text-rust">On Display</dt>
              <dd className="font-display mt-1 text-3xl text-espresso">60+</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
