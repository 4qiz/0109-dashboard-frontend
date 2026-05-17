import { MachineHistoryItemDto } from "@/entities/machine/dto/machine-history-dto";
import { formatLastUpdate } from "@/shared/lib/format-last-update";
import { jsonToProperties } from "@/shared/lib/json-to-properties";
import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/separator";
import {
  ArrowLeftRight,
  ChevronDown,
  Cpu,
  Gpu,
  HardDrive,
  LucideIcon,
  MemoryStick,
  Minus,
  Network,
  Plus,
} from "lucide-react";

const componentIcons: Record<string, LucideIcon> = {
  Gpu,
  Disk: HardDrive,
  MemoryUnit: MemoryStick,
  Nic: Network,
  Cpu,
};

const gradientFrom: Record<string, string> = {
  Added: "from-green-500",
  Removed: "from-red-500",
  Modified: "from-yellow-500",
};

const gradientTo: Record<string, string> = {
  Added: "to-green-500",
  Removed: "to-red-500",
  Modified: "to-yellow-500",
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
    case "Added":
      return {
        badgeClass:
          "border-green-500/40 bg-green-500/10 text-green-500 hover:bg-green-500/10",
        dot: "bg-green-500",
        icon: Plus,
      };
    case "Removed":
      return {
        badgeClass:
          "border-red-500/40 bg-red-500/10 text-red-500 hover:bg-red-500/10",
        dot: "bg-red-500",
        icon: Minus,
      };
    case "Modified":
      return {
        badgeClass:
          "border-yellow-500/40 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10",
        dot: "bg-yellow-500",
        icon: ArrowLeftRight,
      };
    default:
      return {
        badgeClass: "border-border text-muted-foreground",
        dot: "bg-muted-foreground",
        icon: ArrowLeftRight,
      };
  }
}

function PropertyBlock({
  title,
  properties,
}: {
  title: string;
  properties: ReturnType<typeof jsonToProperties>;
}) {
  if (properties.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <div className="space-y-3">
        {properties.map((prop, index) => (
          <div key={`${prop.propertyName}-${index}`}>
            {index > 0 && <Separator className="my-3" />}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {prop.propertyName}
              </p>
              <p className="text-sm break-all">{prop.value}</p>
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
  return (
    <div className="mt-3 border-t border-border/60 pt-3 space-y-4">
      {item.changeType === "Modified" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <PropertyBlock title="Было" properties={oldProperties} />
          <PropertyBlock title="Стало" properties={newProperties} />
        </div>
      ) : item.changeType === "Added" ? (
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
  const ChangeIcon = styles.icon;
  const ComponentIcon = componentIcons[item.componentType] ?? Cpu;

  const oldProperties = jsonToProperties(item.oldValueJson);
  const newProperties = jsonToProperties(item.newValueJson);
  const hasDetails = oldProperties.length > 0 || newProperties.length > 0;

  const cardClassName =
    "rounded-lg border border-border/60 bg-card/70 shadow-sm px-3 py-3";

  const bodyProps = {
    item,
    styles,
    ChangeIcon,
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
