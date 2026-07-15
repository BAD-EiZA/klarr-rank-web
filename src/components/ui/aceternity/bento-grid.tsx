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
        "mx-auto grid max-w-6xl grid-cols-1 gap-4 md:auto-rows-[minmax(11rem,auto)] md:grid-cols-3",
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
        "group/bento row-span-1 flex flex-col justify-between space-y-3 rounded-2xl border border-border bg-surface p-4 transition duration-200 hover:border-accent/40 hover:bg-surface-raised",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-0.5">
        {icon}
        <div className="mt-2 mb-1 text-base font-semibold text-text-primary">
          {title}
        </div>
        <div className="text-[15px] leading-relaxed text-text-secondary">
          {description}
        </div>
      </div>
    </div>
  );
}
