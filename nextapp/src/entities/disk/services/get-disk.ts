import { apiRoutes } from "@/shared/constants/api-routes";
import { DiskDto } from "../dto/disk-dto";

export const getDiskAsync = async (
  id: number,
): Promise<{ disk: DiskDto | null; error?: string }> => {
  try {
    const response = await fetch(apiRoutes.getDisk(id));

    if (!response.ok) {
      return {
        disk: null,
        error: `Ошибка ${response.status}: ${response.statusText}`,
      };
    }

    const data = (await response.json()) as DiskDto;
    return { disk: data || null };
  } catch (err) {
    console.error("[getDisk] - ", err);
    return { disk: null, error: "Ошибка при получении диска" };
  }
};
