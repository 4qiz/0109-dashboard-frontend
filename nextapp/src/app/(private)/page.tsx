import { getClustersAsync } from "@/entities/cluster/services/get-clusters";
import { MessageCard } from "@/shared/components/message-card";
import { appRoutes } from "@/shared/constants/app-routes";
import { AlertTriangleIcon } from "lucide-react";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const { clusters, error } = await getClustersAsync();
  if (!clusters || error) {
    return (
      <MessageCard
        icon={<AlertTriangleIcon />}
        message={error || "Кластеры не найдены"}
      />
    );
  }
  if (clusters.length > 0) {
    redirect(appRoutes.clustersId(Number(clusters[0].clusterId)));
  } else {
    redirect(appRoutes.clusters());
  }
};

export default HomePage;
