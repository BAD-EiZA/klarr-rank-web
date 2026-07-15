"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminUserActions({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const suspended = status === "SUSPENDED";

  async function toggle() {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ suspend: !suspended }),
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
      onClick={toggle}
      className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium disabled:opacity-50"
    >
      {suspended ? "Unsuspend" : "Suspend"}
    </button>
  );
}
