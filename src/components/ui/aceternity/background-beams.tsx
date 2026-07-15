"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
  ];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]",
        className,
      )}
    >
      <svg
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke={`url(#beam-${i})`}
            strokeOpacity="0.35"
            strokeWidth="0.5"
            initial={{ pathLength: 0.2, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
        <defs>
          {paths.map((_, i) => (
            <linearGradient
              key={i}
              id={`beam-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop stopColor="#818cf8" stopOpacity="0" />
              <stop offset="0.5" stopColor="#a5b4fc" />
              <stop offset="1" stopColor="#c4b5fd" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}
