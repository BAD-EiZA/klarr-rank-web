"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function FloatingNavbar({
  navItems,
  className,
}: {
  navItems: { name: string; link: string }[];
  className?: string;
}) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed inset-x-0 top-4 z-50 mx-auto flex max-w-fit items-center justify-center space-x-2 rounded-full border border-border bg-surface/80 px-3 py-2 shadow-[var(--shadow)] backdrop-blur-md",
        className,
      )}
    >
      <Link href="/" className="px-2 text-sm font-semibold tracking-tight">
        Klarr Rank
      </Link>
      {navItems.map((item) => (
        <Link
          key={item.link}
          href={item.link}
          className="hidden rounded-full px-3 py-1 text-sm text-text-secondary transition hover:bg-background hover:text-text-primary sm:inline-block"
        >
          {item.name}
        </Link>
      ))}
      <LoginLink className="rounded-full px-3 py-1 text-sm text-text-secondary hover:text-text-primary">
        Masuk
      </LoginLink>
      <RegisterLink className="rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground">
        Mulai
      </RegisterLink>
    </motion.div>
  );
}
