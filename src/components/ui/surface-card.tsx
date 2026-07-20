import { cn } from "@/lib/utils";

/** Dense app card — hairline border, neutral surface. */
export function SurfaceCard({
  children,
  className,
  style,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "section" | "article" | "ul" | "li";
}) {
  return (
    <Tag
      style={style}
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-surface",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
