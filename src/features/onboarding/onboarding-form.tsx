"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/aceternity/button";
import { Input, Label, Select } from "@/components/ui/aceternity/input";

type Props = {
  defaultName: string;
};

export function OnboardingForm({ defaultName }: Props) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(defaultName);
  const [locale, setLocale] = useState("id");
  const [country, setCountry] = useState("ID");
  const [device, setDevice] = useState("DESKTOP");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          displayName,
          locale,
          defaultCountryCode: country,
          defaultLanguageCode: locale,
          defaultDevice: device,
          completeOnboarding: true,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Gagal menyimpan onboarding");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow)]"
    >
      <div className="space-y-1">
        <Label htmlFor="name">Nama tampilan</Label>
        <Input
          id="name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          minLength={1}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="locale">Bahasa UI</Label>
        <Select
          id="locale"
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
        >
          <option value="id">Indonesia</option>
          <option value="en">English</option>
        </Select>
      </div>
      <div className="space-y-1">
        <Label htmlFor="country">Negara default ranking</Label>
        <Input
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value.toUpperCase())}
          maxLength={2}
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="device">Device ranking default</Label>
        <Select
          id="device"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
        >
          <option value="DESKTOP">Desktop</option>
          <option value="MOBILE">Mobile</option>
        </Select>
      </div>
      {error ? <p className="text-sm text-critical">{error}</p> : null}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Menyimpan…" : "Selesai"}
      </Button>
    </form>
  );
}
