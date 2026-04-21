import { Logger } from "pino";
import { collectDefaultMetrics, Registry } from "prom-client";

declare global {
  var logger: Logger | undefined;
  var metrics: Registry | undefined;
}

export const register = async () => {
  console.log("Instrumentation registered");
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const pino = (await import("pino")).default;
    const pinoLoki = (await import("pino-loki")).default;

    const transport = pinoLoki({
      host: "http://192.168.56.102:3100/",
      batching: {
        interval: 5, // секунды между отправками
        maxBufferSize: 100, // максимум логов в пачке
      },

      labels: { app: "nextapp" },
    });

    const logger = pino(transport);
    globalThis.logger = logger;

    var promRegistry = new Registry();
    collectDefaultMetrics({ register: promRegistry });
    globalThis.metrics = promRegistry;
  }
};
