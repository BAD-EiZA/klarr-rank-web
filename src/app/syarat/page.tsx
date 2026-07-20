import type { Metadata } from "next";
import {
  LegalSection,
  LegalShell,
} from "@/components/marketing/legal-shell";
import { getSupportEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Syarat Penggunaan",
  description:
    "Ketentuan penggunaan layanan audit SEO dan rank tracker Klarr Rank.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const support = getSupportEmail();

  return (
    <LegalShell
      title="Syarat Penggunaan"
      description="Dengan membuat akun atau menggunakan Klarr Rank, Anda menyetujui ketentuan berikut."
      updated="20 Juli 2026"
    >
      <LegalSection title="1. Penerimaan">
        <p>
          Syarat ini mengatur akses ke platform web Klarr Rank. Jika Anda tidak
          setuju, jangan gunakan layanan.
        </p>
      </LegalSection>

      <LegalSection title="2. Deskripsi layanan">
        <p>
          Klarr Rank menyediakan audit SEO teknis untuk satu URL publik per
          scan, skor multi-kategori berbasis rule engine, rekomendasi (termasuk
          AI bila tersedia), serta pemantauan posisi keyword organik (tampilan
          top 50). Skor dan temuan adalah penilaian produk,{" "}
          <strong className="text-text-primary">bukan jaminan ranking Google</strong>{" "}
          atau metrik resmi Google.
        </p>
      </LegalSection>

      <LegalSection title="3. Akun dan kuota">
        <p>
          Anda bertanggung jawab menjaga keamanan akun (melalui Kinde). Paket
          Free dan Pro memiliki batas scan, keyword, dan retensi. Kami dapat
          menolak, menangguhkan, atau membatasi akun yang melanggar kuota atau
          ketentuan ini.
        </p>
      </LegalSection>

      <LegalSection title="4. Penggunaan yang diizinkan">
        <ul className="list-disc space-y-2 pl-5">
          <li>Audit website yang Anda miliki atau diizinkan mengaudit.</li>
          <li>Penggunaan wajar sesuai kuota paket.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Larangan">
        <ul className="list-disc space-y-2 pl-5">
          <li>Memindai alamat non-publik, jaringan privat, atau target ilegal.</li>
          <li>Menyalahgunakan API, melewati kuota secara curang, atau gangguan layanan.</li>
          <li>Mengunggah malware atau mencoba akses tidak sah.</li>
          <li>Menyajikan skor Klarr Rank sebagai “skor Google” atau jaminan peringkat.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Konten dan kekayaan intelektual">
        <p>
          Platform, merek, dan perangkat lunak Klarr Rank milik kami atau
          pemberi lisensi. Laporan yang dihasilkan untuk akun Anda tersedia
          untuk keperluan bisnis Anda, tanpa mengalihkan hak atas platform.
          Konten situs yang diaudit tetap milik pemiliknya.
        </p>
      </LegalSection>

      <LegalSection title="7. Harga dan pembayaran">
        <p>
          Harga Pro ditampilkan di halaman pemasaran (mis. Rp59.000/bulan).
          Pajak dan biaya gateway dapat berlaku saat checkout diaktifkan.
          Pembatalan perpanjangan mengikuti mekanisme langganan yang tersedia.
        </p>
      </LegalSection>

      <LegalSection title="8. Ketersediaan dan perubahan">
        <p>
          Layanan disediakan “sebagaimana adanya”. Fitur, kuota, dan harga dapat
          berubah. Kami berupaya menjaga ketersediaan wajar tetapi tidak
          menjamin uptime tanpa gangguan.
        </p>
      </LegalSection>

      <LegalSection title="9. Batasan tanggung jawab">
        <p>
          Sejauh diizinkan hukum yang berlaku, kami tidak bertanggung jawab atas
          kerugian tidak langsung, hilangnya data pihak ketiga, atau keputusan
          bisnis yang diambil berdasarkan laporan. Tanggung jawab agregat kami
          dibatasi jumlah yang Anda bayarkan kepada kami (jika ada) dalam 3 bulan
          terakhir sebelum klaim.
        </p>
      </LegalSection>

      <LegalSection title="10. Penghentian">
        <p>
          Anda dapat berhenti menggunakan layanan kapan saja. Kami dapat
          menangguhkan atau mengakhiri akses jika terjadi pelanggaran syarat,
          risiko keamanan, atau kewajiban hukum.
        </p>
      </LegalSection>

      <LegalSection title="11. Kontak">
        <p>
          Pertanyaan:{" "}
          <a
            href={`mailto:${support}`}
            className="font-medium text-accent hover:underline"
          >
            {support}
          </a>
          .
        </p>
      </LegalSection>
    </LegalShell>
  );
}
