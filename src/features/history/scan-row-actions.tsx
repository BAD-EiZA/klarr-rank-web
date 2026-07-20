"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { appButtonClass } from "@/components/ui/app-button";
import { FormAlert } from "@/components/ui/form-alert";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

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
  const [error, setError] = useState<string | null>(null);

  async function rescan() {
    setBusy(true);
    setError(null);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal rescan");
      setBusy(false);
    }
  }

  async function retry() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/scans/${scanId}/retry`, { method: "POST" });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Retry gagal");
      }
      router.push(`/scans/${scanId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Retry gagal");
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm("Hapus laporan ini?")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/scans/${scanId}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Hapus gagal");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hapus gagal");
      setBusy(false);
    }
  }

  return (
    <div className="flex min-w-0 flex-col items-end gap-1.5">
      <div className="flex flex-wrap justify-end gap-1.5">
        <button
          type="button"
          disabled={busy}
          onClick={rescan}
          className={cn(appButtonClass("secondary", undefined, "sm"))}
        >
          {busy ? <Spinner className="h-3 w-3" /> : null}
          Rescan
        </button>
        {status === "FAILED" ? (
          <button
            type="button"
            disabled={busy}
            onClick={retry}
            className={cn(appButtonClass("secondary", undefined, "sm"))}
          >
            Retry
          </button>
        ) : null}
        <button
          type="button"
          disabled={busy}
          onClick={remove}
          className={cn(appButtonClass("danger", undefined, "sm"))}
        >
          Hapus
        </button>
      </div>
      <FormAlert className="text-right text-xs">{error}</FormAlert>
    </div>
  );
}
