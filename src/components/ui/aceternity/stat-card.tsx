"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  className,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-surface p-4",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
        "transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "hover:border-accent/30 hover:bg-surface-raised",
        className,
      )}
    >
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-text-primary">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-text-muted">{hint}</p> : null}
    </motion.div>
  );
}
