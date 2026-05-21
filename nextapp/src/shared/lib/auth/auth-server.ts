import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ACCESS_COOKIE = "accessToken";
export const REFRESH_COOKIE = "refreshToken";

// 5 минут
export const ACCESS_MAX_AGE = 60 * 10;

// 48 часов
export const REFRESH_MAX_AGE = 60 * 60 * 720;

export const setAuthCookies = async (access: string, refresh: string) => {
  const cookieStore = await cookies();

  console.log(
    `[auth-server] setAuthCookies called — access(len=${access?.length || 0}) refresh(len=${refresh?.length || 0})`,
  );

  cookieStore.set(ACCESS_COOKIE, access, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });

  cookieStore.set(REFRESH_COOKIE, refresh, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: REFRESH_MAX_AGE,
  });
};

// Helper to set cookies directly on a NextResponse — useful to ensure Set-Cookie
// headers are included on redirect responses.
export const setAuthCookiesOnResponse = (
  res: NextResponse,
  access: string,
  refresh: string,
) => {
  try {
    console.log(
      `[auth-server] setAuthCookiesOnResponse — access(len=${access?.length || 0}) refresh(len=${refresh?.length || 0})`,
    );

    res.cookies.set(ACCESS_COOKIE, access, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_MAX_AGE,
    });

    res.cookies.set(REFRESH_COOKIE, refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_MAX_AGE,
    });
  } catch (e) {
    console.error("[auth-server] setAuthCookiesOnResponse error:", e);
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

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  console.log("[auth-server] clearAuthCookies called — deleting auth cookies");
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
};

export const clearAuthCookiesOnResponse = (res: NextResponse) => {
  console.log(
    "[auth-server] clearAuthCookiesOnResponse called — deleting auth cookies",
  );
  res.cookies.set(ACCESS_COOKIE, "", { path: "/", maxAge: 0 });
  res.cookies.set(REFRESH_COOKIE, "", { path: "/", maxAge: 0 });
};
