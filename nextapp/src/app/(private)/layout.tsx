import { getClustersAsync } from "@/entities/cluster/services/get-clusters";
import { Footer } from "@/shared/components/footer";
import { Sidebar } from "@/shared/components/sidebar";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const { clusters } = await getClustersAsync();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar clusters={clusters} />

      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex flex-1 flex-col">
          <div className="flex-1">{children}</div>

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;
