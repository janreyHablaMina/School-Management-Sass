import type { TeacherSummaryMetric } from './teacherList';

export type { TeacherSummaryMetric };

export type AttendanceStatus = 'Present' | 'Absent' | 'Late';

export type AttendanceViewMode = 'Daily View' | 'Weekly View' | 'Monthly View';

export type AttendanceSummaryMetric = TeacherSummaryMetric;

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

export interface AttendanceClassSection {
  id: string;
  gradeSection: string;
  subject: string;
  room: string;
  schedule: string;
  studentCount: number;
  attendanceRate: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  accent: string;
  icon: string;
  daySummary: AttendanceDaySummary;
  students: AttendanceStudentRow[];
}

export interface TeacherAttendancePageData {
  metrics: AttendanceSummaryMetric[];
  classes: AttendanceClassSection[];
  viewModes: AttendanceViewMode[];
  calendarMonthLabel: string;
  calendarYear: number;
  calendarMonth: number;
  calendarDays: AttendanceDayMark[];
}
