import { NextRequest, NextResponse } from "next/server";
import { appRoutes } from "./shared/constants/app-routes";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("proxy");

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const access = req.cookies.get("accessToken")?.value;
  const refresh = req.cookies.get("refreshToken")?.value;

  logger.info("incoming request", {
    path: pathname,
    accessLength: access?.length || 0,
    refreshLength: refresh?.length || 0,
  });

  const isLoginPage = pathname === appRoutes.login;

  if (!access && refresh) {
    const returnTo = pathname + search;
    const url =
      appRoutes.abs.refresh() + "?returnTo=" + encodeURIComponent(returnTo);
    logger.info("redirect to refresh", { url });
    return NextResponse.redirect(url);
  }

  if (!access && !refresh && !isLoginPage) {
    const url = appRoutes.abs.login();
    logger.info("redirect to login", { reason: "no access, no refresh", url });
    return NextResponse.redirect(url);
  }

  if (access && isLoginPage) {
    const url = appRoutes.abs.home();
    logger.info("redirect to home", { reason: "access and login page", url });
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
