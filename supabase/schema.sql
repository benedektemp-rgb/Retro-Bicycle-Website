-- Iron & Chrome Motorcycle Museum: Supabase schema
-- Run this once in your Supabase project's SQL Editor (Project -> SQL Editor -> New query).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- site_settings: single-row table holding museum-wide content
-- ---------------------------------------------------------------------------
create table if not exists site_settings (
  id integer primary key default 1,
  museum_name text not null default '',
  tagline text not null default '',
  about_text text not null default '',
  address text not null default '',
  phone text not null default '',
  email text not null default '',
  facebook_url text not null default '',
  instagram_url text not null default '',
  youtube_url text not null default '',
  hero_image_url text not null default '',
  updated_at timestamptz not null default now(),
  constraint site_settings_single_row check (id = 1)
);

-- ---------------------------------------------------------------------------
-- gallery_items: the bike collection shown on /gallery
-- ---------------------------------------------------------------------------
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  image_url text not null default '',
  category text not null default '',
  era text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- events: museum events shown on /events
-- ---------------------------------------------------------------------------
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  event_date date not null,
  location text not null default '',
  image_url text not null default '',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security: everyone can read, nobody can write from the browser.
-- All writes happen server-side in Next.js via the service role key, which
-- bypasses RLS entirely -- so no INSERT/UPDATE/DELETE policies are needed.
-- ---------------------------------------------------------------------------
alter table site_settings enable row level security;
alter table gallery_items enable row level security;
alter table events enable row level security;

drop policy if exists "Public read site_settings" on site_settings;
create policy "Public read site_settings" on site_settings for select using (true);

drop policy if exists "Public read gallery_items" on gallery_items;
create policy "Public read gallery_items" on gallery_items for select using (true);

drop policy if exists "Public read events" on events;
create policy "Public read events" on events for select using (true);

-- ---------------------------------------------------------------------------
-- Storage bucket for admin-uploaded images
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media" on storage.objects for select using (bucket_id = 'media');

-- ---------------------------------------------------------------------------
-- Seed data -- mirrors src/lib/seed-data.ts so the site looks the same
-- before and after you connect Supabase. Feel free to edit/delete via /admin.
-- ---------------------------------------------------------------------------
insert into site_settings (id, museum_name, tagline, about_text, address, phone, email, facebook_url, instagram_url, youtube_url, hero_image_url)
values (
  1,
  'Iron & Chrome Motorcycle Museum',
  'Where Legends Still Run',
  'Founded by a lifelong collector of classic iron, Iron & Chrome Motorcycle Museum houses over sixty fully-restored motorcycles spanning nine decades of two-wheeled history. From pre-war British singles to neon-lit 1980s superbikes, every machine on our floor still runs -- because a motorcycle that can''t be ridden is just a sculpture. We started this collection in a two-car garage in 1994 and it hasn''t stopped growing since. Come see what a century of speed, rebellion, and engineering obsession looks like up close.',
  '128 Foundry Row, Millhaven, OH 44601',
  '(330) 555-0142',
  'hello@ironandchromemuseum.example',
  'https://facebook.com/ironandchromemuseum',
  'https://instagram.com/ironandchromemuseum',
  'https://youtube.com/@ironandchromemuseum',
  'https://picsum.photos/seed/museum-hero/1600/900'
)
on conflict (id) do nothing;

insert into gallery_items (title, description, image_url, category, era, sort_order)
values
  ('1936 Brough Superior SS100', 'The ''Rolls-Royce of Motorcycles.'' Hand-built in Nottingham and guaranteed by the factory to hit 100mph -- a staggering claim for its era.', 'https://picsum.photos/seed/brough-ss100/900/700', 'British', '1930s', 1),
  ('1948 Vincent Black Shadow', 'The fastest production motorcycle of its day, with a 998cc V-twin and a black-crackle engine finish that gave it its name.', 'https://picsum.photos/seed/vincent-black-shadow/900/700', 'British', '1940s', 2),
  ('1952 Harley-Davidson K Model', 'Harley''s answer to nimble British twins, and the direct ancestor of the Sportster line that followed it.', 'https://picsum.photos/seed/harley-k-model/900/700', 'American', '1950s', 3),
  ('1965 Ducati 250 Mach 1', 'A road-legal cafe racer straight from the factory, and one of the fastest 250cc production bikes ever built.', 'https://picsum.photos/seed/ducati-mach1/900/700', 'Italian', '1960s', 4),
  ('1969 Honda CB750', 'The original ''superbike.'' Four cylinders, a front disc brake, and electric start -- it rewrote the rulebook overnight.', 'https://picsum.photos/seed/honda-cb750/900/700', 'Japanese', '1960s', 5),
  ('1972 Triumph Trident T150', 'Britain''s last great stand against the Japanese invasion -- a howling three-cylinder built for the open road.', 'https://picsum.photos/seed/triumph-trident/900/700', 'British', '1970s', 6),
  ('1975 Kawasaki Z1 900', 'A double-overhead-cam inline-four that made everything else on the showroom floor look obsolete.', 'https://picsum.photos/seed/kawasaki-z1/900/700', 'Japanese', '1970s', 7),
  ('1983 Yamaha RZ350', 'A screaming two-stroke street bike built for riders who wanted race-track thrills with a license plate.', 'https://picsum.photos/seed/yamaha-rz350/900/700', 'Japanese', '1980s', 8),
  ('1988 Ducati 851', 'The bike that dragged Ducati into the modern era, with fuel injection and four valves per cylinder in a racing-red frame.', 'https://picsum.photos/seed/ducati-851/900/700', 'Italian', '1980s', 9)
on conflict do nothing;

insert into events (title, description, event_date, location, image_url)
values
  ('Vintage Iron Swap Meet', 'Our biggest event of the year -- dozens of vendors, parts hunters, and a show-and-shine on the front lawn. Bring your own project bike for free display space.', '2026-08-16', 'Museum Grounds, 128 Foundry Row', 'https://picsum.photos/seed/swap-meet/900/600'),
  ('After Dark: Neon & Two-Strokes Night', 'An evening exhibition of our 1980s and 1990s two-stroke collection under UV and neon lighting, with a curator-led talk at 8pm.', '2026-09-05', 'Main Exhibition Hall', 'https://picsum.photos/seed/neon-night/900/600'),
  ('Restoration Workshop: Carburetor Basics', 'A hands-on Saturday workshop with our head mechanic covering teardown, cleaning, and tuning of classic carburetors. Limited to 15 seats.', '2026-10-11', 'Museum Workshop Bay', 'https://picsum.photos/seed/workshop-carb/900/600')
on conflict do nothing;
