import { MachineDiskDto } from "@/entities/machine/dto/machine-dto";
import { appRoutes } from "@/shared/constants/app-routes";
import { formatLastUpdate } from "@/shared/lib/format-last-update";
import { pluralizeRu } from "@/shared/lib/pluralize-ru";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import {
  AlertCircle,
  ChevronRight,
  Cpu,
  HardDrive,
  Monitor,
} from "lucide-react";
import Link from "next/link";

export const formatDisksCount = (count: number) =>
  `${count} ${pluralizeRu(count, "диск", "диска", "дисков")}`;

interface MachineCardProps {
  idCluster: number;
  idMachine: number;
  hostname: string;
  platform: string;
  lastUpdate: string;
  diskCount: number;
  cpuCount: number;
  disks: MachineDiskDto[];
}

export function MachineCard({
  idCluster,
  idMachine,
  hostname,
  platform,
  lastUpdate,
  diskCount,
  cpuCount,
  disks,
}: MachineCardProps) {
  const { formatted, timeAgo } = formatLastUpdate(lastUpdate);

  // Определяем наличие проблемных дисков
  const hasUnhealthyDisk = disks.some(
    (disk) => disk.operationalStatus !== "OK",
  );

  // Функция для цвета индикатора диска
  const getDiskColor = (status: string) => {
    switch (status) {
      case "OK":
        return "bg-green-500";
      case "WARNING":
        return "bg-yellow-500";
      case "CRITICAL":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Link
      href={appRoutes.machine(Number(idCluster), Number(idMachine))}
      className="block"
    >
      <Card
        className={cn(
          "hover:shadow-lg transition-shadow cursor-pointer",
          hasUnhealthyDisk && "border-destructive bg-destructive/5",
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary shrink-0" />
                <CardTitle className="text-lg truncate">{hostname}</CardTitle>
                {hasUnhealthyDisk && (
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{platform}</Badge>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{cpuCount} CPU</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {formatDisksCount(diskCount)}
                </span>
              </div>
            </div>

            {/* Disk Status Indicators */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Диски:</span>
              <div className="flex gap-1.5">
                {disks.map((disk) => (
                  <div
                    key={disk.idDisk}
                    className={cn(
                      "w-3 h-3 rounded-full",
                      getDiskColor(disk.operationalStatus),
                    )}
                    title={`${disk.name} - ${disk.operationalStatus}`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Обновлено {formatted} ({timeAgo})
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
