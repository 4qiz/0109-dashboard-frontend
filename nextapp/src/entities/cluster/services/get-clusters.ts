import { apiRoutes } from "@/shared/constants/api-routes";
import { ClusterListDto } from "../dto/cluster-list-dto";

export const getClustersAsync = async (): Promise<{
  clusters: ClusterListDto[];
  error?: string;
}> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is undefined");
  }

  try {
    const response = await fetch(apiRoutes.getClusters);

    if (!response.ok) {
      return { clusters: [], error: "Ошибка при получении кластеров" };
    }

    const data = await response.json();
    return { clusters: data };
  } catch (error) {
    console.error("[getClusters] - ", error);
    return { clusters: [], error: "Ошибка при получении кластеров" };
  }
};
