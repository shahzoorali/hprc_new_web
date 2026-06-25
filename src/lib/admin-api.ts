// Server-only client for the PHP admin JSON API (payment/api/admin/*).
//
// Calls are server-to-server: the Next.js server injects X-Admin-Token so the
// browser never sees the secret and the DB/uploads stay behind PHP. Import this
// only from server components / route handlers — never from a "use client" file.
import "server-only";

export type EventKey = "nq" | "ec";

export interface EventEntry {
  id: number;
  event: string;
  horses: string[];
  efi: string[];
}

export interface RegistrationRow {
  id: number;
  name: string | null;
  email: string | null;
  mobile: string | null;
  clubName: string | null;
  amount: string | null;
  order_status: string | null;
  isSuccess: boolean;
  entriesCount: number;
  entries: EventEntry[];
  stablingType: string | null;
  stablingCount: number;
  created_at: string;
  hasDocument: boolean;
}

// Full record: every table column plus derived fields. Columns vary by event
// (NQ adds efiRiderId/isIndian/eventHorseEfi), so index access is permissive.
export interface RegistrationDetail extends Record<string, unknown> {
  id: number;
  isSuccess: boolean;
  entries: EventEntry[];
  entriesCount: number;
  documentPath: string | null;
  documentPath2: string | null;
  headshotPath: string | null;
  horseBreeds: Record<string, string> | null;
}

export interface EventStats {
  total: number;
  success: number;
  failed: number;
  pending: number;
  revenue: number;
  stablesBooked: number;
  entries: number;
}

export interface StatsResponse {
  nq?: EventStats;
  ec?: EventStats;
}

export interface RegistrationFilters {
  status?: string;
  q?: string;
  from?: string;
  to?: string;
}

function apiBase(): string {
  const base = process.env.PAYMENT_API_BASE;
  if (!base) {
    throw new Error("PAYMENT_API_BASE is not set");
  }
  return base.replace(/\/$/, "");
}

function authHeaders(): HeadersInit {
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) {
    throw new Error("ADMIN_API_TOKEN is not set");
  }
  return { "X-Admin-Token": token };
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${apiBase()}/api/admin/${path}`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Admin API ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

function filterQuery(filters: RegistrationFilters): string {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.q) params.set("q", filters.q);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  const s = params.toString();
  return s ? `&${s}` : "";
}

export function getRegistrations(
  event: EventKey,
  filters: RegistrationFilters = {},
): Promise<RegistrationRow[]> {
  return getJson<RegistrationRow[]>(`registrations.php?event=${event}${filterQuery(filters)}`);
}

export function getRegistration(event: EventKey, id: number): Promise<RegistrationDetail> {
  return getJson<RegistrationDetail>(`registration.php?event=${event}&id=${id}`);
}

export function getStats(event: EventKey | "all" = "all"): Promise<StatsResponse> {
  return getJson<StatsResponse>(`stats.php?event=${event}`);
}

export interface StablingSnapshot {
  permanentCapacity: number;
  dailyAvailability: Record<string, number>;
  minAvailable: number;
  lastUpdated: string | null;
}

// Shared August camp stabling availability (NQ + EC). Public PHP endpoint, no
// token; returns daily availability across the camp window. Best-effort — the
// overview tolerates a null result.
export async function getStablingSnapshot(): Promise<StablingSnapshot | null> {
  try {
    const res = await fetch(`${apiBase()}/api/stabling-available-camp.php`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as StablingSnapshot;
  } catch {
    return null;
  }
}
