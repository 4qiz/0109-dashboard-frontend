export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

export const appRoutes = {
  home: () => `${APP_BASE_URL}/`,
  login: `${APP_BASE_URL}/login`,
  clusters: () => `${APP_BASE_URL}/clusters`,
  clustersId: (id: number) => `${APP_BASE_URL}/clusters/${id}`,
  machine: (clusterId: number, machineId: number) =>
    `${APP_BASE_URL}/clusters/${clusterId}/machines/${machineId}`,
  disk: (clusterId: number, machineId: number, diskId: number) =>
    `${APP_BASE_URL}/clusters/${clusterId}/machines/${machineId}/disks/${diskId}`,

  apiLogin: `${APP_BASE_URL}/publicapi/auth/login`,
  apiRefresh: `${APP_BASE_URL}/publicapi/auth/refresh`,
  apiMe: `${APP_BASE_URL}/publicapi/auth/me`,
  apiLogout: `${APP_BASE_URL}/publicapi/auth/logout`,
};
