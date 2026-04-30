import { DiskDto } from "@/entities/disk/dto/disk-dto";
import { apiRoutes } from "@/shared/constants/api-routes";
import { authFetch } from "@/shared/lib/auth/auth-fetch";

export const getClusterDisksAsync = async (
  clusterId: number,
): Promise<{ disks: DiskDto[]; error?: string }> => {
  try {
    const response = await authFetch(apiRoutes.getClusterDisks(clusterId));

    if (!response.ok) {
      console.error(
        "[getClusterDisks] -",
        `${response.status} - ${response.statusText}`,
      );
      return { disks: [], error: "Ошибка при получении дисков кластера" };
    }

    const data = (await response.json()) as DiskDto[];
    return { disks: data || [] };
  } catch (err) {
    console.error("[getClusterDisks] - ", err);
    return { disks: [], error: "Ошибка при получении дисков кластера" };
  }
};
