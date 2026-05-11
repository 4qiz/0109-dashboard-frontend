/** NVMe: 1 data unit = 1000 × 512 bytes (per host convention for these counters). */
const BYTES_PER_DATA_UNIT = 1000 * 512;
const TB_DIVISOR = 1024 ** 4;
const GB_DIVISOR = 1024 ** 3;

const normalizePropertyName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Converts `data_units_read` / `data_units_written` string counts to ГБ/ТБ (1024-based).
 */
export function formatSmartDataUnits(unitsRaw: string): string | null {
  const units = Number.parseInt(unitsRaw.trim(), 10);
  if (!Number.isFinite(units) || units < 0) {
    return null;
  }

  const bytes = units * BYTES_PER_DATA_UNIT;
  const tb = bytes / TB_DIVISOR;
  if (tb >= 1) {
    return `${tb.toFixed(2)} ТБ`;
  }
  const gb = bytes / GB_DIVISOR;
  return `${gb.toFixed(2)} ГБ`;
}

export function getSmartDataTransferLabels(
  properties: { propertyName: string; value: string }[],
): { written: string | null; read: string | null } {
  const byName = new Map(
    properties.map((p) => [normalizePropertyName(p.propertyName), p.value]),
  );
  const writtenRaw = byName.get(normalizePropertyName("data_units_written"));
  const readRaw = byName.get(normalizePropertyName("data_units_read"));
  return {
    written: writtenRaw ? formatSmartDataUnits(writtenRaw) : null,
    read: readRaw ? formatSmartDataUnits(readRaw) : null,
  };
}
