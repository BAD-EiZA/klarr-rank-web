import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && "max-w-xl text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]",
          eyebrow && "mt-4",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-lg leading-relaxed text-text-secondary">{lead}</p>
      ) : null}
    </div>
  );
}
