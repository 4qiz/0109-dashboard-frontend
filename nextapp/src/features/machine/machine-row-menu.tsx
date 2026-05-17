import Link from "next/link";
import { appRoutes } from "@/shared/constants/app-routes";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";

interface MachineRowMenuProps {
  clusterId: number;
  machineId: number;
  activePage: "configuration" | "history";
}

export function MachineRowMenu({
  clusterId,
  machineId,
  activePage,
}: MachineRowMenuProps) {
  const items = [
    {
      href: appRoutes.machine(clusterId, machineId),
      label: "Конфигурация",
      active: activePage === "configuration",
    },
    {
      href: appRoutes.machineHistory(clusterId, machineId),
      label: "История",
      active: activePage === "history",
    },
  ];

  return (
    <Card className="mb-6 border-border/60 bg-card/70 p-2 shadow-sm w-full">
      <nav className="flex w-full gap-2 justify-center lg:justify-start">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "h-8 w-full rounded-md border border-transparent px-4 text-center text-sm text-nowrap shadow-sm transition lg:w-auto",
              "flex items-center justify-center text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              "focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none",
              item.active &&
                "border-primary/40 bg-primary/10 text-primary hover:bg-primary/10",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </Card>
  );
}
