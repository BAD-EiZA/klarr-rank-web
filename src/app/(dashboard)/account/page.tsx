import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";
import { AccountPreferencesForm } from "@/features/account/preferences-form";

type MeData = {
  displayName?: string | null;
  email?: string | null;
  preference?: {
    locale: string;
    defaultCountryCode: string;
    defaultLanguageCode: string;
    defaultDevice: string;
    theme: string;
  } | null;
  subscription?: {
    planCode: string;
    status: string;
    currentPeriodEnd?: string | null;
  } | null;
};

type UsageData = {
  planCode: string;
  usage: {
    scansToday: number;
    scansRemainingToday: number;
    keywordsActive: number;
    keywordsRemaining: number;
  };
  entitlements: {
    scanLimitPerDay: number;
    keywordLimit: number;
  };
};

export default async function AccountPage() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  let me: MeData | null = null;
  let usage: UsageData | null = null;
  try {
    const [meRes, usageRes] = await Promise.all([
      serverApiFetch<ApiEnvelope<MeData>>("/me"),
      serverApiFetch<ApiEnvelope<UsageData>>("/me/usage"),
    ]);
    me = meRes.data;
    usage = usageRes.data;
  } catch {
    // ignore
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Akun</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Profil, preferensi, dan paket.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-semibold">Profil</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Nama</dt>
            <dd className="font-medium">
              {me?.displayName || kindeUser?.given_name || "—"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Email</dt>
            <dd className="font-medium">
              {me?.email || kindeUser?.email || "—"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Plan</dt>
            <dd className="font-medium">
              {me?.subscription?.planCode ?? usage?.planCode ?? "FREE"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Status langganan</dt>
            <dd className="font-medium">
              {me?.subscription?.status ?? "FREE"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-semibold">Kuota</h2>
        <ul className="mt-3 space-y-2 text-sm text-text-secondary">
          <li>
            Scan hari ini: {usage?.usage.scansToday ?? "—"} /{" "}
            {usage?.entitlements.scanLimitPerDay ?? "—"} (sisa{" "}
            {usage?.usage.scansRemainingToday ?? "—"})
          </li>
          <li>
            Keyword: {usage?.usage.keywordsActive ?? "—"} /{" "}
            {usage?.entitlements.keywordLimit ?? "—"}
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-semibold">Preferensi</h2>
        <AccountPreferencesForm
          defaults={{
            displayName: me?.displayName ?? "",
            locale: me?.preference?.locale ?? "id",
            defaultCountryCode: me?.preference?.defaultCountryCode ?? "ID",
            defaultDevice: me?.preference?.defaultDevice ?? "DESKTOP",
            theme: me?.preference?.theme ?? "SYSTEM",
          }}
        />
      </section>

      <section className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-semibold">Keamanan</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Login dikelola oleh Kinde. Logout mengakhiri sesi aplikasi.
        </p>
        <LogoutLink className="mt-4 inline-flex rounded-lg border border-border px-4 py-2 text-sm font-medium">
          Logout
        </LogoutLink>
      </section>
    </div>
  );
}
