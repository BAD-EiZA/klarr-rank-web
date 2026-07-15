import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";

type UsageData = {
  planCode: string;
  usage: {
    scansRemainingToday: number;
    keywordsActive: number;
    keywordsRemaining: number;
  };
};

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let usage: UsageData | null = null;
  try {
    const res = await serverApiFetch<ApiEnvelope<UsageData>>("/me/usage");
    usage = res.data;
  } catch {
    usage = null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Halo{user?.given_name ? `, ${user.given_name}` : ""}. Ringkasan kuota
          dan aktivitas.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Plan", usage?.planCode ?? "—"],
          ["Sisa scan hari ini", usage?.usage.scansRemainingToday ?? "—"],
          ["Keyword aktif", usage?.usage.keywordsActive ?? "—"],
          ["Slot keyword", usage?.usage.keywordsRemaining ?? "—"],
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

      <div className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-semibold">Mulai audit pertama</h2>
        <p className="mt-2 max-w-lg text-sm text-text-secondary">
          Auth Kinde aktif. Pipeline SEO Analyzer menyusul di Phase 2.
        </p>
        <Link
          href="/scans"
          className="mt-4 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Buka Scans
        </Link>
      </div>
    </div>
  );
}
