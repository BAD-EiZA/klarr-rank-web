import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  IconChartBar,
  IconHistory,
  IconLayoutDashboard,
  IconRadar2,
  IconSettings,
  IconShield,
} from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { syncLocalUser } from "@/lib/api/server";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { href: "/scans", label: "Scans", icon: IconRadar2 },
  { href: "/history", label: "History", icon: IconHistory },
  { href: "/rank-trackers", label: "Rank Tracker", icon: IconChartBar },
  { href: "/account", label: "Account", icon: IconSettings },
  { href: "/admin", label: "Admin", icon: IconShield },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const kindeUser = await getUser();
  type LocalUser = {
    displayName?: string | null;
    email?: string | null;
    onboardingCompleted?: boolean;
  };
  let localUser: LocalUser | null = null;

  try {
    const synced = await syncLocalUser();
    localUser = synced.data as unknown as LocalUser;
  } catch {
    // API may be offline during local UI work; shell still renders.
  }

  if (localUser && localUser.onboardingCompleted === false) {
    redirect("/onboarding");
  }

  const label =
    localUser?.displayName ||
    kindeUser?.given_name ||
    kindeUser?.email ||
    "Account";

  return (
    <div className="min-h-full bg-background md:flex">
      <aside className="relative border-b border-border bg-surface/90 backdrop-blur md:sticky md:top-0 md:h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="relative px-4 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-xs font-bold text-brand-soft ring-1 ring-brand-mid">
              K
            </span>
            Klarr Rank
          </Link>
          <p className="mt-1 truncate text-xs text-text-secondary">{label}</p>
        </div>
        <nav className="relative flex gap-1 overflow-x-auto px-2 pb-4 md:flex-col md:pb-6">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-text-secondary transition hover:bg-background hover:text-text-primary"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
          <LogoutLink className="rounded-xl px-3 py-2 text-sm text-text-secondary transition hover:bg-background hover:text-text-primary">
            Logout
          </LogoutLink>
        </nav>
      </aside>
      <main className="relative flex-1 px-4 py-6 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-25 [mask-image:radial-gradient(ellipse_at_top,white,transparent_70%)]" />
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}
