import { apiRoutes } from "@/shared/constants/api-routes";
import { getRefreshToken, setAuthCookies } from "@/shared/lib/auth/auth-server";
import { NextResponse } from "next/server";

export async function POST() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const res = await fetch(apiRoutes.refresh, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }

  const data = await res.json();
  await setAuthCookies(data.accessToken, data.refreshToken);

  return NextResponse.json({ success: true });
}
