export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const apiRoutes = {
  getClusters: `${API_BASE_URL}/api/DataView/GetClusters`,
  getCluster: (id: number) =>
    `${API_BASE_URL}/api/DataView/GetClusterMachines/${id}`,
};
