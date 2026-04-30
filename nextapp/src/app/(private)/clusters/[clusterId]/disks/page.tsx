import { getClusterAsync } from "@/entities/cluster/services/get-cluster";
import { getClusterDisksAsync } from "@/entities/cluster/services/get-cluster-disks";
import { ClusterDisksContainer } from "@/features/clusters/cluster-disks-container";
import { MessageCard } from "@/shared/components/message-card";
import { AlertTriangleIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const ClusterDisksPage = async ({
  params,
}: {
  params: Promise<{ clusterId: string }>;
}) => {
  const { clusterId } = await params;
  const clusterIdNumber = Number(clusterId);

  const [{ cluster, error: clusterError }, { disks, error: disksError }] =
    await Promise.all([
      getClusterAsync(clusterIdNumber),
      getClusterDisksAsync(clusterIdNumber),
    ]);

  if (!cluster || clusterError) {
    return (
      <MessageCard
        icon={<AlertTriangleIcon />}
        message={clusterError || "Кластер не найден"}
      />
    );
  }

  if (disksError) {
    return <MessageCard icon={<AlertTriangleIcon />} message={disksError} />;
  }

  return (
    <ClusterDisksContainer
      clusterId={cluster.clusterId}
      clusterName={cluster.name}
      disks={disks}
    />
  );
};

export default ClusterDisksPage;
