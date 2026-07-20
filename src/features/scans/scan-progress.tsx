"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MultiStepLoader } from "@/components/ui/aceternity/multi-step-loader";
import { SurfaceCard } from "@/components/ui/surface-card";
import { track } from "@/lib/analytics";

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
          if (next === "FAILED") {
            track("scan_failed", { scan_id: scanId });
          } else {
            track("scan_completed", { scan_id: scanId, status: next });
          }
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

  const current = useMemo(() => {
    if (status.startsWith("COMPLETED")) return STEPS.length - 1;
    const idx = STEPS.findIndex((s) => s === status);
    return Math.max(0, idx);
  }, [status]);

  return (
    <SurfaceCard className="p-6">
      <h2 className="font-semibold">Memproses audit…</h2>
      <p className="mt-1 text-sm text-text-secondary">
        Status aktual: {LABELS[status] ?? status}
      </p>
      <div className="mt-6">
        <MultiStepLoader
          loading
          current={current}
          loadingStates={STEPS.map((s) => ({ text: LABELS[s] ?? s }))}
        />
      </div>
    </SurfaceCard>
  );
}
