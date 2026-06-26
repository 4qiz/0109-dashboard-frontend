import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { UserDto } from "@/entities/user/auth-dto";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("auth-server");

export const ACCESS_COOKIE = "accessToken";
export const REFRESH_COOKIE = "refreshToken";
export const USER_COOKIE = "user";

// 5 минут
export const ACCESS_MAX_AGE = 60 * 10;

// 48 часов
export const REFRESH_MAX_AGE = 60 * 60 * 720;

export const setAuthCookies = async (
  access: string,
  refresh: string,
  accessExpiresAt?: string,
  refreshExpiresAt?: string,
) => {
  const cookieStore = await cookies();

  const accessMaxAge = accessExpiresAt
    ? Math.floor((new Date(accessExpiresAt).getTime() - Date.now()) / 1000)
    : ACCESS_MAX_AGE;
  const refreshMaxAge = refreshExpiresAt
    ? Math.floor((new Date(refreshExpiresAt).getTime() - Date.now()) / 1000)
    : REFRESH_MAX_AGE;

  logger.info("setAuthCookies called", {
    accessLength: access?.length || 0,
    refreshLength: refresh?.length || 0,
  });

  cookieStore.set(ACCESS_COOKIE, access, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: accessMaxAge,
  });

  cookieStore.set(REFRESH_COOKIE, refresh, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: refreshMaxAge,
  });
};

// Helper to set cookies directly on a NextResponse — useful to ensure Set-Cookie
// headers are included on redirect responses.
export const setAuthCookiesOnResponse = (
  res: NextResponse,
  access: string,
  refresh: string,
  accessExpiresAt?: string,
  refreshExpiresAt?: string,
) => {
  try {
    const accessMaxAge = accessExpiresAt
      ? Math.floor((new Date(accessExpiresAt).getTime() - Date.now()) / 1000)
      : ACCESS_MAX_AGE;
    const refreshMaxAge = refreshExpiresAt
      ? Math.floor((new Date(refreshExpiresAt).getTime() - Date.now()) / 1000)
      : REFRESH_MAX_AGE;

    logger.info("setAuthCookiesOnResponse called", {
      accessLength: access?.length || 0,
      refreshLength: refresh?.length || 0,
    });

    res.cookies.set(ACCESS_COOKIE, access, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: accessMaxAge,
    });

    res.cookies.set(REFRESH_COOKIE, refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: refreshMaxAge,
    });
  } catch (e) {
    logger.error("setAuthCookiesOnResponse error", e);
  }
};

export const getAccessToken = async () => {
  return (await cookies()).get(ACCESS_COOKIE)?.value;
};

export async function getAccessTokenServer() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_COOKIE)?.value;
}

export const getRefreshToken = async () => {
  return (await cookies()).get(REFRESH_COOKIE)?.value;
};

export const setUserData = async (user: UserDto) => {
  const cookieStore = await cookies();
  const userJson = JSON.stringify(user);

  logger.info("setUserData called", { login: user.login });

  cookieStore.set(USER_COOKIE, userJson, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
};

export const setUserDataOnResponse = (res: NextResponse, user: UserDto) => {
  try {
    const userJson = JSON.stringify(user);

    logger.info("setUserDataOnResponse called", { login: user.login });

    res.cookies.set(USER_COOKIE, userJson, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } catch (e) {
    logger.error("setUserDataOnResponse error", e);
  }
};

export const getUser = async (): Promise<UserDto | null> => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get(USER_COOKIE)?.value;

  if (!userCookie) {
    return null;
  }

  try {
    return JSON.parse(userCookie) as UserDto;
  } catch (e) {
    logger.error("Failed to parse user cookie", e);
    return null;
  }
};

export const clearUserData = async () => {
  const cookieStore = await cookies();
  logger.info("clearUserData called", { action: "deleting user cookie" });
  cookieStore.delete(USER_COOKIE);
};

export const clearUserDataOnResponse = (res: NextResponse) => {
  logger.info("clearUserDataOnResponse called", {
    action: "deleting user cookie",
  });
  res.cookies.set(USER_COOKIE, "", { path: "/", maxAge: 0 });
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  logger.info("clearAuthCookies called", { action: "deleting auth cookies" });
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
  cookieStore.delete(USER_COOKIE);
};

export const clearAuthCookiesOnResponse = (res: NextResponse) => {
  logger.info("clearAuthCookiesOnResponse called", {
    action: "deleting auth cookies",
  });
  res.cookies.set(ACCESS_COOKIE, "", { path: "/", maxAge: 0 });
  res.cookies.set(REFRESH_COOKIE, "", { path: "/", maxAge: 0 });
  res.cookies.set(USER_COOKIE, "", { path: "/", maxAge: 0 });
};
