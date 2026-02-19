import { DiskDto } from "@/entities/disk/dto/disk-dto";
import { BackButton } from "@/shared/components/back-button";
import { PropertyList } from "@/shared/components/property-list";
import { Badge } from "@/shared/ui/badge";
import { Database, HardDrive, Info } from "lucide-react";
import { VolumeChartCard } from "./volume-chart-card";
import { ToggleTheme } from "@/shared/components/toggle-theme";

export const DiskDetails = ({ disk }: { disk: DiskDto }) => {
  const properties = disk.diskProperties;

  const getOperationalColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "OK":
        return "bg-green-500/10 text-green-700 dark:text-green-400";

      case "WARNING":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";

      case "CRITICAL":
        return "bg-red-500/10 text-red-700 dark:text-red-400";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container max-w-4xl mx-auto px-4 lg:px-6 py-2">
          <div className="space-y-3">
            <BackButton className="hidden lg:flex" />
            <div className="flex items-center gap-3 lg:ml-0 ml-14">
              <HardDrive className="h-6 w-6 text-primary" />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl truncate">{disk.name}</h1>
                <p className="text-sm text-muted-foreground truncate">
                  {disk.serial}
                </p>
              </div>
              <div className="ml-auto">
                <ToggleTheme />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Disk Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <h2 className="text-xl">Сводка</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{disk.busType}</Badge>
            {disk.diskType && <Badge variant="outline">{disk.diskType}</Badge>}
            <Badge variant={"outline"}>{disk.healthStatus}</Badge>
            <Badge className={getOperationalColor(disk.operationalStatus)}>
              {disk.operationalStatus}
            </Badge>
          </div>

          {disk.masterComputer && (
            <p className="text-sm text-muted-foreground">
              Установлен на:{" "}
              <span className="text-foreground">{disk.masterComputer}</span>
            </p>
          )}
        </div>

        {/* Disk Volumes */}
        {disk.diskVolumes && disk.diskVolumes.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <h2 className="text-xl">Тома</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {disk.diskVolumes.map((volume) => (
                <VolumeChartCard key={volume.guid} volume={volume} />
              ))}
            </div>
          </div>
        )}

        {/* All Properties */}
        <div className="space-y-4">
          <h2 className="text-xl">Все свойства</h2>
          <PropertyList properties={properties} />
        </div>
      </div>
    </div>
  );
};
