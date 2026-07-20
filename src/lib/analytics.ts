export type AnalyticsProps = Record<
  string,
  string | number | boolean | null | undefined
>;

const FORBIDDEN_KEY =
  /token|password|secret|authorization|cookie|html|prompt|ssn/i;

function sanitize(props?: AnalyticsProps): Record<string, string | number | boolean> {
  if (!props) return {};
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(props)) {
    if (FORBIDDEN_KEY.test(key)) continue;
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && value.length > 200) {
      out[key] = value.slice(0, 200);
      continue;
    }
    out[key] = value;
  }
  return out;
}

/**
 * No third-party vendor. Pushes to dataLayer (if present) and dispatches
 * `klarr:analytics`. Enable console with NEXT_PUBLIC_ANALYTICS_DEBUG=1.
 */
export function track(event: string, props?: AnalyticsProps) {
  if (typeof window === "undefined") return;
  if (!event || typeof event !== "string") return;

  const payload = {
    event,
    props: sanitize(props),
    ts: Date.now(),
  };

  try {
    const w = window as Window & {
      dataLayer?: Array<Record<string, unknown>>;
    };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event, ...payload.props, ts: payload.ts });
    window.dispatchEvent(
      new CustomEvent("klarr:analytics", { detail: payload }),
    );
    if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "1") {
      console.debug("[analytics]", payload);
    }
  } catch {
    // never block UX
  }
}
