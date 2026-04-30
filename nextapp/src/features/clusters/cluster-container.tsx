import { MachineCard } from "./machine-card";
import { ClusterDto } from "@/entities/cluster/dto/cluster-dto";
import { pluralizeRu } from "@/shared/lib/pluralize-ru";
import { Header } from "@/shared/components/header";
import { Server } from "lucide-react";
import { ClusterRowMenu } from "./cluster-row-menu";

export const formatMachinesCount = (count: number) =>
  `${count} ${pluralizeRu(count, "машина", "машины", "машин")}`;

export const ClusterContainer = ({ cluster }: { cluster: ClusterDto }) => {
  const { name, machines, clusterId } = cluster;

  const machinesCount = cluster.machines.length;
  return (
    <div className="min-h-screen bg-background">
      <Header
        title={name}
        description={formatMachinesCount(machinesCount)}
        icon={<Server className="h-6 w-6 text-primary shrink-0" />}
      />

      <div className="container mx-auto px-4 lg:px-6 py-6">
        <ClusterRowMenu clusterId={clusterId} activePage="machines" />

        {machines.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Нет машин в этом кластере
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {machines.map((m) => {
              const totalMemoryGB = m.memoryUnits
                ? m.memoryUnits.reduce((sum, unit) => sum + unit.capacityGB, 0)
                : undefined;

              const cpus = m.cpus ? m.cpus.map((cpu) => cpu.name) : undefined;
              const gpus = m.gpus ? m.gpus.map((gpu) => gpu.name) : undefined;

              return (
                <MachineCard
                  key={m.idMachine}
                  idCluster={clusterId}
                  idMachine={m.idMachine}
                  hostname={m.hostname}
                  platform={m.platform}
                  lastUpdate={m.lastUpdate}
                  diskCount={m.disks.length}
                  cpuCount={m.cpus.length}
                  disks={m.disks}
                  memoryGB={totalMemoryGB}
                  memoryUnitsCount={m.memoryUnitsCount}
                  memorySlotsCount={m.memorySlotsCount}
                  nics={m.nics}
                  gpus={gpus}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
