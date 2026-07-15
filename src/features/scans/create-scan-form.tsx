"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateScanForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/scans", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(body?.error ?? "Gagal membuat scan");
      }
      const id = body?.data?.id as string | undefined;
      if (!id) throw new Error("Scan id tidak ditemukan");
      router.push(`/scans/${id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal membuat scan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow)]"
    >
      <label className="block space-y-2 text-sm">
        <span className="font-medium">URL halaman</span>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            className="w-full rounded-lg border border-border bg-background px-3 py-2"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            minLength={3}
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-accent px-4 py-2 font-medium text-accent-foreground disabled:opacity-60"
          >
            {loading ? "Memulai…" : "Scan"}
          </button>
        </div>
      </label>
      <p className="mt-2 text-xs text-text-secondary">
        Contoh: example.com · hanya HTTP/HTTPS publik
      </p>
      {error ? <p className="mt-2 text-sm text-critical">{error}</p> : null}
    </form>
  );
}
