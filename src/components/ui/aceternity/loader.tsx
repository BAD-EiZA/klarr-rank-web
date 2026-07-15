"use client";

import { cn } from "@/lib/utils";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)} aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-bounce rounded-full bg-accent"
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}
