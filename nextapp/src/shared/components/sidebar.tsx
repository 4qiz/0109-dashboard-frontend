"use client";

import { Database, Menu, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";
import { useClusters } from "../hooks/use-clusters";
import { appRoutes } from "../constants/app-routes";

export const Sidebar = () => {
  const params = useParams<{ clusterId?: string }>();
  const currentClusterId = params?.clusterId;

  const { clusters, isLoading, isError } = useClusters();

  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database className="h-6 w-6 text-primary" />
          <h2 className="text-2xl">Кластеры</h2>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5 " />
        </Button>

        <div className="hidden h-9 lg:block"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {isLoading && <SidebarSkeleton />}

        {isError && (
          <div className="text-sm text-destructive p-2">
            Не удалось загрузить кластеры
          </div>
        )}

        {!isLoading && !isError && (
          <nav className="space-y-2">
            {clusters.map((cluster) => {
              const isActive = currentClusterId === String(cluster.clusterId);

              // const machines = cluster.machinesCount ?? 0;

              return (
                <Link
                  key={cluster.clusterId}
                  href={appRoutes.clustersId(cluster.clusterId)}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block p-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent",
                  )}
                >
                  <div className="space-y-2">
                    <p className="font-medium truncate">{cluster.name}</p>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant={isActive ? "secondary" : "outline"}
                        className={cn(
                          "text-xs",
                          isActive &&
                            "bg-primary-foreground/20 text-primary-foreground",
                        )}
                      >
                        ID: {cluster.clusterId}
                      </Badge>

                      {/* <span
                        className={cn(
                          "text-xs",
                          isActive
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground",
                        )}
                      >
                        {machines} {machines === 1 ? "машина" : "машин"}
                      </span> */}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-background shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-background border-r z-50 transition-transform duration-300 lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

const SidebarSkeleton = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 1 }).map((_, i) => (
        <div key={i} className="p-3 rounded-lg border animate-pulse space-y-3">
          <div className="h-5 w-32 bg-muted rounded" />
          <div className="h-5 w-20 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
};
