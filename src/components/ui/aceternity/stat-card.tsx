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
      className={cn(
        "rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow)]",
        className,
      )}
    >
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-text-primary">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-text-secondary">{hint}</p> : null}
    </motion.div>
  );
}
