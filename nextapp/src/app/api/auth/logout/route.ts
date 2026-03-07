import { clearAuthCookies } from "@/shared/lib/auth/auth-server";
import { NextResponse } from "next/server";

export async function POST() {
  await clearAuthCookies();
  return NextResponse.json({ success: true });
}
