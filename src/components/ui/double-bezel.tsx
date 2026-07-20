import { cn } from "@/lib/utils";

/** Nested shell: outer tray + inner core. */
export function DoubleBezel({
  children,
  className,
  shellClassName,
  coreClassName,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  shellClassName?: string;
  coreClassName?: string;
  as?: "div" | "article" | "section";
}) {
  return (
    <Tag
      className={cn(
        "rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-1.5",
        "shadow-[0_20px_60px_rgba(0,0,0,0.22)]",
        shellClassName,
        className,
      )}
    >
      <div
        className={cn(
          "rounded-[calc(2rem-0.375rem)] border border-white/[0.06] bg-surface",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]",
          coreClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
