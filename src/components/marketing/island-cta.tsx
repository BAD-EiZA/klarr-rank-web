import { cn } from "@/lib/utils";

const base =
  "group inline-flex min-h-[48px] items-center gap-2 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants = {
  primary:
    "bg-accent text-accent-foreground shadow-[0_0_28px_rgba(56,189,248,0.2)] hover:bg-accent-hover",
  secondary:
    "border border-white/10 bg-white/[0.04] text-text-primary hover:border-accent/40 hover:bg-white/[0.07]",
  ghost: "text-text-secondary hover:text-text-primary",
} as const;

function TrailingIcon({ tone }: { tone: "primary" | "secondary" | "ghost" }) {
  return (
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
        tone === "primary" && "bg-black/10",
        tone === "secondary" && "bg-white/10",
        tone === "ghost" && "bg-white/5",
      )}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M3 11L11 3M11 3H5.5M11 3V8.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function islandCtaClass(
  variant: keyof typeof variants = "primary",
  className?: string,
) {
  return cn(base, variants[variant], className);
}

export function IslandCtaContent({
  children,
  showIcon = true,
  variant = "primary",
}: {
  children: React.ReactNode;
  showIcon?: boolean;
  variant?: keyof typeof variants;
}) {
  return (
    <>
      <span className="pr-1">{children}</span>
      {showIcon ? <TrailingIcon tone={variant} /> : null}
    </>
  );
}

export { variants as islandCtaVariants };
