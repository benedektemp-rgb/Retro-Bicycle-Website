export type SiteSettings = {
  museum_name: string;
  tagline: string;
  about_text: string;
  address: string;
  phone: string;
  email: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  hero_image_url: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  era: string;
  sort_order: number;
  created_at: string;
};

export type MuseumEvent = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string;
  created_at: string;
};
