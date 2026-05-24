import { apiRoutes } from "@/shared/constants/api-routes";
import { appRoutes } from "@/shared/constants/app-routes";
import {
  clearAuthCookiesOnResponse,
  getRefreshToken,
  setAuthCookiesOnResponse,
  setUserDataOnResponse,
} from "@/shared/lib/auth/auth-server";
import type { AuthResponseDto } from "@/entities/user/auth-dto";
import { NextRequest, NextResponse } from "next/server";

// /publicapi/auth/refresh
export async function GET(req: NextRequest) {
  const refreshToken = await getRefreshToken();
  const returnTo = req.nextUrl.searchParams.get("returnTo") || appRoutes.home();

  if (!refreshToken) {
    console.log(
      "[/publicapi/auth/refresh] - redirect to login - no refresh",
      appRoutes.abs.login(),
    );
    return NextResponse.redirect(new URL(appRoutes.abs.login()));
  }

  try {
    const res = await fetch(apiRoutes.refresh, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    // Если бэкэнд ответил ошибкой (токен невалиден)
    if (!res.ok) {
      const response = NextResponse.redirect(new URL(appRoutes.abs.login()));
      // Идемпотентно очищаем куки именно на объекте ответа, который улетит в браузер
      clearAuthCookiesOnResponse(response);
      console.log(
        "[/publicapi/auth/refresh] - redirect to login - cant get new tokens",
        response,
      );
      return response;
    }

    const data: AuthResponseDto = await res.json();
    const redirectUrl = new URL(returnTo, appRoutes.abs.home());
    const response = NextResponse.redirect(redirectUrl);

    // Устанавливаем куки ОДИН раз и только на объект ответа
    setAuthCookiesOnResponse(
      response,
      data.accessToken.token,
      data.refreshToken.token,
      data.accessToken.expiresAt,
      data.refreshToken.expiresAt,
    );
    setUserDataOnResponse(response, data.user);
    console.log(
      "[/publicapi/auth/refresh] - success - got new tokens, setting cookies on response and redirecting back to",
      redirectUrl,
    );
    return response;
  } catch (error) {
    console.error("Refresh token error:", error);

    // При 500 ошибке сервера мы можем просто вернуть JSON,
    // но если нужно стереть куки — стираем их на объекте ответа
    const response = NextResponse.json(
      { message: "Internal Server Error Refresh token error" },
      { status: 500 },
    );
    //clearAuthCookiesOnResponse(response);
    return response;
  }
}
