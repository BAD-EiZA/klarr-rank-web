"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { useState } from "react";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/bento-grid";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { Tabs } from "@/components/ui/aceternity/tabs";
import { Timeline } from "@/components/ui/aceternity/timeline";
import { DoubleBezel } from "@/components/marketing/double-bezel";
import {
  IconChart,
  IconCode,
  IconLock,
  IconRadar,
  IconSpark,
  IconStore,
  IconUsers,
} from "@/components/marketing/icons";
import {
  IslandCtaContent,
  islandCtaClass,
} from "@/components/marketing/island-cta";
import { IslandNav } from "@/components/marketing/island-nav";
import { SectionHeader } from "@/components/marketing/section-header";
import {
  motion,
  MotionDiv,
  MotionSection,
  springEase,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui/motion-section";
import { DemoReportModal } from "@/features/marketing/demo-report-modal";
import { HeroAuditForm } from "@/features/marketing/hero-audit-form";
import { track } from "@/lib/analytics";
import { MARKETING_FAQS } from "@/lib/marketing/faqs";
import { cn } from "@/lib/utils";

const CTA = "Audit website gratis";

export function HomePageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  return (
    <main className="relative min-h-full overflow-x-hidden bg-background text-text-primary">
      <div className="grain-overlay" aria-hidden />

      <IslandNav
        navItems={[
          { name: "Hasil", link: "#hasil" },
          { name: "Cara kerja", link: "#how" },
          { name: "Harga", link: "#pricing" },
          { name: "FAQ", link: "#faq" },
        ]}
      />

      <DemoReportModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
      />

      {/* Hero */}
      <section className="hero-glow relative min-h-[100dvh] px-4 pb-20 pt-28 md:pb-28 md:pt-36">
        <Spotlight
          className="-top-40 left-0 md:-top-24 md:left-32"
          fill="#38BDF8"
        />
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.045]" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-14">
          <motion.div
            className="max-w-2xl space-y-6"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: springEase }}
          >
            <p className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
              SEO checker · Indonesia
            </p>
            <h1 className="text-[2.35rem] font-bold leading-[1.12] tracking-tight md:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              Temukan masalah SEO teknis sebelum ranking Anda tertahan
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
              Audit satu URL dalam hitungan detik. Dapatkan skor, prioritas
              masalah, dan langkah perbaikan berbahasa Indonesia.
            </p>
            <HeroAuditForm ctaLabel={CTA} inputId="hero-url" />
            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => {
                  track("landing_demo_opened", { source: "hero" });
                  setDemoOpen(true);
                }}
                className="inline-flex min-h-[44px] items-center text-sm font-semibold text-text-secondary underline-offset-4 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                Lihat contoh laporan
              </button>
              <span className="text-sm text-text-muted">
                Sudah punya akun?{" "}
                <LoginLink
                  className="font-medium text-text-secondary hover:text-text-primary"
                  onClick={() =>
                    track("auth_login_started", { source: "hero" })
                  }
                >
                  Masuk
                </LoginLink>
              </span>
            </div>
          </motion.div>

          <motion.div
            id="preview"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: springEase }}
          >
            <DoubleBezel coreClassName="p-4 md:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted">
                    Contoh hasil audit
                  </p>
                  <p className="mt-1 text-sm font-medium">demo.klarrank.local</p>
                </div>
                <span className="rounded-full border border-white/10 bg-surface-raised px-3 py-1 text-xs font-semibold text-text-secondary">
                  1 critical · 3 warning
                </span>
              </div>
              <div className="rounded-[1.25rem] border border-white/[0.06] bg-background p-4 md:p-5">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Overall</p>
                    <p className="text-4xl font-bold tabular-nums tracking-tight">
                      78
                    </p>
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
                      className="rounded-xl border border-white/[0.06] bg-surface p-2.5"
                    >
                      <p className="text-xs text-text-muted">{l}</p>
                      <p className="text-lg font-bold tabular-nums">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-white/[0.06] border-l-2 border-l-warning bg-surface p-3.5 text-sm">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-warning">
                    Warning · dampak sedang · usaha LOW
                  </p>
                  <p className="mt-1.5 font-semibold">Meta description hilang</p>
                  <p className="mt-2 text-text-secondary">
                    <span className="font-medium text-text-primary">
                      Mengapa:
                    </span>{" "}
                    cuplikan SERP kurang menarik.
                  </p>
                  <p className="mt-1 text-text-secondary">
                    <span className="font-medium text-text-primary">
                      Perbaiki:
                    </span>{" "}
                    deskripsi unik 140–160 karakter.
                  </p>
                  <p className="mt-1 text-text-muted">Estimasi: 20–30 menit</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    track("landing_demo_opened", { source: "hero_preview" });
                    setDemoOpen(true);
                  }}
                  className="mt-4 text-sm font-semibold text-accent transition-colors hover:underline"
                >
                  Lihat contoh laporan →
                </button>
              </div>
            </DoubleBezel>
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <MotionSection className="border-y border-border-subtle px-4 py-12 md:py-16">
        <StaggerChildren className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3 sm:gap-6">
          {[
            {
              icon: IconRadar,
              t: "Hasil awal ±30 detik",
              d: "Tanpa instalasi. Cukup URL publik.",
            },
            {
              icon: IconSpark,
              t: "Rekomendasi berbahasa Indonesia",
              d: "Prioritas otomatis, siap dikerjakan.",
            },
            {
              icon: IconLock,
              t: "Tidak mengubah website Anda",
              d: "Read-only. Data tidak dipublikasikan.",
            },
          ].map((item) => (
            <StaggerItem key={item.t} className="flex gap-3.5">
              <item.icon
                className="mt-0.5 h-5 w-5 shrink-0 text-text-muted"
                aria-hidden
              />
              <div>
                <p className="text-base font-semibold">{item.t}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-text-secondary">
                  {item.d}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </MotionSection>

      {/* Bento */}
      <MotionSection
        id="hasil"
        className="mx-auto max-w-6xl px-4 py-24 md:py-32"
      >
        <MotionDiv>
          <SectionHeader
            eyebrow="Produk"
            title="Apa yang Anda dapatkan"
            lead="Skor yang bisa dibandingkan, isu terurut, rekomendasi aksi, dan pantau ranking—bukan bungkus ulang Lighthouse."
          />
        </MotionDiv>

        <div className="mt-14">
          <BentoGrid>
            <BentoGridItem
              className="md:col-span-4 md:row-span-2"
              title="Dari temuan menjadi tindakan"
              description="Satu isu lengkap: urgensi, dampak, cara perbaiki, estimasi."
              header={
                <div className="space-y-2.5 rounded-2xl border border-white/[0.06] bg-background p-3.5 text-sm">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-critical/15 px-2.5 py-0.5 text-critical">
                      Critical
                    </span>
                    <span className="rounded-full bg-warning/15 px-2.5 py-0.5 text-warning">
                      Warning ×3
                    </span>
                    <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-success">
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
                    onClick={() => {
                      track("landing_demo_opened", { source: "bento" });
                      setDemoOpen(true);
                    }}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    Lihat detail →
                  </button>
                </div>
              }
            />
            <BentoGridItem
              className="md:col-span-2"
              title="Skor 78 overall"
              description="SEO · Perf · A11y · Best — rule versioned."
              header={
                <div className="flex h-16 items-end rounded-2xl border border-white/[0.06] bg-background p-3 text-3xl font-bold tabular-nums">
                  78
                </div>
              }
            />
            <BentoGridItem
              className="md:col-span-2"
              title="Distribusi isu"
              description="Critical → Warning → Info. Fokus dampak dulu."
              header={
                <div className="flex h-16 items-end gap-1.5 rounded-2xl border border-white/[0.06] bg-background p-3">
                  <div className="h-8 w-4 rounded-sm bg-critical/80" />
                  <div className="h-12 w-4 rounded-sm bg-warning/80" />
                  <div className="h-6 w-4 rounded-sm bg-info/60" />
                  <div className="h-14 w-4 rounded-sm bg-success/70" />
                </div>
              }
            />
            <BentoGridItem
              className="md:col-span-3"
              title="Rekomendasi siap dikerjakan"
              description="AI merangkum; laporan teknis tetap ada jika AI gagal."
              icon={<IconSpark className="h-5 w-5 text-secondary" />}
            />
            <BentoGridItem
              className="md:col-span-3"
              title="Tracking perkembangan"
              description="Rescan + keyword (Free 7 hari / Pro harian)."
              icon={<IconChart className="h-5 w-5 text-secondary" />}
            />
          </BentoGrid>
        </div>
      </MotionSection>

      {/* Report tabs */}
      <MotionSection className="border-y border-border-subtle bg-section px-4 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <MotionDiv>
            <SectionHeader
              eyebrow="Demo laporan"
              title="Satu laporan, beberapa sudut pandang"
              lead="Tiap tab mengubah isi panel—bukan label kosong."
            />
          </MotionDiv>
          <MotionDiv delay={0.08} className="mt-12">
            <DoubleBezel coreClassName="p-4 md:p-6">
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
                            className="rounded-2xl border border-white/[0.06] bg-background p-4"
                          >
                            <p className="text-sm text-text-secondary">{l}</p>
                            <p className="text-3xl font-bold tabular-nums">
                              {v}
                            </p>
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
                          [
                            "WARNING",
                            "text-warning",
                            "Meta description kosong",
                          ],
                          ["INFO", "text-info", "Beberapa gambar tanpa alt"],
                        ].map(([sev, cls, title]) => (
                          <li
                            key={title}
                            className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/[0.06] bg-background px-4 py-3"
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
                        <div className="rounded-2xl border border-white/[0.06] border-l-2 border-l-accent bg-background p-4">
                          <p className="font-semibold">
                            #1 Tambah meta description
                          </p>
                          <p className="mt-1 text-text-secondary">
                            Dampak SERP · Usaha LOW · ~20 menit
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/[0.06] border-l-2 border-l-secondary bg-background p-4">
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
                      <div className="rounded-2xl border border-white/[0.06] bg-background p-4 text-sm">
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
            </DoubleBezel>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* How */}
      <MotionSection
        id="how"
        className="mx-auto max-w-6xl px-4 py-24 md:py-32"
      >
        <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
          <MotionDiv>
            <SectionHeader
              align="left"
              eyebrow="Proses"
              title="Cara kerja"
              lead="Tiga langkah dari URL ke keputusan perbaikan."
            />
            <RegisterLink
              className={cn(islandCtaClass("primary"), "mt-8")}
              onClick={() =>
                track("landing_cta_clicked", { source: "how" })
              }
            >
              <IslandCtaContent>{CTA}</IslandCtaContent>
            </RegisterLink>
          </MotionDiv>
          <MotionDiv delay={0.1}>
            <DoubleBezel coreClassName="p-5 md:p-6">
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
            </DoubleBezel>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Personas + method */}
      <MotionSection className="border-t border-border-subtle px-4 py-24 md:py-32">
        <div className="mx-auto max-w-6xl space-y-16">
          <div>
            <SectionHeader title="Untuk siapa" />
            <StaggerChildren className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
              {[
                {
                  icon: IconStore,
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
                <StaggerItem key={u.t}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="h-full"
                  >
                    <DoubleBezel
                      className="h-full"
                      coreClassName="h-full p-6 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-surface-raised"
                      shellClassName="h-full transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/30"
                    >
                      <u.icon
                        className="h-5 w-5 text-text-muted"
                        aria-hidden
                      />
                      <h3 className="mt-4 text-lg font-semibold">{u.t}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                        {u.d}
                      </p>
                    </DoubleBezel>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>

          <MotionDiv>
            <DoubleBezel coreClassName="p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Metode yang bisa dijelaskan
              </h2>
              <ul className="mt-5 grid gap-3.5 text-[15px] leading-relaxed text-text-secondary md:grid-cols-2 md:text-base">
                <li>
                  <span className="font-semibold text-text-primary">
                    Diperiksa:
                  </span>{" "}
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
                  <span className="font-semibold text-text-primary">
                    Privasi:
                  </span>{" "}
                  laporan milik akun; data tidak dijual.
                </li>
              </ul>
            </DoubleBezel>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Pricing */}
      <MotionSection
        id="pricing"
        className="border-t border-border-subtle px-4 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <MotionDiv>
            <SectionHeader
              eyebrow="Harga"
              title="Transparan (IDR)"
              lead="Free untuk uji halaman penting. Pro untuk pemantauan rutin."
            />
          </MotionDiv>

          <StaggerChildren className="mt-14 grid gap-5 md:grid-cols-2">
            <StaggerItem>
              <DoubleBezel className="h-full" coreClassName="h-full p-6 md:p-7">
                <h3 className="text-lg font-semibold">Free</h3>
                <p className="mt-3 text-4xl font-bold tracking-tight">Rp0</p>
                <ul className="mt-5 space-y-2.5 text-[15px] text-text-secondary">
                  <li>• 2 scan / hari · 10 / 30 hari</li>
                  <li>• 2 keyword · cek tiap 7 hari</li>
                  <li>• Riwayat audit 14 hari</li>
                  <li>• AI max 3 prioritas</li>
                </ul>
                <RegisterLink
                  className={cn(
                    islandCtaClass("secondary"),
                    "mt-8 w-full justify-center",
                  )}
                  onClick={() =>
                    track("landing_cta_clicked", {
                      source: "pricing_free",
                    })
                  }
                >
                  <IslandCtaContent variant="secondary">{CTA}</IslandCtaContent>
                </RegisterLink>
              </DoubleBezel>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="h-full"
              >
                <DoubleBezel
                  className="h-full"
                  shellClassName="border-accent/35 shadow-[0_0_48px_rgba(56,189,248,0.1)]"
                  coreClassName="relative h-full overflow-hidden p-6 md:p-7"
                >
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">Pro</h3>
                    <span className="rounded-full bg-secondary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary">
                      Pemantauan rutin
                    </span>
                  </div>
                  <p className="mt-3 text-4xl font-bold tracking-tight">
                    Rp59.000
                    <span className="text-base font-normal text-text-secondary">
                      /bulan
                    </span>
                  </p>
                  <ul className="mt-5 space-y-2.5 text-[15px] text-text-secondary">
                    <li>• 10 scan / hari · 60 / periode</li>
                    <li>• 10 keyword · cek harian</li>
                    <li>• Riwayat 12 bulan</li>
                    <li>• AI rekomendasi penuh</li>
                  </ul>
                  <RegisterLink
                    className={cn(
                      islandCtaClass("primary"),
                      "mt-8 w-full justify-center",
                    )}
                    onClick={() =>
                      track("upgrade_clicked", { source: "pricing_pro" })
                    }
                  >
                    <IslandCtaContent>Mulai dari Free dulu</IslandCtaContent>
                  </RegisterLink>
                  <p className="mt-3 text-center text-xs text-text-muted">
                    Belum termasuk pajak · batalkan perpanjangan kapan saja
                  </p>
                </DoubleBezel>
              </motion.div>
            </StaggerItem>
          </StaggerChildren>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowCompare((v) => !v)}
              className="text-sm font-semibold text-text-secondary underline-offset-4 transition-colors hover:text-accent hover:underline"
              aria-expanded={showCompare}
            >
              {showCompare
                ? "Sembunyikan perbandingan lengkap"
                : "Lihat perbandingan lengkap"}
            </button>
          </div>

          {showCompare ? (
            <div className="mt-5 overflow-x-auto">
              <DoubleBezel coreClassName="overflow-hidden">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="border-b border-border-subtle">
                    <tr>
                      <th className="px-5 py-3.5 font-semibold">Fitur</th>
                      <th className="px-5 py-3.5 font-semibold">Free</th>
                      <th className="px-5 py-3.5 font-semibold">Pro</th>
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
                        <td className="px-5 py-3.5">{row[0]}</td>
                        <td className="px-5 py-3.5 font-medium text-text-primary">
                          {row[1]}
                        </td>
                        <td className="px-5 py-3.5 font-medium text-text-primary">
                          {row[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DoubleBezel>
            </div>
          ) : null}
        </div>
      </MotionSection>

      {/* FAQ */}
      <MotionSection
        id="faq"
        className="border-t border-border-subtle px-4 py-24 md:py-32"
      >
        <div className="mx-auto max-w-[720px]">
          <SectionHeader title="FAQ" />
          <div className="mt-12 space-y-3">
            {MARKETING_FAQS.map((item, i) => {
              const open = openFaq === i;
              return (
                <motion.div
                  key={item.q}
                  layout
                  className={cn(
                    "rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-1",
                    open && "border-white/12",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-[calc(1.5rem-0.25rem)] border border-white/[0.06]",
                      open ? "bg-surface-raised" : "bg-surface",
                    )}
                  >
                    <button
                      type="button"
                      className="flex min-h-[52px] w-full items-center justify-between gap-3 px-5 py-4 text-left text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                    >
                      {item.q}
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-text-muted"
                        aria-hidden
                      >
                        {open ? "−" : "+"}
                      </span>
                    </button>
                    {open ? (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: springEase }}
                        className="border-t border-border-subtle px-5 py-4 text-[15px] leading-relaxed text-text-secondary"
                      >
                        {item.a}
                      </motion.p>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </MotionSection>

      {/* Closing CTA */}
      <MotionSection className="cta-glow relative overflow-hidden px-4 py-24 md:py-32">
        <BackgroundBeams className="opacity-[0.18]" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
            Mulai sekarang
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]">
            Temukan masalah teknis sebelum calon pelanggan menemukannya
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            Masukkan URL dan dapatkan prioritas perbaikan—bukan hanya skor.
          </p>
          <div className="mt-10 w-full max-w-xl text-left">
            <HeroAuditForm
              ctaLabel={CTA}
              className="max-w-none"
              inputId="cta-url"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              track("landing_demo_opened", { source: "closing_cta" });
              setDemoOpen(true);
            }}
            className="mt-5 text-sm font-semibold text-text-secondary transition-colors hover:text-accent hover:underline"
          >
            Lihat contoh laporan
          </button>
        </div>
      </MotionSection>

      <footer className="border-t border-border-subtle px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F4C75] text-sm font-bold text-[#BBE1FA]">
                K
              </span>
              Klarr Rank
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Audit SEO teknis, prioritas perbaikan, rank tracker terjangkau.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Produk</p>
            <ul className="mt-4 space-y-2.5 text-sm text-text-secondary">
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
                  onClick={() => {
                    track("landing_demo_opened", { source: "footer" });
                    setDemoOpen(true);
                  }}
                  className="hover:text-text-primary"
                >
                  Contoh laporan
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Akun</p>
            <ul className="mt-4 space-y-2.5 text-sm text-text-secondary">
              <li>
                <LoginLink
                  className="hover:text-text-primary"
                  onClick={() =>
                    track("auth_login_started", { source: "footer" })
                  }
                >
                  Masuk
                </LoginLink>
              </li>
              <li>
                <RegisterLink
                  className="hover:text-text-primary"
                  onClick={() =>
                    track("landing_cta_clicked", { source: "footer" })
                  }
                >
                  Daftar
                </RegisterLink>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
              <li>
                <Link href="/privasi" className="hover:text-text-primary">
                  Privasi
                </Link>
              </li>
              <li>
                <Link href="/syarat" className="hover:text-text-primary">
                  Syarat
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-6xl space-y-2 text-center text-xs text-text-muted">
          <p>
            © 2026 Klarr Rank. Skor adalah penilaian produk, bukan jaminan
            ranking Google.
          </p>
          <p className="font-medium text-text-secondary">
            Copyright © 2026 by BAD-EiZA
          </p>
        </div>
      </footer>
    </main>
  );
}
