"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import {
  IconChartBar,
  IconRadar2,
  IconSparkles,
} from "@tabler/icons-react";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/bento-grid";
import { ContainerScroll } from "@/components/ui/aceternity/container-scroll";
import { FloatingNavbar } from "@/components/ui/aceternity/floating-navbar";
import { FlipWords } from "@/components/ui/aceternity/flip-words";
import { HoverBorderGradient } from "@/components/ui/aceternity/hover-border-gradient";
import { HoverEffect } from "@/components/ui/aceternity/card-hover-effect";
import { MovingBorderButton } from "@/components/ui/aceternity/moving-border";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { Timeline } from "@/components/ui/aceternity/timeline";

const features = [
  {
    title: "SEO Analyzer",
    description:
      "Fetch halaman publik, ekstrak metadata, jalankan rule engine deterministik.",
    icon: <IconRadar2 className="h-5 w-5" />,
    link: "#features",
  },
  {
    title: "AI Recommendations",
    description:
      "Gemini merangkum temuan jadi prioritas perbaikan yang bisa ditindaklanjuti.",
    icon: <IconSparkles className="h-5 w-5" />,
    link: "#features",
  },
  {
    title: "Rank Tracker",
    description:
      "Pantau keyword, gerakan posisi, history, dan kompetitor organik.",
    icon: <IconChartBar className="h-5 w-5" />,
    link: "#features",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-full overflow-hidden">
      <FloatingNavbar
        navItems={[
          { name: "Fitur", link: "#features" },
          { name: "Cara kerja", link: "#how" },
          { name: "Harga", link: "#pricing" },
        ]}
      />

      {/* Hero free-style section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pb-20 pt-28">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#a5b4fc" />
        <BackgroundBeams className="opacity-60" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex">
            <HoverBorderGradient as="div" className="text-xs text-text-secondary">
              SEO copilot untuk website Indonesia
            </HoverBorderGradient>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Audit SEO yang{" "}
            <FlipWords words={["jelas", "cepat", "terjangkau", "actionable"]} />
          </h1>
          <div className="mx-auto mt-6 max-w-2xl">
            <TextGenerateEffect
              className="justify-center text-base font-normal text-text-secondary md:text-lg"
              words="Rule engine deterministik plus rekomendasi AI. Rank tracker harian tanpa tool mahal."
            />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <RegisterLink>
              <MovingBorderButton className="bg-accent text-accent-foreground">
                Mulai audit gratis
              </MovingBorderButton>
            </RegisterLink>
            <LoginLink className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium">
              Masuk
            </LoginLink>
          </div>
        </div>
      </section>

      {/* Preview scroll / parallax */}
      <section className="relative px-4">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />
        <ContainerScroll
          titleComponent={
            <div>
              <p className="text-sm font-medium text-accent">Product preview</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                Skor, isu, dan prioritas dalam satu laporan
              </h2>
            </div>
          }
        >
          <div className="grid gap-3 p-4 md:grid-cols-4">
            {[
              ["Overall", "78"],
              ["SEO", "82"],
              ["Performance", "71"],
              ["Accessibility", "76"],
            ].map(([label, score]) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-background p-4"
              >
                <p className="text-xs text-text-secondary">{label}</p>
                <p className="mt-1 text-3xl font-semibold tabular-nums">{score}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 px-4 pb-4">
            {["TITLE_TOO_SHORT", "META_DESCRIPTION_MISSING", "IMAGE_ALT_MISSING"].map(
              (code) => (
                <div
                  key={code}
                  className="rounded-xl border border-border bg-background px-4 py-3 text-sm"
                >
                  <span className="font-medium text-warning">WARNING</span>
                  <span className="ml-2 text-text-secondary">{code}</span>
                </div>
              ),
            )}
          </div>
        </ContainerScroll>
      </section>

      {/* Features: hover cards + bento */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold">Semua yang dibutuhkan</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-text-secondary">
          Analyzer, AI, dan rank tracker dalam satu platform.
        </p>
        <div className="mt-10">
          <HoverEffect items={features} />
        </div>
        <div className="mt-10">
          <BentoGrid>
            <BentoGridItem
              title="Deterministic scoring"
              description="Skor stabil dari rule versioned, bukan tebakan AI."
              className="md:col-span-2"
              header={
                <div className="flex h-24 items-end rounded-xl bg-gradient-to-br from-accent/20 to-transparent p-3 text-3xl font-bold tabular-nums">
                  90.4
                </div>
              }
            />
            <BentoGridItem
              title="Kuota jelas"
              description="Free & Pro dengan limit harian yang transparan."
              header={
                <div className="h-24 rounded-xl bg-gradient-to-tr from-info/20 to-transparent" />
              }
            />
            <BentoGridItem
              title="Rank movement"
              description="+N / -N / NEW / LOST / >50."
              header={
                <div className="flex h-24 items-center justify-center rounded-xl bg-success/10 text-2xl font-semibold text-success">
                  +5
                </div>
              }
            />
            <BentoGridItem
              title="Siap production"
              description="Kinde auth, NestJS API, Supabase, Vercel."
              className="md:col-span-2"
              header={
                <div className="h-24 rounded-xl bg-gradient-to-r from-accent/10 via-transparent to-critical/10" />
              }
            />
          </BentoGrid>
        </div>
      </section>

      {/* How it works timeline */}
      <section id="how" className="border-y border-border bg-surface/50 px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Cara kerja</h2>
            <p className="mt-2 text-text-secondary">
              Dari URL sampai rekomendasi prioritas.
            </p>
          </div>
          <Timeline
            items={[
              {
                badge: "01",
                title: "Masukkan URL",
                description: "Normalisasi + proteksi SSRF sebelum load.",
              },
              {
                badge: "02",
                title: "Extract & rules",
                description: "Metadata, content, links, images → skor kategori.",
              },
              {
                badge: "03",
                title: "AI summarize",
                description: "Prioritas perbaikan (degrade-safe jika AI gagal).",
              },
              {
                badge: "04",
                title: "Track ranking",
                description: "Keyword harian/mingguan + history kompetitor.",
              },
            ]}
          />
        </div>
      </section>

      {/* Pricing cards */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold">Harga transparan (IDR)</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-text-secondary">
          Mulai gratis. Upgrade Pro saat butuh volume & rank harian.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow)]">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="mt-3 text-4xl font-bold">Rp0</p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>• 2 scan / hari</li>
              <li>• 2 keyword</li>
              <li>• Riwayat 14 hari</li>
            </ul>
            <RegisterLink className="mt-6 inline-flex rounded-xl border border-border px-4 py-2 text-sm font-medium">
              Coba gratis
            </RegisterLink>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-accent bg-surface p-6 shadow-[var(--shadow)]">
            <Spotlight className="-top-20 left-10 h-[120%] w-[80%]" fill="#818cf8" />
            <div className="relative z-10">
              <h3 className="text-lg font-semibold">Pro</h3>
              <p className="mt-3 text-4xl font-bold">
                Rp59.000
                <span className="text-base font-normal text-text-secondary">
                  /bulan
                </span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                <li>• 60 scan / periode</li>
                <li>• 10 keyword</li>
                <li>• Rank check harian</li>
              </ul>
              <RegisterLink className="mt-6 inline-flex rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                Upgrade Pro
              </RegisterLink>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-text-secondary">
        © {new Date().getFullYear()} Klarr Rank · Built with Aceternity-style UI
      </footer>
    </main>
  );
}
