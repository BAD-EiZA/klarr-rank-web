import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { appButtonClass } from "@/components/ui/app-button";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/aceternity/stat-card";
import { SurfaceCard } from "@/components/ui/surface-card";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";
import { cn } from "@/lib/utils";

type Summary = {
  planCode: string;
  completedScans: number;
  averageOverallScore: number | null;
  scansRemainingToday: number;
  activeKeywords: number;
  averageKeywordPosition: number | null;
  criticalIssuesLatest: number;
  isEmpty: boolean;
  latestScan: {
    id: string;
    domain: string;
    overallScore: number | null;
    criticalCount: number;
    warningCount: number;
    completedAt: string | null;
  } | null;
};

type RecentScan = {
  id: string;
  domain: string;
  status: string;
  overallScore: number | null;
  criticalCount: number;
  createdAt: string;
};

type PriorityIssue = {
  id: string;
  ruleCode: string;
  severity: string;
  title: string;
  category: string;
};

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let summary: Summary | null = null;
  let recent: RecentScan[] = [];
  let priority: {
    scanId: string | null;
    domain: string | null;
    items: PriorityIssue[];
  } = { scanId: null, domain: null, items: [] };
  let dataUnavailable = false;

  try {
    const [s, r, p] = await Promise.all([
      serverApiFetch<ApiEnvelope<Summary>>("/dashboard/summary"),
      serverApiFetch<ApiEnvelope<{ items: RecentScan[] }>>(
        "/dashboard/recent-scans?take=5",
      ),
      serverApiFetch<
        ApiEnvelope<{
          scanId: string | null;
          domain: string | null;
          items: PriorityIssue[];
        }>
      >("/dashboard/priority-issues"),
    ]);
    summary = s.data;
    recent = r.data.items;
    priority = p.data;
  } catch {
    dataUnavailable = true;
  }

  const empty = summary?.isEmpty ?? recent.length === 0;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title={`Halo${user?.given_name ? `, ${user.given_name}` : ""}`}
        description="Ringkasan kuota, scan, dan isu prioritas."
        action={
          <Link href="/scans" className={appButtonClass("primary")}>
            Scan baru
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Plan" value={summary?.planCode ?? "—"} />
        <StatCard
          label="Sisa scan hari ini"
          value={summary?.scansRemainingToday ?? "—"}
        />
        <StatCard label="Scan selesai" value={summary?.completedScans ?? "—"} />
        <StatCard
          label="Rata-rata skor"
          value={summary?.averageOverallScore ?? "—"}
        />
        <StatCard label="Keyword aktif" value={summary?.activeKeywords ?? "—"} />
        <StatCard
          label="Rata-rata posisi"
          value={summary?.averageKeywordPosition ?? "—"}
        />
        <StatCard
          label="Critical terbaru"
          value={summary?.criticalIssuesLatest ?? "—"}
        />
        <StatCard
          label="Scan terakhir"
          value={summary?.latestScan?.overallScore ?? "—"}
          hint={summary?.latestScan?.domain}
        />
      </div>

      {dataUnavailable ? (
        <EmptyState
          title="Data belum dimuat"
          description="API offline atau sesi belum siap. Coba refresh halaman."
        />
      ) : empty ? (
        <EmptyState
          title="Mulai audit pertama"
          description="Masukkan URL publik untuk skor SEO, performance, accessibility, dan rekomendasi prioritas."
          action={
            <Link href="/scans" className={cn(appButtonClass("primary"))}>
              Jalankan audit
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <SurfaceCard as="section" className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Scan terbaru</h2>
              <Link
                href="/history"
                className="text-xs font-medium text-accent hover:underline"
              >
                Lihat semua
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-border-subtle">
              {recent.map((scan) => (
                <li key={scan.id}>
                  <Link
                    href={`/scans/${scan.id}`}
                    className="flex items-center justify-between gap-3 py-3 text-sm transition hover:opacity-90"
                  >
                    <div>
                      <p className="font-medium">{scan.domain}</p>
                      <p className="text-xs text-text-muted">{scan.status}</p>
                    </div>
                    <span className="tabular-nums font-semibold">
                      {scan.overallScore ?? "—"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </SurfaceCard>

          <SurfaceCard as="section" className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Isu prioritas</h2>
              {priority.scanId ? (
                <Link
                  href={`/scans/${priority.scanId}`}
                  className="text-xs font-medium text-accent hover:underline"
                >
                  {priority.domain}
                </Link>
              ) : null}
            </div>
            {priority.items.length === 0 ? (
              <p className="mt-4 text-sm text-text-secondary">
                Tidak ada critical/warning di scan terakhir.
              </p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {priority.items.map((issue) => (
                  <li
                    key={issue.id}
                    className="rounded-xl border border-white/[0.06] border-l-2 bg-background p-3 text-sm"
                    style={{
                      borderLeftColor:
                        issue.severity === "CRITICAL"
                          ? "var(--critical)"
                          : "var(--warning)",
                    }}
                  >
                    <span
                      className={
                        issue.severity === "CRITICAL"
                          ? "text-xs font-semibold text-critical"
                          : "text-xs font-semibold text-warning"
                      }
                    >
                      {issue.severity}
                    </span>
                    <p className="mt-0.5 font-medium">{issue.title}</p>
                    <p className="text-xs text-text-muted">
                      {issue.ruleCode} · {issue.category}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </SurfaceCard>
        </div>
      )}
    </div>
  );
}
