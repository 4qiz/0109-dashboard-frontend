import { NextRequest, NextResponse } from "next/server";
import { appRoutes } from "./shared/constants/app-routes";

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const access = req.cookies.get("accessToken")?.value;
  const refresh = req.cookies.get("refreshToken")?.value;

  const isLoginPage = pathname === appRoutes.login;

  if (!access && refresh) {
    const url = req.nextUrl.clone();
    url.pathname = appRoutes.apiRefresh;
    url.searchParams.set("returnTo", pathname + search);
    console.log(
      "[proxy] - redirect to refresh (no access, yes refresh) -",
      url,
    );
    return NextResponse.redirect(url);
  }

  if (!access && !refresh && !isLoginPage) {
    const url = req.nextUrl.clone();
    url.pathname = appRoutes.login;
    console.log("[proxy] - redirect to login - no access, no refresh", url);
    return NextResponse.redirect(url);
  }

  if (access && isLoginPage) {
    const url = req.nextUrl.clone();
    url.pathname = appRoutes.home();
    console.log(
      "[proxy] - redirect to home - with access try to open login page",
      url,
    );
    return NextResponse.redirect(url);
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
