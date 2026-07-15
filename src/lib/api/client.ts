const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/v1";

export type ApiError = {
  error: {
    code: string;
    message: string;
    details: unknown;
  };
  requestId: string;
};

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { accessToken?: string } = {},
): Promise<T> {
  const { accessToken, headers, ...rest } = init;
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      "content-type": "application/json",
      ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  });

  const body = (await res.json().catch(() => null)) as T | ApiError | null;
  if (!res.ok) {
    const err = body as ApiError | null;
    throw new Error(err?.error?.message ?? `API ${res.status}`);
  }
  return body as T;
}
