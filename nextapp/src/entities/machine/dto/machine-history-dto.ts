export type MachineHistoryComponentType =
  | "Gpu"
  | "Disk"
  | "MemoryUnit"
  | "Nic"
  | string;

export type MachineHistoryChangeType = "Added" | "Removed" | "Modified" | string;

export interface MachineHistoryItemDto {
  idRecord: number;
  idMachine: number;
  componentType: MachineHistoryComponentType;
  componentName: string;
  changeType: MachineHistoryChangeType;
  changedAt: string;
  isNotified: boolean;
  oldValueJson: Record<string, unknown> | null;
  newValueJson: Record<string, unknown> | null;
}

export interface MachineHistoryDto {
  items: MachineHistoryItemDto[];
  total: number;
  skip: number;
  take: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
