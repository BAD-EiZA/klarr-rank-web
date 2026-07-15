"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<"TOP" | "LEFT" | "BOTTOM" | "RIGHT">("TOP");

  useEffect(() => {
    if (!hovered) return;
    const rotate = () => {
      setDirection((prev) => {
        if (prev === "TOP") return "RIGHT";
        if (prev === "RIGHT") return "BOTTOM";
        if (prev === "BOTTOM") return "LEFT";
        return "TOP";
      });
    };
    const id = window.setInterval(rotate, 900);
    return () => window.clearInterval(id);
  }, [hovered]);

  const map = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, #a5b4fc 0%, rgba(255,255,255,0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #a5b4fc 0%, rgba(255,255,255,0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, #a5b4fc 0%, rgba(255,255,255,0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.2% at 100% 50%, #a5b4fc 0%, rgba(255,255,255,0) 100%)",
  };

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-border bg-surface/80 p-px transition duration-300",
        containerClassName,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-full opacity-70 transition-opacity duration-300"
        style={{ background: map[direction] }}
      />
      <div
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-medium",
          className,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
