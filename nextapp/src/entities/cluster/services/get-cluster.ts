import { apiRoutes } from "@/shared/constants/api-routes";
import { ClusterDto } from "../dto/cluster-dto";
import { authFetch } from "@/shared/lib/auth/auth-fetch";

export const getClusterAsync = async (
  id: number,
): Promise<{ cluster: ClusterDto | null; error?: string }> => {
  try {
    const response = await authFetch(apiRoutes.getCluster(id));

    if (!response.ok) {
      return {
        cluster: null,
        error: `Ошибка ${response.status}: ${response.statusText}`,
      };
    }

    const data = (await response.json()) as ClusterDto;
    return { cluster: data || null };
  } catch (err) {
    console.error("[getCluster] - ", err);
    return { cluster: null, error: "Ошибка при получении кластера" };
  }
};
