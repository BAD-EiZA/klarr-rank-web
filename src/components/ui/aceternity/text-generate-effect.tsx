"use client";

import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      { opacity: 1 },
      { duration: 0.35, delay: stagger(0.08) },
    );
  }, [animate]);

  return (
    <div className={cn("font-semibold", className)}>
      <motion.div ref={scope} className="flex flex-wrap gap-x-2">
        {wordsArray.map((word, idx) => (
          <motion.span key={`${word}-${idx}`} className="opacity-0 text-text-primary">
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
