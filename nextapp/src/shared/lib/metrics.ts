import { Registry, collectDefaultMetrics } from "prom-client";

const globalForMetrics = globalThis as unknown as {
  metricsRegistry?: Registry;
};

export const metricsRegistry =
  globalForMetrics.metricsRegistry ??
  (() => {
    const registry = new Registry();
    collectDefaultMetrics({ register: registry });

    globalForMetrics.metricsRegistry = registry;
    return registry;
  })();
