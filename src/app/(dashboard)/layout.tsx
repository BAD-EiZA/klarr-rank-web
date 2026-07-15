import Link from "next/link";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/scans", label: "Scans" },
  { href: "/rank-trackers", label: "Rank Tracker" },
  { href: "/account", label: "Account" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col md:flex-row">
      <aside className="border-b border-border bg-surface md:w-56 md:border-b-0 md:border-r">
        <div className="px-4 py-5">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Klarr Rank
          </Link>
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
        </nav>
      </aside>
      <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
    </div>
  );
}
