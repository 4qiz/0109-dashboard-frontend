import { NextRequest, NextResponse } from "next/server";
import { appRoutes } from "./shared/constants/app-routes";

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const access = req.cookies.get("accessToken")?.value;
  const refresh = req.cookies.get("refreshToken")?.value;

  const isLoginPage = pathname === appRoutes.login;

  // если нет accessToken но есть refreshToken → обновляем
  if (!access && refresh) {
    const refreshUrl = new URL(appRoutes.apiRefresh, req.url);

    //refreshUrl.searchParams.set("returnTo", pathname + search);

    return NextResponse.redirect(refreshUrl);
  }

  // если нет токенов → login
  if (!access && !refresh && !isLoginPage) {
    return NextResponse.redirect(new URL(appRoutes.login, req.url));
  }

  // если авторизован и идёт на login → home
  if (access && isLoginPage) {
    return NextResponse.redirect(new URL(appRoutes.home(), req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip API, Next.js internals and all static files, unless found in search params
    "/((?!publicapi|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    //"/(api|trpc)(.*)",
  ],
};
