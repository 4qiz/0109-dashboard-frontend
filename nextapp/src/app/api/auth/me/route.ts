import { getAccessToken } from "@/shared/lib/auth/auth-server";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getAccessToken();

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
