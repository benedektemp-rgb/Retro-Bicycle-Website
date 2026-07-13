import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

export default function SiteFooter({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  const socialLinks = [
    { url: settings.facebook_url, label: "Facebook" },
    { url: settings.instagram_url, label: "Instagram" },
    { url: settings.youtube_url, label: "YouTube" },
  ].filter((link) => link.url);

  return (
    <footer className="mt-auto border-t-4 border-espresso bg-espresso text-parchment">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-wide text-mustard">{settings.museum_name}</p>
          <p className="mt-2 text-sm text-parchment/80">{settings.tagline}</p>
        </div>

        <div>
          <p className="font-display text-lg tracking-wide text-mustard">Visit</p>
          <address className="mt-2 space-y-1 text-sm not-italic text-parchment/80">
            <p>{settings.address}</p>
            <p>{settings.phone}</p>
            <p>{settings.email}</p>
          </address>
        </div>

        <div>
          <p className="font-display text-lg tracking-wide text-mustard">Follow</p>
          <ul className="mt-2 space-y-1 text-sm">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-parchment/80 transition-colors hover:text-rust"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-parchment/20 px-5 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-parchment/60 sm:flex-row">
          <p>
            &copy; {year} {settings.museum_name}. All rights reserved.
          </p>
          <Link href="/admin/login" className="text-parchment/50 hover:text-parchment/80">
            Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
