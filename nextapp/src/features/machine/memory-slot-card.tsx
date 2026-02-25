"use client";

import { MemoryUnitDto } from "@/entities/machine/dto/machine-dto";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { ChevronDown, ChevronUp, MemoryStick, Zap } from "lucide-react";
import { useState } from "react";

interface MemorySlotCardProps {
  slot: string;
  unit: MemoryUnitDto | null;
  channelColor: "blue" | "purple";
}

const colorClasses = {
  blue: {
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  purple: {
    bg: "bg-purple-500/5",
    border: "border-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500/10 to-purple-600/5",
  },
};

export const MemorySlotCard = ({
  slot,
  unit,
  channelColor,
}: MemorySlotCardProps) => {
  const colors = colorClasses[channelColor];

  const [expanded, setExpanded] = useState(false);
  if (!unit) {
    return (
      <div className="p-4 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-16 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
              <MemoryStick className="h-6 w-6 text-muted-foreground/30" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Слот {slot}
              </div>
              <div className="text-xs text-muted-foreground/70">Пусто</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        `rounded-xl border-2  bg-linear-to-br overflow-hidden transition-all`,
        colors.border,
        colors.gradient,
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Visual Memory Stick */}
            <div
              className={cn(
                `w-12 h-16 rounded-lg  border-2  flex flex-col items-center justify-center p-1 shrink-0`,
                colors.bg,
                colors.border,
              )}
            >
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 rounded-full ${colors.border.replace("border-", "bg-")}`}
                  />
                ))}
              </div>
              <MemoryStick className={`h-6 w-6 ${colors.text}`} />
              <div className="text-[10px] font-bold mt-1">
                {unit.capacityGB}GB
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn("text-sm font-bold", colors.text)}>
                  {unit.slot}
                </span>
                <Badge variant="outline" className="text-xs">
                  {unit.capacityGB} ГБ
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {unit.speedMhz} МГц
                </div>
                <div>{unit.formFactor}</div>
              </div>
            </div>
          </div>

          {/* Expand Icon */}
          <div className="ml-2 shrink-0">
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-4 space-y-2 border-t border-border/50 pt-3 mt-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-muted-foreground">Производитель</div>
              <div className="font-medium">{unit.manufacturer}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Тип памяти</div>
              <div className="font-medium">{unit.memoryType}</div>
            </div>
            <div className="col-span-2">
              <div className="text-muted-foreground">Part Number</div>
              <div className="font-mono text-[11px]">
                {unit.partNumber.trim()}
              </div>
            </div>
            {unit.serialNumber !== "00000000" && (
              <div className="col-span-2">
                <div className="text-muted-foreground">Serial Number</div>
                <div className="font-mono text-[11px]">{unit.serialNumber}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
