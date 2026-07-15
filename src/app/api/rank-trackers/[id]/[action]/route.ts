import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth/session";
import { getPublicApiUrl } from "@/lib/env";

const ALLOWED = new Set(["refresh", "pause", "resume"]);

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string; action: string }> },
) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id, action } = await context.params;
  if (!ALLOWED.has(action)) {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  const res = await fetch(
    `${getPublicApiUrl()}/rank-trackers/${id}/${action}`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${accessToken}` },
    },
  );
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? "Action failed" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
