import { ClusterListDto } from "@/entities/cluster/dto/cluster-list-dto";
import { apiRoutes } from "@/shared/constants/api-routes";
import { fetcher } from "@/shared/lib/fetcher";

export const getClusters = () => {
  return fetcher<ClusterListDto[]>(apiRoutes.getClusters);
};
