export const appRoutes = {
  home: () => `/`,
  login: "/login",
  clusters: () => `/clusters`,
  clustersId: (id: number) => `/clusters/${id}`,
  machine: (clusterId: number, machineId: number) =>
    `/clusters/${clusterId}/machines/${machineId}`,
  disk: (clusterId: number, machineId: number, diskId: number) =>
    `/clusters/${clusterId}/machines/${machineId}/disks/${diskId}`,

  apiLogin: `/api/auth/login`,
  apiRefresh: `/api/auth/refresh`,
  apiMe: "/api/auth/me",
  apiLogout: "/api/auth/logout",
};
