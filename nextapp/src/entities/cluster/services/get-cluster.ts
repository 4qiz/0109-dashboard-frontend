import { apiRoutes } from "@/shared/constants/api-routes";
import { ClusterDto } from "../dto/cluster-dto";
import { MachineDto } from "@/entities/machine/dto/machine-dto";

export const getClusterAsync = async (
  id: number,
): Promise<{ cluster: ClusterDto | null; error?: string }> => {
  try {
    const response = await fetch(apiRoutes.getCluster(id));

    if (!response.ok) {
      return {
        cluster: null,
        error: `Ошибка ${response.status}: ${response.statusText}`,
      };
    }

    const data = (await response.json()) as ClusterDto[];
    return { cluster: data[0] || null };
  } catch (err) {
    console.error("[getCluster] - ", err);
    return { cluster: null, error: "Ошибка при получении кластера" };
  }
};

export const getCluster2Async = async (
  id: number,
): Promise<{ cluster: MachineDto[] | null; error?: string }> => {
  try {
    const response = await fetch(apiRoutes.getCluster(id));

    if (!response.ok) {
      return {
        cluster: null,
        error: `Ошибка ${response.status}: ${response.statusText}`,
      };
    }

    const data = (await response.json()) as MachineDto[];
    return { cluster: data };
  } catch (err) {
    console.error("[getCluster] - ", err);
    return { cluster: null, error: "Ошибка при получении кластера" };
  }
};
