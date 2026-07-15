import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth/session";
import { getPublicApiUrl } from "@/lib/env";

export async function PATCH(request: Request) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const res = await fetch(`${getPublicApiUrl()}/me`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      {
        error:
          data?.error?.message ?? "Failed to update profile",
      },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
