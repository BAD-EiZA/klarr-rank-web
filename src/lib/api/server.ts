import { getAccessToken } from "@/lib/auth/session";
import { getPublicApiUrl } from "@/lib/env";

export type ApiEnvelope<T> = {
  data: T;
  requestId?: string;
};

export async function serverApiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${getPublicApiUrl()}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
      ...init.headers,
    },
    cache: "no-store",
  });

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const message =
      body && typeof body === "object" && "error" in body
        ? (body as { error?: { message?: string } }).error?.message
        : undefined;
    throw new Error(message ?? `API ${res.status}`);
  }
  return body as T;
}

export async function syncLocalUser() {
  return serverApiFetch<ApiEnvelope<Record<string, unknown>>>("/auth/sync", {
    method: "POST",
  });
}
