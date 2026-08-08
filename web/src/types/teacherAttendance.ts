import type { TeacherSummaryMetric } from './teacherList';

export type { TeacherSummaryMetric };

export type AttendanceStatus = 'Present' | 'Absent' | 'Late';

export type AttendanceViewMode = 'Daily View' | 'Weekly View' | 'Monthly View';

export type AttendanceSummaryMetric = TeacherSummaryMetric;

export interface AttendanceClassOption {
  id: string;
  label: string;
}

export interface AttendanceDayMark {
  day: number;
  marks: AttendanceStatus[];
}

export interface AttendanceDaySummary {
  present: number;
  absent: number;
  late: number;
  total: number;
}

export interface AttendanceStudentRow {
  id: string;
  fullName: string;
  studentCode: string;
  initials: string;
  avatarAccent: string;
  status: AttendanceStatus;
  time: string | null;
  notes: string | null;
}

export interface TeacherAttendancePageData {
  metrics: AttendanceSummaryMetric[];
  classOptions: AttendanceClassOption[];
  viewModes: AttendanceViewMode[];
  selectedDateLabel: string;
  calendarMonthLabel: string;
  calendarYear: number;
  calendarMonth: number;
  calendarDays: AttendanceDayMark[];
  daySummary: AttendanceDaySummary;
  students: AttendanceStudentRow[];
}
