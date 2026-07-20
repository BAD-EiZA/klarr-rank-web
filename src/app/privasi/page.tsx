import type { Metadata } from "next";
import {
  LegalSection,
  LegalShell,
} from "@/components/marketing/legal-shell";
import { getSupportEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Bagaimana Klarr Rank mengumpulkan, menyimpan, dan melindungi data akun serta hasil audit SEO Anda.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const support = getSupportEmail();

  return (
    <LegalShell
      title="Kebijakan Privasi"
      description="Ringkasan cara kami menangani data saat Anda menggunakan Klarr Rank. Dokumen ini bersifat produk dan dapat diperbarui seiring perubahan layanan."
      updated="20 Juli 2026"
    >
      <LegalSection title="1. Pengendali data">
        <p>
          Klarr Rank (“kami”) mengoperasikan layanan audit SEO dan rank tracker
          berbasis web. Untuk pertanyaan privasi, hubungi{" "}
          <a
            href={`mailto:${support}`}
            className="font-medium text-accent hover:underline"
          >
            {support}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Data yang kami kumpulkan">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-text-primary">Identitas akun:</span>{" "}
            data dari penyedia autentikasi Kinde (mis. nama, email, ID pengguna).
          </li>
          <li>
            <span className="font-medium text-text-primary">Data audit:</span>{" "}
            URL yang Anda masukkan, metadata halaman publik yang diekstrak, skor,
            isu, dan rekomendasi yang dihasilkan.
          </li>
          <li>
            <span className="font-medium text-text-primary">Rank tracker:</span>{" "}
            keyword, domain target, negara/device, dan riwayat posisi.
          </li>
          <li>
            <span className="font-medium text-text-primary">Preferensi:</span>{" "}
            bahasa UI, negara default, device ranking, tema.
          </li>
          <li>
            <span className="font-medium text-text-primary">Teknis:</span> log
            operasional terbatas (waktu permintaan, status error) untuk
            keamanan dan keandalan.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Cara kami menggunakan data">
        <p>Data digunakan untuk:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Menjalankan audit, ranking check, dan menampilkan laporan.</li>
          <li>Menerapkan kuota paket Free/Pro dan preferensi akun.</li>
          <li>Meningkatkan keandalan, keamanan, dan dukungan pelanggan.</li>
        </ul>
        <p>
          Kami <span className="font-medium text-text-primary">tidak menjual</span>{" "}
          data audit atau daftar URL yang Anda scan.
        </p>
      </LegalSection>

      <LegalSection title="4. Sifat audit">
        <p>
          Audit awal hanya menganalisis <strong className="text-text-primary">halaman publik</strong> yang
          dapat diakses tanpa login admin. Kami tidak menginstal script di
          website Anda dan tidak mengubah konten situs target.
        </p>
      </LegalSection>

      <LegalSection title="5. AI (rekomendasi)">
        <p>
          Rekomendasi prioritas dapat dihasilkan dengan model AI (mis. Gemini)
          berdasarkan temuan teknis rule engine. Output AI divalidasi sebatas
          struktur laporan; AI dapat gagal tanpa menghapus laporan teknis.
          Penyedia model memproses data seperlunya untuk menghasilkan respons
          sesuai kontrak infrastruktur kami.
        </p>
      </LegalSection>

      <LegalSection title="6. Penyimpanan dan retensi">
        <p>
          Data disimpan di infrastruktur cloud (mis. database terkelola dan
          hosting aplikasi). Retensi riwayat audit mengikuti paket aktif (contoh
          peluncuran: Free 14 hari, Pro hingga 12 bulan) dan dapat berubah
          seiring kebijakan produk. Log operasional biasanya lebih singkat.
        </p>
      </LegalSection>

      <LegalSection title="7. Pihak ketiga infrastruktur">
        <p>
          Untuk menjalankan layanan, kami memakai penyedia seperti autentikasi
          (Kinde), database/hosting, dan model AI. Mereka memproses data hanya
          sebatas yang diperlukan untuk fungsi layanan.
        </p>
      </LegalSection>

      <LegalSection title="8. Cookie dan pelacakan">
        <p>
          Sesi login dikelola penyedia autentikasi. Kami tidak memasang cookie
          iklan pihak ketiga di rilis ini. Event produk (opsional) diproses di
          klien tanpa mengirim konten halaman lengkap atau token rahasia.
        </p>
      </LegalSection>

      <LegalSection title="9. Hak Anda">
        <p>
          Anda dapat memperbarui preferensi di halaman Akun, dan meminta
          bantuan terkait akses atau penghapusan data melalui{" "}
          <a
            href={`mailto:${support}`}
            className="font-medium text-accent hover:underline"
          >
            {support}
          </a>
          . Penghapusan akun juga dapat melibatkan proses di Kinde.
        </p>
      </LegalSection>

      <LegalSection title="10. Perubahan">
        <p>
          Kebijakan ini dapat diperbarui. Tanggal “Terakhir diperbarui” di atas
          akan disesuaikan. Penggunaan berkelanjutan setelah perubahan berarti
          Anda memahami versi terbaru.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
