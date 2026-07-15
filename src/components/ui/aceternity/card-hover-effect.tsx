"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function HoverEffect({
  items,
  className,
}: {
  items: { title: string; description: string; link?: string; icon?: React.ReactNode }[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, idx) => (
        <a
          href={item.link || "#"}
          key={item.title}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === idx ? (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-2xl bg-accent/5"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            ) : null}
          </AnimatePresence>
          <div className="relative z-10 h-full rounded-2xl border border-border bg-surface p-5 transition group-hover:border-accent/40 group-hover:bg-surface-raised">
            {item.icon ? (
              <div className="mb-3 text-text-muted">{item.icon}</div>
            ) : null}
            <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
