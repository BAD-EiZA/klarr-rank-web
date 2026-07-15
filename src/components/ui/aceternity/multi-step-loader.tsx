"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type LoaderStep = {
  text: string;
};

export function MultiStepLoader({
  loadingStates,
  loading,
  current,
  className,
}: {
  loadingStates: LoaderStep[];
  loading: boolean;
  current: number;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn("w-full", className)}
        >
          <div className="flex flex-col gap-3">
            {loadingStates.map((state, i) => {
              const active = i === current;
              const done = i < current;
              return (
                <div
                  key={state.text}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition",
                    active
                      ? "border-accent/40 bg-accent/10 text-text-primary"
                      : done
                        ? "border-border bg-surface text-text-secondary"
                        : "border-transparent text-text-secondary/60",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                      active || done
                        ? "bg-accent text-accent-foreground"
                        : "border border-border",
                    )}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  <span className={cn(active && "font-medium")}>{state.text}</span>
                  {active ? (
                    <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-accent" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
