"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FloatingNavbar({
  navItems,
  className,
}: {
  navItems: { name: string; link: string }[];
  className?: string;
}) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition",
        scrolled
          ? "border-b border-border bg-background/95 shadow-[var(--shadow)] backdrop-blur-md"
          : "border-b border-transparent bg-background/70 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-accent-foreground ring-1 ring-brand-mid">
            K
          </span>
          Klarr Rank
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Utama">
          {navItems.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-primary/85 transition hover:bg-surface hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LoginLink className="hidden min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-medium text-text-primary/90 hover:text-text-primary sm:inline-flex">
            Masuk
          </LoginLink>
          <RegisterLink className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
            Audit website gratis
          </RegisterLink>
        </div>
      </div>
    </motion.header>
  );
}
