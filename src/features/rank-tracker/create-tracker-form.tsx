"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { appButtonClass } from "@/components/ui/app-button";
import { FormAlert } from "@/components/ui/form-alert";
import { Input, Label, Select } from "@/components/ui/aceternity/input";
import { Spinner } from "@/components/ui/spinner";
import { SurfaceCard } from "@/components/ui/surface-card";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function CreateTrackerForm() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [countryCode, setCountryCode] = useState("ID");
  const [device, setDevice] = useState("DESKTOP");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/rank-trackers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          keyword,
          targetUrl,
          countryCode,
          languageCode: countryCode === "ID" ? "id" : "en",
          device,
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error ?? "Gagal membuat tracker");
      track("rank_tracker_created", { tracker_id: body.data.id });
      router.push(`/rank-trackers/${body.data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal");
      setLoading(false);
    }
  }

  return (
    <SurfaceCard className="p-5 md:p-6">
      <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label>Keyword</Label>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
            placeholder="jasa seo jakarta"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label>Target URL / domain</Label>
          <Input
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            required
            placeholder="https://example.com"
          />
        </div>
        <div className="space-y-1">
          <Label>Negara</Label>
          <Input
            value={countryCode}
            maxLength={2}
            onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
          />
        </div>
        <div className="space-y-1">
          <Label>Device</Label>
          <Select
            value={device}
            onChange={(e) => setDevice(e.target.value)}
          >
            <option value="DESKTOP">Desktop</option>
            <option value="MOBILE">Mobile</option>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <FormAlert>{error}</FormAlert>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={cn(appButtonClass("primary"))}
          >
            {loading ? (
              <>
                <Spinner /> Menyimpan…
              </>
            ) : (
              "Tambah tracker"
            )}
          </button>
        </div>
      </form>
    </SurfaceCard>
  );
}
