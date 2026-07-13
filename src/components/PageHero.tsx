export default function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="texture-grain border-b-4 border-espresso bg-espresso py-14 text-cream">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-display text-sm tracking-[0.3em] text-mustard">{eyebrow}</p>
        <h1 className="font-display mt-1 text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-cream/80">{subtitle}</p>}
      </div>
    </section>
  );
}
