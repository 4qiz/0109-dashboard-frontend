import { getMachineAsync } from "@/entities/machine/services/get-machine";
import { getClusterAsync } from "@/entities/cluster/services/get-cluster";
import { MachineDetails } from "@/features/machine/machine-details";
import { MessageCard } from "@/shared/components/message-card";
import { AlertTriangleIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const MachinePage = async ({
  params,
}: {
  params: Promise<{ clusterId: string; machineId: string }>;
}) => {
  const { clusterId, machineId } = await params;
  const clusterIdNum = Number(clusterId);
  const machineIdNum = Number(machineId);

  const [{ machine, error: machineError }, { cluster }] = await Promise.all([
    getMachineAsync(machineIdNum),
    getClusterAsync(clusterIdNum),
  ]);

  if (!machine || machineError) {
    return (
      <MessageCard
        icon={<AlertTriangleIcon />}
        message={machineError || "ПК не найден"}
      />
    );
  }

  const clusterName = cluster?.name ?? `Кластер ${clusterIdNum}`;

  return (
    <MachineDetails
      machine={machine}
      idCluster={clusterIdNum}
      clusterName={clusterName}
    />
  );
};

export default MachinePage;
