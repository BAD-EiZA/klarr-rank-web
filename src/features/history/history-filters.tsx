"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  q: string;
  status: string;
  sort: string;
  minScore: string;
  maxScore: string;
};

export function HistoryFilters({
  q: initialQ,
  status: initialStatus,
  sort: initialSort,
  minScore: initialMin,
  maxScore: initialMax,
}: Props) {
  const router = useRouter();
  const [q, setQ] = useState(initialQ);
  const [status, setStatus] = useState(initialStatus);
  const [sort, setSort] = useState(initialSort);
  const [minScore, setMinScore] = useState(initialMin);
  const [maxScore, setMaxScore] = useState(initialMax);

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (status) params.set("status", status);
    if (sort) params.set("sort", sort);
    if (minScore) params.set("minScore", minScore);
    if (maxScore) params.set("maxScore", maxScore);
    router.push(`/history?${params.toString()}`);
  }

  return (
    <form
      onSubmit={apply}
      className="grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-6"
    >
      <label className="space-y-1 text-sm lg:col-span-2">
        <span className="text-text-secondary">Cari URL / domain</span>
        <input
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="example.com"
        />
      </label>
      <label className="space-y-1 text-sm">
        <span className="text-text-secondary">Status</span>
        <select
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Semua</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="COMPLETED_WITH_AI_ERROR">COMPLETED_WITH_AI_ERROR</option>
          <option value="FAILED">FAILED</option>
          <option value="QUEUED">QUEUED</option>
        </select>
      </label>
      <label className="space-y-1 text-sm">
        <span className="text-text-secondary">Urutkan</span>
        <select
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="score_high">Skor tertinggi</option>
          <option value="score_low">Skor terendah</option>
        </select>
      </label>
      <label className="space-y-1 text-sm">
        <span className="text-text-secondary">Min skor</span>
        <input
          type="number"
          min={0}
          max={100}
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
        />
      </label>
      <label className="space-y-1 text-sm">
        <span className="text-text-secondary">Max skor</span>
        <input
          type="number"
          min={0}
          max={100}
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
          value={maxScore}
          onChange={(e) => setMaxScore(e.target.value)}
        />
      </label>
      <div className="flex items-end sm:col-span-2 lg:col-span-6">
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Terapkan filter
        </button>
      </div>
    </form>
  );
}
