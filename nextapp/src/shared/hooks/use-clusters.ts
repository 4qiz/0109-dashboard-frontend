"use client";

import { ClusterListDto } from "@/entities/cluster/dto/cluster-list-dto";
import useSWR from "swr";
import { getClusters } from "../api/clusters";

export const useClusters = () => {
  const { data, error, isLoading } = useSWR<ClusterListDto[]>(
    "clusters",
    getClusters,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,

      dedupingInterval: 1000 * 60 * 60 * 24, // 24 часа
      focusThrottleInterval: 1000 * 60 * 60 * 24,

      // кэш живёт долго
      keepPreviousData: true,
    },
  );

  return {
    clusters: data ?? [],
    isLoading,
    isError: !!error,
  };
};
