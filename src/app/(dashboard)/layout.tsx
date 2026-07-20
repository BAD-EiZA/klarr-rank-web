import type { Metadata } from "next";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { SidebarNav } from "@/components/app/sidebar-nav";
import { syncLocalUser } from "@/lib/api/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

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
      <aside className="relative border-b border-border-subtle bg-surface/80 md:sticky md:top-0 md:h-screen md:w-60 md:border-b-0 md:border-r md:border-white/[0.06]">
        <div className="relative px-4 py-5">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F4C75] text-xs font-bold text-[#BBE1FA]">
              K
            </span>
            Klarr Rank
          </Link>
          <p className="mt-2 truncate rounded-full border border-white/[0.06] bg-background/60 px-2.5 py-1 text-xs text-text-muted">
            {label}
          </p>
        </div>
        <SidebarNav />
      </aside>
      <main className="relative flex-1 px-4 py-6 md:px-8 md:py-8">
        <div className="relative z-10 mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
