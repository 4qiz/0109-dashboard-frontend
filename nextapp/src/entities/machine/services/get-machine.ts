import { apiRoutes } from "@/shared/constants/api-routes";
import { MachineDto } from "../dto/machine-dto";

export const getMachineAsync = async (
  id: number,
): Promise<{ machine: MachineDto | null; error?: string }> => {
  try {
    const response = await fetch(apiRoutes.getMachine(id));

    if (!response.ok) {
      return {
        machine: null,
        error: `Ошибка ${response.status}: ${response.statusText}`,
      };
    }

    const data = (await response.json()) as MachineDto;
    return { machine: data || null };
  } catch (err) {
    console.error("[getMachine] - ", err);
    return { machine: null, error: "Ошибка при получении машины" };
  }
};
