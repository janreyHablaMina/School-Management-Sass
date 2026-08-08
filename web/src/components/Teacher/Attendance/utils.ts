import type { AttendanceStatus } from '@/types/teacherAttendance';
import { accentFromMap } from '../shared';

const STATUS_ACCENTS: Record<AttendanceStatus, string> = {
  Present: '#5cc789',
  Absent: '#ff7e93',
  Late: '#f5a623',
};

export function attendanceStatusAccent(status: AttendanceStatus): string {
  return accentFromMap(STATUS_ACCENTS, status);
}

export function attendanceMarkDot(status: AttendanceStatus): string {
  return attendanceStatusAccent(status);
}
