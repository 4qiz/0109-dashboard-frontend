import { Counter } from "prom-client";
import { metricsRegistry } from "./metrics";

let userSignups: Counter<string> | undefined;

export function getUserSignups() {
  if (!userSignups) {
    userSignups = new Counter({
      name: "user_signups_total",
      help: "Total number of user signups",
      labelNames: ["plan_type", "referral_source"],
      registers: [metricsRegistry],
    });
  }

  return userSignups;
}