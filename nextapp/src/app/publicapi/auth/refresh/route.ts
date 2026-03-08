import { apiRoutes } from "@/shared/constants/api-routes";
import { appRoutes } from "@/shared/constants/app-routes";
import { getRefreshToken, setAuthCookies } from "@/shared/lib/auth/auth-server";
import { NextRequest, NextResponse } from "next/server";

// /api/auth/refresh
export async function GET(req: NextRequest) {
  const refreshToken = await getRefreshToken();
  const returnTo = req.nextUrl.searchParams.get("returnTo") || appRoutes.home();

  if (!refreshToken) {
    return NextResponse.redirect(new URL(appRoutes.login, req.url));
  }

  try {
    const res = await fetch(apiRoutes.refresh, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL(appRoutes.login, req.url));
    }

    const data = await res.json();

    const response = NextResponse.redirect(new URL(returnTo, req.url));

    await setAuthCookies(data.accessToken, data.refreshToken);

    return response;
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.redirect(new URL(appRoutes.login, req.url));
  }
}
