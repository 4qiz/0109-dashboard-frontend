type LogLevel = "debug" | "info" | "warn" | "error";

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

type Logger = {
  debug: (message: string, meta?: unknown) => void;
  info: (message: string, meta?: unknown) => void;
  warn: (message: string, meta?: unknown) => void;
  error: (message: string, meta?: unknown) => void;
};

const levelOrder: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const DEFAULT_LEVEL: LogLevel = "debug";

function getLogLevel(): LogLevel {
  const envLevel = process.env.LOG_LEVEL?.toLowerCase();
  if (
    envLevel === "debug" ||
    envLevel === "info" ||
    envLevel === "warn" ||
    envLevel === "error"
  ) {
    return envLevel;
  }
  return DEFAULT_LEVEL;
}

function shouldLog(level: LogLevel): boolean {
  return levelOrder[level] >= levelOrder[getLogLevel()];
}

function safeJson(value: unknown): JsonValue {
  if (value === undefined) {
    return null;
  }

  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (value instanceof Error) {
    return {
      errorMessage: value.message,
      stack: value.stack ?? null,
      name: value.name,
    } as JsonObject;
  }

  if (Array.isArray(value)) {
    return value.map((item) => safeJson(item));
  }

  if (typeof value === "object") {
    const result: JsonObject = {};
    for (const [key, rawValue] of Object.entries(
      value as Record<string, unknown>,
    )) {
      result[key] = safeJson(rawValue);
    }
    return result;
  }

  return String(value);
}

function createRecord(
  level: LogLevel,
  moduleName: string,
  message: string,
  meta?: unknown,
): string {
  const record: JsonObject = {
    timestamp: new Date().toISOString(),
    level,
    module: moduleName,
    message,
  };

  if (meta !== undefined) {
    record.meta = safeJson(meta);
  }

  return JSON.stringify(record);
}

function loggerFactory(moduleName: string): Logger {
  return {
    debug: (message, meta) => {
      if (shouldLog("debug")) {
        console.debug(createRecord("debug", moduleName, message, meta));
      }
    },
    info: (message, meta) => {
      if (shouldLog("info")) {
        console.info(createRecord("info", moduleName, message, meta));
      }
    },
    warn: (message, meta) => {
      if (shouldLog("warn")) {
        console.warn(createRecord("warn", moduleName, message, meta));
      }
    },
    error: (message, meta) => {
      if (shouldLog("error")) {
        console.error(createRecord("error", moduleName, message, meta));
      }
    },
  };
}

export function createLogger(moduleName: string): Logger {
  return loggerFactory(moduleName);
}
