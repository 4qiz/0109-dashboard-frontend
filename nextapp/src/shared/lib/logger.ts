import pino from "pino";
import pinoLoki from "pino-loki";

const globalForLogger = globalThis as unknown as {
  logger?: pino.Logger;
};

export const logger =
  globalForLogger.logger ??
  (() => {
    const transport = pinoLoki({
      host: process.env.LOKI_URL ?? "http://127.0.0.1:3100",
      batching: {
        interval: 10000, // 10s is safer in production
        maxBufferSize: 200,
      },
      labels: {
        app: "nextapp",
        env: process.env.NODE_ENV,
      },
    });

    const instance = pino(transport);

    globalForLogger.logger = instance;
    return instance;
  })();
