export interface JsonProperty {
  propertyName: string;
  value: string;
}

const formatPropertyKey = (key: string) =>
  key.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");

const formatPropertyValue = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  if (typeof value === "boolean") return value ? "Да" : "Нет";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return JSON.stringify(value);
  }
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

export function jsonToProperties(
  json: Record<string, unknown> | null,
): JsonProperty[] {
  if (!json) return [];

  return Object.entries(json)
    .filter(([key]) => key !== "IdMachine" && key !== "idMachine")
    .map(([key, value]) => {
      const formatted = formatPropertyValue(value);
      if (formatted === null) return null;
      return { propertyName: formatPropertyKey(key), value: formatted };
    })
    .filter((item): item is JsonProperty => item !== null);
}
