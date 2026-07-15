"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className={cn(
              "relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow)]",
              className,
            )}
          >
            {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
            <div className={cn(title && "mt-3")}>{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
