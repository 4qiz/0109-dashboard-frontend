"use server";

import { apiRoutes } from "@/shared/constants/api-routes";
import { appRoutes } from "@/shared/constants/app-routes";
import { setAuthCookies, setUserData } from "@/shared/lib/auth/auth-server";
import { redirect } from "next/navigation";
import type { AuthResponseDto } from "@/entities/user/auth-dto";
import { createLogger } from "@/shared/lib/logger";

export type LoginState = {
  error?: string;
  login?: string;
  password?: string;
};

const logger = createLogger("login-action");

export async function login(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const login = formData.get("login")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  logger.info("Attempting login", { login });

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
    console.error("Login failed with status", res);
    return {
      error: "Неверный логин или пароль",
      login,
      password,
    };
  }

  const data: AuthResponseDto = await res.json();

  if (!data?.accessToken?.token || !data?.refreshToken?.token) {
    return {
      error: "Сервер не мяукает((",
      login,
      password,
    };
  }

  await setAuthCookies(
    data.accessToken.token,
    data.refreshToken.token,
    data.accessToken.expiresAt,
    data.refreshToken.expiresAt,
  );
  await setUserData(data.user);

  redirect(appRoutes.home);
}
