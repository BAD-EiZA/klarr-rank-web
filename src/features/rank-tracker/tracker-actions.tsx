"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { appButtonClass } from "@/components/ui/app-button";
import { FormAlert } from "@/components/ui/form-alert";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function TrackerActions({
  trackerId,
  status,
}: {
  trackerId: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function call(path: string, method = "POST") {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/rank-trackers/${trackerId}${path}`, {
        method,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Gagal");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-w-0 flex-col items-end gap-1.5">
      <div className="flex flex-wrap justify-end gap-1.5">
        <button
          type="button"
          disabled={busy || status !== "ACTIVE"}
          onClick={() => call("/refresh")}
          className={cn(appButtonClass("secondary", undefined, "sm"))}
        >
          {busy ? <Spinner className="h-3 w-3" /> : null}
          Refresh
        </button>
        {status === "ACTIVE" ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => call("/pause")}
            className={cn(appButtonClass("secondary", undefined, "sm"))}
          >
            Pause
          </button>
        ) : (
          <button
            type="button"
            disabled={busy}
            onClick={() => call("/resume")}
            className={cn(appButtonClass("secondary", undefined, "sm"))}
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
          className={cn(appButtonClass("danger", undefined, "sm"))}
        >
          Hapus
        </button>
      </div>
      <FormAlert className="text-right text-xs">{error}</FormAlert>
    </div>
  );
}
