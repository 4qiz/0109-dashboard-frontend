import { appRoutes } from "@/shared/constants/app-routes";
import { redirect } from "next/navigation";

const ClustersPage = async () => {
  redirect(appRoutes.home());
};

export default ClustersPage;
