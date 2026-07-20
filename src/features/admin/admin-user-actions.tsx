"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { appButtonClass } from "@/components/ui/app-button";
import { FormAlert } from "@/components/ui/form-alert";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function AdminUserActions({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const suspended = status === "SUSPENDED";

  async function toggle() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ suspend: !suspended }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Gagal mengubah status user");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={busy}
        onClick={toggle}
        className={cn(
          appButtonClass(suspended ? "secondary" : "danger", undefined, "sm"),
        )}
      >
        {busy ? <Spinner className="h-3 w-3" /> : null}
        {suspended ? "Unsuspend" : "Suspend"}
      </button>
      <FormAlert className="text-right text-xs">{error}</FormAlert>
    </div>
  );
}
