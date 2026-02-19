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
}
