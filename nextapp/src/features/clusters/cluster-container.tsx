import { Server } from "lucide-react";
import { MachineCard } from "./machine-card";
import { ToggleTheme } from "@/shared/components/toggle-theme";
import { ClusterDto } from "@/entities/cluster/dto/cluster-dto";
import { pluralizeRu } from "@/shared/lib/pluralize-ru";

export const formatMachinesCount = (count: number) =>
  `${count} ${pluralizeRu(count, "машина", "машины", "машин")}`;

export const ClusterContainer = ({ cluster }: { cluster: ClusterDto }) => {
  const { name, machines, clusterId } = cluster;
  const machinesCount = cluster.machines.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container max-w-4xl mx-auto px-4 lg:px-6 py-2 ">
          <div className="flex items-center gap-3 lg:ml-0 ml-14">
            <Server className="h-6 w-6 text-primary shrink-0" />
            <div>
              <h1 className="text-2xl">{name}</h1>
              <p className="text-sm text-muted-foreground">
                {formatMachinesCount(machinesCount)}
              </p>
            </div>
            <div className="ml-auto">
              <ToggleTheme />
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 lg:px-6 py-6">
        {machines.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Нет машин в этом кластере
          </div>
        ) : (
          <div className="space-y-4">
            {machines.map((m) => (
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
