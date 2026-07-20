"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { appButtonClass } from "@/components/ui/app-button";
import { FormAlert } from "@/components/ui/form-alert";
import { Input, Label } from "@/components/ui/aceternity/input";
import { Spinner } from "@/components/ui/spinner";
import { SurfaceCard } from "@/components/ui/surface-card";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

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
      track("scan_started", { scan_id: id });
      router.push(`/scans/${id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal membuat scan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SurfaceCard as="div" className="p-5 md:p-6">
      <form onSubmit={onSubmit}>
        <Label htmlFor="scan-url">URL halaman</Label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Input
            id="scan-url"
            type="url"
            inputMode="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            minLength={3}
            className="h-11 rounded-full"
          />
          <button
            type="submit"
            disabled={loading}
            className={cn(appButtonClass("primary"), "shrink-0 sm:min-w-[8.5rem]")}
          >
            {loading ? (
              <>
                <Spinner /> Memulai…
              </>
            ) : (
              "Scan"
            )}
          </button>
        </div>
        <p className="mt-2 text-xs text-text-muted">
          Contoh: example.com · hanya HTTP/HTTPS publik
        </p>
        <FormAlert className="mt-2">{error}</FormAlert>
      </form>
    </SurfaceCard>
  );
}
