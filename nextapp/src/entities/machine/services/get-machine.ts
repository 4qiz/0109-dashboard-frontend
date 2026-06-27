import { apiRoutes } from "@/shared/constants/api-routes";
import { MachineDto } from "../dto/machine-dto";
import { authFetch } from "@/shared/lib/auth/auth-fetch";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("getMachine");

export const getMachineAsync = async (
  id: number,
): Promise<{ machine: MachineDto | null; error?: string }> => {
  try {
    const response = await authFetch(apiRoutes.getMachine(id));

    if (!response.ok) {
      logger.warn("failed fetching machine", {
        status: response.status,
        statusText: response.statusText,
      });
      return {
        machine: null,
        error: `Ошибка при получении машины`,
      };
    }

    const data = (await response.json()) as MachineDto;
    return { machine: data || null };
  } catch (err) {
    logger.error("getMachine exception", err);
    return { machine: null, error: "Ошибка при получении машины" };
  }
};
