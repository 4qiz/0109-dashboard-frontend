"use server";

import { apiRoutes } from "@/shared/constants/api-routes";
import { appRoutes } from "@/shared/constants/app-routes";
import { setAuthCookies } from "@/shared/lib/auth/auth-server";
import { redirect } from "next/navigation";

function getRedirectUrl(message: string): string {
  return `${appRoutes.login}?error=${encodeURIComponent(message)}`;
}

export async function login(formData: FormData) {
  const login = formData.get("login");
  const password = formData.get("password");

  if (!login || !password) {
    redirect(getRedirectUrl("Missing credentials"));
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
    redirect(getRedirectUrl("Invalid email or password"));
  }

  const data = await res.json();

  if (!data?.accessToken || !data?.refreshToken) {
    redirect(getRedirectUrl("Authentication failed"));
  }

  await setAuthCookies(data.accessToken, data.refreshToken);

  redirect(appRoutes.home());
}
