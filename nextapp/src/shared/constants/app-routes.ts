const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || "";

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
    home: () => `${DOMAIN}/`,
    login: () => `${DOMAIN}/login`,
    refresh: () => `${DOMAIN}/publicapi/auth/refresh`,
  },
};
