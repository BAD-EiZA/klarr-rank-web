/** Ultra-light stroke icons (marketing + app shell). */

type IconProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconRadar({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <circle cx="10" cy="10" r="7.5" {...stroke} />
      <circle cx="10" cy="10" r="3.5" {...stroke} />
      <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2" {...stroke} />
    </svg>
  );
}

export function IconSpark({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <path d="M10 2.5l1.2 4.2L15.5 8l-4.3 1.3L10 13.5l-1.2-4.2L4.5 8l4.3-1.3L10 2.5z" {...stroke} />
      <path d="M15 12.5l.6 2.1 2.1.6-2.1.6-.6 2.1-.6-2.1-2.1-.6 2.1-.6.6-2.1z" {...stroke} />
    </svg>
  );
}

export function IconLock({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <rect x="4" y="9" width="12" height="8" rx="1.5" {...stroke} />
      <path d="M7 9V6.5a3 3 0 016 0V9" {...stroke} />
    </svg>
  );
}

export function IconChart({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <path d="M3 16.5V8.5M8 16.5V4.5M13 16.5v-6M18 16.5V7" {...stroke} />
    </svg>
  );
}

export function IconStore({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <path d="M3 8l1.5-4.5h11L17 8" {...stroke} />
      <path d="M3 8v8.5h14V8" {...stroke} />
      <path d="M8 16.5v-5h4v5" {...stroke} />
    </svg>
  );
}

export function IconUsers({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <circle cx="7" cy="7" r="2.5" {...stroke} />
      <path d="M2.5 16.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" {...stroke} />
      <circle cx="14" cy="7.5" r="2" {...stroke} />
      <path d="M13 12c1.8.3 3.5 1.6 3.5 4.5" {...stroke} />
    </svg>
  );
}

export function IconCode({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <path d="M6.5 5.5L2.5 10l4 4.5M13.5 5.5l4 4.5-4 4.5M11 4.5l-2 11" {...stroke} />
    </svg>
  );
}

export function IconLayout({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <rect x="3" y="3" width="6" height="6" rx="1" {...stroke} />
      <rect x="11" y="3" width="6" height="6" rx="1" {...stroke} />
      <rect x="3" y="11" width="6" height="6" rx="1" {...stroke} />
      <rect x="11" y="11" width="6" height="6" rx="1" {...stroke} />
    </svg>
  );
}

export function IconHistory({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <circle cx="10" cy="10" r="7" {...stroke} />
      <path d="M10 6v4.5l3 1.5" {...stroke} />
    </svg>
  );
}

export function IconSettings({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <circle cx="10" cy="10" r="2.5" {...stroke} />
      <path
        d="M10 3.5v1.5M10 15v1.5M3.5 10h1.5M15 10h1.5M5.4 5.4l1.1 1.1M13.5 13.5l1.1 1.1M14.6 5.4l-1.1 1.1M6.5 13.5l-1.1 1.1"
        {...stroke}
      />
    </svg>
  );
}

export function IconShield({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <path d="M10 2.5l6 2.5v5c0 3.5-2.5 5.5-6 7.5-3.5-2-6-4-6-7.5V5l6-2.5z" {...stroke} />
    </svg>
  );
}

export function IconLogout({ className, ...props }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" {...props}>
      <path d="M8 4H4.5A1.5 1.5 0 003 5.5v9A1.5 1.5 0 004.5 16H8" {...stroke} />
      <path d="M12 13.5L16 10l-4-3.5M16 10H8" {...stroke} />
    </svg>
  );
}
