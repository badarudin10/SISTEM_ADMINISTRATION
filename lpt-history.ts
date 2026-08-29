import type { LptInput } from "@shared/lpt";

export const LPT_HISTORY_STORAGE_KEY = "asisten-lpt:history:v1";

export type LptHistoryItem = LptInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function browserStorage(): StorageLike | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function sortNewest(items: LptHistoryItem[]) {
  return [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

function readHistory(storage: StorageLike | null) {
  if (!storage) return [];
  try {
    const stored = storage.getItem(LPT_HISTORY_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? sortNewest(parsed as LptHistoryItem[]) : [];
  } catch {
    return [];
  }
}

function writeHistory(items: LptHistoryItem[], storage: StorageLike | null) {
  if (!storage) return;
  storage.setItem(LPT_HISTORY_STORAGE_KEY, JSON.stringify(sortNewest(items)));
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `lpt-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function listLptHistory(storage: StorageLike | null = browserStorage()) {
  return readHistory(storage);
}

export function getLptHistoryItem(id: string, storage: StorageLike | null = browserStorage()) {
  return readHistory(storage).find(item => item.id === id) ?? null;
}

export function upsertLptHistory(
  input: LptInput,
  existingId?: string | null,
  storage: StorageLike | null = browserStorage(),
) {
  const currentItems = readHistory(storage);
  const existing = existingId ? currentItems.find(item => item.id === existingId) : undefined;
  const now = new Date().toISOString();
  const entry: LptHistoryItem = {
    ...input,
    puskesmas: input.puskesmas.map(item => ({ ...item })),
    id: existing?.id ?? createId(),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  const nextItems = existing
    ? currentItems.map(item => (item.id === entry.id ? entry : item))
    : [entry, ...currentItems];
  writeHistory(nextItems, storage);
  return entry;
}

export function deleteLptHistory(id: string, storage: StorageLike | null = browserStorage()) {
  const currentItems = readHistory(storage);
  const nextItems = currentItems.filter(item => item.id !== id);
  writeHistory(nextItems, storage);
  return nextItems;
}

export function clearLptHistory(storage: StorageLike | null = browserStorage()) {
  if (!storage) return;
  storage.removeItem(LPT_HISTORY_STORAGE_KEY);
}
