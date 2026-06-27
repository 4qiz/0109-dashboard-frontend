import { apiRoutes } from "@/shared/constants/api-routes";
import { ClusterListDto } from "../dto/cluster-list-dto";
import { authFetch } from "@/shared/lib/auth/auth-fetch";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("getClusters");

export const getClustersAsync = async (): Promise<{
  clusters: ClusterListDto[];
  error?: string;
}> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is undefined");
  }

  try {
    const response = await authFetch(apiRoutes.getClusters);

    if (!response.ok) {
      logger.warn("failed fetching clusters", {
        status: response.status,
        statusText: response.statusText,
      });
      return { clusters: [], error: "Ошибка при получении кластеров" };
    }

    const data = await response.json();
    return { clusters: data };
  } catch (error) {
    logger.error("getClusters exception", error);
    return { clusters: [], error: "Ошибка при получении кластеров" };
  }
};
