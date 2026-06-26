import { apiRoutes } from "@/shared/constants/api-routes";
import { authFetch } from "@/shared/lib/auth/auth-fetch";
import { MachineHistoryDto } from "../dto/machine-history-dto";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("getMachineHistory");

export const getMachineHistoryAsync = async (
  id: number,
  options?: { take?: number; skip?: number },
): Promise<{ history: MachineHistoryDto | null; error?: string }> => {
  const take = options?.take ?? 100;
  const skip = options?.skip ?? 0;

  try {
    const response = await authFetch(
      apiRoutes.getMachineHistory(id, take, skip),
    );

    if (!response.ok) {
      // 404 означает, что изменений пока нет - это не ошибка
      if (response.status === 404) {
        return {
          history: {
            items: [],
            total: 0,
            skip,
            take,
            hasNext: false,
            hasPrevious: false,
          },
        };
      }

      logger.error("failed fetching machine history", {
        status: response.status,
        statusText: response.statusText,
      });
      return {
        history: null,
        error: "Ошибка при получении истории изменений",
      };
    }

    if (response.status === 204) {
      return {
        history: {
          items: [],
          total: 0,
          skip,
          take,
          hasNext: false,
          hasPrevious: false,
        },
      };
    }

    const data = (await response.json()) as MachineHistoryDto;
    return { history: data };
  } catch (err) {
    logger.error("getMachineHistory exception", err);
    return {
      history: null,
      error: "Ошибка при получении истории изменений",
    };
  }
};
