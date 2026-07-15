"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <label className="block space-y-1 text-sm">
        <span className="text-text-secondary">Nama tampilan</span>
        <input
          className="w-full rounded-lg border border-border bg-surface px-3 py-2"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          minLength={1}
        />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="text-text-secondary">Bahasa UI</span>
        <select
          className="w-full rounded-lg border border-border bg-surface px-3 py-2"
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
        >
          <option value="id">Indonesia</option>
          <option value="en">English</option>
        </select>
      </label>
      <label className="block space-y-1 text-sm">
        <span className="text-text-secondary">Negara default ranking</span>
        <input
          className="w-full rounded-lg border border-border bg-surface px-3 py-2"
          value={country}
          onChange={(e) => setCountry(e.target.value.toUpperCase())}
          maxLength={2}
          required
        />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="text-text-secondary">Device ranking default</span>
        <select
          className="w-full rounded-lg border border-border bg-surface px-3 py-2"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
        >
          <option value="DESKTOP">Desktop</option>
          <option value="MOBILE">Mobile</option>
        </select>
      </label>
      {error ? <p className="text-sm text-critical">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground disabled:opacity-60"
      >
        {loading ? "Menyimpan…" : "Selesai"}
      </button>
    </form>
  );
}
