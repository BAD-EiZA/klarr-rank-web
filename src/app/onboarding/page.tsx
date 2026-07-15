import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OnboardingForm } from "@/features/onboarding/onboarding-form";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";

export default async function OnboardingPage() {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  try {
    await serverApiFetch<ApiEnvelope<Record<string, unknown>>>("/auth/sync", {
      method: "POST",
    });
    const me = await serverApiFetch<
      ApiEnvelope<{ onboardingCompleted?: boolean; displayName?: string | null }>
    >("/me");
    if (me.data.onboardingCompleted) {
      redirect("/dashboard");
    }
    return (
      <main className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-center px-4 py-12">
        <h1 className="text-2xl font-semibold tracking-tight">Onboarding</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Atur preferensi default untuk scan dan rank tracker.
        </p>
        <OnboardingForm defaultName={me.data.displayName ?? ""} />
      </main>
    );
  } catch {
    return (
      <main className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-center px-4 py-12">
        <h1 className="text-2xl font-semibold tracking-tight">Onboarding</h1>
        <p className="mt-2 text-sm text-text-secondary">
          API belum tersedia. Form tetap bisa diisi setelah backend online.
        </p>
        <OnboardingForm defaultName="" />
      </main>
    );
  }
}
