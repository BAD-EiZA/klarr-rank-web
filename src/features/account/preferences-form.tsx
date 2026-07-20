"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { appButtonClass } from "@/components/ui/app-button";
import { FormAlert } from "@/components/ui/form-alert";
import { Input, Label, Select } from "@/components/ui/aceternity/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type Defaults = {
  displayName: string;
  locale: string;
  defaultCountryCode: string;
  defaultDevice: string;
  theme: string;
};

export function AccountPreferencesForm({ defaults }: { defaults: Defaults }) {
  const router = useRouter();
  const [form, setForm] = useState(defaults);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          displayName: form.displayName,
          locale: form.locale,
          defaultCountryCode: form.defaultCountryCode,
          defaultLanguageCode: form.locale,
          defaultDevice: form.defaultDevice,
          theme: form.theme,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Gagal menyimpan");
      }
      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3.5">
      <div className="space-y-1.5">
        <Label htmlFor="pref-name">Nama tampilan</Label>
        <Input
          id="pref-name"
          value={form.displayName}
          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          autoComplete="name"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pref-locale">Bahasa</Label>
        <Select
          id="pref-locale"
          value={form.locale}
          onChange={(e) => setForm({ ...form, locale: e.target.value })}
        >
          <option value="id">Indonesia</option>
          <option value="en">English</option>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pref-country">Negara default</Label>
        <Input
          id="pref-country"
          value={form.defaultCountryCode}
          maxLength={2}
          onChange={(e) =>
            setForm({
              ...form,
              defaultCountryCode: e.target.value.toUpperCase(),
            })
          }
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pref-device">Device ranking</Label>
        <Select
          id="pref-device"
          value={form.defaultDevice}
          onChange={(e) => setForm({ ...form, defaultDevice: e.target.value })}
        >
          <option value="DESKTOP">Desktop</option>
          <option value="MOBILE">Mobile</option>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pref-theme">Tema</Label>
        <Select
          id="pref-theme"
          value={form.theme}
          onChange={(e) => setForm({ ...form, theme: e.target.value })}
        >
          <option value="SYSTEM">System</option>
          <option value="LIGHT">Light</option>
          <option value="DARK">Dark</option>
        </Select>
        <p className="text-xs text-text-muted">
          Preferensi disimpan; tema UI penuh menyusul.
        </p>
      </div>
      <FormAlert tone="error">{error}</FormAlert>
      <FormAlert tone="success">
        {success && !error ? "Tersimpan" : null}
      </FormAlert>
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
          "Simpan"
        )}
      </button>
    </form>
  );
}
