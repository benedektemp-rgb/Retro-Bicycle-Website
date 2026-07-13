import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import { getSiteSettings } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`;

  const socialLinks = [
    { url: settings.facebook_url, label: "Facebook" },
    { url: settings.instagram_url, label: "Instagram" },
    { url: settings.youtube_url, label: "YouTube" },
  ].filter((link) => link.url);

  return (
    <div>
      <PageHero eyebrow="Get In Touch" title="Visit Us" />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-espresso">Museum Info</h2>
          <dl className="mt-6 space-y-4 text-lg text-ink/85">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-rust">Address</dt>
              <dd>{settings.address}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-rust">Phone</dt>
              <dd>{settings.phone}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-rust">Email</dt>
              <dd>{settings.email}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={`mailto:${settings.email}`}>Email Us</Button>
            <Button href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} variant="secondary">
              Call Us
            </Button>
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-10">
              <h3 className="font-display text-2xl text-espresso">Follow Along</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display rounded-sm border-2 border-espresso px-4 py-2 text-espresso transition-colors hover:bg-espresso hover:text-cream"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="aspect-square overflow-hidden border-2 border-espresso shadow-[6px_6px_0_0_var(--color-espresso)] sm:aspect-auto sm:h-full">
          <iframe
            title="Museum location map"
            src={mapSrc}
            className="h-full min-h-[320px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
