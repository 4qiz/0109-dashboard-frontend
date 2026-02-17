export interface MachineDto {
  idMachine: number;
  hostname: string;
  systemName: string;
  platform: string;
  uefiUUID: string;
  lastUpdate: string; // ISO date
  disks: MachineDiskDto[];
  cpus: CpuDto[];
}

export interface MachineDiskDto {
  idDisk: number;
  name: string;
  serial: string;
  busType: string;
  diskType: string;
  healthStatus: string;
  operationalStatus: string;
}

export interface CpuDto {
  systemDeviceId: string;
  name: string;
  manufacturer: string;
  physicalCoreNumber: number;
  logicalCoreNumber: number;
  maxClock: number;
  socketDesignation: string;
  cpuHardwareId: string;
  isVirtualisationEnabled: boolean;
}
