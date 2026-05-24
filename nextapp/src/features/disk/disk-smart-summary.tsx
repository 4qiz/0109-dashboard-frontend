import { DiskPropertyDto } from "@/entities/disk/dto/disk-dto";
import { getSmartDataTransferLabels } from "@/shared/lib/format-smart-data-units";
import { Card, CardContent } from "@/shared/ui/card";

type SmartSummaryItem = {
  key: string;
  label: string;
  value: string;
};

type SmartSummaryConfigItem = {
  key: string;
  label: string;
  propertyAliases: string[];
  visibleFor?: "hdd" | "ssd";
};

const smartSummaryConfig: SmartSummaryConfigItem[] = [
  {
    key: "powerOnHours",
    label: "Рабочее время (ч)",
    propertyAliases: ["power_on_hours", "poweronhours"],
  },
  {
    key: "powerCycles",
    label: "Кол-во включений",
    propertyAliases: ["power_cycle_count", "power_cycles", "powercyclecount"],
  },
  {
    key: "reallocatedSectors",
    label: "Переназначено секторов (HDD)",
    propertyAliases: ["reallocated_sector_ct", "reallocatedsectorct"],
    visibleFor: "hdd",
  },

  {
    key: "mediaErrors",
    label: "Ошибки целостности данных (SSD)",
    propertyAliases: [
      "media_errors",
      "mediaanddataintegrityerrors",
      "mediaanddataintegrityerrorcount",
    ],
    visibleFor: "ssd",
  },
  {
    key: "total_lbas_written",
    label: "Записано данных (GB)",
    propertyAliases: ["total_lbas_written"],
    visibleFor: "ssd",
  },
  {
    key: "ssdWear",
    label: "Износ SSD (%)",
    propertyAliases: ["percentage_used", "percentageused"],
  },
];

const normalizePropertyName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

const normalizeDiskType = (diskType?: string) =>
  diskType?.trim().toLowerCase() ?? "";

const buildSmartSummaryItems = (
  properties: DiskPropertyDto[],
  diskType?: string,
): SmartSummaryItem[] => {
  const propertiesByName = new Map(
    properties.map((property) => [
      normalizePropertyName(property.propertyName),
      property.value,
    ]),
  );

  const normalizedDiskType = normalizeDiskType(diskType);

  const summaryItems = smartSummaryConfig.reduce<SmartSummaryItem[]>(
    (acc, { key, label, propertyAliases, visibleFor }) => {
      if (visibleFor && normalizedDiskType !== visibleFor) {
        return acc;
      }

      const value = propertyAliases
        .map((alias) => propertiesByName.get(normalizePropertyName(alias)))
        .find(Boolean);

      if (value) {
        acc.push({ key, label, value });
      }

      return acc;
    },
    [],
  );

  const { written: dataWritten, read: dataRead } =
    getSmartDataTransferLabels(properties);

  if (dataWritten) {
    summaryItems.push({
      key: "dataUnitsWritten",
      label: "Записано данных",
      value: dataWritten,
    });
  }

  if (dataRead) {
    summaryItems.push({
      key: "dataUnitsRead",
      label: "Прочитано данных",
      value: dataRead,
    });
  }

  const unsafeShutdowns = propertiesByName.get(
    normalizePropertyName("unsafe_shutdowns"),
  );

  if (unsafeShutdowns) {
    summaryItems.push({
      key: "unsafeShutdowns",
      label: "Небезопасные отключения",
      value: unsafeShutdowns,
    });
  }

  return summaryItems;
};

export const DiskSmartSummary = ({
  properties,
  diskType,
}: {
  properties: DiskPropertyDto[];
  diskType?: string;
}) => {
  const smartSummaryItems = buildSmartSummaryItems(properties, diskType);

  if (smartSummaryItems.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {smartSummaryItems.map((item) => (
          <Card key={item.key} className="py-3">
            <CardContent className="px-4">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-lg font-semibold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
