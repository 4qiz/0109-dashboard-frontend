import { logger } from "@/shared/lib/metrics/logger";

export async function GET() {
  try {
    logger.info({ msg: "metrics requested vbox" });

    return new Response("ok");
  } catch (err) {
    logger.error({ err, msg: "metrics failed" });

    return new Response("error", { status: 500 });
  }
}
