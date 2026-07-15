"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function TrackerActions({
  trackerId,
  status,
}: {
  trackerId: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function call(path: string, method = "POST") {
    setBusy(true);
    try {
      const res = await fetch(`/api/rank-trackers/${trackerId}${path}`, {
        method,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Gagal");
      }
      router.refresh();
    } catch {
      // keep UI stable
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={busy || status !== "ACTIVE"}
        onClick={() => call("/refresh")}
        className="rounded-lg border border-border px-2 py-1 text-xs font-medium disabled:opacity-50"
      >
        Refresh
      </button>
      {status === "ACTIVE" ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => call("/pause")}
          className="rounded-lg border border-border px-2 py-1 text-xs font-medium disabled:opacity-50"
        >
          Pause
        </button>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => call("/resume")}
          className="rounded-lg border border-border px-2 py-1 text-xs font-medium disabled:opacity-50"
        >
          Resume
        </button>
      )}
      <button
        type="button"
        disabled={busy}
        onClick={() => {
          if (window.confirm("Hapus tracker ini?")) call("", "DELETE");
        }}
        className="rounded-lg border border-critical/40 px-2 py-1 text-xs font-medium text-critical disabled:opacity-50"
      >
        Hapus
      </button>
    </div>
  );
}
