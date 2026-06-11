/** NVMe: 1 data unit = 1000 × 512 bytes (per host convention for these counters). */
const BYTES_PER_DATA_UNIT = 1000 * 512;
const TB_DIVISOR = 1024 ** 4;
const GB_DIVISOR = 1024 ** 3;

/**
 * Normalizes property names to lowercase alphanumeric for consistent comparison.
 * Removes spaces, underscores, hyphens, and special characters.
 * @param name - The property name to normalize
 * @returns Normalized property name
 */
export const normalizePropertyName = (name: string) =>
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

/**
 * Converts `total_lbas_written` (count of 512-byte LBAs) to ГБ/ТБ (1024-based).
 */
export function formatTotalLbasWritten(lbasRaw: string): string | null {
  const lbas = Number.parseInt(lbasRaw.trim(), 10);
  if (!Number.isFinite(lbas) || lbas < 0) {
    return null;
  }

  const bytes = lbas * 512;
  const tb = bytes / TB_DIVISOR;
  if (tb >= 1) {
    return `${tb.toFixed(2)} ТБ`;
  }

  const gb = bytes / GB_DIVISOR;
  if (gb >= 1) {
    return `${gb.toFixed(2)} ГБ`;
  }

  const mb = bytes / 1024 ** 2;
  return `${mb.toFixed(2)} МБ`;
}

/**
 * Extracts and formats data transfer amounts from SMART properties.
 * Looks for 'data_units_written' and 'data_units_read' properties and formats them using formatSmartDataUnits.
 * @param properties - Array of SMART properties with propertyName and value
 * @returns Object with formatted 'written' and 'read' values, or null if not found
 */
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

/**
 * Enriches SMART summary items with computed properties using a pre-built properties map.
 * Adds data transfer labels, total LBAs written, and unsafe shutdowns count without re-parsing the property array.
 * @param byName - Pre-built Map of normalized property names to values
 * @param summaryItems - Accumulator array to push enriched items into
 * @returns The modified summaryItems array
 */
export function enrichSmartSummaryWithComputedProperties(
  byName: Map<string, string>,
  summaryItems: { key: string; label: string; value: string }[],
): { key: string; label: string; value: string }[] {
  // Add data_units_written and data_units_read if present
  const writtenRaw = byName.get(normalizePropertyName("data_units_written"));
  const readRaw = byName.get(normalizePropertyName("data_units_read"));

  if (writtenRaw) {
    const formatted = formatSmartDataUnits(writtenRaw);
    if (formatted) {
      summaryItems.push({
        key: "dataUnitsWritten",
        label: "Записано данных",
        value: formatted,
      });
    }
  }

  if (readRaw) {
    const formatted = formatSmartDataUnits(readRaw);
    if (formatted) {
      summaryItems.push({
        key: "dataUnitsRead",
        label: "Прочитано данных",
        value: formatted,
      });
    }
  }

  const totalLbasRaw = byName.get(normalizePropertyName("total_lbas_written"));
  if (totalLbasRaw) {
    const formatted = formatTotalLbasWritten(totalLbasRaw);
    if (formatted) {
      summaryItems.push({
        key: "totalLbasWritten",
        label: "Записано данных",
        value: formatted,
      });
    }
  }

  // Add unsafe_shutdowns if present
  const unsafeShutdowns = byName.get(normalizePropertyName("unsafe_shutdowns"));
  if (unsafeShutdowns) {
    summaryItems.push({
      key: "unsafeShutdowns",
      label: "Небезопасные отключения",
      value: unsafeShutdowns,
    });
  }

  return summaryItems;
}
