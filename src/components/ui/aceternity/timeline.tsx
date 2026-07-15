"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Timeline({
  items,
  className,
}: {
  items: { title: string; description: string; badge?: string }[];
  className?: string;
}) {
  return (
    <div className={cn("relative space-y-6 border-l border-border pl-6", className)}>
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.05 }}
          className="relative"
        >
          <span className="absolute -left-[1.9rem] top-1 h-3 w-3 rounded-full border-2 border-accent bg-background" />
          {item.badge ? (
            <span className="text-xs font-medium text-accent">{item.badge}</span>
          ) : null}
          <h3 className="font-semibold text-text-primary">{item.title}</h3>
          <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
