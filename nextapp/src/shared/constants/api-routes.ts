export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const apiRoutes = {
  login: `${API_BASE_URL}/api/Auth/login`,
  refresh: `${API_BASE_URL}/api/Auth/refresh`,

  getClusters: `${API_BASE_URL}/api/Clusters`,
  getCluster: (id: number) => `${API_BASE_URL}/api/Clusters/${id}`,
  getClusterDisks: (id: number) => `${API_BASE_URL}/api/Clusters/${id}/Disks`,
  getMachine: (id: number) => `${API_BASE_URL}/api/Machines/${id}`,
  getMachineHistory: (id: number, take = 100, skip = 0) =>
    `${API_BASE_URL}/api/Machine/${id}/History?take=${take}&skip=${skip}`,
  getDisk: (id: number) => `${API_BASE_URL}/api/Disks/${id}`,
  getDiskProps: (id: number) => `${API_BASE_URL}/api/Disks/${id}/UnifiedProps`,
};
