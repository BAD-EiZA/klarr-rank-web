"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/aceternity/button";
import { Input, Label, Select } from "@/components/ui/aceternity/input";

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
      className="grid gap-3 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow)] sm:grid-cols-2 lg:grid-cols-6"
    >
      <div className="space-y-1 lg:col-span-2">
        <Label>Cari URL / domain</Label>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="example.com"
        />
      </div>
      <div className="space-y-1">
        <Label>Status</Label>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Semua</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="COMPLETED_WITH_AI_ERROR">COMPLETED_WITH_AI_ERROR</option>
          <option value="FAILED">FAILED</option>
          <option value="QUEUED">QUEUED</option>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Urutkan</Label>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="score_high">Skor tertinggi</option>
          <option value="score_low">Skor terendah</option>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Min skor</Label>
        <Input
          type="number"
          min={0}
          max={100}
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label>Max skor</Label>
        <Input
          type="number"
          min={0}
          max={100}
          value={maxScore}
          onChange={(e) => setMaxScore(e.target.value)}
        />
      </div>
      <div className="flex items-end sm:col-span-2 lg:col-span-6">
        <Button type="submit">Terapkan filter</Button>
      </div>
    </form>
  );
}
