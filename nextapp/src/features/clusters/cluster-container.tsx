import { MachineCard } from "./machine-card";
import { ClusterDto } from "@/entities/cluster/dto/cluster-dto";
import { pluralizeRu } from "@/shared/lib/pluralize-ru";
import { ClustersHeader } from "./clusters-header";

export const formatMachinesCount = (count: number) =>
  `${count} ${pluralizeRu(count, "машина", "машины", "машин")}`;

export const ClusterContainer = ({ cluster }: { cluster: ClusterDto }) => {
  const { name, machines, clusterId } = cluster;

  const machinesCount = cluster.machines.length;
  return (
    <div className="min-h-screen bg-background">
      <ClustersHeader name={name} machinesCount={machinesCount} />

      <div className="container mx-auto px-4 lg:px-6 py-6">
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

              const macAddresses = m.nics
                ? m.nics.map((nic) => nic.macAddress)
                : undefined;

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
                  macAddresses={macAddresses}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
