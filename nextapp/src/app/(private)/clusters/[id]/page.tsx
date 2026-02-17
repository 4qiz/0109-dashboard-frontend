import {
  getCluster2Async,
  getClusterAsync,
} from "@/entities/cluster/services/get-cluster";
import { ClusterContainer } from "@/features/clusters/cluster-container";
import { MessageCard } from "@/shared/components/message-card";
import { AlertTriangleIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const ClusterPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { cluster, error } = await getCluster2Async(Number(id));

  if (!cluster || error) {
    return (
      <MessageCard
        icon={<AlertTriangleIcon />}
        message={error || "Кластер не найден"}
      />
    );
  }

  return <ClusterContainer machines={cluster} />;
};

export default ClusterPage;
