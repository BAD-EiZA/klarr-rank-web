"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { appButtonClass } from "@/components/ui/app-button";
import { FormAlert } from "@/components/ui/form-alert";
import { Input, Label, Select } from "@/components/ui/aceternity/input";
import { Spinner } from "@/components/ui/spinner";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

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
      track("onboarding_completed");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Nama tampilan</Label>
        <Input
          id="name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          minLength={1}
          autoComplete="name"
        />
      </div>
      <div className="space-y-1.5">
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
      <div className="space-y-1.5">
        <Label htmlFor="country">Negara default ranking</Label>
        <Input
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value.toUpperCase())}
          maxLength={2}
          required
          aria-describedby="country-hint"
        />
        <p id="country-hint" className="text-xs text-text-muted">
          Kode ISO 2 huruf, contoh ID
        </p>
      </div>
      <div className="space-y-1.5">
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
      <FormAlert>{error}</FormAlert>
      <button
        type="submit"
        disabled={loading}
        className={cn(appButtonClass("primary"), "w-full")}
      >
        {loading ? (
          <>
            <Spinner /> Menyimpan…
          </>
        ) : (
          "Selesai"
        )}
      </button>
    </form>
  );
}
