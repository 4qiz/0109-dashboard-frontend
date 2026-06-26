import { DiskDto, DiskPropertyDto } from "@/entities/disk/dto/disk-dto";
import { PropertyList } from "@/shared/components/property-list";
import { Badge } from "@/shared/ui/badge";
import { Database, Disc3, Info } from "lucide-react";
import { VolumeChartCard } from "./volume-chart-card";
import { Header } from "@/shared/components/header";
import { DiskSmartSummary } from "./disk-smart-summary";
import { MachineBreadcrumb } from "@/shared/components/machine-breadcrumb";

const getOperationalColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "OK":
      return "bg-success-bg text-success-text ";

    case "WARNING":
      return "bg-warning-bg text-warning-text ";

    case "CRITICAL":
      return "bg-danger-bg text-danger-text";

    default:
      return "bg-muted text-muted-foreground";
  }
};

export const DiskDetails = ({
  disk,
  diskProps,
  clusterId,
  machineId,
  machineHostname,
  clusterName,
}: {
  disk: DiskDto;
  diskProps: DiskPropertyDto[];
  clusterId: number;
  machineId: number;
  machineHostname: string;
  clusterName: string;
}) => {
  const properties = disk.diskProperties;
  return (
    <div className="min-h-screen container max-w-4xl mx-auto">
      <Header
        title={disk.name}
        description={disk.serial}
        icon={<Disc3 className="h-6 w-6 text-primary shrink-0" />}
      />

      <div className=" px-6 py-6 space-y-6">
        <MachineBreadcrumb
          clusterName={clusterName}
          clusterId={clusterId}
          machineId={machineId}
          machineHostname={machineHostname}
          diskId={disk.idDisk}
          diskName={disk.name}
          type="disk"
        />
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
          {/* here display diskProps */}
          <DiskSmartSummary diskProps={diskProps} />
          {disk.masterComputer && (
            <p className="text-sm text-muted-foreground">
              Установлен на:{" "}
              <span className="text-foreground">{disk.masterComputer}</span>
            </p>
          )}
        </div>

        {/* Disk Volumes Charts*/}
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
