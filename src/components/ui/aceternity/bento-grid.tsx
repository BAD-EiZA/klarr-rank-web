import { cn } from "@/lib/utils";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl grid-cols-1 gap-4 md:auto-rows-[minmax(12rem,auto)] md:grid-cols-6 md:gap-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between",
        "rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-1.5",
        "shadow-[0_20px_60px_rgba(0,0,0,0.22)]",
        "transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "hover:-translate-y-0.5",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col justify-between space-y-3 rounded-[calc(2rem-0.375rem)] border border-white/[0.06] bg-surface p-4",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]",
          "transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "group-hover/bento:border-accent/25 group-hover/bento:bg-surface-raised",
        )}
      >
        {header}
        <div className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/bento:translate-x-0.5">
          {icon}
          <div className="mt-2 mb-1 text-base font-semibold text-text-primary">
            {title}
          </div>
          <div className="text-[15px] leading-relaxed text-text-secondary">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
