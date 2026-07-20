"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IslandCtaContent, islandCtaClass } from "@/components/marketing/island-cta";
import { springEase } from "@/components/ui/motion-section";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function IslandNav({
  navItems,
}: {
  navItems: { name: string; link: string }[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: springEase }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 md:pt-6"
      >
        <div
          className={cn(
            "pointer-events-auto flex w-full max-w-fit items-center gap-1 rounded-full border border-white/10",
            "bg-background/70 px-2 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3 text-sm font-semibold tracking-tight"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F4C75] text-xs font-bold text-[#BBE1FA]">
              K
            </span>
            <span className="hidden sm:inline">Klarr Rank</span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Utama"
          >
            {navItems.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className="rounded-full px-3 py-2 text-sm font-medium text-text-secondary transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/5 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 pl-1">
            <LoginLink
              className="hidden min-h-[40px] items-center rounded-full px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:inline-flex"
              onClick={() => track("auth_login_started", { source: "nav" })}
            >
              Masuk
            </LoginLink>
            <RegisterLink
              className={cn(islandCtaClass("primary"), "hidden sm:inline-flex")}
              onClick={() =>
                track("landing_cta_clicked", { source: "nav" })
              }
            >
              <IslandCtaContent>Audit gratis</IslandCtaContent>
            </RegisterLink>

            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Tutup" : "Menu"}</span>
              <span className="relative block h-3.5 w-4">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-text-primary transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    open && "top-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-px w-full bg-text-primary transition-opacity duration-300",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-3 h-px w-full bg-text-primary transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    open && "top-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-black/80 backdrop-blur-3xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: springEase }}
          >
            <div className="flex items-center justify-between px-5 pt-6">
              <span className="text-sm font-semibold">Menu</span>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10"
                aria-label="Tutup menu"
                onClick={() => setOpen(false)}
              >
                <span className="relative block h-3.5 w-4">
                  <span className="absolute left-0 top-1.5 h-px w-full rotate-45 bg-text-primary" />
                  <span className="absolute left-0 top-1.5 h-px w-full -rotate-45 bg-text-primary" />
                </span>
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Mobile">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.link}
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{
                    duration: 0.55,
                    ease: springEase,
                    delay: 0.08 + i * 0.06,
                  }}
                >
                  <Link
                    href={item.link}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-3xl font-semibold tracking-tight"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: springEase,
                  delay: 0.08 + navItems.length * 0.06,
                }}
                className="mt-8 flex flex-col gap-3"
              >
                <LoginLink
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/10 text-sm font-semibold"
                  onClick={() => {
                    track("auth_login_started", { source: "nav_mobile" });
                    setOpen(false);
                  }}
                >
                  Masuk
                </LoginLink>
                <RegisterLink
                  className={cn(islandCtaClass("primary"), "justify-center")}
                  onClick={() => {
                    track("landing_cta_clicked", { source: "nav_mobile" });
                    setOpen(false);
                  }}
                >
                  <IslandCtaContent>Audit website gratis</IslandCtaContent>
                </RegisterLink>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
