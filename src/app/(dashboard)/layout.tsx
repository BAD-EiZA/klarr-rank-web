import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { syncLocalUser } from "@/lib/api/server";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/scans", label: "Scans" },
  { href: "/rank-trackers", label: "Rank Tracker" },
  { href: "/account", label: "Account" },
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
    <div className="min-h-full flex flex-col md:flex-row">
      <aside className="border-b border-border bg-surface md:w-56 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-4 py-5 md:block">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Klarr Rank
          </Link>
          <p className="mt-1 hidden truncate text-xs text-text-secondary md:block">
            {label}
          </p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:pb-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-background hover:text-text-primary"
            >
              {item.label}
            </Link>
          ))}
          <LogoutLink className="rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-background hover:text-text-primary">
            Logout
          </LogoutLink>
        </nav>
      </aside>
      <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
    </div>
  );
}
