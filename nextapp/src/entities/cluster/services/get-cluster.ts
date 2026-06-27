import { apiRoutes } from "@/shared/constants/api-routes";
import { ClusterDto } from "../dto/cluster-dto";
import { authFetch } from "@/shared/lib/auth/auth-fetch";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("getCluster");

export const getClusterAsync = async (
  id: number,
): Promise<{ cluster: ClusterDto | null; error?: string }> => {
  try {
    const response = await authFetch(apiRoutes.getCluster(id));

    if (!response.ok) {
      logger.warn("failed fetching cluster", {
        status: response.status,
        statusText: response.statusText,
      });
      return {
        cluster: null,
        error: `Ошибка при получении кластера`,
      };
    }

    const data = (await response.json()) as ClusterDto;
    return { cluster: data || null };
  } catch (err) {
    logger.error("getCluster exception", err);
    return { cluster: null, error: "Ошибка при получении кластера" };
  }
};
