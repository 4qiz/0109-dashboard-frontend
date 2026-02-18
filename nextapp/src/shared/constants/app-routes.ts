export const appRoutes = {
  home: () => `/`,
  clusters: () => `/clusters`,
  clustersId: (id: number) => `/clusters/${id}`,
  machine: (clusterId: number, machineId: number) =>
    `/clusters/${clusterId}/machines/${machineId}`,
};
