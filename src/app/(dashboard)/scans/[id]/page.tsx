import Link from "next/link";
import { notFound } from "next/navigation";
import { SurfaceCard } from "@/components/ui/surface-card";
import { serverApiFetch, type ApiEnvelope } from "@/lib/api/server";
import { ScanProgress } from "@/features/scans/scan-progress";
import { ScanReport } from "@/features/scans/scan-report";

type ScanDetail = {
  id: string;
  domain: string;
  requestedUrl: string;
  normalizedUrl: string;
  finalUrl: string | null;
  status: string;
  overallScore: number | null;
  seoScore: number | null;
  performanceScore: number | null;
  accessibilityScore: number | null;
  bestPracticesScore: number | null;
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  passedCount: number;
  loadTimeMs: number | null;
  wordCount: number | null;
  ruleSetVersion: string;
  errorCode: string | null;
  errorMessage: string | null;
  createdAt: string;
  completedAt: string | null;
  artifact: {
    metadata: Record<string, unknown>;
    content: Record<string, unknown>;
    links: Record<string, unknown>;
    images: Record<string, unknown>;
    performance: Record<string, unknown>;
  } | null;
  issues: Array<{
    id: string;
    ruleCode: string;
    category: string;
    severity: string;
    status: string;
    title: string;
    description: string;
    technicalRecommendation: string;
    scoreImpact: number;
  }>;
  ai: {
    status: string;
    model: string;
    errorCode?: string | null;
    response: {
      summary?: string;
      strengths?: string[];
      priorityActions?: Array<{
        issueCode: string;
        priority: number;
        title: string;
        impact: string;
        recommendation: string;
        effort: string;
      }>;
      overallAssessment?: string;
      disclaimer?: string;
    } | null;
  } | null;
};

export default async function ScanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let scan: ScanDetail | null = null;
  try {
    const res = await serverApiFetch<ApiEnvelope<ScanDetail>>(`/scans/${id}`);
    scan = res.data;
  } catch {
    notFound();
  }

  if (!scan) notFound();

  const done =
    scan.status === "COMPLETED" ||
    scan.status === "COMPLETED_WITH_AI_ERROR" ||
    scan.status === "FAILED";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-text-muted">
            <Link
              href="/scans"
              className="hover:text-text-primary hover:underline"
            >
              Scans
            </Link>{" "}
            / {scan.domain}
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight md:text-3xl">
            {scan.domain}
          </h1>
          <p className="mt-1.5 break-all text-sm text-text-secondary">
            {scan.finalUrl ?? scan.normalizedUrl}
          </p>
        </div>
        {done && scan.overallScore != null ? (
          <SurfaceCard className="min-w-[5.5rem] px-5 py-3 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
              Overall
            </p>
            <p className="text-3xl font-semibold tabular-nums tracking-tight">
              {scan.overallScore}
            </p>
          </SurfaceCard>
        ) : null}
      </div>

      {!done ? (
        <ScanProgress scanId={scan.id} initialStatus={scan.status} />
      ) : scan.status === "FAILED" ? (
        <SurfaceCard className="border-critical/30 p-5">
          <h2 className="font-semibold text-critical">Scan gagal</h2>
          <p className="mt-2 text-sm text-text-secondary">
            {scan.errorCode}: {scan.errorMessage}
          </p>
        </SurfaceCard>
      ) : (
        <ScanReport scan={scan} />
      )}
    </div>
  );
}
