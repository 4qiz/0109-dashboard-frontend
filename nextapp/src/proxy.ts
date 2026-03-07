import { appRoutes } from "@/shared/constants/app-routes";
import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const access = req.cookies.get("accessToken")?.value;

  const isLoginPage = pathname === appRoutes.login;
  const isApiRoute = pathname.startsWith("/api");
  const isNextInternal = pathname.startsWith("/_next");

  // пропускаем api и внутренние next маршруты
  if (isApiRoute || isNextInternal) {
    return NextResponse.next();
  }

  // если не авторизован и не на login → редирект
  if (!access && !isLoginPage) {
    return NextResponse.redirect(new URL(appRoutes.login, req.url));
  }

  // если авторизован и пытается зайти на login → домой
  if (access && isLoginPage) {
    return NextResponse.redirect(new URL(appRoutes.home(), req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
