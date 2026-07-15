"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function ContainerScroll({
  titleComponent,
  children,
  className,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <div ref={ref} className={cn("relative py-12", className)}>
      <div className="mx-auto max-w-4xl text-center">{titleComponent}</div>
      <motion.div
        style={{ rotateX: rotate, scale }}
        className="mx-auto mt-8 max-w-5xl origin-top [perspective:1200px]"
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-[var(--shadow)]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
