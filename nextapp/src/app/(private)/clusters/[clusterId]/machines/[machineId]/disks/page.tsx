import { appRoutes } from "@/shared/constants/app-routes";
import { redirect } from "next/navigation";

const DisksPage = async () => {
  redirect(appRoutes.home());
};

export default DisksPage;
