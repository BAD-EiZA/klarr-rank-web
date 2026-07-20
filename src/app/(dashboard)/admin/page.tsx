import Link from "next/link";
import { appButtonClass } from "@/components/ui/app-button";
import { PageHeader } from "@/components/ui/page-header";
import { SurfaceCard } from "@/components/ui/surface-card";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";
import { AdminUserActions } from "@/features/admin/admin-user-actions";
import { AdminJobActions } from "@/features/admin/admin-job-actions";
import { cn } from "@/lib/utils";

type AdminUser = {
  id: string;
  email: string | null;
  displayName: string | null;
  status: string;
  planCode: string;
  scans: number;
  trackers: number;
  lastLoginAt: string | null;
};

type Job = {
  id: string;
  jobType: string;
  status: string;
  resourceId: string;
  attempts: number;
  createdAt: string;
};

export default async function AdminPage() {
  let users: AdminUser[] = [];
  let jobs: Job[] = [];
  let error: string | null = null;

  try {
    const [u, j] = await Promise.all([
      serverApiFetch<ApiEnvelope<{ items: AdminUser[] }>>(
        "/admin/users?take=50",
      ),
      serverApiFetch<ApiEnvelope<{ items: Job[] }>>("/admin/jobs?take=30"),
    ]);
    users = u.data.items;
    jobs = j.data.items;
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Akses admin ditolak atau API offline.";
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin"
        title="Admin"
        description="User, suspend, dan job retry. Butuh permission admin di Kinde."
      />

      {error ? (
        <SurfaceCard className="border-warning/30 p-5 text-sm">
          <p className="font-medium text-warning">Tidak bisa memuat admin</p>
          <p className="mt-1 text-text-secondary">{error}</p>
          <p className="mt-2 text-text-secondary">
            Dev: gunakan token{" "}
            <code className="rounded bg-background px-1">
              Bearer dev:admin:your_id
            </code>{" "}
            atau assign permission{" "}
            <code className="rounded bg-background px-1">admin:*</code> di
            Kinde.
          </p>
          <Link
            href="/dashboard"
            className={cn(appButtonClass("secondary"), "mt-3")}
          >
            Kembali ke dashboard
          </Link>
        </SurfaceCard>
      ) : (
        <>
          <section className="space-y-3">
            <h2 className="font-semibold">Users</h2>
            <SurfaceCard as="ul" className="divide-y divide-border-subtle">
              {users.map((u) => (
                <li
                  key={u.id}
                  className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {u.displayName || u.email || u.id}
                    </p>
                    <p className="text-xs text-text-muted">
                      {u.email} · {u.planCode} · {u.status} · scans {u.scans} ·
                      trackers {u.trackers}
                    </p>
                  </div>
                  <AdminUserActions userId={u.id} status={u.status} />
                </li>
              ))}
            </SurfaceCard>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold">Jobs</h2>
            <SurfaceCard as="ul" className="divide-y divide-border-subtle">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {job.jobType} · {job.status}
                    </p>
                    <p className="text-xs text-text-muted">
                      {job.resourceId} · attempts {job.attempts} ·{" "}
                      {new Date(job.createdAt).toLocaleString("id-ID")}
                    </p>
                  </div>
                  {(job.status === "FAILED" || job.status === "PENDING") && (
                    <AdminJobActions jobId={job.id} />
                  )}
                </li>
              ))}
              {jobs.length === 0 ? (
                <li className="px-4 py-6 text-sm text-text-secondary">
                  Belum ada job.
                </li>
              ) : null}
            </SurfaceCard>
          </section>
        </>
      )}
    </div>
  );
}
