"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: { title: string; value: string; content: React.ReactNode }[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) {
  const [active, setActive] = useState(tabs[0]);

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 rounded-full border border-border bg-surface p-1",
          containerClassName,
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActive(tab)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium text-text-secondary",
              tabClassName,
              active.value === tab.value && "text-text-primary",
            )}
          >
            {active.value === tab.value ? (
              <motion.span
                layoutId="activeTab"
                className={cn(
                  "absolute inset-0 rounded-full bg-accent/15",
                  activeTabClassName,
                )}
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            ) : null}
            <span className="relative z-10">{tab.title}</span>
          </button>
        ))}
      </div>
      <div className={cn("mt-4", contentClassName)}>{active.content}</div>
    </div>
  );
}
