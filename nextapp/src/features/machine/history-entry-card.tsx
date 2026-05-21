import {
  MachineHistoryItemDto,
  MACHINE_HISTORY_CHANGE_TYPE,
} from "@/entities/machine/dto/machine-history-dto";
import { formatLastUpdate } from "@/shared/lib/format-last-update";
import { jsonToProperties } from "@/shared/lib/json-to-properties";
import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/separator";
import {
  ChevronDown,
  Cpu,
  Gpu,
  HardDrive,
  LucideIcon,
  MemoryStick,
  Monitor,
  Network,
} from "lucide-react";

const componentIcons: Record<string, LucideIcon> = {
  Gpu,
  Disk: HardDrive,
  MemoryUnit: MemoryStick,
  Nic: Network,
  Cpu,
  Machine: Monitor,
};

const gradientFrom: Record<string, string> = {
  [MACHINE_HISTORY_CHANGE_TYPE.Added]: "from-success",
  [MACHINE_HISTORY_CHANGE_TYPE.Removed]: "from-danger",
  [MACHINE_HISTORY_CHANGE_TYPE.Updated]: "from-warning",
};

const gradientTo: Record<string, string> = {
  [MACHINE_HISTORY_CHANGE_TYPE.Added]: "to-success",
  [MACHINE_HISTORY_CHANGE_TYPE.Removed]: "to-danger",
  [MACHINE_HISTORY_CHANGE_TYPE.Updated]: "to-warning",
};

/** Линия от точки вниз к нейтральному (между карточками) */
export function getLowerLineGradient(changeType: string) {
  const from = gradientFrom[changeType] ?? "from-muted-foreground";
  return cn("bg-gradient-to-b", from, "to-border");
}

/** Линия от нейтрального сверху к точке */
export function getUpperLineGradient(changeType: string) {
  const to = gradientTo[changeType] ?? "to-border";
  return cn("bg-gradient-to-b from-border", to);
}

export function getChangeStyles(changeType: string) {
  switch (changeType) {
    case MACHINE_HISTORY_CHANGE_TYPE.Added:
      return {
        dot: "bg-success",
      };
    case MACHINE_HISTORY_CHANGE_TYPE.Removed:
      return {
        dot: "bg-danger",
      };
    case MACHINE_HISTORY_CHANGE_TYPE.Updated:
      return {
        dot: "bg-warning",
      };
    default:
      return {
        dot: "bg-muted-foreground",
      };
  }
}

type DiffedProperty = ReturnType<typeof jsonToProperties>[number] & {
  isChanged?: boolean;
};

function getUpdatedPropertyStates(
  oldProperties: ReturnType<typeof jsonToProperties>,
  newProperties: ReturnType<typeof jsonToProperties>,
) {
  const oldMap = new Map(oldProperties.map((item) => [item.propertyName, item]));
  const newMap = new Map(newProperties.map((item) => [item.propertyName, item]));

  const propertyNames = Array.from(
    new Set([
      ...oldProperties.map((item) => item.propertyName),
      ...newProperties.map((item) => item.propertyName),
    ]),
  );

  const diffedOldProperties: DiffedProperty[] = [];
  const diffedNewProperties: DiffedProperty[] = [];

  propertyNames.forEach((propertyName) => {
    const oldProp = oldMap.get(propertyName);
    const newProp = newMap.get(propertyName);
    const oldValue = oldProp?.value ?? "";
    const newValue = newProp?.value ?? "";
    const isChanged = oldValue !== newValue;

    if (oldProp) {
      diffedOldProperties.push({ ...oldProp, isChanged });
    }
    if (newProp) {
      diffedNewProperties.push({ ...newProp, isChanged });
    }
  });

  return {
    oldProperties: diffedOldProperties,
    newProperties: diffedNewProperties,
  };
}

