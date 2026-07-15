"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function FlipWords({
  words,
  duration = 2600,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  const start = useCallback(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, duration);
    return () => window.clearInterval(id);
  }, [duration, words.length]);

  useEffect(() => {
    return start();
  }, [start]);

  return (
    <span className={cn("relative inline-block", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="inline-block text-accent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
