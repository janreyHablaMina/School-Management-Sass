import type { AttendanceSchoolConfig } from '@/types/attendanceSession';

/** School/admin-configurable defaults for location attendance */
export const attendanceSchoolConfigMock: AttendanceSchoolConfig = {
  radiusOptionsMeters: [50, 100, 200],
  durationOptionsMinutes: [5, 10, 15],
  defaultRadiusMeters: 100,
  defaultDurationMinutes: 10,
  fallbackTeacherLocation: {
    // Approximate Manila demo pin (classroom stand-in)
    lat: 14.5995,
    lng: 120.9842,
    accuracyMeters: 12,
  },
};

export const ATTENDANCE_SESSION_STORAGE_KEY = 'eskwelahan-plus.attendanceSession.v1';
export const ATTENDANCE_CHECKINS_STORAGE_KEY = 'eskwelahan-plus.attendanceCheckIns.v1';
