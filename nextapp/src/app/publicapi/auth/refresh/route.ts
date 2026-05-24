import { apiRoutes } from "@/shared/constants/api-routes";
import { appRoutes } from "@/shared/constants/app-routes";
import {
  getRefreshToken,
  setAuthCookiesOnResponse,
  setUserDataOnResponse,
} from "@/shared/lib/auth/auth-server";

import {
  getRefreshLock,
  setRefreshLock,
  clearRefreshLock,
} from "@/shared/lib/auth/refresh-lock";

import type { AuthResponseDto } from "@/entities/user/auth-dto";

import { NextRequest, NextResponse } from "next/server";

async function performRefresh(refreshToken: string): Promise<AuthResponseDto> {
  const res = await fetch(apiRoutes.refresh, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Refresh failed ${res.status}`);
  }

  return res.json();
}

export async function GET(req: NextRequest) {
  const refreshToken = await getRefreshToken();

  const returnTo = req.nextUrl.searchParams.get("returnTo") || appRoutes.home();

  if (!refreshToken) {
    return NextResponse.redirect(new URL(appRoutes.abs.login()));
  }

  try {
    let refreshPromise = getRefreshLock(refreshToken);

    if (!refreshPromise) {
      refreshPromise = performRefresh(refreshToken).finally(() => {
        clearRefreshLock(refreshToken);
      });

      setRefreshLock(refreshToken, refreshPromise);
    }

    const data = await refreshPromise;

    const redirectUrl = new URL(returnTo, appRoutes.abs.home());

    const response = NextResponse.redirect(redirectUrl);

    setAuthCookiesOnResponse(
      response,
      data.accessToken.token,
      data.refreshToken.token,
      data.accessToken.expiresAt,
      data.refreshToken.expiresAt,
    );

    setUserDataOnResponse(response, data.user);

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate",
    );
    return response;
  } catch (e) {
    console.error("[refresh] failed", e);

    return NextResponse.redirect(new URL(appRoutes.abs.login()));
  }
}
