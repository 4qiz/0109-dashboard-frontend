"use server";

import { apiRoutes } from "@/shared/constants/api-routes";
import { appRoutes } from "@/shared/constants/app-routes";
import { setAuthCookies } from "@/shared/lib/auth/auth-server";
import { redirect } from "next/navigation";

function getRedirectUrl(message: string): string {
  return `${appRoutes.login}?error=${encodeURIComponent(message)}`;
}

export type LoginState = {
  error?: string;
  login?: string;
  password?: string;
};

export async function login(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const login = formData.get("login")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  console.log("login in, login:", login);

  if (!login || !password) {
    return {
      error: "Укажите логин и пароль",
      login,
      password,
    };
  }

  const res = await fetch(apiRoutes.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      error: "Неверный логин или пароль",
      login,
      password,
    };
  }

  const data = await res.json();

  if (!data?.accessToken || !data?.refreshToken) {
    return {
      error: "Сервер не мяукает((",
      login,
      password,
    };
  }

  await setAuthCookies(data.accessToken, data.refreshToken);

  redirect(appRoutes.home());
}
