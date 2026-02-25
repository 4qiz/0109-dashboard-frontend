export interface MachineDto {
  idMachine: number;
  hostname: string;
  systemName: string;
  platform: string;
  uefiUUID: string;
  memorySlotsCount?: number;
  memoryUnitsCount?: number;
  maxMemoryCapacity?: number;
  lastUpdate: string; // ISO date
  disks: MachineDiskDto[];
  cpus: CpuDto[];
  memoryUnits?: MemoryUnitDto[];
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

export interface MemoryUnitDto {
  slot: number;
  deviceLocator: string;
  capacityGB: number;
  speedMhz: number;
  manufacturer: string;
  partNumber: string;
  serialNumber: string;
  memoryType: string;
  formFactor: string;
}
