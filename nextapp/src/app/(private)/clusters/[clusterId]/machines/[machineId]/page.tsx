import { getClusterAsync } from "@/entities/cluster/services/get-cluster";
import { ClusterContainer } from "@/features/clusters/cluster-container";
import { MessageCard } from "@/shared/components/message-card";
import { AlertTriangleIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const MachinePage = async ({
  params,
}: {
  params: Promise<{ clusterId: string; machineId: string }>;
}) => {
  const { clusterId, machineId } = await params;
  const { cluster, error } = await getClusterAsync(Number(clusterId)); // TODO: getMachineAsync

  if (!cluster || error) {
    return (
      <MessageCard
        icon={<AlertTriangleIcon />}
        message={error || "Кластер не найден"}
      />
    );
  }

  return <ClusterContainer cluster={cluster} />;
};

export default MachinePage;
