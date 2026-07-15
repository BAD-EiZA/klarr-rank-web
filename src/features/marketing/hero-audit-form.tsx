"use client";

import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";
import { Input } from "@/components/ui/aceternity/input";

export function HeroAuditForm() {
  const [url, setUrl] = useState("");

  return (
    <div className="w-full max-w-xl space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://domainanda.com"
          aria-label="URL website"
          className="h-12 min-h-[44px] text-base"
        />
        <RegisterLink className="inline-flex h-12 min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90">
          Audit gratis
        </RegisterLink>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary sm:text-sm">
        <li>✓ Tanpa kartu kredit</li>
        <li>✓ Hasil awal dalam beberapa menit</li>
        <li>✓ 2 scan gratis / hari</li>
      </ul>
      {url.trim() ? (
        <p className="text-xs text-text-secondary">
          Setelah daftar, audit:{" "}
          <span className="font-medium text-text-primary">{url.trim()}</span>
        </p>
      ) : null}
    </div>
  );
}
