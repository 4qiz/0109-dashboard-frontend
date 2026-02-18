import { appRoutes } from "@/shared/constants/app-routes";
import { redirect } from "next/navigation";

const MachinesPage = async () => {
  redirect(appRoutes.home());
};

export default MachinesPage;
