import Link from "next/link";
import { appButtonClass } from "@/components/ui/app-button";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { SurfaceCard } from "@/components/ui/surface-card";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";
import { HistoryFilters } from "@/features/history/history-filters";
import { ScanRowActions } from "@/features/history/scan-row-actions";
import { cn } from "@/lib/utils";

type ScanSummary = {
  id: string;
  domain: string;
  normalizedUrl: string;
  status: string;
  overallScore: number | null;
  criticalCount: number;
  warningCount: number;
  createdAt: string;
};

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = str(params.q);
  const status = str(params.status);
  const sort = str(params.sort) || "newest";
  const minScore = str(params.minScore);
  const maxScore = str(params.maxScore);

  const query = new URLSearchParams();
  query.set("take", "30");
  if (q) query.set("q", q);
  if (status) query.set("status", status);
  if (sort) query.set("sort", sort);
  if (minScore) query.set("minScore", minScore);
  if (maxScore) query.set("maxScore", maxScore);

  let items: ScanSummary[] = [];
  try {
    const res = await serverApiFetch<
      ApiEnvelope<{ items: ScanSummary[]; nextCursor: string | null }>
    >(`/scans?${query.toString()}`);
    items = res.data.items;
  } catch {
    items = [];
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="History"
        title="Riwayat audit"
        description="Cari, filter, buka ulang, atau hapus laporan."
      />

      <HistoryFilters
        q={q}
        status={status}
        sort={sort}
        minScore={minScore}
        maxScore={maxScore}
      />

      {items.length === 0 ? (
        <EmptyState
          title="Belum ada hasil"
          description="Ubah filter atau jalankan audit baru."
          action={
            <Link href="/scans" className={cn(appButtonClass("primary"))}>
              Scan baru
            </Link>
          }
        />
      ) : (
        <SurfaceCard as="ul" className="divide-y divide-border-subtle">
          {items.map((scan) => (
            <li
              key={scan.id}
              className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <Link href={`/scans/${scan.id}`} className="min-w-0 flex-1">
                <p className="font-medium">{scan.domain}</p>
                <p className="truncate text-xs text-text-muted">
                  {scan.normalizedUrl}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  {new Date(scan.createdAt).toLocaleString("id-ID")} ·{" "}
                  {scan.status}
                </p>
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold tabular-nums">
                  {scan.overallScore ?? "—"}
                </span>
                <span className="text-xs text-text-muted">
                  C{scan.criticalCount} · W{scan.warningCount}
                </span>
                <ScanRowActions
                  scanId={scan.id}
                  url={scan.normalizedUrl}
                  status={scan.status}
                />
              </div>
            </li>
          ))}
        </SurfaceCard>
      )}
    </div>
  );
}

function str(v: string | string[] | undefined) {
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}
