export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Ringkasan scan, kuota, dan pergerakan ranking.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Scans selesai", "—"],
          ["Sisa scan hari ini", "—"],
          ["Keyword aktif", "—"],
          ["Rata-rata posisi", "—"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow)]"
          >
            <p className="text-sm text-text-secondary">{label}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-semibold">Mulai audit pertama</h2>
        <p className="mt-2 max-w-lg text-sm text-text-secondary">
          Auth Kinde, Browserbase, dan pipeline scan menyusul di fase berikutnya.
          Shell dashboard ini siap untuk dihubungkan ke API.
        </p>
      </div>
    </div>
  );
}
