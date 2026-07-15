import Link from "next/link";
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
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Rank Tracker</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Pantau posisi organik Google (top 50). Free: cek otomatis 7 hari ·
          Pro: harian.
        </p>
      </div>

      <CreateTrackerForm />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="font-medium">Belum ada keyword</p>
          <p className="mt-1 text-sm text-text-secondary">
            Tambah keyword + domain target untuk mulai tracking.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {items.map((t) => (
            <li
              key={t.id}
              className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <Link href={`/rank-trackers/${t.id}`} className="min-w-0 flex-1">
                <p className="font-medium">{t.keyword}</p>
                <p className="text-xs text-text-secondary">
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
        </ul>
      )}
    </div>
  );
}
