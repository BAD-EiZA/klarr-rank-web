"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function MovingBorderButton({
  children,
  className,
  containerClassName,
  borderClassName,
  as: Tag = "button",
  duration = 3000,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  duration?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  return (
    <Tag
      className={cn(
        "relative h-12 w-auto overflow-hidden rounded-full p-[1px]",
        containerClassName,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0 240deg, #535C91 280deg, #9290C3 320deg, transparent 360deg)",
        }}
      >
        <motion.div
          className={cn("absolute inset-[-100%]", borderClassName)}
          animate={{ rotate: 360 }}
          transition={{ duration: duration / 1000, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0 240deg, #535C91 280deg, #9290C3 320deg, transparent 360deg)",
          }}
        />
      </div>
      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center rounded-full bg-background px-6 text-sm font-medium text-text-primary",
          className,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
