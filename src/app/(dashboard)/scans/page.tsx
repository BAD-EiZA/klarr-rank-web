import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { SurfaceCard } from "@/components/ui/surface-card";
import { CreateScanForm } from "@/features/scans/create-scan-form";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";

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
      <PageHeader
        eyebrow="SEO Analyzer"
        title="Audit halaman publik"
        description="Skor dari rule engine deterministik + rekomendasi AI."
      />

      <CreateScanForm />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Riwayat scan</h2>
        {items.length === 0 ? (
          <EmptyState
            title="Belum ada scan"
            description="Masukkan URL di form di atas untuk menjalankan audit pertama."
          />
        ) : (
          <SurfaceCard as="ul" className="divide-y divide-border-subtle overflow-hidden">
            {items.map((scan) => (
              <li key={scan.id}>
                <Link
                  href={`/scans/${scan.id}`}
                  className="flex flex-col gap-1 px-4 py-3.5 transition hover:bg-surface-raised sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{scan.domain}</p>
                    <p className="truncate text-xs text-text-muted">
                      {scan.normalizedUrl}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <StatusBadge status={scan.status} />
                    <span className="tabular-nums font-semibold">
                      {scan.overallScore ?? "—"}
                    </span>
                    <span className="text-xs text-text-muted">
                      C{scan.criticalCount} · W{scan.warningCount}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </SurfaceCard>
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
  return (
    <span
      className={`rounded-full border border-white/10 bg-background px-2 py-0.5 text-xs font-medium ${tone}`}
    >
      {status}
    </span>
  );
}
