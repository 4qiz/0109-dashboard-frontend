export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const apiRoutes = {
  login: `${API_BASE_URL}/api/Auth/login`,
  refresh: `${API_BASE_URL}/api/Auth/refresh`,

  getClusters: `${API_BASE_URL}/api/Clusters`,
  getCluster: (id: number) => `${API_BASE_URL}/api/Clusters/${id}`,
  getMachine: (id: number) => `${API_BASE_URL}/api/Machines/${id}`,
  getDisk: (id: number) => `${API_BASE_URL}/api/Disks/${id}`,
};
