"use client";

import Link from "next/link";
import { appRoutes } from "@/shared/constants/app-routes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

interface MachineBreadcrumbProps {
  clusterName: string;
  clusterId: number;
  machineId: number;
  machineHostname: string;
  diskId?: number;
  diskName?: string;
  type?: "machine" | "history" | "disk";
}

export const MachineBreadcrumb = ({
  clusterName,
  clusterId,
  machineId,
  machineHostname,
  diskId,
  diskName,
  type = "machine",
}: MachineBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Cluster Name */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={appRoutes.clustersId(clusterId)}>{clusterName}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>

        {/* Machine */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={appRoutes.machine(clusterId, machineId)}>
              {machineHostname}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* History */}
        {type === "history" && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={appRoutes.machineHistory(clusterId, machineId)}>
                  История
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {/* Disk */}
        {type === "disk" && diskId && diskName && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={appRoutes.disk(clusterId, machineId, diskId)}>
                  {diskName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
