export type FaqItem = { q: string; a: string };

export const MARKETING_FAQS: FaqItem[] = [
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

export const SITE_NAME = "Klarr Rank";
export const SITE_TAGLINE =
  "Audit SEO teknis, prioritas perbaikan, dan rank tracker terjangkau.";
export const PRO_PRICE_IDR = 59000;
export const PRO_PRICE_ANNUAL_IDR = 590000;
