import { apiRoutes } from "@/shared/constants/api-routes";
import { DiskPropertyDto } from "../dto/disk-dto";
import { authFetch } from "@/shared/lib/auth/auth-fetch";

export const getDiskPropsAsync = async (
  id: number,
): Promise<{ props: DiskPropertyDto[]; error?: string }> => {
  try {
    const response = await authFetch(apiRoutes.getDiskProps(id));

    if (!response.ok) {
      console.error(
        "[getDiskProps] -",
        `${response.status} - ${response.statusText}`,
      );
      return {
        props: [],
        error: `Ошибка при получении свойств диска`,
      };
    }

    if (response.status === 204) {
      return { props: [] };
    }

    const data = (await response.json()) as DiskPropertyDto[];
    return { props: data || [] };
  } catch (err) {
    console.error("[getDiskProps] - ", err);
    return { props: [], error: "Ошибка при получении свойств диска" };
  }
};
