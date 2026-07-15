import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";

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
  let priority: { scanId: string | null; domain: string | null; items: PriorityIssue[] } = {
    scanId: null,
    domain: null,
    items: [],
  };

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
    // offline / auth edge
  }

  const empty = summary?.isEmpty ?? recent.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Halo{user?.given_name ? `, ${user.given_name}` : ""}. Ringkasan
            kuota dan aktivitas SEO.
          </p>
        </div>
        <Link
          href="/scans"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Scan baru
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Plan", summary?.planCode ?? "—"],
          ["Sisa scan hari ini", summary?.scansRemainingToday ?? "—"],
          ["Scan selesai", summary?.completedScans ?? "—"],
          ["Rata-rata skor", summary?.averageOverallScore ?? "—"],
          ["Keyword aktif", summary?.activeKeywords ?? "—"],
          ["Rata-rata posisi", summary?.averageKeywordPosition ?? "—"],
          ["Critical terbaru", summary?.criticalIssuesLatest ?? "—"],
          [
            "Scan terakhir",
            summary?.latestScan?.overallScore ?? "—",
          ],
        ].map(([label, value]) => (
          <div
            key={String(label)}
            className="rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow)]"
          >
            <p className="text-sm text-text-secondary">{label}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      {empty ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="text-lg font-semibold">Mulai audit pertama</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
            Masukkan URL publik untuk skor SEO, performance, accessibility, dan
            rekomendasi prioritas.
          </p>
          <Link
            href="/scans"
            className="mt-5 inline-flex rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground"
          >
            Jalankan audit
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Scan terbaru</h2>
              <Link
                href="/history"
                className="text-xs font-medium text-accent hover:underline"
              >
                Lihat semua
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {recent.map((scan) => (
                <li key={scan.id}>
                  <Link
                    href={`/scans/${scan.id}`}
                    className="flex items-center justify-between gap-3 py-3 text-sm hover:opacity-80"
                  >
                    <div>
                      <p className="font-medium">{scan.domain}</p>
                      <p className="text-xs text-text-secondary">
                        {scan.status}
                      </p>
                    </div>
                    <span className="tabular-nums font-semibold">
                      {scan.overallScore ?? "—"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5">
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
              <ul className="mt-4 space-y-3">
                {priority.items.map((issue) => (
                  <li key={issue.id} className="text-sm">
                    <span
                      className={
                        issue.severity === "CRITICAL"
                          ? "text-critical"
                          : "text-warning"
                      }
                    >
                      {issue.severity}
                    </span>
                    <p className="font-medium">{issue.title}</p>
                    <p className="text-xs text-text-secondary">
                      {issue.ruleCode} · {issue.category}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}

      {summary?.planCode === "FREE" ? (
        <div className="rounded-2xl border border-accent/30 bg-surface p-5">
          <h2 className="font-semibold">Upgrade ke Pro</h2>
          <p className="mt-1 text-sm text-text-secondary">
            60 scan/periode, 10 keyword, rank check harian — Rp59.000/bulan.
          </p>
          <Link
            href="/account"
            className="mt-3 inline-flex text-sm font-medium text-accent hover:underline"
          >
            Lihat paket
          </Link>
        </div>
      ) : null}
    </div>
  );
}
