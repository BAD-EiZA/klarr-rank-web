"use client";

import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/aceternity/input";
import { cn } from "@/lib/utils";

function normalizeUrlHint(raw: string) {
  const value = raw.trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

export function HeroAuditForm({
  className,
  ctaLabel = "Audit website gratis",
}: {
  className?: string;
  ctaLabel?: string;
}) {
  const [url, setUrl] = useState("");
  const [touched, setTouched] = useState(false);

  const normalized = useMemo(() => normalizeUrlHint(url), [url]);
  const isValid = useMemo(() => {
    if (!normalized) return false;
    try {
      const parsed = new URL(normalized);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }, [normalized]);

  const showError = touched && url.trim().length > 0 && !isValid;

  return (
    <div className={cn("w-full max-w-xl space-y-3", className)}>
      <div className="space-y-1.5">
        <label
          htmlFor="hero-url"
          className="block text-sm font-medium text-text-primary"
        >
          URL halaman publik
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="hero-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="https://websiteanda.com"
            aria-label="URL website"
            aria-invalid={showError}
            aria-describedby="hero-url-help"
            className="h-12 min-h-[44px] border-border bg-surface text-base text-text-primary placeholder:text-text-muted"
          />
          <RegisterLink
            className={cn(
              "inline-flex h-12 min-h-[44px] shrink-0 items-center justify-center rounded-xl px-5 text-sm font-semibold transition",
              "bg-accent text-accent-foreground shadow-[0_0_24px_rgba(56,189,248,0.18)] hover:bg-accent-hover",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
            )}
          >
            {ctaLabel}
          </RegisterLink>
        </div>
        <p id="hero-url-help" className="text-sm text-text-secondary">
          Satu halaman per audit · tidak mengubah apa pun di website Anda
        </p>
        {showError ? (
          <p className="text-sm text-critical" role="alert">
            Format URL belum valid. Contoh: websiteanda.com
          </p>
        ) : null}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-secondary">
        <li>✓ Tanpa kartu kredit</li>
        <li>✓ Tanpa instalasi</li>
        <li>✓ Hasil awal ±30 detik</li>
      </ul>
    </div>
  );
}
