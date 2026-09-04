/** Shared header for the top-level inner pages. */
export function PageHeader({ title, lede }: { title: string; lede?: string }) {
  return (
    <header className="container-page pb-10 pt-16">
      <h1 className="font-display text-4xl tracking-tight md:text-5xl">{title}</h1>
      {lede && <p className="mt-4 max-w-[65ch] leading-relaxed text-ink-soft">{lede}</p>}
    </header>
  );
}
