import { apiRoutes } from "@/shared/constants/api-routes";
import { appRoutes } from "@/shared/constants/app-routes";
import {
  clearAuthCookies,
  getRefreshToken,
  setAuthCookies,
} from "@/shared/lib/auth/auth-server";
import { NextRequest, NextResponse } from "next/server";

// /publicapi/auth/refresh
export async function GET(req: NextRequest) {
  const refreshToken = await getRefreshToken();
  const returnTo = req.nextUrl.searchParams.get("returnTo") || appRoutes.home();

  if (!refreshToken) {
    const redirectUrl = new URL(appRoutes.login, req.url);
    console.log(
      "[/publicapi/auth/refresh] - redirect to login - no refresh",
      redirectUrl,
    );

    return NextResponse.redirect(redirectUrl);
  }

  try {
    const res = await fetch(apiRoutes.refresh, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!res.ok) {
      await clearAuthCookies();
      const redirectUrl = new URL(appRoutes.login, req.url);
      console.log(
        "[/publicapi/auth/refresh] - redirect to login - cant get new tokens",
        redirectUrl,
      );
      return NextResponse.redirect(redirectUrl);
    }

    const data = await res.json();
    await setAuthCookies(data.accessToken, data.refreshToken);

    const redirectUrl = new URL(returnTo, req.url);
    console.log(
      "[/publicapi/auth/refresh] - success - get new tokens, redirect back",
      redirectUrl,
    );
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Refresh token error:", error);
    await clearAuthCookies();
    const redirectUrl = new URL(appRoutes.login, req.url);

    return NextResponse.redirect(redirectUrl);
  }
}
