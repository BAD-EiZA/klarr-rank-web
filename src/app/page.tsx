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
import Link from "next/link";
import { useState } from "react";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/bento-grid";
import { FloatingNavbar } from "@/components/ui/aceternity/floating-navbar";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { Tabs } from "@/components/ui/aceternity/tabs";
import { Timeline } from "@/components/ui/aceternity/timeline";
import { DemoReportModal } from "@/features/marketing/demo-report-modal";
import { HeroAuditForm } from "@/features/marketing/hero-audit-form";

const CTA_PRIMARY = "Audit website gratis";
const CTA_SECONDARY = "Lihat contoh laporan";

const faqs = [
  {
    q: "Apakah Klarr Rank sama dengan Google Lighthouse atau PageSpeed Insights?",
    a: "Tidak. Lighthouse/PageSpeed fokus pada performa lab. Klarr Rank menggabungkan ekstraksi SEO on-page, skor multi-kategori ber-rule deterministik, prioritas isu, rekomendasi berbahasa Indonesia, dan rank tracking—lalu menyimpan riwayat untuk dibandingkan.",
  },
  {
    q: "Apakah skor menjamin kenaikan ranking Google?",
    a: "Tidak. Klarr Rank membantu menemukan hambatan teknis dan peluang perbaikan. Peringkat tetap dipengaruhi konten, otoritas, relevansi, dan persaingan.",
  },
  {
    q: "Apakah audit aman untuk website saya?",
    a: "Ya. Kami hanya membaca halaman publik (HTTP GET). Kami tidak mengubah konten, tidak menginstal script, dan tidak butuh akses admin website Anda.",
  },
  {
    q: "Apakah Klarr Rank menyimpan data website?",
    a: "Hasil audit disimpan di akun Anda agar bisa dibuka ulang dan dibandingkan. Kami tidak menjual data audit dan tidak mempublikasikan URL yang Anda scan.",
  },
  {
    q: "Apakah website harus milik saya?",
    a: "Tidak. Anda bisa mengaudit halaman publik mana pun yang bisa dibuka tanpa login. Halaman staging terproteksi atau di balik auth tidak didukung di MVP.",
  },
  {
    q: "Berapa banyak halaman yang dipindai dalam satu audit?",
    a: "Satu URL / satu halaman per audit. Ini menjaga hasil cepat dan kuota tetap jelas—bukan crawl seluruh domain.",
  },
  {
    q: "Apakah tersedia export PDF/CSV atau laporan klien?",
    a: "Belum di MVP. Laporan bisa dibuka di dashboard. Export dan berbagi laporan masuk roadmap setelah billing Pro stabil.",
  },
  {
    q: "Apa yang termasuk paket Pro?",
    a: "Kuota scan lebih besar (10/hari, 60/periode), 10 keyword, rank check harian, riwayat lebih panjang, dan rekomendasi AI penuh. Harga Pro di halaman ini belum termasuk pajak (ditampilkan saat checkout).",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <main className="relative min-h-full overflow-x-hidden bg-background">
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
      <section className="relative px-4 pb-12 pt-28 md:pb-16 md:pt-32">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-40"
          fill="#BBE1FA"
        />
        <BackgroundBeams className="opacity-40" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold text-brand-soft">
              Untuk pemilik bisnis, marketer, dan developer
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:leading-[1.12]">
              Temukan masalah SEO teknis sebelum menghambat pertumbuhan website
              Anda
            </h1>
            <p className="max-w-xl text-base text-text-secondary md:text-lg md:leading-relaxed">
              Bukan sekadar skor. Dapatkan prioritas masalah, alasan dampaknya,
              dan langkah perbaikan berbahasa Indonesia—lalu pantau ranking
              keyword penting.
            </p>
            <HeroAuditForm ctaLabel={CTA_PRIMARY} />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-soft underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {CTA_SECONDARY}
              </button>
              <span className="text-sm text-text-secondary">
                Sudah punya akun?{" "}
                <LoginLink className="font-medium text-text-primary underline-offset-4 hover:underline">
                  Masuk
                </LoginLink>
              </span>
            </div>
          </div>

          {/* Concrete product proof */}
          <div
            id="preview"
            className="rounded-2xl border border-border bg-surface p-3 shadow-[var(--shadow)] md:p-4"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-soft">
                  Contoh hasil audit
                </p>
                <p className="text-sm font-medium text-text-primary">
                  demo.klarrank.local · 1 halaman
                </p>
              </div>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold">
                4 warning · 1 critical
              </span>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-text-secondary">Overall score</p>
                  <p className="text-4xl font-bold tabular-nums">78</p>
                </div>
                <p className="text-right text-xs text-text-secondary">
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
                    className="rounded-lg border border-border/80 bg-surface/40 p-2.5"
                  >
                    <p className="text-xs text-text-secondary">{l}</p>
                    <p className="text-lg font-bold tabular-nums">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-warning/40 bg-surface/30 p-3 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-warning">
                  Warning · dampak sedang · usaha LOW
                </p>
                <p className="mt-1 font-semibold text-text-primary">
                  Meta description hilang
                </p>
                <p className="mt-2 text-text-secondary">
                  <span className="font-medium text-text-primary">Mengapa:</span>{" "}
                  cuplikan SERP kurang menarik, CTR berisiko turun.
                </p>
                <p className="mt-1 text-text-secondary">
                  <span className="font-medium text-text-primary">Perbaiki:</span>{" "}
                  tulis deskripsi unik 140–160 karakter (layanan + lokasi +
                  pembeda).
                </p>
                <p className="mt-1 text-text-secondary">
                  <span className="font-medium text-text-primary">Estimasi:</span>{" "}
                  20–30 menit
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="mt-3 text-sm font-semibold text-brand-soft underline-offset-4 hover:underline"
              >
                {CTA_SECONDARY} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / method strip — 3 strong points */}
      <section className="border-y border-border bg-surface px-4 py-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
          {[
            {
              icon: IconRadar2,
              t: "Audit tanpa instalasi",
              d: "Cukup URL publik. Tidak butuh plugin atau akses CMS.",
            },
            {
              icon: IconSparkles,
              t: "Prioritas masalah otomatis",
              d: "Rule deterministik + urutan dampak, bukan daftar error acak.",
            },
            {
              icon: IconLock,
              t: "Rekomendasi berbahasa Indonesia",
              d: "Langkah yang bisa dikerjakan owner, marketer, atau developer.",
            },
          ].map((item) => (
            <div key={item.t} className="flex gap-3">
              <item.icon
                className="mt-0.5 h-6 w-6 shrink-0 text-brand-soft"
                aria-hidden
              />
              <div>
                <p className="text-base font-semibold text-text-primary">
                  {item.t}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  {item.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* A. What you get — consolidated */}
      <section id="hasil" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Apa yang Anda dapatkan
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-text-secondary md:text-lg">
          Satu audit halaman menghasilkan skor yang bisa dibandingkan, isu
          terurut, rekomendasi aksi, dan jalur pantau ranking—bukan bungkus
          ulang Lighthouse.
        </p>

        <div className="mt-10">
          <BentoGrid>
            <BentoGridItem
              className="md:col-span-2 md:row-span-2"
              title="Dari temuan menjadi tindakan"
              description="Contoh isu lengkap: masalah, urgensi, dampak, cara perbaiki, estimasi."
              header={
                <div className="space-y-2 rounded-xl border border-border bg-background p-3 text-sm">
                  <p className="text-xs font-semibold uppercase text-critical">
                    Critical · dampak tinggi
                  </p>
                  <p className="font-semibold">Canonical URL hilang</p>
                  <p className="text-text-secondary">
                    Mengapa: risiko konten duplikat diindeks salah.
                  </p>
                  <p className="text-text-secondary">
                    Perbaiki: set{" "}
                    <code className="text-brand-soft">&lt;link rel=&quot;canonical&quot;&gt;</code>{" "}
                    ke URL preferensi.
                  </p>
                  <p className="text-text-secondary">Estimasi: 15–45 menit</p>
                </div>
              }
            />
            <BentoGridItem
              title="Skor yang mudah dipahami"
              description="SEO, Performance, Accessibility, Best Practices + overall—rule versioned."
              header={
                <div className="flex h-20 items-end rounded-xl bg-background p-3 text-3xl font-bold tabular-nums">
                  78
                </div>
              }
            />
            <BentoGridItem
              title="Isu terprioritas"
              description="Critical → Warning → Info. Fokus yang paling berpengaruh dulu."
              header={
                <div className="flex h-20 items-center gap-2 rounded-xl bg-background px-3 text-xs font-semibold">
                  <span className="text-critical">C1</span>
                  <span className="text-warning">W3</span>
                  <span className="text-info">I2</span>
                </div>
              }
            />
            <BentoGridItem
              title="Rekomendasi siap dikerjakan"
              description="AI merangkum; laporan teknis tetap ada jika AI gagal."
              icon={<IconSparkles className="h-5 w-5 text-brand-soft" />}
            />
            <BentoGridItem
              title="Tracking perkembangan"
              description="Rescan setelah rilis + pantau keyword (Free 7 hari / Pro harian)."
              icon={<IconChartBar className="h-5 w-5 text-brand-soft" />}
            />
          </BentoGrid>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-text-secondary">
          <span className="font-medium text-text-primary">Beda dari Lighthouse:</span>{" "}
          Klarr Rank menyimpan riwayat, mengurutkan isu SEO on-page, memberi
          rekomendasi kontekstual, dan menambahkan rank tracking—bukan hanya
          skor lab sekali jalan.
        </p>
      </section>

      {/* Report angles — lighter, one section */}
      <section className="border-y border-border bg-surface/50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            Satu laporan, beberapa sudut pandang
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-text-secondary">
            Tiap skor punya konteks; tab membantu owner dan developer fokus
            berbeda tanpa tool terpisah.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-background p-4 md:p-6">
            <Tabs
              tabs={[
                {
                  title: "Overview",
                  value: "overview",
                  content: (
                    <div className="space-y-3">
                      <div className="grid gap-2 sm:grid-cols-4">
                        {[
                          ["Overall", "78", "Gabungan berbobot"],
                          ["SEO", "82", "Meta, heading, indexability"],
                          ["Performance", "71", "Load & transfer"],
                          ["Accessibility", "76", "Alt, lang, labels"],
                        ].map(([l, v, tip]) => (
                          <div
                            key={l}
                            className="rounded-xl border border-border p-3"
                            title={tip}
                          >
                            <p className="text-sm text-text-secondary">{l}</p>
                            <p className="text-2xl font-bold tabular-nums">{v}</p>
                            <p className="mt-1 text-xs text-text-secondary">
                              {tip}
                            </p>
                          </div>
                        ))}
                      </div>
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
                          className="flex flex-wrap items-center gap-2 rounded-xl border border-border px-4 py-3"
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
                          <span aria-hidden>·</span>
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
                      <div className="rounded-xl border border-border p-4">
                        <p className="font-semibold">
                          #1 Tambah meta description
                        </p>
                        <p className="mt-1 text-text-secondary">
                          Dampak: cuplikan SERP · Usaha: LOW · ~20 menit
                        </p>
                      </div>
                      <div className="rounded-xl border border-border p-4">
                        <p className="font-semibold">
                          #2 Set canonical ke URL preferensi
                        </p>
                        <p className="mt-1 text-text-secondary">
                          Dampak: indexability · Usaha: MEDIUM · ~30 menit
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Rank",
                  value: "rank",
                  content: (
                    <div className="rounded-xl border border-border p-4 text-sm">
                      <p className="font-semibold">
                        keyword: jasa seo jakarta
                      </p>
                      <p className="mt-2 text-text-secondary">
                        Posisi{" "}
                        <span className="font-semibold text-text-primary">
                          12
                        </span>{" "}
                        · gerakan{" "}
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

      {/* How it works — 3 steps visual */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Cara kerja</h2>
            <p className="mt-3 text-base leading-relaxed text-text-secondary md:text-lg">
              Tiga langkah singkat dari URL ke keputusan perbaikan.
            </p>
            <RegisterLink className="mt-6 inline-flex min-h-[44px] items-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
              {CTA_PRIMARY}
            </RegisterLink>
          </div>
          <Timeline
            items={[
              {
                badge: "1",
                title: "Masukkan URL",
                description:
                  "Pilih halaman publik. Normalisasi otomatis; tanpa https juga bisa.",
              },
              {
                badge: "2",
                title: "Klarr Rank memindai",
                description:
                  "Ekstrak SEO on-page, jalankan rules, hitung skor. Target ±30 detik untuk halaman normal.",
              },
              {
                badge: "3",
                title: "Terapkan & audit ulang",
                description:
                  "Kerjakan prioritas, rescan setelah rilis, pantau keyword penting.",
              },
            ]}
          />
        </div>
      </section>

      {/* Personas — sharper */}
      <section className="border-y border-border bg-surface/40 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Untuk siapa Klarr Rank?
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: IconBuildingStore,
                t: "Pemilik bisnis / UMKM",
                d: "Pahami kondisi website tanpa tenggelam di jargon. Dapat prioritas yang bisa didelegasikan ke developer.",
              },
              {
                icon: IconUsers,
                t: "Marketer & praktisi SEO",
                d: "Quick wins, bukti isu, riwayat audit, dan gerakan ranking untuk laporan klien.",
              },
              {
                icon: IconCode,
                t: "Web developer",
                d: "Daftar isu teknis jelas (meta, heading, a11y, status) untuk verifikasi rilis dan regresi.",
              },
            ].map((u) => (
              <div
                key={u.t}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <u.icon
                  className="h-6 w-6 text-brand-soft"
                  aria-hidden
                />
                <h3 className="mt-3 text-lg font-semibold">{u.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {u.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method / trust — honest, no fake stats */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-2xl border border-border bg-surface/50 p-6 md:p-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            Metode yang bisa dijelaskan
          </h2>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-text-secondary md:grid-cols-2 md:text-base">
            <li>
              <span className="font-semibold text-text-primary">Sumber data:</span>{" "}
              HTML halaman publik yang Anda masukkan (bukan crawl massal domain).
            </li>
            <li>
              <span className="font-semibold text-text-primary">Skor:</span> rule
              engine berversi—rescan setelah rilis bisa dibandingkan secara
              konsisten.
            </li>
            <li>
              <span className="font-semibold text-text-primary">AI:</span> hanya
              merangkum bukti yang sudah diekstrak; tidak mengarang temuan.
            </li>
            <li>
              <span className="font-semibold text-text-primary">Privasi:</span>{" "}
              laporan milik akun Anda; kami tidak menjual data audit.
            </li>
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Harga transparan (IDR)
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-text-secondary md:text-lg">
            Free cukup untuk uji halaman penting. Pro untuk pemantauan rutin.
            Harga di bawah belum termasuk pajak (jika berlaku saat checkout).
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-background">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-border bg-surface/60">
                <tr>
                  <th className="px-4 py-3 font-semibold">Fitur</th>
                  <th className="px-4 py-3 font-semibold">Free</th>
                  <th className="px-4 py-3 font-semibold">
                    Pro{" "}
                    <span className="ml-1 rounded-full bg-accent/30 px-2 py-0.5 text-xs font-medium">
                      pemantauan rutin
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Harga", "Rp0", "Rp59.000 / bulan"],
                  ["Scan / hari", "2", "10"],
                  ["Scan / 30 hari (Free) atau periode Pro", "10", "60"],
                  ["Keyword aktif", "2", "10"],
                  ["Rank otomatis", "Tiap 7 hari", "Harian"],
                  ["Riwayat audit", "14 hari", "12 bulan"],
                  ["AI prioritas", "Maks 3 aksi", "Lengkap"],
                  ["Saat kuota habis", "Tunggu reset / upgrade", "Tunggu reset periode"],
                  ["Export PDF/CSV", "Belum (MVP)", "Belum (MVP)"],
                  ["Banyak domain", "Ya, per audit URL", "Ya, per audit URL"],
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
          <p className="mt-3 text-center text-xs text-text-secondary">
            Tidak ada biaya tersembunyi di halaman ini. Checkout Pro menyusul
            (Midtrans). Batalkan perpanjangan kapan saja setelah billing aktif.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="text-lg font-semibold">Free</h3>
              <p className="mt-2 text-4xl font-bold">Rp0</p>
              <p className="mt-2 text-sm text-text-secondary">
                Cocok untuk coba audit beberapa halaman penting.
              </p>
              <RegisterLink className="mt-6 inline-flex min-h-[44px] items-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold">
                {CTA_PRIMARY}
              </RegisterLink>
            </div>
            <div className="rounded-2xl border border-accent bg-surface/40 p-6">
              <h3 className="text-lg font-semibold">Pro</h3>
              <p className="mt-2 text-4xl font-bold">
                Rp59.000
                <span className="text-base font-normal text-text-secondary">
                  /bulan
                </span>
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Cocok untuk pemantauan rutin keyword & volume scan lebih besar.
              </p>
              <RegisterLink className="mt-6 inline-flex min-h-[44px] items-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
                Mulai dari Free dulu
              </RegisterLink>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border bg-surface/30 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">FAQ</h2>
          <div className="mt-10 space-y-2">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border border-border bg-background"
                >
                  <button
                    type="button"
                    className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3 text-left text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                  >
                    {item.q}
                    <span className="text-text-secondary" aria-hidden>
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open ? (
                    <p className="border-t border-border px-4 py-3 text-sm leading-relaxed text-text-secondary md:text-base">
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA with URL */}
      <section className="relative overflow-hidden px-4 py-16 md:py-20">
        <div className="absolute inset-0 bg-surface/50" />
        <BackgroundBeams className="opacity-30" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Temukan masalah teknis sebelum calon pelanggan menemukannya lebih
            dulu
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            Masukkan URL dan dapatkan prioritas perbaikan—bukan hanya skor.
          </p>
          <div className="mt-8 w-full max-w-xl text-left">
            <HeroAuditForm ctaLabel={CTA_PRIMARY} className="max-w-none" />
          </div>
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            className="mt-4 text-sm font-semibold text-brand-soft underline-offset-4 hover:underline"
          >
            {CTA_SECONDARY}
          </button>
        </div>
      </section>

      <footer className="border-t border-border bg-background px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-accent-foreground">
                K
              </span>
              Klarr Rank
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Audit SEO teknis, prioritas perbaikan, dan rank tracker terjangkau
              untuk website Indonesia.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Produk</p>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              <li>
                <a href="#hasil" className="hover:text-text-primary">
                  Hasil audit
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
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              <li>
                <span>Privasi (segera)</span>
              </li>
              <li>
                <span>Syarat (segera)</span>
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
