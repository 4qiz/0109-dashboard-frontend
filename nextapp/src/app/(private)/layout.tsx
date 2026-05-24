import { getClustersAsync } from "@/entities/cluster/services/get-clusters";
import { Footer } from "@/shared/components/footer";
import { Sidebar } from "@/shared/components/sidebar";
import { getUser } from "@/shared/lib/auth/auth-server";
import { UserProvider } from "@/shared/lib/user-context";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const { clusters } = await getClustersAsync();
  const user = await getUser();

  return (
    <UserProvider user={user}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar clusters={clusters} />

        <main className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex flex-1 flex-col">
            <div className="flex-1">{children}</div>

            <Footer />
          </div>
        </main>
      </div>
    </UserProvider>
  );
};

export default Layout;
