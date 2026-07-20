"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { appButtonClass } from "@/components/ui/app-button";
import { FormAlert } from "@/components/ui/form-alert";
import { Spinner } from "@/components/ui/spinner";
import { SurfaceCard } from "@/components/ui/surface-card";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type AiResponse = {
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
};

type ScanDetail = {
  id: string;
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
  artifact: {
    metadata: Record<string, unknown>;
    content: Record<string, unknown>;
    links: Record<string, unknown>;
    images: Record<string, unknown>;
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
    response: AiResponse | null;
  } | null;
};

export function ScanReport({ scan }: { scan: ScanDetail }) {
  const router = useRouter();
  const [reanalyzing, setReanalyzing] = useState(false);
  const [reanalyzeError, setReanalyzeError] = useState<string | null>(null);
  const meta = scan.artifact?.metadata ?? {};
  const failed = scan.issues.filter((i) => i.status === "FAIL");
  const ai = scan.ai?.response;
  const aiFailed =
    scan.status === "COMPLETED_WITH_AI_ERROR" || scan.ai?.status === "FAILED";

  useEffect(() => {
    track("report_viewed", {
      scan_id: scan.id,
      status: scan.status,
    });
  }, [scan.id, scan.status]);

  async function reanalyze() {
    setReanalyzing(true);
    setReanalyzeError(null);
    try {
      const res = await fetch(`/api/scans/${scan.id}/reanalyze`, {
        method: "POST",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Gagal reanalyze");
      }
      router.refresh();
    } catch (err) {
      setReanalyzeError(
        err instanceof Error ? err.message : "Gagal reanalyze",
      );
    } finally {
      setReanalyzing(false);
    }
  }

  return (
    <div className="space-y-6">
      {aiFailed ? (
        <SurfaceCard className="border-warning/30 p-4 text-sm">
          <p className="font-medium text-warning">AI summary tidak tersedia</p>
          <p className="mt-1 text-text-secondary">
            Laporan teknis tetap lengkap.
            {scan.ai?.errorCode ? ` (${scan.ai.errorCode})` : ""}
          </p>
          <button
            type="button"
            onClick={reanalyze}
            disabled={reanalyzing}
            className={cn(appButtonClass("secondary"), "mt-3")}
          >
            {reanalyzing ? (
              <>
                <Spinner /> Memproses…
              </>
            ) : (
              "Coba AI lagi"
            )}
          </button>
          <FormAlert className="mt-2">{reanalyzeError}</FormAlert>
        </SurfaceCard>
      ) : null}

      {ai?.summary ? (
        <SurfaceCard as="section" className="p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold">Ringkasan AI</h2>
            {ai.overallAssessment ? (
              <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-medium text-secondary">
                {ai.overallAssessment}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {ai.summary}
          </p>
          {ai.strengths && ai.strengths.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-text-secondary">
              {ai.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : null}
          {ai.priorityActions && ai.priorityActions.length > 0 ? (
            <div className="mt-5 space-y-3">
              <h3 className="text-sm font-semibold">Prioritas perbaikan</h3>
              <ol className="space-y-2.5">
                {ai.priorityActions.map((action) => (
                  <li
                    key={`${action.priority}-${action.issueCode}-${action.title}`}
                    className="rounded-xl border border-white/[0.06] border-l-2 border-l-accent bg-background p-3.5"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                      <span className="font-semibold text-text-primary">
                        #{action.priority}
                      </span>
                      <span>{action.issueCode}</span>
                      <span>{action.effort}</span>
                    </div>
                    <p className="mt-1 font-medium">{action.title}</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {action.recommendation}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      Dampak: {action.impact}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          {ai.disclaimer ? (
            <p className="mt-4 text-xs text-text-muted">{ai.disclaimer}</p>
          ) : null}
        </SurfaceCard>
      ) : null}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["SEO", scan.seoScore],
          ["Performance", scan.performanceScore],
          ["Accessibility", scan.accessibilityScore],
          ["Best Practices", scan.bestPracticesScore],
        ].map(([label, score]) => (
          <SurfaceCard key={String(label)} className="p-4">
            <p className="text-sm text-text-secondary">{label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
              {score ?? "—"}
            </p>
          </SurfaceCard>
        ))}
      </section>

      <section className="grid gap-3 sm:grid-cols-4">
        {[
          ["Critical", scan.criticalCount, "text-critical"],
          ["Warning", scan.warningCount, "text-warning"],
          ["Info", scan.infoCount, "text-info"],
          ["Passed", scan.passedCount, "text-success"],
        ].map(([label, count, tone]) => (
          <SurfaceCard key={String(label)} className="p-4">
            <p className="text-sm text-text-secondary">{label}</p>
            <p className={`mt-1 text-xl font-semibold tabular-nums ${tone}`}>
              {count}
            </p>
          </SurfaceCard>
        ))}
      </section>

      <SurfaceCard as="section" className="p-5 md:p-6">
        <h2 className="font-semibold">Metadata</h2>
        <dl className="mt-3 grid gap-3 text-sm md:grid-cols-2">
          <MetaItem label="Title" value={String(meta.title ?? "—")} />
          <MetaItem
            label="Description"
            value={String(meta.metaDescription ?? "—")}
          />
          <MetaItem label="Canonical" value={String(meta.canonical ?? "—")} />
          <MetaItem label="Robots" value={String(meta.robots ?? "—")} />
          <MetaItem label="Viewport" value={String(meta.viewport ?? "—")} />
          <MetaItem label="Word count" value={String(scan.wordCount ?? "—")} />
          <MetaItem
            label="Load time"
            value={scan.loadTimeMs != null ? `${scan.loadTimeMs} ms` : "—"}
          />
          <MetaItem label="Rule set" value={scan.ruleSetVersion} />
        </dl>
        <p className="mt-4 text-xs text-text-muted">
          Skor adalah penilaian Klarr Rank, bukan faktor ranking Google.
        </p>
      </SurfaceCard>

      <section className="space-y-3">
        <h2 className="font-semibold">Issues ({failed.length})</h2>
        {failed.length === 0 ? (
          <SurfaceCard className="p-5 text-sm text-text-secondary">
            Tidak ada issue gagal. Bagus.
          </SurfaceCard>
        ) : (
          <ul className="space-y-2.5">
            {failed.map((issue) => (
              <li key={issue.id}>
                <SurfaceCard
                  className="border-l-2 p-4"
                  style={
                    {
                      borderLeftColor:
                        issue.severity === "CRITICAL"
                          ? "var(--critical)"
                          : issue.severity === "WARNING"
                            ? "var(--warning)"
                            : "var(--info)",
                    } as React.CSSProperties
                  }
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Severity severity={issue.severity} />
                    <span className="text-xs text-text-muted">
                      {issue.category}
                    </span>
                    <span className="text-xs text-text-muted">
                      {issue.ruleCode}
                    </span>
                  </div>
                  <h3 className="mt-2 font-medium">{issue.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {issue.description}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium text-text-primary">
                      Perbaikan:{" "}
                    </span>
                    <span className="text-text-secondary">
                      {issue.technicalRecommendation}
                    </span>
                  </p>
                </SurfaceCard>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-text-muted">{label}</dt>
      <dd className="mt-0.5 break-words font-medium">{value}</dd>
    </div>
  );
}

function Severity({ severity }: { severity: string }) {
  const tone =
    severity === "CRITICAL"
      ? "bg-critical/15 text-critical"
      : severity === "WARNING"
        ? "bg-warning/15 text-warning"
        : "bg-info/15 text-info";
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tone}`}>
      {severity}
    </span>
  );
}
