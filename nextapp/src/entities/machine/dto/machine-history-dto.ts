export type MachineHistoryComponentType =
  | "Gpu"
  | "Disk"
  | "MemoryUnit"
  | "Nic"
  | string;

export const MACHINE_HISTORY_CHANGE_TYPE = {
  Added: "Added",
  Removed: "Removed",
  Updated: "Updated",
} as const;

export type MachineHistoryChangeType =
  | (typeof MACHINE_HISTORY_CHANGE_TYPE)[keyof typeof MACHINE_HISTORY_CHANGE_TYPE]
  | string;

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
