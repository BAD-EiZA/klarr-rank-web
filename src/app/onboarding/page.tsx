import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { SurfaceCard } from "@/components/ui/surface-card";
import { OnboardingForm } from "@/features/onboarding/onboarding-form";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";

export default async function OnboardingPage() {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  let defaultName = "";
  let apiOffline = false;
  let completed = false;

  try {
    await serverApiFetch<ApiEnvelope<Record<string, unknown>>>("/auth/sync", {
      method: "POST",
    });
    const me = await serverApiFetch<
      ApiEnvelope<{
        onboardingCompleted?: boolean;
        displayName?: string | null;
      }>
    >("/me");
    completed = Boolean(me.data.onboardingCompleted);
    defaultName = me.data.displayName ?? "";
  } catch {
    apiOffline = true;
  }

  if (completed) {
    redirect("/dashboard");
  }

  return (
    <main className="relative flex min-h-full items-center justify-center overflow-hidden px-4 py-12">
      {apiOffline ? (
        <BackgroundBeams className="opacity-40" />
      ) : (
        <Spotlight className="-top-40 left-0" fill="#38BDF8" />
      )}
      <SurfaceCard className="relative z-10 w-full max-w-lg p-6 md:p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Onboarding</h1>
        <p className="mt-2 text-sm text-text-secondary">
          {apiOffline
            ? "API belum tersedia. Form tetap bisa diisi setelah backend online."
            : "Atur preferensi default untuk scan dan rank tracker."}
        </p>
        <OnboardingForm defaultName={defaultName} />
      </SurfaceCard>
    </main>
  );
}
