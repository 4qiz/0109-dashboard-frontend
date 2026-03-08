"use server";

import { appRoutes } from "@/shared/constants/app-routes";
import { clearAuthCookies } from "@/shared/lib/auth/auth-server";
import { redirect } from "next/navigation";

export async function logout() {
  await clearAuthCookies();

  redirect(appRoutes.login);
}
