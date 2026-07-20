"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { appButtonClass } from "@/components/ui/app-button";
import { FormAlert } from "@/components/ui/form-alert";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function AdminJobActions({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function retry() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}/retry`, {
        method: "POST",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Retry gagal");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Retry gagal");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={busy}
        onClick={retry}
        className={cn(appButtonClass("secondary", undefined, "sm"))}
      >
        {busy ? <Spinner className="h-3 w-3" /> : null}
        Retry
      </button>
      <FormAlert className="text-right text-xs">{error}</FormAlert>
    </div>
  );
}
