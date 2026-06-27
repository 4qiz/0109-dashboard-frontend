import { DiskDto } from "@/entities/disk/dto/disk-dto";
import { apiRoutes } from "@/shared/constants/api-routes";
import { authFetch } from "@/shared/lib/auth/auth-fetch";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("getClusterDisks");

export const getClusterDisksAsync = async (
  clusterId: number,
): Promise<{ disks: DiskDto[]; error?: string }> => {
  try {
    const response = await authFetch(apiRoutes.getClusterDisks(clusterId));

    if (!response.ok) {
      logger.warn("failed fetching cluster disks", {
        status: response.status,
        statusText: response.statusText,
      });
      return { disks: [], error: "Ошибка при получении дисков кластера" };
    }

    if (response.status === 204) {
      return { disks: [] };
    }
    const data = (await response.json()) as DiskDto[];
    return { disks: data || [] };
  } catch (err) {
    logger.error("getClusterDisks exception", err);
    return { disks: [], error: "Ошибка при получении дисков кластера" };
  }
};
