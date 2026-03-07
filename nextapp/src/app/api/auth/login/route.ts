import { apiRoutes } from "@/shared/constants/api-routes";
import { setAuthCookies } from "@/shared/lib/auth/auth-server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(apiRoutes.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const data = await res.json();

  await setAuthCookies(data.accessToken, data.refreshToken);

  return NextResponse.json({ success: true });
}
