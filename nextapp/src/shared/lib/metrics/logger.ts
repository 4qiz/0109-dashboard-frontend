import pino from "pino";
import pinoLoki from "pino-loki";

const globalForLogger = globalThis as unknown as {
  logger?: pino.Logger;
};

export const logger =
  globalForLogger.logger ??
  (() => {
    const lokiUrl = process.env.NEXT_PUBLIC_LOKI_URL;
    console.log("Loki URL:", lokiUrl);
    const transport = pinoLoki({
      host: lokiUrl ?? "http://127.0.0.1:3100",
      batching: false,
      labels: {
        app: "nextapp",
        env: process.env.NODE_ENV,
      },
    });

    const instance = pino(transport);

    globalForLogger.logger = instance;
    return instance;
  })();
