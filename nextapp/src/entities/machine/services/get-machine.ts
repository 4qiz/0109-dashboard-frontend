import { apiRoutes } from "@/shared/constants/api-routes";
import { MachineDto } from "../dto/machine-dto";
import { authFetch } from "@/shared/lib/auth/auth-fetch";

export const getMachineAsync = async (
  id: number,
): Promise<{ machine: MachineDto | null; error?: string }> => {
  try {
    const response = await authFetch(apiRoutes.getMachine(id));

    if (!response.ok) {
      console.error(
        "[getMachine] -",
        `${response.status} - ${response.statusText}`,
      );
      return {
        machine: null,
        error: `Ошибка при получении машины`,
      };
    }

    const data = (await response.json()) as MachineDto;
    return { machine: data || null };
  } catch (err) {
    console.error("[getMachine] - ", err);
    return { machine: null, error: "Ошибка при получении машины" };
  }
};
