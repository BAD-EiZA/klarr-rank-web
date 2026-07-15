import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
