"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
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
      setMsg("Tersimpan");
      router.refresh();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Gagal menyimpan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3">
      <Field label="Nama tampilan">
        <input
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          value={form.displayName}
          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
        />
      </Field>
      <Field label="Bahasa">
        <select
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          value={form.locale}
          onChange={(e) => setForm({ ...form, locale: e.target.value })}
        >
          <option value="id">Indonesia</option>
          <option value="en">English</option>
        </select>
      </Field>
      <Field label="Negara default">
        <input
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          value={form.defaultCountryCode}
          maxLength={2}
          onChange={(e) =>
            setForm({
              ...form,
              defaultCountryCode: e.target.value.toUpperCase(),
            })
          }
        />
      </Field>
      <Field label="Device ranking">
        <select
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          value={form.defaultDevice}
          onChange={(e) => setForm({ ...form, defaultDevice: e.target.value })}
        >
          <option value="DESKTOP">Desktop</option>
          <option value="MOBILE">Mobile</option>
        </select>
      </Field>
      <Field label="Tema">
        <select
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          value={form.theme}
          onChange={(e) => setForm({ ...form, theme: e.target.value })}
        >
          <option value="SYSTEM">System</option>
          <option value="LIGHT">Light</option>
          <option value="DARK">Dark</option>
        </select>
      </Field>
      {msg ? <p className="text-sm text-text-secondary">{msg}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-60"
      >
        {loading ? "Menyimpan…" : "Simpan"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="text-text-secondary">{label}</span>
      {children}
    </label>
  );
}
