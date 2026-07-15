import Link from "next/link";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";
import { CreateScanForm } from "@/features/scans/create-scan-form";

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

export default async function ScansPage() {
  let items: ScanSummary[] = [];
  try {
    const res = await serverApiFetch<
      ApiEnvelope<{ items: ScanSummary[]; nextCursor: string | null }>
    >("/scans?take=20");
    items = res.data.items;
  } catch {
    items = [];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">SEO Analyzer</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Audit halaman publik. Skor dari rule engine deterministik.
        </p>
      </div>

      <CreateScanForm />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Riwayat scan</h2>
        {items.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-6 text-sm text-text-secondary">
            Belum ada scan. Masukkan URL di atas untuk mulai.
          </div>
        ) : (
          <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
            {items.map((scan) => (
              <li key={scan.id}>
                <Link
                  href={`/scans/${scan.id}`}
                  className="flex flex-col gap-1 px-4 py-3 hover:bg-background sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{scan.domain}</p>
                    <p className="truncate text-xs text-text-secondary">
                      {scan.normalizedUrl}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <StatusBadge status={scan.status} />
                    <span className="tabular-nums font-semibold">
                      {scan.overallScore ?? "—"}
                    </span>
                    <span className="text-xs text-text-secondary">
                      C{scan.criticalCount} · W{scan.warningCount}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "COMPLETED"
      ? "text-success"
      : status === "FAILED"
        ? "text-critical"
        : status.includes("COMPLETED_WITH")
          ? "text-warning"
          : "text-info";
  return <span className={`text-xs font-medium ${tone}`}>{status}</span>;
}
