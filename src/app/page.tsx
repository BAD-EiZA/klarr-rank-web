"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import {
  IconBuildingStore,
  IconChartBar,
  IconChecklist,
  IconRadar2,
  IconSparkles,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/bento-grid";
import { HoverEffect } from "@/components/ui/aceternity/card-hover-effect";
import { FloatingNavbar } from "@/components/ui/aceternity/floating-navbar";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { Tabs } from "@/components/ui/aceternity/tabs";
import { Timeline } from "@/components/ui/aceternity/timeline";
import { HeroAuditForm } from "@/features/marketing/hero-audit-form";

const features = [
  {
    title: "Temukan masalah yang menahan ranking",
    description:
      "Audit teknis & on-page diurutkan berdasarkan dampak, bukan daftar error acak.",
    icon: <IconRadar2 className="h-5 w-5" />,
    link: "#preview",
  },
  {
    title: "Dari error jadi langkah perbaikan",
    description:
      "AI merangkum temuan jadi prioritas yang mudah dipahami dan siap dikerjakan.",
    icon: <IconSparkles className="h-5 w-5" />,
    link: "#preview",
  },
  {
    title: "Pantau apakah perbaikan benar-benar naik",
    description:
      "Lacak keyword harian/mingguan, gerakan posisi, history, dan kompetitor organik.",
    icon: <IconChartBar className="h-5 w-5" />,
    link: "#pricing",
  },
];

