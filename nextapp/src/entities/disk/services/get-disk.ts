import { apiRoutes } from "@/shared/constants/api-routes";
import { DiskDto } from "../dto/disk-dto";
import { authFetch } from "@/shared/lib/auth/auth-fetch";

export const getDiskAsync = async (
  id: number,
): Promise<{ disk: DiskDto | null; error?: string }> => {
  try {
    const response = await authFetch(apiRoutes.getDisk(id));

    if (!response.ok) {
      console.error(
        "[getDisk] -",
        `${response.status} - ${response.statusText}`,
      );
      return {
        disk: null,
        error: `Ошибка при получении диска`,
      };
    }

    const data = (await response.json()) as DiskDto;
    return { disk: data || null };
  } catch (err) {
    console.error("[getDisk] - ", err);
    return { disk: null, error: "Ошибка при получении диска" };
  }
};
