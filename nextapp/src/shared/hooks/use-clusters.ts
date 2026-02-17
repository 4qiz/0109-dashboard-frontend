"use client";

import { ClusterListDto } from "@/entities/cluster/dto/cluster-list-dto";
import useSWR from "swr";
import { getClusters } from "../api/clusters";

export const useClusters = () => {
  const { data, error, isLoading } = useSWR<ClusterListDto[]>(
    "clusters",
    getClusters,
  );

  return {
    clusters: data ?? [],
    isLoading,
    isError: !!error,
  };
};
