export interface DiskPropertyDto {
  propertyName: string;
  displayName?: string;
  value: string;
  isStale: boolean;
}

export interface DiskDto {
  idDisk: number;
  idMachine?: number;
  name: string;
  masterComputer: string;
  serial: string;
  busType: string;
  diskType: string;
  healthStatus: string;
  operationalStatus: "OK" | "WARNING" | "CRITICAL";
  diskProperties: DiskPropertyDto[];
  diskVolumes?: DiskVolumeDto[];
}

export interface DiskVolumeDto {
  guid: string;
  partitionNumber: number;
  letter: string | null;
  label: string;
  fileSystem: string;
  type: string;
  sizeGB: number;
  freeSpaceGB: number;
  usePercentage: number;
  idDisk: number;
}
