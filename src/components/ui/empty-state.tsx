import { cn } from "@/lib/utils";
import { SurfaceCard } from "@/components/ui/surface-card";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <SurfaceCard className={cn("p-8 text-center md:p-10", className)}>
      <p className="text-base font-semibold text-text-primary">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      ) : null}
      {action ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {action}
        </div>
      ) : null}
    </SurfaceCard>
  );
}
