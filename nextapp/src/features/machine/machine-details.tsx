import { MachineDto } from "@/entities/machine/dto/machine-dto";
import { DiskCard } from "@/shared/components/disc-card";
import { PropertyList } from "@/shared/components/property-list";
import { formatLastUpdate } from "@/shared/lib/format-last-update";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import {
  Cpu,
  Gpu,
  HardDrive,
  Info,
  MemoryStick,
  Monitor,
  Network,
} from "lucide-react";
import { MemorySlotsCard } from "./memory-slots-card";
import { NICCard } from "./nic-card";
import { GpuCard } from "./gpu-card";
import { Header } from "@/shared/components/header";
import { MachineRowMenu } from "./machine-row-menu";

export const MachineDetails = ({
  machine,
  idCluster,
}: {
  idCluster: number;
  machine: MachineDto;
}) => {
  const { timeAgo } = formatLastUpdate(machine.lastUpdate);

  return (
    <div className="min-h-screen container mx-auto max-w-4xl">
      <Header
        title={machine.hostname}
        description={`ID: ${machine.idMachine}`}
        icon={<Monitor className="h-6 w-6 text-primary shrink-0" />}
      />

      <div className="px-4 py-6 space-y-6">
        <MachineRowMenu
          clusterId={idCluster}
          machineId={machine.idMachine}
          activePage="configuration"
        />

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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CPUs */}
        <div className="space-y-4">
          <h2 className="text-xl flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Процессоры
            <Badge variant="secondary">{machine.cpus.length}</Badge>
          </h2>
          {machine.cpus.map((cpu) => (
            <PropertyList
              key={cpu.systemDeviceId}
              collapsed
              title={cpu.name}
              properties={[
                {
                  propertyName: "Идентификатор устройства",
                  value: cpu.systemDeviceId,
                },
                { propertyName: "Производитель", value: cpu.manufacturer },
                {
                  propertyName: "Физические ядра",
                  value: String(cpu.physicalCoreNumber),
                },
                {
                  propertyName: "Логические ядра",
                  value: String(cpu.logicalCoreNumber),
                },
                { propertyName: "Макс. частота", value: `${cpu.maxClock} МГц` },
                { propertyName: "Сокет", value: cpu.socketDesignation },
                { propertyName: "Аппаратный ID", value: cpu.cpuHardwareId },
                {
                  propertyName: "Виртуализация",
                  value: cpu.isVirtualisationEnabled ? "Включено" : "Отключено",
                },
              ]}
            />
          ))}
        </div>

        {/* GPUs */}
        {machine.gpus && machine.gpus.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl flex items-center gap-2">
              <Gpu className="h-5 w-5" />
              Графические карты
              <Badge variant="secondary">{machine.gpus.length}</Badge>
            </h2>
            {machine.gpus.map((gpu, index) => (
              <GpuCard key={`${index}`} gpu={gpu} />
            ))}
          </div>
        )}

        {/* Memory */}
        {machine.memoryUnits && machine.memoryUnits.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl flex items-center gap-2">
              <MemoryStick className="h-5 w-5" />
              Память
              <Badge variant="secondary">
                {machine.memoryUnitsCount || machine.memoryUnits.length} /{" "}
                {machine.memorySlotsCount || 4}
              </Badge>
            </h2>
            <MemorySlotsCard
              memoryUnits={machine.memoryUnits}
              totalSlots={machine.memorySlotsCount || 4}
              maxCapacityGB={machine.maxMemoryCapacity}
            />
          </div>
        )}

        {/* Disks */}
        <div className="space-y-4">
          <h2 className="text-xl flex items-center gap-2">
            <HardDrive className="h-5 w-5  shrink-0" />
            Диски
            <Badge variant="secondary">{machine.disks.length}</Badge>
          </h2>
          {machine.disks.map((disk) => (
            <DiskCard
              idCluster={idCluster}
              idMachine={machine.idMachine}
              key={disk.idDisk}
              idDisk={disk.idDisk}
              name={disk.name}
              masterComputer={machine.hostname}
              serial={disk.serial}
              busType={disk.busType}
              diskType={disk.diskType}
              healthStatus={disk.healthStatus}
              operationalStatus={disk.operationalStatus}
            />
          ))}
        </div>

        {/* Network Interfaces */}
        {machine.nics && machine.nics.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl flex items-center gap-2">
              <Network className="h-5 w-5" />
              Сетевые интерфейсы
              <Badge variant="secondary">{machine.nics.length}</Badge>
            </h2>
            {machine.nics.map((nic, index) => (
              <NICCard key={`${nic.macAddress}-${index}`} nic={nic} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
