import Link from "next/link";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";
import { HistoryFilters } from "@/features/history/history-filters";
import { ScanRowActions } from "@/features/history/scan-row-actions";

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
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Riwayat audit
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Cari, filter, buka ulang, atau hapus laporan.
        </p>
      </div>

      <HistoryFilters
        q={q}
        status={status}
        sort={sort}
        minScore={minScore}
        maxScore={maxScore}
      />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="font-medium">Belum ada hasil</p>
          <p className="mt-1 text-sm text-text-secondary">
            Ubah filter atau jalankan audit baru.
          </p>
          <Link
            href="/scans"
            className="mt-4 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            Scan baru
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {items.map((scan) => (
            <li
              key={scan.id}
              className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <Link href={`/scans/${scan.id}`} className="min-w-0 flex-1">
                <p className="font-medium">{scan.domain}</p>
                <p className="truncate text-xs text-text-secondary">
                  {scan.normalizedUrl}
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  {new Date(scan.createdAt).toLocaleString("id-ID")} ·{" "}
                  {scan.status}
                </p>
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold tabular-nums">
                  {scan.overallScore ?? "—"}
                </span>
                <span className="text-xs text-text-secondary">
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
        </ul>
      )}
    </div>
  );
}

function str(v: string | string[] | undefined) {
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}
