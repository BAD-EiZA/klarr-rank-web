import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Audit SEO Teknis Gratis untuk Website | Klarr Rank",
    template: "%s · Klarr Rank",
  },
  description:
    "Audit SEO teknis dalam hitungan menit: skor, isu terprioritas, dan langkah perbaikan berbahasa Indonesia. Tanpa kartu kredit di paket Free.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon" }],
  },
  openGraph: {
    title: "Audit SEO Teknis Gratis untuk Website | Klarr Rank",
    description:
      "Bukan sekadar skor. Dapatkan prioritas masalah, alasan dampaknya, dan langkah perbaikan yang jelas.",
    type: "website",
    locale: "id_ID",
    siteName: "Klarr Rank",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit SEO Teknis Gratis | Klarr Rank",
    description:
      "Skor, isu prioritas, dan rekomendasi berbahasa Indonesia. Mulai gratis.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary antialiased selection:bg-accent/20">
        {children}
      </body>
    </html>
  );
}
