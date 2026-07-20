"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/** Skill spring: cubic-bezier(0.32, 0.72, 0, 1) */
export const springEase = [0.32, 0.72, 0, 1] as const;

export function MotionSection({
  className,
  children,
  delay = 0,
  ...props
}: HTMLMotionProps<"section"> & { delay?: number }) {
  return (
    <motion.section
      className={cn(className)}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: springEase, delay }}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function MotionDiv({
  className,
  children,
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: springEase, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  className,
  children,
  stagger = 0.1,
}: {
  className?: string;
  children: React.ReactNode;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: springEase },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export { motion };
