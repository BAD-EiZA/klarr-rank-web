import Link from "next/link";

export function LegalShell({
  title,
  description,
  updated,
  children,
}: {
  title: string;
  description?: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-full bg-background text-text-primary">
      <header className="border-b border-border-subtle px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F4C75] text-xs font-bold text-[#BBE1FA]">
              K
            </span>
            Klarr Rank
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-text-secondary hover:text-text-primary"
          >
            ← Beranda
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-base leading-relaxed text-text-secondary">
            {description}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-text-muted">
          Terakhir diperbarui: {updated}
        </p>
        <div className="prose-legal mt-10 space-y-8 text-[15px] leading-relaxed text-text-secondary">
          {children}
        </div>
      </article>

      <footer className="border-t border-border-subtle px-4 py-8 text-center text-xs text-text-muted">
        <p>
          © 2026 Klarr Rank ·{" "}
          <Link href="/privasi" className="hover:text-text-primary">
            Privasi
          </Link>{" "}
          ·{" "}
          <Link href="/syarat" className="hover:text-text-primary">
            Syarat
          </Link>
        </p>
      </footer>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
