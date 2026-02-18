export interface DiskPropertyDto {
  propertyName: string;
  value: string;
}

export interface DiskDto {
  idDisk: number;
  name: string;
  serial: string;
  busType: string;
  diskType: string;
  healthStatus: string;
  operationalStatus: "OK" | "WARNING" | "CRITICAL";
  props: DiskPropertyDto[];
}
