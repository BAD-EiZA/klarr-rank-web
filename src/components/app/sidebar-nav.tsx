"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconChart,
  IconHistory,
  IconLayout,
  IconLogout,
  IconRadar,
  IconSettings,
  IconShield,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: IconLayout },
  { href: "/scans", label: "Scans", icon: IconRadar },
  { href: "/history", label: "History", icon: IconHistory },
  { href: "/rank-trackers", label: "Rank Tracker", icon: IconChart },
  { href: "/account", label: "Account", icon: IconSettings },
  { href: "/admin", label: "Admin", icon: IconShield },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav
      className="relative flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:pb-4"
      aria-label="App"
    >
      {nav.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex min-h-[40px] items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-300",
              active
                ? "bg-surface-raised text-text-primary"
                : "text-text-secondary hover:bg-white/[0.04] hover:text-text-primary",
            )}
          >
            {active ? (
              <span
                className="absolute left-0 top-1/2 hidden h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent md:block"
                aria-hidden
              />
            ) : null}
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                active ? "text-accent" : "text-text-muted",
              )}
              aria-hidden
            />
            {item.label}
          </Link>
        );
      })}
      <LogoutLink
        className={cn(
          "flex min-h-[40px] items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium",
          "text-text-secondary transition-colors hover:bg-white/[0.04] hover:text-text-primary",
        )}
      >
        <IconLogout className="h-4 w-4 shrink-0 text-text-muted" aria-hidden />
        Logout
      </LogoutLink>
    </nav>
  );
}
