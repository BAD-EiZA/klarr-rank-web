import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const sizes = {
  sm: "min-h-[32px] px-2.5 py-1 text-xs",
  md: "min-h-[40px] px-4 py-2 text-sm",
} as const;

const variants = {
  primary:
    "bg-accent text-accent-foreground shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:bg-accent-hover",
  secondary:
    "border border-white/10 bg-white/[0.04] text-text-primary hover:border-accent/35 hover:bg-white/[0.07]",
  ghost: "text-text-secondary hover:bg-white/5 hover:text-text-primary",
  danger:
    "border border-critical/40 bg-critical/5 text-critical hover:bg-critical/10",
} as const;

export type AppButtonVariant = keyof typeof variants;
export type AppButtonSize = keyof typeof sizes;

export function appButtonClass(
  variant: AppButtonVariant = "primary",
  className?: string,
  size: AppButtonSize = "md",
) {
  return cn(base, sizes[size], variants[variant], className);
}
