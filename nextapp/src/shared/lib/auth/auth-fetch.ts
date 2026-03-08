import { getAccessTokenServer } from "./auth-server";

export async function authFetch(url: string): Promise<Response> {
  const accessToken = await getAccessTokenServer();

  const response = await fetch(url, {
    headers: {
      ...{ Authorization: `Bearer ${accessToken}` },
    },
  });

  return response;
}
