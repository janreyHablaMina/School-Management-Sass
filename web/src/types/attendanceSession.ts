import type { AttendanceStatus } from './teacherAttendance';

export interface AttendanceGeoPoint {
  lat: number;
  lng: number;
  accuracyMeters: number | null;
}

export interface AttendanceSchoolConfig {
  radiusOptionsMeters: number[];
  durationOptionsMinutes: number[];
  defaultRadiusMeters: number;
  defaultDurationMinutes: number;
  /** Demo classroom pin used when browser geolocation is unavailable */
  fallbackTeacherLocation: AttendanceGeoPoint;
}

export interface AttendanceSessionRecord {
  id: string;
  classId: string;
  classLabel: string;
  subject: string;
  gradeSection: string;
  room: string;
  teacherName: string;
  center: AttendanceGeoPoint;
  radiusMeters: number;
  durationMinutes: number;
  startedAt: string;
  endsAt: string;
  status: 'active' | 'ended';
  checkedInStudentIds: string[];
}

export interface AttendanceCheckInPayload {
  sessionId: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  checkedInAt: string;
  studentLocation: AttendanceGeoPoint;
  distanceMeters: number;
  withinRadius: boolean;
  status: Extract<AttendanceStatus, 'Present'>;
  source: 'location';
}
