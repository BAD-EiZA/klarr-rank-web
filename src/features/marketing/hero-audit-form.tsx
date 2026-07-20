"use client";

import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useMemo, useState } from "react";
import {
  IslandCtaContent,
  islandCtaClass,
} from "@/components/marketing/island-cta";
import { track } from "@/lib/analytics";
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
  inputId = "hero-url",
}: {
  className?: string;
  ctaLabel?: string;
  inputId?: string;
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
  const helpId = `${inputId}-help`;

  return (
    <div className={cn("w-full max-w-xl space-y-4", className)}>
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary"
        >
          URL halaman publik
        </label>
        <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-1.5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              id={inputId}
              type="url"
              inputMode="url"
              autoComplete="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="https://websiteanda.com"
              aria-label="URL website"
              aria-invalid={showError}
              aria-describedby={helpId}
              className={cn(
                "h-12 min-h-[48px] w-full flex-1 rounded-full border border-white/[0.06] bg-surface px-5 text-base text-text-primary",
                "placeholder:text-text-muted shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]",
                "transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
              )}
            />
            <RegisterLink
              className={cn(
                islandCtaClass("primary"),
                "w-full shrink-0 justify-center sm:w-auto",
              )}
              onClick={() =>
                track("landing_cta_clicked", {
                  source: inputId === "cta-url" ? "closing_form" : "hero_form",
                  has_url: Boolean(url.trim()),
                })
              }
            >
              <IslandCtaContent>{ctaLabel}</IslandCtaContent>
            </RegisterLink>
          </div>
        </div>
        <p id={helpId} className="text-sm text-text-secondary">
          Satu halaman per audit · tidak mengubah apa pun di website Anda
        </p>
        {showError ? (
          <p className="text-sm text-critical" role="alert">
            Format URL belum valid. Contoh: websiteanda.com
          </p>
        ) : null}
      </div>
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-text-secondary">
        <li>✓ Tanpa kartu kredit</li>
        <li>✓ Tanpa instalasi</li>
        <li>✓ Hasil awal ±30 detik</li>
      </ul>
    </div>
  );
}
