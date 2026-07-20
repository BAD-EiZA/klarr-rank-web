import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { SurfaceCard } from "@/components/ui/surface-card";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";
import { CreateTrackerForm } from "@/features/rank-tracker/create-tracker-form";
import { TrackerActions } from "@/features/rank-tracker/tracker-actions";

type Tracker = {
  id: string;
  keyword: string;
  normalizedDomain: string;
  displayPosition: string;
  movement: string;
  status: string;
  countryCode: string;
  device: string;
  lastCheckedAt: string | null;
};

export default async function RankTrackersPage() {
  let items: Tracker[] = [];
  try {
    const res = await serverApiFetch<ApiEnvelope<{ items: Tracker[] }>>(
      "/rank-trackers",
    );
    items = res.data.items;
  } catch {
    items = [];
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Rank"
        title="Rank Tracker"
        description="Pantau posisi organik Google (top 50). Free: cek otomatis 7 hari · Pro: harian."
      />

      <CreateTrackerForm />

      {items.length === 0 ? (
        <EmptyState
          title="Belum ada keyword"
          description="Tambah keyword + domain target di form di atas untuk mulai tracking."
        />
      ) : (
        <SurfaceCard as="ul" className="divide-y divide-border-subtle">
          {items.map((t) => (
            <li
              key={t.id}
              className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <Link href={`/rank-trackers/${t.id}`} className="min-w-0 flex-1">
                <p className="font-medium">{t.keyword}</p>
                <p className="text-xs text-text-muted">
                  {t.normalizedDomain} · {t.countryCode} · {t.device} ·{" "}
                  {t.status}
                </p>
              </Link>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-semibold tabular-nums">
                    {t.displayPosition}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      t.movement.startsWith("+")
                        ? "text-success"
                        : t.movement.startsWith("-") || t.movement === "LOST"
                          ? "text-critical"
                          : "text-text-secondary"
                    }`}
                  >
                    {t.movement}
                  </p>
                </div>
                <TrackerActions trackerId={t.id} status={t.status} />
              </div>
            </li>
          ))}
        </SurfaceCard>
      )}
    </div>
  );
}
