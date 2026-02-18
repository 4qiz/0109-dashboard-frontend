import { MachineDto } from "@/entities/machine/dto/machine-dto";
import { BackButton } from "@/shared/components/back-button";
import { DiskCard } from "@/shared/components/disc-card";
import { PropertyList } from "@/shared/components/property-list";
import { formatLastUpdate } from "@/shared/lib/format-last-update";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { Info, Monitor } from "lucide-react";

export const MachineDetails = ({ machine }: { machine: MachineDto }) => {
  const { formatted, timeAgo } = formatLastUpdate(machine.lastUpdate);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="space-y-3">
            <BackButton />
            <div className="flex items-center gap-3">
              <Monitor className="h-6 w-6 text-primary" />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl truncate">{machine.hostname}</h1>
                <p className="text-sm text-muted-foreground">
                  ID: {machine.idMachine}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* General Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              <CardTitle>Общая информация</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Система</p>
                <p className="text-sm">{machine.systemName}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Платформа</p>
                <Badge variant="outline" className="mt-1">
                  {machine.platform}
                </Badge>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">UEFI UUID</p>
                <p className="text-sm break-all font-mono">
                  {machine.uefiUUID}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">
                  Последнее обновление
                </p>
                <p className="text-sm">{timeAgo}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatted}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CPUs */}
        <div className="space-y-4">
          <h2 className="text-xl flex items-center gap-2">
            Процессоры
            <Badge variant="secondary">{machine.cpus.length}</Badge>
          </h2>
          {machine.cpus.map((cpu) => (
            <PropertyList
              key={cpu.systemDeviceId}
              title={cpu.name}
              properties={[
                { propertyName: "Device ID", value: cpu.systemDeviceId },
                { propertyName: "Manufacturer", value: cpu.manufacturer },
                {
                  propertyName: "Physical Cores",
                  value: String(cpu.physicalCoreNumber),
                },
                {
                  propertyName: "Logical Cores",
                  value: String(cpu.logicalCoreNumber),
                },
                { propertyName: "Max Clock", value: `${cpu.maxClock} MHz` },
                { propertyName: "Socket", value: cpu.socketDesignation },
                { propertyName: "Hardware ID", value: cpu.cpuHardwareId },
                {
                  propertyName: "Virtualisation",
                  value: cpu.isVirtualisationEnabled ? "Enabled" : "Disabled",
                },
              ]}
            />
          ))}
        </div>

        {/* Disks */}
        <div className="space-y-4">
          <h2 className="text-xl flex items-center gap-2">
            Диски
            <Badge variant="secondary">{machine.disks.length}</Badge>
          </h2>
          {machine.disks.map((disk) => (
            <DiskCard
              key={disk.idDisk}
              idDisk={disk.idDisk}
              name={disk.name}
              serial={disk.serial}
              busType={disk.busType}
              diskType={disk.diskType}
              healthStatus={disk.healthStatus}
              operationalStatus={disk.operationalStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
