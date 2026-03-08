import { appRoutes } from "@/shared/constants/app-routes";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const MachinesPage = async () => {
  redirect(appRoutes.home());
};

export default MachinesPage;
