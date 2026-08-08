import type {
  AttendanceCheckInPayload,
  AttendanceSessionRecord,
} from '@/types/attendanceSession';
import {
  ATTENDANCE_CHECKINS_STORAGE_KEY,
  ATTENDANCE_SESSION_STORAGE_KEY,
} from '@/lib/mock/attendanceSession.mock';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function readAttendanceSession(): AttendanceSessionRecord | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(ATTENDANCE_SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AttendanceSessionRecord;
  } catch {
    return null;
  }
}

export function writeAttendanceSession(session: AttendanceSessionRecord | null) {
  if (!canUseStorage()) return;
  if (!session) {
    localStorage.removeItem(ATTENDANCE_SESSION_STORAGE_KEY);
    return;
  }
  localStorage.setItem(ATTENDANCE_SESSION_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('teachify-attendance-session'));
}

export function readAttendanceCheckIns(): AttendanceCheckInPayload[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(ATTENDANCE_CHECKINS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AttendanceCheckInPayload[];
  } catch {
    return [];
  }
}

export function writeAttendanceCheckIns(checkIns: AttendanceCheckInPayload[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(ATTENDANCE_CHECKINS_STORAGE_KEY, JSON.stringify(checkIns));
  window.dispatchEvent(new Event('teachify-attendance-checkins'));
}

export function appendAttendanceCheckIn(payload: AttendanceCheckInPayload) {
  const existing = readAttendanceCheckIns();
  const next = [
    ...existing.filter(
      (item) => !(item.sessionId === payload.sessionId && item.studentId === payload.studentId)
    ),
    payload,
  ];
  writeAttendanceCheckIns(next);

  const session = readAttendanceSession();
  if (session && session.id === payload.sessionId && session.status === 'active') {
    const ids = new Set(session.checkedInStudentIds);
    ids.add(payload.studentId);
    writeAttendanceSession({
      ...session,
      checkedInStudentIds: Array.from(ids),
    });
  }

  return payload;
}

export function clearAttendanceSessionStorage() {
  if (!canUseStorage()) return;
  localStorage.removeItem(ATTENDANCE_SESSION_STORAGE_KEY);
  localStorage.removeItem(ATTENDANCE_CHECKINS_STORAGE_KEY);
  window.dispatchEvent(new Event('teachify-attendance-session'));
  window.dispatchEvent(new Event('teachify-attendance-checkins'));
}
