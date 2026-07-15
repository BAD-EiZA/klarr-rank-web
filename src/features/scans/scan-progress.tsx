"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STEPS = [
  "QUEUED",
  "CONNECTING_BROWSER",
  "LOADING_PAGE",
  "EXTRACTING_DATA",
  "RUNNING_CHECKS",
  "CALCULATING_SCORES",
  "GENERATING_AI_ANALYSIS",
  "COMPLETED",
];

const LABELS: Record<string, string> = {
  QUEUED: "Antrian",
  CONNECTING_BROWSER: "Menyiapkan fetch",
  LOADING_PAGE: "Memuat halaman",
  EXTRACTING_DATA: "Ekstraksi data",
  RUNNING_CHECKS: "Menjalankan rule",
  CALCULATING_SCORES: "Menghitung skor",
  GENERATING_AI_ANALYSIS: "Analisis AI",
  COMPLETED: "Selesai",
  COMPLETED_WITH_AI_ERROR: "Selesai (AI error)",
  FAILED: "Gagal",
};

export function ScanProgress({
  scanId,
  initialStatus,
}: {
  scanId: string;
  initialStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const res = await fetch(`/api/scans/${scanId}/status`);
        const body = await res.json();
        if (!res.ok || cancelled) return;
        const next = body?.data?.status as string;
        if (next) setStatus(next);
        if (
          next === "COMPLETED" ||
          next === "COMPLETED_WITH_AI_ERROR" ||
          next === "FAILED"
        ) {
          router.refresh();
          return;
        }
      } catch {
        // ignore transient poll errors
      }
      if (!cancelled) window.setTimeout(tick, 1500);
    };
    const id = window.setTimeout(tick, 800);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [scanId, router]);

  const activeIndex = Math.max(
    0,
    STEPS.findIndex((s) => s === status),
  );

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="font-semibold">Memproses audit…</h2>
      <p className="mt-1 text-sm text-text-secondary">
        Status aktual: {LABELS[status] ?? status}
      </p>
      <ol className="mt-6 space-y-3">
        {STEPS.map((step, index) => {
          const done = index < activeIndex || status.startsWith("COMPLETED");
          const current = step === status;
          return (
            <li key={step} className="flex items-center gap-3 text-sm">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                  done || current
                    ? "bg-accent text-accent-foreground"
                    : "border border-border text-text-secondary"
                }`}
              >
                {index + 1}
              </span>
              <span className={current ? "font-medium" : "text-text-secondary"}>
                {LABELS[step] ?? step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
