import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth/session";
import { getPublicApiUrl } from "@/lib/env";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await context.params;
  const res = await fetch(`${getPublicApiUrl()}/scans/${id}/status`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? "Failed to get status" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
