import { NextResponse } from "next/server";

export async function GET() {
  try {
    const metrics = await globalThis?.metrics?.metrics();
    return new NextResponse(metrics, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    globalThis?.logger?.error({
      err: error,
      message: "Something went wrong.",
    });
  }
}
