// shared/lib/auth/refresh-lock.ts

import { AuthResponseDto } from "@/entities/user/auth-dto";

type RefreshPromise = Promise<AuthResponseDto>;

const refreshLocks = new Map<string, RefreshPromise>();

export function getRefreshLock(token: string) {
  return refreshLocks.get(token);
}

export function setRefreshLock(token: string, promise: RefreshPromise) {
  refreshLocks.set(token, promise);
}

export function clearRefreshLock(token: string) {
  refreshLocks.delete(token);
}
