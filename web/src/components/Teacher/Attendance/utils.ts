import type { AttendanceStatus } from '@/types/teacherAttendance';
import { accentFromMap } from '../shared';

const STATUS_ACCENTS: Record<AttendanceStatus, string> = {
  Present: '#5cc789',
  Absent: '#ff7e93',
  Late: '#f5a623',
};

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export function attendanceStatusAccent(status: AttendanceStatus): string {
  return accentFromMap(STATUS_ACCENTS, status);
}

export function attendanceMarkDot(status: AttendanceStatus): string {
  return attendanceStatusAccent(status);
}

export function formatMonthYear(year: number, month: number): string {
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

export function formatAttendanceDate(year: number, month: number, day: number): string {
  return `${MONTH_NAMES[month - 1]} ${day}, ${year}`;
}

export function shiftMonth(
  year: number,
  month: number,
  delta: number
): { year: number; month: number } {
  const date = new Date(year, month - 1 + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

export function clampDay(year: number, month: number, day: number): number {
  const maxDay = new Date(year, month, 0).getDate();
  return Math.min(day, maxDay);
}
