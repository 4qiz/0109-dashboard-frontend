import { DiskDto } from "@/entities/disk/dto/disk-dto";
import { PropertyList } from "@/shared/components/property-list";
import { Badge } from "@/shared/ui/badge";
import { Database, Disc3, Info } from "lucide-react";
import { VolumeChartCard } from "./volume-chart-card";
import { Header } from "@/shared/components/header";
import { DiskSmartSummary } from "./disk-smart-summary";

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

export const DiskDetails = ({ disk }: { disk: DiskDto }) => {
  const properties = disk.diskProperties;
  return (
    <div className="min-h-screen container max-w-4xl mx-auto">
      <Header
        title={disk.name}
        description={disk.serial}
        icon={<Disc3 className="h-6 w-6 text-primary shrink-0" />}
      />

      <div className=" px-6 py-6 space-y-6">
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
          <DiskSmartSummary properties={properties} diskType={disk.diskType} />
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
