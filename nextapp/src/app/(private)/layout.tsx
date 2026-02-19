import { getClustersAsync } from "@/entities/cluster/services/get-clusters";
import { Sidebar } from "@/shared/components/sidebar";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const { clusters } = await getClustersAsync();
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar clusters={clusters} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
