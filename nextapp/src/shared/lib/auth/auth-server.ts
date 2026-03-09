import { cookies } from "next/headers";

const ACCESS_COOKIE = "accessToken";
const REFRESH_COOKIE = "refreshToken";

// 5 минут
const ACCESS_MAX_AGE = 60 * 5;

// 48 часов
const REFRESH_MAX_AGE = 60 * 60 * 72;

export const setAuthCookies = async (access: string, refresh: string) => {
  const cookieStore = await cookies();

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
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
};
