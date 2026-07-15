"use client";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-brand-mid shadow-sm",
  secondary:
    "border border-border bg-surface text-text-primary hover:bg-background",
  ghost: "text-text-secondary hover:bg-background hover:text-text-primary",
  danger:
    "border border-critical/40 text-critical hover:bg-critical/10",
};

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
