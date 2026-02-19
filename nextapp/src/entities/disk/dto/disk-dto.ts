export interface DiskPropertyDto {
  propertyName: string;
  value: string;
}

export interface DiskDto {
  idDisk: number;
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
