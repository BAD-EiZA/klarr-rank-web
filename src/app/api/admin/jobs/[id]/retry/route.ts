import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth/session";
import { getPublicApiUrl } from "@/lib/env";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { id } = await context.params;
  const res = await fetch(`${getPublicApiUrl()}/admin/jobs/${id}/retry`, {
    method: "POST",
    headers: { authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? "Failed" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
