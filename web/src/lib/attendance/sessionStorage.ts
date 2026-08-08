import type {
  AttendanceCheckInPayload,
  AttendanceSessionRecord,
} from '@/types/attendanceSession';
import {
  ATTENDANCE_CHECKINS_STORAGE_KEY,
  ATTENDANCE_SESSION_STORAGE_KEY,
} from '@/lib/mock/attendanceSession.mock';
import {
  ATTENDANCE_CHECKINS_EVENT,
  ATTENDANCE_SESSION_EVENT,
} from './sessionHelpers';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function emit(eventName: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(eventName));
}

export function readAttendanceSession(): AttendanceSessionRecord | null {
  return readJson<AttendanceSessionRecord | null>(ATTENDANCE_SESSION_STORAGE_KEY, null);
}

export function writeAttendanceSession(session: AttendanceSessionRecord | null) {
  if (!canUseStorage()) return;
  if (!session) {
    localStorage.removeItem(ATTENDANCE_SESSION_STORAGE_KEY);
  } else {
    localStorage.setItem(ATTENDANCE_SESSION_STORAGE_KEY, JSON.stringify(session));
  }
  emit(ATTENDANCE_SESSION_EVENT);
}

export function readAttendanceCheckIns(): AttendanceCheckInPayload[] {
  return readJson<AttendanceCheckInPayload[]>(ATTENDANCE_CHECKINS_STORAGE_KEY, []);
}

export function writeAttendanceCheckIns(checkIns: AttendanceCheckInPayload[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(ATTENDANCE_CHECKINS_STORAGE_KEY, JSON.stringify(checkIns));
  emit(ATTENDANCE_CHECKINS_EVENT);
}

export function appendAttendanceCheckIn(payload: AttendanceCheckInPayload) {
  const next = [
    ...readAttendanceCheckIns().filter(
      (item) => !(item.sessionId === payload.sessionId && item.studentId === payload.studentId)
    ),
    payload,
  ];
  writeAttendanceCheckIns(next);

  const session = readAttendanceSession();
  if (session && session.id === payload.sessionId && session.status === 'active') {
    writeAttendanceSession({
      ...session,
      checkedInStudentIds: Array.from(
        new Set([...session.checkedInStudentIds, payload.studentId])
      ),
    });
  }

  return payload;
}

export function clearAttendanceSessionStorage() {
  if (!canUseStorage()) return;
  localStorage.removeItem(ATTENDANCE_SESSION_STORAGE_KEY);
  localStorage.removeItem(ATTENDANCE_CHECKINS_STORAGE_KEY);
  emit(ATTENDANCE_SESSION_EVENT);
  emit(ATTENDANCE_CHECKINS_EVENT);
}
