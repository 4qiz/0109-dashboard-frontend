import { MachineDto } from "@/entities/machine/dto/machine-dto";

export interface ClusterDto {
  clusterId: number;
  name: string;
  machines: MachineDto[];
}
