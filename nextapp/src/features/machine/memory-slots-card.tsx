import { Card, CardContent } from "@/shared/ui/card";

import { MemoryUnitDto } from "@/entities/machine/dto/machine-dto";
import { MemorySlotCard } from "./memory-slot-card";

interface MemorySlotsVisualizerProps {
  memoryUnits: MemoryUnitDto[];
  totalSlots: number;
  maxCapacityKB?: number;
}

export const MemorySlotsCard = ({
  memoryUnits,
  totalSlots,
  maxCapacityKB,
}: MemorySlotsVisualizerProps) => {
  const totalMemoryGB = memoryUnits.reduce(
    (sum, unit) => sum + unit.capacityGB,
    0,
  );
  const filledSlots = memoryUnits.length;

  // Get min speed
  const minSpeed =
    memoryUnits.length > 0
      ? Math.min(...memoryUnits.map((unit) => unit.speedMhz))
      : 0;

  return (
    <Card>
      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-4 rounded-xl bg-linear-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalMemoryGB}
            </div>
            <div className="text-xs text-muted-foreground mt-1">ГБ Всего</div>
          </div>

          <div className="text-center p-4 rounded-xl bg-linear-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {minSpeed}
            </div>
            <div className="text-xs text-muted-foreground mt-1">МГц</div>
          </div>

          <div className="text-center p-4 rounded-xl bg-linear-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {filledSlots}/{totalSlots}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Плашки</div>
          </div>
        </div>

        {/* Memory Slots */}
        <div className="space-y-2">
          {memoryUnits.map((unit, index) => (
            <MemorySlotCard
              key={index}
              slot={unit.slot}
              unit={unit}
              channelColor={index % 2 === 0 ? "blue" : "purple"}
            />
          ))}
        </div>

        {/* Max Capacity Info */}
        {maxCapacityKB && (
          <div className="text-xs text-muted-foreground text-center p-2 bg-muted/30 rounded-lg">
            Максимальная поддерживаемая ёмкость:{" "}
            {Math.round(maxCapacityKB / 1024 / 1024)} ГБ
          </div>
        )}
      </CardContent>
    </Card>
  );
};
