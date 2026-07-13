"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader({ museumName }: { museumName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-espresso bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-2xl tracking-wide text-espresso sm:text-3xl">
          {museumName}
        </Link>

        <nav className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-lg tracking-wide text-espresso transition-colors hover:text-rust"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className="h-0.5 w-7 bg-espresso" />
          <span className="h-0.5 w-7 bg-espresso" />
          <span className="h-0.5 w-7 bg-espresso" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t-2 border-espresso bg-cream px-5 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display py-2 text-lg tracking-wide text-espresso"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
