import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryItems } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div>
      <PageHero
        eyebrow="The Collection"
        title="Gallery"
        subtitle="Every motorcycle in our collection is fully restored and mechanically sound. Filter by era to explore."
      />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <GalleryGrid items={items} />
      </div>
    </div>
  );
}