const faqs = [
  {
    q: "Apakah perlu kartu kredit untuk mulai?",
    a: "Tidak. Paket Free tidak memerlukan kartu kredit. Anda bisa audit hingga 2 halaman per hari.",
  },
  {
    q: "Apakah skor Klarr Rank sama dengan skor Google?",
    a: "Tidak. Skor adalah penilaian Klarr Rank dari rule engine deterministik. Bukan faktor ranking Google resmi.",
  },
  {
    q: "Website SPA / JavaScript-heavy bisa diaudit?",
    a: "MVP saat ini memuat HTML publik via fetch. Halaman SSR/static paling akurat. SPA murni mungkin partial.",
  },
  {
    q: "Data website saya aman?",
    a: "Kami tidak menjual data audit. Akses hanya milik akun Anda, dilindungi autentikasi Kinde.",
  },
  {
    q: "Bisa batalkan Pro kapan saja?",
    a: "Ya. Akses Pro bertahan sampai periode berakhir (billing Midtrans menyusul di fase berikutnya).",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative min-h-full overflow-x-hidden bg-background">
      <FloatingNavbar
        navItems={[
          { name: "Fitur", link: "#features" },
          { name: "Cara Kerja", link: "#how" },
          { name: "Harga", link: "#pricing" },
          { name: "FAQ", link: "#faq" },
        ]}
      />

      {/* 1. Hero — value + URL input + product visual */}
      <section className="relative px-4 pb-16 pt-28 md:pb-24 md:pt-32">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-40"
          fill="#BBE1FA"
        />
        <BackgroundBeams className="opacity-50" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-deep">
              SEO copilot untuk website Indonesia
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Audit SEO teknis dalam hitungan menit, tanpa biaya tool enterprise
            </h1>
            <p className="max-w-xl text-base text-text-secondary md:text-lg">
              Masukkan URL dan dapatkan skor SEO, daftar masalah terurut
              berdasarkan dampak, serta rekomendasi perbaikan yang bisa langsung
              dikerjakan.
            </p>
            <HeroAuditForm />
            <p className="text-sm text-text-secondary">
              Sudah punya akun?{" "}
              <LoginLink className="font-medium text-text-primary underline-offset-4 hover:underline">
                Masuk
              </LoginLink>
            </p>
          </div>

          {/* Product visual */}
          <div
            id="preview"
            className="rounded-2xl border border-border bg-surface p-3 shadow-[var(--shadow)] md:p-4"
          >
            <div className="rounded-xl border border-border bg-surface-soft/60 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-text-secondary">
                    Contoh laporan · example.com
                  </p>
                  <p className="text-sm font-semibold">Skor SEO: 78/100</p>
                </div>
                <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-accent-foreground">
                  +12 potensial
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ["Overall", "78"],
                  ["SEO", "82"],
                  ["Perf", "71"],
                  ["A11y", "76"],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    className="rounded-xl border border-border bg-surface p-3"
                  >
                    <p className="text-xs text-text-secondary">{l}</p>
                    <p className="text-2xl font-bold tabular-nums">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Prioritas tinggi
                </p>
                {[
                  "1. Title terlalu pendek",
                  "2. Meta description belum tersedia",
                  "3. Gambar hero belum punya alt text",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm"
                  >
                    <span className="font-medium text-warning">WARNING</span>
                    <span className="ml-2 text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-accent/40 bg-surface p-3 text-sm">
                <p className="font-semibold text-text-primary">Rekomendasi AI</p>
                <p className="mt-1 text-text-secondary">
                  “Tambahkan deskripsi 140–160 karakter yang menyebut layanan
                  utama, lokasi, dan pembeda bisnis Anda.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust bar */}
      <section className="border-y border-border bg-surface px-4 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-text-secondary md:justify-between md:text-left">
          <span className="font-medium text-text-primary">
            Dibuat untuk website Indonesia
          </span>
          <span>Rule engine deterministik</span>
          <span>Data tidak dijual</span>
          <span>Batalkan kapan saja</span>
          <span>Tanpa kartu kredit di Free</span>
        </div>
      </section>

      {/* 3. Results / outcomes */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Hasil yang Anda terima
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-text-secondary md:text-lg">
          Bukan sekadar daftar error. Anda mendapat prioritas, skor yang bisa
          dibandingkan, dan langkah berikutnya.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "Skor & kategori",
              d: "Overall + SEO, Performance, Accessibility, Best Practices — versioned & stabil.",
            },
            {
              t: "Isu terurut dampak",
              d: "Critical → Warning → Info. Tahu apa yang harus dikerjakan dulu.",
            },
            {
              t: "Rekomendasi siap aksi",
              d: "Bahasa jelas untuk owner, marketer, maupun developer.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow)]"
            >
              <IconChecklist className="h-6 w-6 text-brand-deep" />
              <h3 className="mt-3 text-lg font-semibold">{item.t}</h3>
              <p className="mt-2 text-sm text-text-secondary">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive-style preview tabs */}
      <section className="border-y border-border bg-surface-soft/40 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Satu laporan, banyak sudut pandang
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-text-secondary">
            Overview skor, isu teknis, rekomendasi AI, hingga jalur rank
            tracking.
          </p>
          <div className="mt-10 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow)] md:p-6">
            <Tabs
              tabs={[
                {
                  title: "Overview",
                  value: "overview",
                  content: (
                    <div className="grid gap-3 sm:grid-cols-4">
                      {[
                        ["Overall", "78"],
                        ["SEO", "82"],
                        ["Performance", "71"],
                        ["Accessibility", "76"],
                      ].map(([l, v]) => (
                        <div
                          key={l}
                          className="rounded-xl border border-border bg-background p-4"
                        >
                          <p className="text-sm text-text-secondary">{l}</p>
                          <p className="text-3xl font-bold tabular-nums">{v}</p>
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
                        ["CRITICAL", "Canonical hilang"],
                        ["WARNING", "Title terlalu pendek"],
                        ["WARNING", "Meta description kosong"],
                        ["INFO", "Beberapa gambar tanpa alt"],
                      ].map(([sev, title]) => (
                        <li
                          key={title}
                          className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3"
                        >
                          <span
                            className={
                              sev === "CRITICAL"
                                ? "font-semibold text-critical"
                                : sev === "WARNING"
                                  ? "font-semibold text-warning"
                                  : "font-semibold text-info"
                            }
                          >
                            {sev}
                          </span>
                          {title}
                        </li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: "Recommendations",
                  value: "rec",
                  content: (
                    <div className="space-y-3 text-sm">
                      <div className="rounded-xl border border-border bg-background p-4">
                        <p className="font-semibold">#1 Tambah meta description</p>
                        <p className="mt-1 text-text-secondary">
                          Dampak: cuplikan SERP lebih jelas · Usaha: LOW
                        </p>
                      </div>
                      <div className="rounded-xl border border-border bg-background p-4">
                        <p className="font-semibold">#2 Perpanjang title 30–60 karakter</p>
                        <p className="mt-1 text-text-secondary">
                          Dampak: relevansi keyword · Usaha: LOW
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Rank Tracking",
                  value: "rank",
                  content: (
                    <div className="rounded-xl border border-border bg-background p-4 text-sm">
                      <p className="font-semibold">keyword: jasa seo jakarta</p>
                      <p className="mt-2 text-text-secondary">
                        Posisi saat ini{" "}
                        <span className="font-semibold text-text-primary">
                          12
                        </span>{" "}
                        · gerakan{" "}
                        <span className="font-semibold text-success">+3</span> ·
                        cek harian (Pro)
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 5. Benefits (not features jargon) */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Semua yang dibutuhkan untuk bergerak
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-text-secondary md:text-lg">
          Dari diagnosis ke aksi, lalu ukur dampaknya.
        </p>
        <div className="mt-10">
          <HoverEffect items={features} />
        </div>
        <div className="mt-10">
          <BentoGrid>
            <BentoGridItem
              title="Rata-rata audit cepat"
              description="Target interaktif: laporan dalam hitungan menit untuk halaman publik normal."
              className="md:col-span-2"
              header={
                <div className="flex h-24 items-end rounded-xl bg-gradient-to-br from-accent/30 to-surface-soft p-3 text-3xl font-bold tabular-nums">
                  &lt; 30 dtk*
                </div>
              }
            />
            <BentoGridItem
              title="2 scan gratis / hari"
              description="Cukup untuk uji beberapa halaman penting tanpa bayar dulu."
              header={
                <div className="flex h-24 items-center justify-center rounded-xl bg-surface-soft text-2xl font-bold">
                  Free
                </div>
              }
            />
            <BentoGridItem
              title="10 keyword Pro"
              description="Rank check harian + history 12 bulan."
              header={
                <div className="flex h-24 items-center justify-center rounded-xl bg-accent/20 text-2xl font-bold text-success">
                  +N
                </div>
              }
            />
            <BentoGridItem
              title="Skor bisa dibandingkan"
              description="Rule set berversi — rescan setelah rilis tidak “acak”."
              className="md:col-span-2"
              header={
                <div className="h-24 rounded-xl bg-gradient-to-r from-surface-soft via-accent/20 to-surface-soft" />
              }
            />
          </BentoGrid>
          <p className="mt-3 text-center text-xs text-text-secondary">
            *tergantung ukuran halaman & respons server target
          </p>
        </div>
      </section>

      {/* 6. How it works */}
      <section id="how" className="border-y border-border bg-surface px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Cara kerja</h2>
            <p className="mt-3 text-text-secondary md:text-lg">
              Empat langkah dari URL sampai keputusan perbaikan.
            </p>
            <RegisterLink className="mt-6 inline-flex min-h-[44px] items-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
              Coba alur ini gratis
            </RegisterLink>
          </div>
          <Timeline
            items={[
              {
                badge: "01",
                title: "Masukkan URL",
                description:
                  "Output: URL ternormalisasi & aman (SSRF blocked).",
              },
              {
                badge: "02",
                title: "Extract & jalankan rules",
                description:
                  "Output: metadata, konten, links, images + skor kategori.",
              },
              {
                badge: "03",
                title: "Ringkasan AI",
                description:
                  "Output: 3–N prioritas perbaikan. Laporan teknis tetap ada jika AI gagal.",
              },
              {
                badge: "04",
                title: "Track keyword",
                description:
                  "Output: posisi, gerakan, history, snapshot kompetitor.",
              },
            ]}
          />
        </div>
      </section>

      {/* 7. Use cases */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Untuk siapa Klarr Rank?
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: IconBuildingStore,
              t: "Pemilik bisnis / UMKM",
              d: "Pahami apa yang harus diperbaiki tanpa jago SEO. Bahasa prioritas, bukan jargon.",
            },
            {
              icon: IconUsers,
              t: "Marketer & praktisi SEO",
              d: "Laporan berulang, bukti isu, history audit, gerakan ranking klien.",
            },
            {
              icon: IconRadar2,
              t: "Web developer",
              d: "Temuan teknis: status HTTP, heading, a11y, meta — verifikasi rilis cepat.",
            },
          ].map((u) => (
            <div
              key={u.t}
              className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow)]"
            >
              <u.icon className="h-6 w-6 text-brand-deep" />
              <h3 className="mt-3 text-lg font-semibold">{u.t}</h3>
              <p className="mt-2 text-sm text-text-secondary">{u.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Social proof / testimonials (honest MVP framing) */}
      <section className="border-y border-border bg-surface-soft/50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Mengapa tim memilih pendekatan ini
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                q: "“Akhirnya skor yang konsisten antar rescan — cocok untuk cek regresi rilis.”",
                a: "Developer product SaaS",
              },
              {
                q: "“Rekomendasi AI membantu saya jelaskan ke klien apa yang dikerjakan dulu.”",
                a: "Freelance SEO",
              },
              {
                q: "“Harga masuk akal untuk pantau beberapa keyword bisnis lokal.”",
                a: "Pemilik toko online",
              },
            ].map((t) => (
              <blockquote
                key={t.a}
                className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow)]"
              >
                <p className="text-sm leading-relaxed text-text-primary">{t.q}</p>
                <footer className="mt-4 text-xs font-medium text-text-secondary">
                  — {t.a}
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-text-secondary">
            Contoh persona — ganti dengan testimoni nyata setelah peluncuran.
          </p>
        </div>
      </section>

      {/* 9. Pricing comparison */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Harga transparan (IDR)
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-text-secondary md:text-lg">
          Mulai gratis. Upgrade saat butuh volume scan & rank harian.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-surface shadow-[var(--shadow)]">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="border-b border-border bg-surface-soft/60">
              <tr>
                <th className="px-4 py-3 font-semibold">Fitur</th>
                <th className="px-4 py-3 font-semibold">Free</th>
                <th className="px-4 py-3 font-semibold">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Harga", "Rp0", "Rp59.000 / bulan"],
                ["Scan / hari", "2", "10"],
                ["Scan / periode", "10 / 30 hari", "60"],
                ["Keyword aktif", "2", "10"],
                ["Rank auto", "7 hari", "Harian"],
                ["Riwayat audit", "14 hari", "12 bulan"],
                ["AI prioritas", "Maks 3 aksi", "Lengkap"],
              ].map((row) => (
                <tr key={row[0]}>
                  <td className="px-4 py-3 text-text-secondary">{row[0]}</td>
                  <td className="px-4 py-3 font-medium">{row[1]}</td>
                  <td className="px-4 py-3 font-medium">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="mt-2 text-4xl font-bold">Rp0</p>
            <RegisterLink className="mt-6 inline-flex min-h-[44px] items-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold">
              Mulai gratis
            </RegisterLink>
          </div>
          <div className="rounded-2xl border-2 border-accent bg-surface p-6 shadow-[var(--shadow)]">
            <h3 className="text-lg font-semibold">Pro</h3>
            <p className="mt-2 text-4xl font-bold">
              Rp59.000
              <span className="text-base font-normal text-text-secondary">
                /bulan
              </span>
            </p>
            <RegisterLink className="mt-6 inline-flex min-h-[44px] items-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
              Upgrade Pro
            </RegisterLink>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="border-t border-border bg-surface px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">FAQ</h2>
          <div className="mt-10 space-y-3">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border border-border bg-background"
                >
                  <button
                    type="button"
                    className="flex min-h-[44px] w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold md:text-base"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                  >
                    {item.q}
                    <span className="text-text-secondary">{open ? "−" : "+"}</span>
                  </button>
                  {open ? (
                    <p className="border-t border-border px-4 py-3 text-sm text-text-secondary">
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Closing CTA */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 bg-surface-soft/70" />
        <BackgroundBeams className="opacity-40" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Siap tahu apa yang menahan ranking Anda?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-text-secondary md:text-lg">
            Mulai audit gratis. Simpan laporan, bandingkan rescan, dan pantau
            keyword penting.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <RegisterLink className="inline-flex min-h-[44px] items-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm">
              Mulai audit gratis
            </RegisterLink>
            <Link
              href="#preview"
              className="inline-flex min-h-[44px] items-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold"
            >
              Lihat contoh laporan
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="border-t border-border bg-surface px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-accent-foreground">
                K
              </span>
              Klarr Rank
            </div>
            <p className="mt-3 text-sm text-text-secondary">
              SEO analyzer, rekomendasi AI, dan rank tracker terjangkau.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Produk</p>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              <li>
                <a href="#features" className="hover:text-text-primary">
                  Fitur
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-text-primary">
                  Harga
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-text-primary">
                  Cara kerja
                </a>
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
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              <li>
                <span className="cursor-default">Privasi (segera)</span>
              </li>
              <li>
                <span className="cursor-default">Syarat (segera)</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-text-secondary">
          © {new Date().getFullYear()} Klarr Rank. Skor adalah penilaian
          produk, bukan jaminan ranking Google.
        </p>
      </footer>
    </main>
  );
}