function PropertyBlock({
  title,
  properties,
  variant,
}: {
  title: string;
  properties: DiffedProperty[];
  variant?: "success" | "danger";
}) {
  if (properties.length === 0) return null;

  const containerClassName = cn(
    "rounded-xl border p-4",
    variant === "success"
      ? "border-success-border bg-success-bg"
      : variant === "danger"
      ? "border-danger-border bg-danger-bg"
      : "border-border bg-card",
  );

  return (
    <div className={containerClassName}>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <div className="space-y-3 pt-3">
        {properties.map((prop, index) => (
          <div key={`${prop.propertyName}-${index}`}>
            {index > 0 && <Separator className="my-3" />}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {prop.propertyName}
              </p>
              <p
                className={cn(
                  "text-sm break-all",
                  prop.isChanged
                    ? variant === "success"
                      ? "text-success-text"
                      : variant === "danger"
                      ? "text-danger-text"
                      : "text-foreground"
                    : "text-foreground",
                )}
              >
                {prop.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardBody({
  item,
  ComponentIcon,
  timeAgo,
  formatted,
  hasDetails,
}: {
  item: MachineHistoryItemDto;
  ComponentIcon: LucideIcon;
  timeAgo: string;
  formatted: string;
  hasDetails: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="hidden md:flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted/50 text-muted-foreground"
        aria-label={item.componentType}
      >
        <ComponentIcon className="h-4 w-4 " />
      </div>

      <div className="min-w-0 flex flex-col flex-1 gap-1">
        <p className="font-medium truncate" title={item.componentName}>
          {item.componentName}
        </p>

        <p className="text-sm text-muted-foreground flex items-center">
          <span title={formatted}>{timeAgo}</span>
        </p>
      </div>

      {hasDetails && (
        <ChevronDown
          className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden
        />
      )}
    </div>
  );
}

function DetailsContent({
  item,
  oldProperties,
  newProperties,
}: {
  item: MachineHistoryItemDto;
  oldProperties: ReturnType<typeof jsonToProperties>;
  newProperties: ReturnType<typeof jsonToProperties>;
}) {
  const { oldProperties: diffedOldProperties, newProperties: diffedNewProperties } =
    item.changeType === MACHINE_HISTORY_CHANGE_TYPE.Updated
      ? getUpdatedPropertyStates(oldProperties, newProperties)
      : { oldProperties, newProperties };

  return (
    <div className="mt-3 border-t border-border/60 pt-3 space-y-4">
      {item.changeType === MACHINE_HISTORY_CHANGE_TYPE.Updated ? (
        <div className="grid gap-4 md:grid-cols-2">
          <PropertyBlock
            title="Было"
            properties={diffedOldProperties}
            variant="danger"
          />
          <PropertyBlock
            title="Стало"
            properties={diffedNewProperties}
            variant="success"
          />
        </div>
      ) : item.changeType === MACHINE_HISTORY_CHANGE_TYPE.Added ? (
        <PropertyBlock title="Новое состояние" properties={newProperties} />
      ) : (
        <PropertyBlock title="Старое состояние" properties={oldProperties} />
      )}
    </div>
  );
}

export function HistoryEntryCard({ item }: { item: MachineHistoryItemDto }) {
  const { timeAgo, formatted } = formatLastUpdate(item.changedAt);
  const styles = getChangeStyles(item.changeType);

  const ComponentIcon = componentIcons[item.componentType] ?? Cpu;

  const oldProperties = jsonToProperties(item.oldValueJson);
  const newProperties = jsonToProperties(item.newValueJson);
  const hasDetails = oldProperties.length > 0 || newProperties.length > 0;

  const cardClassName =
    "rounded-lg border border-border/60 bg-card/70 shadow-sm px-3 py-3";

  const bodyProps = {
    item,
    styles,
    ComponentIcon,
    timeAgo,
    formatted,
    hasDetails,
  };

  if (!hasDetails) {
    return (
      <article className={cardClassName}>
        <CardBody {...bodyProps} />
      </article>
    );
  }

  return (
    <details className={cn(cardClassName, "group")}>
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <CardBody {...bodyProps} />
      </summary>
      <DetailsContent
        item={item}
        oldProperties={oldProperties}
        newProperties={newProperties}
      />
    </details>
  );
}
