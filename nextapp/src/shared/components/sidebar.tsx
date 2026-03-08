"use client";

import { Database, LogOut, Menu, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";
import { appRoutes } from "../constants/app-routes";
import { ClusterListDto } from "@/entities/cluster/dto/cluster-list-dto";
import { logout } from "@/features/auth/actions/logout";

interface SidebarContentProps {
  clusters: { clusterId: number; name: string }[];
  currentClusterId?: string;
  onLinkClick: () => void;
}

const SidebarContent = ({
  clusters,
  currentClusterId,
  onLinkClick,
}: SidebarContentProps) => {
  const hasClusters = clusters.length > 0;

  const handleLogout = () => {
    logout();
  };

  return (
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
          onClick={onLinkClick}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="hidden h-9 lg:block" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {!hasClusters && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground text-center">
              Нет доступных кластеров
            </p>
          </div>
        )}

        {hasClusters && (
          <nav className="space-y-2">
            {clusters.map((cluster) => {
              const isActive = currentClusterId === String(cluster.clusterId);

              return (
                <Link
                  key={cluster.clusterId}
                  href={appRoutes.clustersId(cluster.clusterId)}
                  onClick={onLinkClick}
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
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Logout button */}
      <div className="p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 "
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Выйти из системы
        </Button>
      </div>
    </div>
  );
};

interface SidebarProps {
  clusters: ClusterListDto[];
}

export const Sidebar = ({ clusters }: SidebarProps) => {
  const params = useParams<{ clusterId?: string }>();
  const currentClusterId = params?.clusterId;

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

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
          onClick={handleClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-background border-r z-50 transition-transform duration-300 lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent
          clusters={clusters}
          currentClusterId={currentClusterId}
          onLinkClick={handleClose}
        />
      </aside>
    </>
  );
};
