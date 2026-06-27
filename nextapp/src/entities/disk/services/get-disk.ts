import { apiRoutes } from "@/shared/constants/api-routes";
import { DiskDto } from "../dto/disk-dto";
import { authFetch } from "@/shared/lib/auth/auth-fetch";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("getDisk");

export const getDiskAsync = async (
  id: number,
): Promise<{ disk: DiskDto | null; error?: string }> => {
  try {
    const response = await authFetch(apiRoutes.getDisk(id));

    if (!response.ok) {
      logger.warn("failed fetching disk", {
        status: response.status,
        statusText: response.statusText,
      });
      return {
        disk: null,
        error: `Ошибка при получении диска`,
      };
    }

    if (response.status === 204) {
      return { disk: null };
    }

    const data = (await response.json()) as DiskDto;
    return { disk: data || null };
  } catch (err) {
    logger.error("getDisk exception", err);
    return { disk: null, error: "Ошибка при получении диска" };
  }
};
