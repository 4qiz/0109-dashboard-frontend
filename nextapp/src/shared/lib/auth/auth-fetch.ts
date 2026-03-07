import { appRoutes } from "@/shared/constants/app-routes";
import { getAccessToken } from "./auth-server";

let refreshPromise: Promise<boolean> | null = null;

async function createRequest(init?: RequestInit): Promise<RequestInit> {
  const token = await getAccessToken();
  return {
    ...init,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
}

async function refreshToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = fetch(appRoutes.apiRefresh, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function authFetch(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(input, await createRequest(init));

  if (response.status !== 401) {
    return response;
  }

  const refreshed = await refreshToken();

  if (!refreshed) {
    return response;
  }

  return fetch(input, await createRequest(init));
}
