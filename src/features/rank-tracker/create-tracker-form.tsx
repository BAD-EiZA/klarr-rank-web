"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateTrackerForm() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [countryCode, setCountryCode] = useState("ID");
  const [device, setDevice] = useState("DESKTOP");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/rank-trackers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          keyword,
          targetUrl,
          countryCode,
          languageCode: countryCode === "ID" ? "id" : "en",
          device,
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error ?? "Gagal membuat tracker");
      router.push(`/rank-trackers/${body.data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-2"
    >
      <label className="space-y-1 text-sm sm:col-span-2">
        <span className="text-text-secondary">Keyword</span>
        <input
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
          placeholder="jasa seo jakarta"
        />
      </label>
      <label className="space-y-1 text-sm sm:col-span-2">
        <span className="text-text-secondary">Target URL / domain</span>
        <input
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          required
          placeholder="https://example.com"
        />
      </label>
      <label className="space-y-1 text-sm">
        <span className="text-text-secondary">Negara</span>
        <input
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
          value={countryCode}
          maxLength={2}
          onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
        />
      </label>
      <label className="space-y-1 text-sm">
        <span className="text-text-secondary">Device</span>
        <select
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
        >
          <option value="DESKTOP">Desktop</option>
          <option value="MOBILE">Mobile</option>
        </select>
      </label>
      {error ? (
        <p className="text-sm text-critical sm:col-span-2">{error}</p>
      ) : null}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-60"
        >
          {loading ? "Menyimpan…" : "Tambah tracker"}
        </button>
      </div>
    </form>
  );
}
