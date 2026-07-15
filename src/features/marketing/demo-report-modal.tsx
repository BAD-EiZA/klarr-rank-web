"use client";

import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Modal } from "@/components/ui/aceternity/modal";

export function DemoReportModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Contoh hasil audit"
      className="max-w-lg"
    >
      <div className="space-y-4 text-sm">
        <p className="text-text-secondary">
          Domain demo: <span className="font-medium text-text-primary">demo.klarrank.local</span>
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            ["Overall", "78"],
            ["SEO", "82"],
            ["Performance", "71"],
            ["Accessibility", "76"],
          ].map(([label, score]) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-background p-3"
            >
              <p className="text-xs text-text-secondary">{label}</p>
              <p className="text-xl font-bold tabular-nums">{score}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-background p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-warning">
            Warning · dampak sedang
          </p>
          <p className="mt-1 font-semibold text-text-primary">
            Meta description hilang
          </p>
          <p className="mt-2 text-text-secondary">
            <span className="font-medium text-text-primary">Mengapa penting:</span>{" "}
            cuplikan SERP kurang menarik, CTR bisa turun.
          </p>
          <p className="mt-1 text-text-secondary">
            <span className="font-medium text-text-primary">Cara memperbaiki:</span>{" "}
            tulis deskripsi unik 140–160 karakter dengan layanan + lokasi.
          </p>
          <p className="mt-1 text-text-secondary">
            <span className="font-medium text-text-primary">Estimasi:</span> 20–30
            menit
          </p>
        </div>
        <p className="text-xs text-text-secondary">
          Skor adalah penilaian Klarr Rank, bukan jaminan ranking Google.
        </p>
        <div className="flex flex-wrap gap-2">
          <RegisterLink className="inline-flex min-h-[44px] items-center rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
            Audit website gratis
          </RegisterLink>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center rounded-xl border border-border px-4 py-2 text-sm font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </Modal>
  );
}
