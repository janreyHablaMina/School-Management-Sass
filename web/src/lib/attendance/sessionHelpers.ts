import type { AttendanceSessionRecord } from '@/types/attendanceSession';

export const ATTENDANCE_SESSION_EVENT = 'eskwelahan-plus-attendance-session';
export const ATTENDANCE_CHECKINS_EVENT = 'eskwelahan-plus-attendance-checkins';

export function remainingSecondsUntil(endsAt: string, now = Date.now()): number {
  return Math.max(0, Math.floor((new Date(endsAt).getTime() - now) / 1000));
}

export function formatCountdown(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function isSessionLive(
  session: AttendanceSessionRecord | null | undefined,
  remainingSeconds: number
): boolean {
  return Boolean(session && session.status === 'active' && remainingSeconds > 0);
}

/** Subscribe to localStorage + custom events + light polling for cross-tab session updates */
export function subscribeAttendanceUpdates(
  onUpdate: () => void,
  pollMs = 2000
): () => void {
  if (typeof window === 'undefined') return () => {};

  window.addEventListener('storage', onUpdate);
  window.addEventListener(ATTENDANCE_SESSION_EVENT, onUpdate);
  window.addEventListener(ATTENDANCE_CHECKINS_EVENT, onUpdate);
  const poll = window.setInterval(onUpdate, pollMs);

  return () => {
    window.removeEventListener('storage', onUpdate);
    window.removeEventListener(ATTENDANCE_SESSION_EVENT, onUpdate);
    window.removeEventListener(ATTENDANCE_CHECKINS_EVENT, onUpdate);
    window.clearInterval(poll);
  };
}
