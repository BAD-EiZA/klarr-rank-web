"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ScanRowActions({
  scanId,
  url,
  status,
}: {
  scanId: string;
  url: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function rescan() {
    setBusy(true);
    try {
      const res = await fetch("/api/scans", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error ?? "Gagal rescan");
      router.push(`/scans/${body.data.id}`);
      router.refresh();
    } catch {
      setBusy(false);
    }
  }

  async function retry() {
    setBusy(true);
    try {
      const res = await fetch(`/api/scans/${scanId}/retry`, { method: "POST" });
      if (!res.ok) throw new Error("Retry gagal");
      router.push(`/scans/${scanId}`);
      router.refresh();
    } catch {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm("Hapus laporan ini?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/scans/${scanId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Hapus gagal");
      router.refresh();
    } catch {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={busy}
        onClick={rescan}
        className="rounded-lg border border-border px-2 py-1 text-xs font-medium disabled:opacity-50"
      >
        Rescan
      </button>
      {status === "FAILED" ? (
        <button
          type="button"
          disabled={busy}
          onClick={retry}
          className="rounded-lg border border-border px-2 py-1 text-xs font-medium disabled:opacity-50"
        >
          Retry
        </button>
      ) : null}
      <button
        type="button"
        disabled={busy}
        onClick={remove}
        className="rounded-lg border border-critical/40 px-2 py-1 text-xs font-medium text-critical disabled:opacity-50"
      >
        Hapus
      </button>
    </div>
  );
}
