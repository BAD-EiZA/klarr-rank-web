import Link from "next/link";
import { notFound } from "next/navigation";
import { SurfaceCard } from "@/components/ui/surface-card";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";
import { TrackerActions } from "@/features/rank-tracker/tracker-actions";

type TrackerDetail = {
  id: string;
  keyword: string;
  normalizedDomain: string;
  targetUrl: string;
  displayPosition: string;
  movement: string;
  status: string;
  countryCode: string;
  languageCode: string;
  device: string;
  bestPosition: number | null;
  worstPosition: number | null;
  lastCheckedAt: string | null;
  latestCheck: {
    competitors: Array<{
      id: string;
      domain: string;
      resultUrl: string;
      resultTitle: string | null;
      position: number;
    }>;
  } | null;
};

type HistoryItem = {
  id: string;
  position: number | null;
  checkedAt: string | null;
};

export default async function RankTrackerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let tracker: TrackerDetail | null = null;
  let history: HistoryItem[] = [];
  try {
    const [t, h] = await Promise.all([
      serverApiFetch<ApiEnvelope<TrackerDetail>>(`/rank-trackers/${id}`),
      serverApiFetch<ApiEnvelope<{ items: HistoryItem[] }>>(
        `/rank-trackers/${id}/history?take=30`,
      ),
    ]);
    tracker = t.data;
    history = h.data.items;
  } catch {
    notFound();
  }
  if (!tracker) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-text-muted">
            <Link
              href="/rank-trackers"
              className="hover:text-text-primary hover:underline"
            >
              Rank Tracker
            </Link>{" "}
            / {tracker.keyword}
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight md:text-3xl">
            {tracker.keyword}
          </h1>
          <p className="mt-1.5 text-sm text-text-secondary">
            {tracker.normalizedDomain} · {tracker.countryCode}/
            {tracker.languageCode} · {tracker.device}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold tabular-nums tracking-tight">
            {tracker.displayPosition}
          </p>
          <p className="text-sm text-text-secondary">{tracker.movement}</p>
          <div className="mt-2">
            <TrackerActions trackerId={tracker.id} status={tracker.status} />
          </div>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          ["Best", tracker.bestPosition ?? "—"],
          ["Worst", tracker.worstPosition ?? "—"],
          [
            "Last checked",
            tracker.lastCheckedAt
              ? new Date(tracker.lastCheckedAt).toLocaleString("id-ID")
              : "—",
          ],
        ].map(([label, value]) => (
          <SurfaceCard key={String(label)} className="p-4">
            <p className="text-sm text-text-secondary">{label}</p>
            <p className="mt-1 font-semibold tabular-nums">{value}</p>
          </SurfaceCard>
        ))}
      </section>

      <SurfaceCard as="section" className="p-5">
        <h2 className="font-semibold">Riwayat posisi</h2>
        {history.length === 0 ? (
          <p className="mt-3 text-sm text-text-secondary">
            Belum ada riwayat. Tunggu cek pertama selesai.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-border-subtle text-sm">
            {history.map((h) => (
              <li
                key={h.id}
                className="flex items-center justify-between py-2"
              >
                <span className="text-text-muted">
                  {h.checkedAt
                    ? new Date(h.checkedAt).toLocaleString("id-ID")
                    : "—"}
                </span>
                <span className="font-semibold tabular-nums">
                  {h.position == null ? ">50" : h.position}
                </span>
              </li>
            ))}
          </ul>
        )}
      </SurfaceCard>

      <SurfaceCard as="section" className="p-5">
        <h2 className="font-semibold">Kompetitor organik (snapshot)</h2>
        <p className="mt-1 text-xs text-text-muted">
          Bukan selalu kompetitor bisnis langsung.
        </p>
        {!tracker.latestCheck?.competitors?.length ? (
          <p className="mt-3 text-sm text-text-secondary">Belum ada data.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {tracker.latestCheck.competitors.map((c) => (
              <li
                key={c.id}
                className="flex items-start justify-between gap-3 border-b border-border-subtle pb-2 last:border-0"
              >
                <div className="min-w-0">
                  <p className="font-medium">
                    #{c.position} {c.domain}
                  </p>
                  <p className="truncate text-xs text-text-muted">
                    {c.resultTitle}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SurfaceCard>
    </div>
  );
}
