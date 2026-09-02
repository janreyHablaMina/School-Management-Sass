import type { TeacherSettingsData } from '@/types/teacherSettings';
import { teacherPortalMock } from './teacherPortal.mock';

const { teacher } = teacherPortalMock;

export const teacherSettingsMock: TeacherSettingsData = {
  profile: {
    fullName: teacher.fullName,
    shortName: teacher.shortName,
    role: teacher.role,
    email: 'sarah.johnson@eskwelahan.edu',
    phone: '+63 917 555 0142',
    department: 'Mathematics & ICT',
    subjects: 'Mathematics, Information Technology',
  },
  notifications: {
    announcementReplies: true,
    assignmentDeadlines: true,
    attendanceReminders: true,
    gradePosts: false,
    calendarEvents: true,
  },
  preferences: {
    defaultClassroom: 'Grade 7 - Section A',
    landingTab: 'Dashboard',
    weekStartsOn: 'Monday',
    timeFormat: '12-hour',
  },
  appearance: {
    density: 'Comfortable',
    accent: 'Chalk yellow',
  },
  classroomOptions: [
    'Grade 7 - Section A',
    'Grade 8 - Section B',
    'Grade 9 - Section A',
    'Grade 10 - ICT',
  ],
  landingTabOptions: [
    'Dashboard',
    'My Classes',
    'Attendance',
    'Grades',
    'Announcements',
    'Calendar',
    'AI Assistant',
  ],
};
