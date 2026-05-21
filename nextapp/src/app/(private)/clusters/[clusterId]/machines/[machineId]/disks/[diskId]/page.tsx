import { getDiskAsync } from "@/entities/disk/services/get-disk";
import { getClusterAsync } from "@/entities/cluster/services/get-cluster";
import { DiskDetails } from "@/features/disk/disk-details";
import { MessageCard } from "@/shared/components/message-card";
import { AlertTriangleIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const DiskPage = async ({
  params,
}: {
  params: Promise<{ clusterId: string; machineId: string; diskId: string }>;
}) => {
  const { clusterId, machineId, diskId } = await params;
  const clusterIdNum = Number(clusterId);
  const machineIdNum = Number(machineId);

  const [{ disk, error: diskError }, { cluster }] = await Promise.all([
    getDiskAsync(Number(diskId)),
    getClusterAsync(clusterIdNum),
  ]);

  if (!disk || diskError) {
    return (
      <MessageCard
        icon={<AlertTriangleIcon />}
        message={diskError || "Диск не найден"}
      />
    );
  }

  const machineHostname = disk.masterComputer ?? `ПК #${machineIdNum}`;
  const clusterName = cluster?.name ?? `Кластер ${clusterIdNum}`;

  return (
    <DiskDetails
      disk={disk}
      clusterId={clusterIdNum}
      machineId={machineIdNum}
      machineHostname={machineHostname}
      clusterName={clusterName}
    />
  );
};

export default DiskPage;
