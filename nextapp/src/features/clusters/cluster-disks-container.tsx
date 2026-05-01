import { DiskDto } from "@/entities/disk/dto/disk-dto";
import { DiskCard } from "@/shared/components/disc-card";
import { Header } from "@/shared/components/header";
import { pluralizeRu } from "@/shared/lib/pluralize-ru";
import { HardDrive } from "lucide-react";
import { ClusterRowMenu } from "./cluster-row-menu";

export const formatDisksCount = (count: number) =>
  `${count} ${pluralizeRu(count, "диск", "диска", "дисков")}`;

export const ClusterDisksContainer = ({
  clusterId,
  clusterName,
  disks,
}: {
  clusterId: number;
  clusterName: string;
  disks: DiskDto[];
}) => {
  const disksWithMachine = disks.filter(
    (disk) => typeof disk.idMachine === "number",
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        title={`${clusterName} — диски`}
        description={formatDisksCount(disksWithMachine.length)}
        icon={<HardDrive className="h-6 w-6 text-primary shrink-0" />}
      />

      <div className="container mx-auto px-4 lg:px-6 py-6">
        <ClusterRowMenu clusterId={clusterId} activePage="disks" />

        {disksWithMachine.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Нет дисков в этом кластере
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {disksWithMachine.map((disk) => (
              <DiskCard
                key={disk.idDisk}
                idCluster={clusterId}
                idMachine={disk.idMachine as number}
                idDisk={disk.idDisk}
                name={disk.name}
                masterComputer={disk.masterComputer}
                serial={disk.serial}
                busType={disk.busType}
                diskType={disk.diskType}
                healthStatus={disk.healthStatus}
                operationalStatus={disk.operationalStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
