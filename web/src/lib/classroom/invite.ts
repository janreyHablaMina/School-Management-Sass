import { formatDateKey } from '@/lib/calendar/dates';
import type { MyClassRow } from '@/types/myClasses';

const INVITE_STORAGE_KEY = 'teachify.classInvites';

export const DEFAULT_INVITE_HOURS = 1;

export const INVITE_QUICK_EXPIRY = [
  { id: '1h' as const, label: 'In 1 hour', hoursFromNow: 1 },
  { id: '6h' as const, label: 'In 6 hours', hoursFromNow: 6 },
  { id: '24h' as const, label: 'In 24 hours', hoursFromNow: 24 },
] as const;

export interface StoredClassInvite {
  code: string;
  classId: number;
  expiresAt: number;
}

function sectionToken(gradeSection: string): string {
  const match = gradeSection.match(/Section\s+(.+)$/i);
  return match?.[1]?.trim() ?? gradeSection.trim();
}

/** Stable invite code for a class (frontend mock — later from API). */
export function classJoinCode(cls: MyClassRow): string {
  const subject =
    cls.subject.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() || 'CLASS';
  const section =
    sectionToken(cls.gradeSection)
      .replace(/[^A-Za-z0-9]/g, '')
      .slice(0, 2)
      .toUpperCase() || 'A';
  const idPart = cls.id.toString(36).toUpperCase().padStart(3, '0').slice(-3);
  return `${subject}${section}-${idPart}`;
}

export function inviteExpiresAt(hours: number, from = Date.now()): number {
  return from + Math.max(1, hours) * 60 * 60 * 1000;
}

export function toDateInputValue(ms: number): string {
  return formatDateKey(new Date(ms));
}

export function toTimeInputValue(ms: number): string {
  const d = new Date(ms);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/** Combine local date (`YYYY-MM-DD`) + time (`HH:MM`) into a timestamp. */
export function combineDateAndTime(date: string, time: string): number | null {
  if (!date.trim() || !time.trim()) return null;
  const parsed = new Date(`${date}T${time}`);
  const ms = parsed.getTime();
  return Number.isFinite(ms) ? ms : null;
}

export function parseInviteExpiry(value: string | null | undefined): number | null {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function isInviteExpired(expiresAt: number | null, now = Date.now()): boolean {
  if (expiresAt == null) return true;
  return now >= expiresAt;
}

export function formatInviteExpiry(expiresAt: number): string {
  return new Date(expiresAt).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatInviteRemaining(expiresAt: number, now = Date.now()): string {
  const ms = Math.max(0, expiresAt - now);
  const totalMins = Math.ceil(ms / 60000);
  if (totalMins <= 1) return 'less than 1 minute';
  if (totalMins < 60) return `${totalMins} minutes`;
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hours < 48) {
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours === 1 ? '' : 's'}`;
  }
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'}`;
}

export function classInvitePath(cls: MyClassRow, expiresAt: number): string {
  const code = encodeURIComponent(classJoinCode(cls));
  return `/login?code=${code}&exp=${expiresAt}`;
}

export function classInviteUrl(cls: MyClassRow, expiresAt: number): string {
  const path = classInvitePath(cls, expiresAt);
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${path}`;
  }
  return path;
}

export function rememberClassInvite(invite: StoredClassInvite) {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(INVITE_STORAGE_KEY);
    const list: StoredClassInvite[] = raw
      ? (JSON.parse(raw) as StoredClassInvite[])
      : [];
    const next = [
      invite,
      ...list.filter(
        (item) => item.code !== invite.code && item.expiresAt > Date.now(),
      ),
    ].slice(0, 20);
    window.localStorage.setItem(INVITE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage failures in mock
  }
}

export function storedInviteExpiry(code: string): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(INVITE_STORAGE_KEY);
    if (!raw) return null;
    const list = JSON.parse(raw) as StoredClassInvite[];
    const normalized = decodeURIComponent(code).trim().toUpperCase();
    const match = list.find((item) => item.code.toUpperCase() === normalized);
    return match?.expiresAt ?? null;
  } catch {
    return null;
  }
}

export function findClassByJoinCode(
  code: string,
  classes: MyClassRow[],
): MyClassRow | null {
  const normalized = decodeURIComponent(code).trim().toUpperCase();
  if (!normalized) return null;
  return classes.find((cls) => classJoinCode(cls) === normalized) ?? null;
}
