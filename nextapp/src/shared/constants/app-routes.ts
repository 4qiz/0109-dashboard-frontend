export const APP_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "Missing environment variable";

export const appRoutes = {
  home: () => `/`,
  login: `/login`,
  clusters: () => `/clusters`,
  clustersId: (id: number) => `/clusters/${id}`,
  machine: (clusterId: number, machineId: number) =>
    `/clusters/${clusterId}/machines/${machineId}`,
  disk: (clusterId: number, machineId: number, diskId: number) =>
    `/clusters/${clusterId}/machines/${machineId}/disks/${diskId}`,

  apiLogin: `/publicapi/auth/login`,
  apiRefresh: `/publicapi/auth/refresh`,
  apiMe: `/publicapi/auth/me`,
  apiLogout: `/publicapi/auth/logout`,

  abs: {
    home: () => `${APP_BASE_URL}/`,
    login: () => `${APP_BASE_URL}/login`,
    refresh: () => `${APP_BASE_URL}/publicapi/auth/refresh`,
  },
};
