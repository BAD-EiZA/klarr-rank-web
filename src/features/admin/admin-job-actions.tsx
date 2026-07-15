"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminJobActions({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function retry() {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}/retry`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("failed");
      router.refresh();
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={retry}
      className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium disabled:opacity-50"
    >
      Retry
    </button>
  );
}
