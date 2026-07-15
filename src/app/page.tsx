"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import {
  IconBuildingStore,
  IconChartBar,
  IconCode,
  IconLock,
  IconRadar2,
  IconSparkles,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/bento-grid";
import { FloatingNavbar } from "@/components/ui/aceternity/floating-navbar";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { Tabs } from "@/components/ui/aceternity/tabs";
import { Timeline } from "@/components/ui/aceternity/timeline";
import { DemoReportModal } from "@/features/marketing/demo-report-modal";
import { HeroAuditForm } from "@/features/marketing/hero-audit-form";

const CTA = "Audit website gratis";

const faqs = [
  {
    q: "Apakah Klarr Rank sama dengan Lighthouse / PageSpeed Insights?",
    a: "Tidak. Lighthouse fokus performa lab. Klarr Rank menggabungkan SEO on-page, skor multi-kategori ber-rule deterministik, prioritas isu, rekomendasi berbahasa Indonesia, rank tracking, dan riwayat untuk dibandingkan.",
  },
  {
    q: "Apakah skor menjamin ranking Google naik?",
    a: "Tidak. Kami membantu menemukan hambatan teknis. Ranking tetap dipengaruhi konten, otoritas, relevansi, dan persaingan.",
  },
  {
    q: "Apakah audit aman?",
    a: "Ya. Hanya membaca halaman publik. Tidak mengubah konten, tidak instal script, tidak butuh akses admin.",
  },
  {
    q: "Apakah data website disimpan?",
    a: "Hasil audit disimpan di akun Anda. Kami tidak menjual data audit dan tidak mempublikasikan URL yang di-scan.",
  },
  {
    q: "Berapa halaman per audit?",
    a: "Satu URL per audit—cepat dan kuota jelas. Bukan crawl seluruh domain.",
  },
  {
    q: "Apa isi paket Pro?",
    a: "10 scan/hari, 60/periode, 10 keyword, rank harian, riwayat lebih panjang, AI penuh. Harga belum termasuk pajak saat checkout.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  return (
    <main className="relative min-h-full overflow-x-hidden bg-background text-text-primary">
      <FloatingNavbar
        navItems={[
          { name: "Hasil", link: "#hasil" },
          { name: "Cara kerja", link: "#how" },
          { name: "Harga", link: "#pricing" },
          { name: "FAQ", link: "#faq" },
        ]}
      />

      <DemoReportModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Hero */}
      <section className="hero-glow relative px-4 pb-12 pt-28 md:pb-16 md:pt-32">
        <Spotlight
          className="-top-40 left-0 md:-top-24 md:left-32"
          fill="#38BDF8"
        />
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.05]" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-2xl space-y-5">
            <p className="text-sm font-semibold text-accent">
              Untuk pemilik bisnis, marketer, dan developer
            </p>
            <h1 className="text-[2.35rem] font-bold leading-[1.15] tracking-tight md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Temukan masalah SEO teknis sebelum ranking Anda tertahan
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
              Audit satu URL dalam hitungan detik. Dapatkan skor, prioritas
              masalah, dan langkah perbaikan berbahasa Indonesia.
            </p>
            <HeroAuditForm ctaLabel={CTA} />
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="inline-flex min-h-[44px] items-center text-sm font-semibold text-text-secondary underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                Lihat contoh laporan
              </button>
              <span className="text-sm text-text-muted">
                Sudah punya akun?{" "}
                <LoginLink className="font-medium text-text-secondary hover:text-text-primary">
                  Masuk
                </LoginLink>
              </span>
            </div>
          </div>

          {/* Demo card — neutral surface */}
          <div
            id="preview"
            className="rounded-2xl border border-border bg-surface p-3 shadow-[var(--shadow)] md:p-4"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Contoh hasil audit
                </p>
                <p className="text-sm font-medium">demo.klarrank.local</p>
              </div>
              <span className="rounded-full border border-border bg-surface-raised px-3 py-1 text-xs font-semibold text-text-secondary">
                1 critical · 3 warning
              </span>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Overall</p>
                  <p className="text-4xl font-bold tabular-nums">78</p>
                </div>
                <p className="text-right text-xs text-text-muted">
                  Rule set v1.0.0
                  <br />
                  Bukan skor Google
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ["SEO", "82"],
                  ["Perf", "71"],
                  ["A11y", "76"],
                  ["Best", "80"],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    className="rounded-lg border border-border bg-surface p-2.5"
                  >
                    <p className="text-xs text-text-muted">{l}</p>
                    <p className="text-lg font-bold tabular-nums">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-border border-l-2 border-l-warning bg-surface p-3 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-warning">
                  Warning · dampak sedang · usaha LOW
                </p>
                <p className="mt-1 font-semibold">Meta description hilang</p>
                <p className="mt-2 text-text-secondary">
                  <span className="font-medium text-text-primary">Mengapa:</span>{" "}
                  cuplikan SERP kurang menarik.
                </p>
                <p className="mt-1 text-text-secondary">
                  <span className="font-medium text-text-primary">Perbaiki:</span>{" "}
                  deskripsi unik 140–160 karakter.
                </p>
                <p className="mt-1 text-text-muted">Estimasi: 20–30 menit</p>
              </div>
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="mt-3 text-sm font-semibold text-accent hover:underline"
              >
                Lihat contoh laporan →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust — canvas, not blue band */}
      <section className="border-y border-border-subtle px-4 py-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
          {[
            {
              icon: IconRadar2,
              t: "Hasil awal ±30 detik",
              d: "Tanpa instalasi. Cukup URL publik.",
            },
            {
              icon: IconSparkles,
              t: "Rekomendasi berbahasa Indonesia",
              d: "Prioritas otomatis, siap dikerjakan.",
            },
            {
              icon: IconLock,
              t: "Tidak mengubah website Anda",
              d: "Read-only. Data tidak dipublikasikan.",
            },
          ].map((item) => (
            <div key={item.t} className="flex gap-3">
              <item.icon
                className="mt-0.5 h-5 w-5 shrink-0 text-text-muted"
                aria-hidden
              />
              <div>
                <p className="text-base font-semibold">{item.t}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">
                  {item.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What you get — neutral bento */}
      <section id="hasil" className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <p className="text-center text-sm font-semibold text-accent">Produk</p>
        <h2 className="mt-2 text-center text-3xl font-bold md:text-4xl">
          Apa yang Anda dapatkan
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg leading-relaxed text-text-secondary">
          Skor yang bisa dibandingkan, isu terurut, rekomendasi aksi, dan pantau
          ranking—bukan bungkus ulang Lighthouse.
        </p>

        <div className="mt-10">
          <BentoGrid>
            <BentoGridItem
              className="md:col-span-2 md:row-span-2"
              title="Dari temuan menjadi tindakan"
              description="Satu isu lengkap: urgensi, dampak, cara perbaiki, estimasi."
              header={
                <div className="space-y-2 rounded-xl border border-border bg-background p-3 text-sm">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-critical/15 px-2 py-0.5 text-critical">
                      Critical
                    </span>
                    <span className="rounded-full bg-warning/15 px-2 py-0.5 text-warning">
                      Warning ×3
                    </span>
                    <span className="rounded-full bg-success/15 px-2 py-0.5 text-success">
                      Passed ×12
                    </span>
                  </div>
                  <p className="font-semibold text-critical">
                    Canonical URL hilang
                  </p>
                  <p className="text-text-secondary">
                    Mengapa: risiko konten duplikat diindeks salah.
                  </p>
                  <p className="text-text-secondary">
                    Perbaiki: set link rel=canonical ke URL preferensi.
                  </p>
                  <p className="text-text-muted">Estimasi: 15–45 menit</p>
                  <button
                    type="button"
                    onClick={() => setDemoOpen(true)}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    Lihat detail →
                  </button>
                </div>
              }
            />
            <BentoGridItem
              title="Skor 78 overall"
              description="SEO · Perf · A11y · Best — rule versioned."
              header={
                <div className="flex h-16 items-end rounded-xl border border-border bg-background p-3 text-3xl font-bold tabular-nums">
                  78
                </div>
              }
            />
            <BentoGridItem
              title="Distribusi isu"
              description="Critical → Warning → Info. Fokus dampak dulu."
              header={
                <div className="flex h-16 items-end gap-1 rounded-xl border border-border bg-background p-3">
                  <div className="h-8 w-4 rounded-sm bg-critical/80" />
                  <div className="h-12 w-4 rounded-sm bg-warning/80" />
                  <div className="h-6 w-4 rounded-sm bg-info/60" />
                  <div className="h-14 w-4 rounded-sm bg-success/70" />
                </div>
              }
            />
            <BentoGridItem
              title="Rekomendasi siap dikerjakan"
              description="AI merangkum; laporan teknis tetap ada jika AI gagal."
              icon={<IconSparkles className="h-5 w-5 text-secondary" />}
            />
            <BentoGridItem
              title="Tracking perkembangan"
              description="Rescan + keyword (Free 7 hari / Pro harian)."
              icon={<IconChartBar className="h-5 w-5 text-secondary" />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* Report tabs — demo moment */}
      <section className="border-y border-border-subtle bg-section px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm font-semibold text-accent">
            Demo laporan
          </p>
          <h2 className="mt-2 text-center text-3xl font-bold md:text-4xl">
            Satu laporan, beberapa sudut pandang
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-text-secondary">
            Tiap tab mengubah isi panel—bukan label kosong.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow)] md:p-6">
            <Tabs
              tabs={[
                {
                  title: "Overview",
                  value: "overview",
                  content: (
                    <div className="grid gap-2 sm:grid-cols-4">
                      {[
                        ["Overall", "78", "Gabungan berbobot"],
                        ["SEO", "82", "Meta & indexability"],
                        ["Performance", "71", "Load & transfer"],
                        ["Accessibility", "76", "Alt, lang, labels"],
                      ].map(([l, v, tip]) => (
                        <div
                          key={l}
                          className="rounded-xl border border-border bg-background p-4"
                        >
                          <p className="text-sm text-text-secondary">{l}</p>
                          <p className="text-3xl font-bold tabular-nums">{v}</p>
                          <p className="mt-1 text-xs text-text-muted">{tip}</p>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  title: "Issues",
                  value: "issues",
                  content: (
                    <ul className="space-y-2 text-sm">
                      {[
                        ["CRITICAL", "text-critical", "Canonical hilang"],
                        ["WARNING", "text-warning", "Title terlalu pendek"],
                        ["WARNING", "text-warning", "Meta description kosong"],
                        ["INFO", "text-info", "Beberapa gambar tanpa alt"],
                      ].map(([sev, cls, title]) => (
                        <li
                          key={title}
                          className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-background px-4 py-3"
                        >
                          <span className={`font-semibold ${cls}`}>{sev}</span>
                          <span className="text-text-muted" aria-hidden>
                            ·
                          </span>
                          <span>{title}</span>
                        </li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: "Rekomendasi",
                  value: "rec",
                  content: (
                    <div className="space-y-2 text-sm">
                      <div className="rounded-xl border border-border border-l-2 border-l-accent bg-background p-4">
                        <p className="font-semibold">
                          #1 Tambah meta description
                        </p>
                        <p className="mt-1 text-text-secondary">
                          Dampak SERP · Usaha LOW · ~20 menit
                        </p>
                      </div>
                      <div className="rounded-xl border border-border border-l-2 border-l-secondary bg-background p-4">
                        <p className="font-semibold">
                          #2 Set canonical ke URL preferensi
                        </p>
                        <p className="mt-1 text-text-secondary">
                          Indexability · Usaha MEDIUM · ~30 menit
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Rank",
                  value: "rank",
                  content: (
                    <div className="rounded-xl border border-border bg-background p-4 text-sm">
                      <p className="font-semibold">jasa seo jakarta</p>
                      <p className="mt-2 text-text-secondary">
                        Posisi{" "}
                        <span className="font-semibold text-text-primary">
                          12
                        </span>{" "}
                        ·{" "}
                        <span className="font-semibold text-success">+3</span> ·
                        cek harian di Pro
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-sm font-semibold text-accent">Proses</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Cara kerja</h2>
            <p className="mt-3 text-lg leading-relaxed text-text-secondary">
              Tiga langkah dari URL ke keputusan perbaikan.
            </p>
            <RegisterLink className="mt-6 inline-flex min-h-[44px] items-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent-hover">
              {CTA}
            </RegisterLink>
          </div>
          <Timeline
            items={[
              {
                badge: "1",
                title: "Masukkan URL",
                description:
                  "Halaman publik. Tanpa https juga bisa—kami normalisasi.",
              },
              {
                badge: "2",
                title: "Klarr Rank memindai",
                description:
                  "SEO on-page + rules + skor. Target ±30 detik untuk halaman normal.",
              },
              {
                badge: "3",
                title: "Prioritaskan & kerjakan",
                description:
                  "Perbaiki, rescan setelah rilis, pantau keyword penting.",
              },
            ]}
          />
        </div>
      </section>

      {/* Personas + method close together */}
      <section className="border-t border-border-subtle px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-12">
          <div>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Untuk siapa
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: IconBuildingStore,
                  t: "Pemilik bisnis / UMKM",
                  d: "Prioritas yang bisa didelegasikan—tanpa tenggelam di jargon.",
                },
                {
                  icon: IconUsers,
                  t: "Marketer & SEO",
                  d: "Quick wins, bukti isu, riwayat audit, gerakan ranking klien.",
                },
                {
                  icon: IconCode,
                  t: "Web developer",
                  d: "Isu teknis jelas untuk verifikasi rilis dan regresi.",
                },
              ].map((u) => (
                <div
                  key={u.t}
                  className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/40 hover:bg-surface-raised"
                >
                  <u.icon className="h-6 w-6 text-text-muted" aria-hidden />
                  <h3 className="mt-3 text-lg font-semibold">{u.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                    {u.d}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h2 className="text-2xl font-bold md:text-3xl">
              Metode yang bisa dijelaskan
            </h2>
            <ul className="mt-4 grid gap-3 text-[15px] leading-relaxed text-text-secondary md:grid-cols-2 md:text-base">
              <li>
                <span className="font-semibold text-text-primary">Diperiksa:</span>{" "}
                meta, heading, links, images, sinyal a11y & best practices.
              </li>
              <li>
                <span className="font-semibold text-text-primary">Sumber:</span>{" "}
                HTML halaman publik yang Anda masukkan (1 URL).
              </li>
              <li>
                <span className="font-semibold text-text-primary">Tidak:</span>{" "}
                crawl massal domain, login-protected, backlink DB (MVP).
              </li>
              <li>
                <span className="font-semibold text-text-primary">Privasi:</span>{" "}
                laporan milik akun; data tidak dijual.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing — cards first */}
      <section id="pricing" className="border-t border-border-subtle px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm font-semibold text-accent">Harga</p>
          <h2 className="mt-2 text-center text-3xl font-bold md:text-4xl">
            Transparan (IDR)
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-text-secondary">
            Free untuk uji halaman penting. Pro untuk pemantauan rutin.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">Free</h3>
              <p className="mt-2 text-4xl font-bold">Rp0</p>
              <ul className="mt-4 space-y-2 text-[15px] text-text-secondary">
                <li>• 2 scan / hari · 10 / 30 hari</li>
                <li>• 2 keyword · cek tiap 7 hari</li>
                <li>• Riwayat audit 14 hari</li>
                <li>• AI max 3 prioritas</li>
              </ul>
              <RegisterLink className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold hover:border-accent/50">
                {CTA}
              </RegisterLink>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-accent/50 bg-surface p-6 shadow-[0_0_40px_rgba(56,189,248,0.08)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">Pro</h3>
                <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-semibold text-secondary">
                  Pemantauan rutin
                </span>
              </div>
              <p className="mt-2 text-4xl font-bold">
                Rp59.000
                <span className="text-base font-normal text-text-secondary">
                  /bulan
                </span>
              </p>
              <ul className="mt-4 space-y-2 text-[15px] text-text-secondary">
                <li>• 10 scan / hari · 60 / periode</li>
                <li>• 10 keyword · cek harian</li>
                <li>• Riwayat 12 bulan</li>
                <li>• AI rekomendasi penuh</li>
              </ul>
              <RegisterLink className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent-hover">
                Mulai dari Free dulu
              </RegisterLink>
              <p className="mt-3 text-center text-xs text-text-muted">
                Belum termasuk pajak · batalkan perpanjangan kapan saja
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowCompare((v) => !v)}
              className="text-sm font-semibold text-text-secondary underline-offset-4 hover:text-accent hover:underline"
              aria-expanded={showCompare}
            >
              {showCompare
                ? "Sembunyikan perbandingan lengkap"
                : "Lihat perbandingan lengkap"}
            </button>
          </div>

          {showCompare ? (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-surface">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="border-b border-border-subtle">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Fitur</th>
                    <th className="px-4 py-3 font-semibold">Free</th>
                    <th className="px-4 py-3 font-semibold">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-text-secondary">
                  {[
                    ["Scan / hari", "2", "10"],
                    ["Scan / periode", "10 / 30 hari", "60"],
                    ["Keyword", "2", "10"],
                    ["Rank auto", "7 hari", "Harian"],
                    ["Riwayat", "14 hari", "12 bulan"],
                    ["Export PDF/CSV", "Belum (MVP)", "Belum (MVP)"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      <td className="px-4 py-3">{row[0]}</td>
                      <td className="px-4 py-3 font-medium text-text-primary">
                        {row[1]}
                      </td>
                      <td className="px-4 py-3 font-medium text-text-primary">
                        {row[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border-subtle px-4 py-14">
        <div className="mx-auto max-w-[720px]">
          <h2 className="text-center text-3xl font-bold md:text-4xl">FAQ</h2>
          <div className="mt-8 space-y-2">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className={`rounded-2xl border border-border ${
                    open ? "bg-surface-raised" : "bg-surface"
                  }`}
                >
                  <button
                    type="button"
                    className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                  >
                    {item.q}
                    <span className="text-text-muted" aria-hidden>
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open ? (
                    <p className="border-t border-border-subtle px-4 py-3 text-[15px] leading-relaxed text-text-secondary">
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA — only other colored section */}
      <section className="cta-glow relative overflow-hidden px-4 py-16">
        <BackgroundBeams className="opacity-20" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Temukan masalah teknis sebelum calon pelanggan menemukannya
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-text-secondary">
            Masukkan URL dan dapatkan prioritas perbaikan—bukan hanya skor.
          </p>
          <div className="mt-8 w-full max-w-xl text-left">
            <HeroAuditForm ctaLabel={CTA} className="max-w-none" />
          </div>
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            className="mt-4 text-sm font-semibold text-text-secondary hover:text-accent hover:underline"
          >
            Lihat contoh laporan
          </button>
        </div>
      </section>

      <footer className="border-t border-border-subtle px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F4C75] text-sm font-bold text-[#BBE1FA]">
                K
              </span>
              Klarr Rank
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Audit SEO teknis, prioritas perbaikan, rank tracker terjangkau.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Produk</p>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              <li>
                <a href="#hasil" className="hover:text-text-primary">
                  Hasil
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-text-primary">
                  Harga
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="hover:text-text-primary"
                >
                  Contoh laporan
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Akun</p>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              <li>
                <LoginLink className="hover:text-text-primary">Masuk</LoginLink>
              </li>
              <li>
                <RegisterLink className="hover:text-text-primary">
                  Daftar
                </RegisterLink>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li>Privasi (segera)</li>
              <li>Syarat (segera)</li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-text-muted">
          © {new Date().getFullYear()} Klarr Rank. Skor adalah penilaian
          produk, bukan jaminan ranking Google.
        </p>
      </footer>
    </main>
  );
}
