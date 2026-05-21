import { apiRoutes } from "@/shared/constants/api-routes";
import { appRoutes } from "@/shared/constants/app-routes";
import {
  clearAuthCookies,
  getRefreshToken,
  setAuthCookiesOnResponse,
} from "@/shared/lib/auth/auth-server";
import { NextRequest, NextResponse } from "next/server";

// /publicapi/auth/refresh
export async function GET(req: NextRequest) {
  const refreshToken = await getRefreshToken();
  const returnTo = req.nextUrl.searchParams.get("returnTo") || appRoutes.home();

  console.log(
    `[/publicapi/auth/refresh] incoming refresh request — refreshToken(len=${refreshToken?.length || 0}) returnTo=${returnTo}`,
  );

  if (!refreshToken) {
    const redirectUrl = new URL(appRoutes.abs.login());
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
      const redirectUrl = new URL(appRoutes.abs.login());
      console.log(
        "[/publicapi/auth/refresh] - redirect to login - cant get new tokens",
        redirectUrl,
      );
      return NextResponse.redirect(redirectUrl);
    }

    const data = await res.json();

    const redirectUrl = new URL(returnTo, appRoutes.abs.home());
    console.log(
      "[/publicapi/auth/refresh] - success - got new tokens, setting cookies on response and redirecting back to",
      redirectUrl,
    );

    const response = NextResponse.redirect(redirectUrl);
    setAuthCookiesOnResponse(response, data.accessToken, data.refreshToken);
    return response;
  } catch (error) {
    console.error("Refresh token error:", error);
    await clearAuthCookies();

    return NextResponse.json(
      { message: "Internal Server Error Refresh token error" },
      { status: 500 },
    );
  }
}
