import { ToggleTheme } from "@/shared/components/toggle-theme";
import { Server } from "lucide-react";
import { formatMachinesCount } from "./cluster-container";

export const ClustersHeader = ({
  name,
  machinesCount,
}: {
  name: string;
  machinesCount: number;
}) => {
  return (
    <div className="sticky top-0 z-10 bg-background border-b">
      <div className="container  mx-auto px-4 lg:px-6 py-2 ">
        <div className="flex items-center gap-3 lg:ml-0 ml-14">
          <Server className="h-6 w-6 text-primary shrink-0" />
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="relative overflow-hidden w-full">
              <div className="flex w-max gap-12">
                <h1 className="text-2xl text-nowrap text-clip ">{name}</h1>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background"></div>
            </div>
            <p className="text-sm text-muted-foreground">
              {formatMachinesCount(machinesCount)}
            </p>
          </div>
          <div className="ml-auto">
            <ToggleTheme />
          </div>
        </div>
      </div>
    </div>
  );
};
