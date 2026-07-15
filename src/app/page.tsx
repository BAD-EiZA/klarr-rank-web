import Link from "next/link";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const features = [
  {
    title: "SEO Analyzer",
    body: "Cloud browser + deterministic rules. Skor stabil, bukti jelas.",
  },
  {
    title: "AI Recommendations",
    body: "Gemini merangkum temuan teknis jadi prioritas perbaikan.",
  },
  {
    title: "Rank Tracker",
    body: "Pantau keyword harian, gerakan posisi, dan kompetitor organik.",
  },
];

const plans = [
  {
    name: "Free",
    price: "Rp0",
    points: ["2 scan/hari", "2 keyword", "Riwayat 14 hari"],
  },
  {
    name: "Pro",
    price: "Rp59.000",
    period: "/bulan",
    points: ["60 scan/periode", "10 keyword", "Rank check harian"],
    highlighted: true,
  },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <span className="text-lg font-semibold tracking-tight">Klarr Rank</span>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="#pricing"
            className="text-text-secondary hover:text-text-primary"
          >
            Harga
          </Link>
          <LoginLink className="text-text-secondary hover:text-text-primary">
            Masuk
          </LoginLink>
          <RegisterLink className="rounded-lg bg-accent px-3 py-2 font-medium text-accent-foreground">
            Mulai gratis
          </RegisterLink>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-20 pt-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="text-sm font-medium text-accent">SEO copilot untuk website Indonesia</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Audit SEO yang bisa ditindaklanjuti, plus rank tracker terjangkau.
          </h1>
          <p className="max-w-xl text-text-secondary">
            Buka halaman asli di cloud browser, jalankan rule engine deterministik,
            lalu dapatkan rekomendasi prioritas dari AI — tanpa janji ranking palsu.
          </p>
          <div className="flex flex-wrap gap-3">
            <RegisterLink className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground">
              Audit gratis
            </RegisterLink>
            <a
              href="#features"
              className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium"
            >
              Lihat fitur
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow)]">
          <p className="text-sm text-text-secondary">Preview skor</p>
          <p className="mt-2 text-5xl font-semibold tabular-nums">78</p>
          <p className="mt-1 text-sm text-text-secondary">Overall · Klarr Rank assessment</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {[
              ["SEO", "82"],
              ["Performance", "71"],
              ["Accessibility", "76"],
              ["Best Practices", "80"],
            ].map(([label, score]) => (
              <div key={label} className="rounded-xl border border-border p-3">
                <p className="text-text-secondary">{label}</p>
                <p className="mt-1 text-xl font-semibold tabular-nums">{score}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-border bg-surface">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-16 md:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="rounded-2xl border border-border p-5">
              <h2 className="text-lg font-semibold">{f.title}</h2>
              <p className="mt-2 text-sm text-text-secondary">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold">Harga transparan (IDR)</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Bayar via Midtrans Snap. Pro aktif setelah pembayaran terverifikasi.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border p-6 ${
                plan.highlighted
                  ? "border-accent bg-surface shadow-[var(--shadow)]"
                  : "border-border bg-surface"
              }`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-3 text-3xl font-semibold">
                {plan.price}
                {plan.period ? (
                  <span className="text-base font-normal text-text-secondary">
                    {plan.period}
                  </span>
                ) : null}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                {plan.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-text-secondary">
        © {new Date().getFullYear()} Klarr Rank
      </footer>
    </main>
  );
}
