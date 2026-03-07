export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

export const appRoutes = {
  home: () => `/`,
  login: "/login",
  clusters: () => `/clusters`,
  clustersId: (id: number) => `/clusters/${id}`,
  machine: (clusterId: number, machineId: number) =>
    `/clusters/${clusterId}/machines/${machineId}`,
  disk: (clusterId: number, machineId: number, diskId: number) =>
    `/clusters/${clusterId}/machines/${machineId}/disks/${diskId}`,

  apiLogin: `${APP_BASE_URL}/api/auth/login`,
  apiRefresh: `${APP_BASE_URL}/api/auth/refresh`,
  apiMe: `${APP_BASE_URL}/api/auth/me`,
  apiLogout: `${APP_BASE_URL}/api/auth/logout`,
};
