export type SettingsSection =
  | 'Profile'
  | 'Notifications'
  | 'Preferences'
  | 'Security'
  | 'Appearance';

export interface TeacherSettingsProfile {
  fullName: string;
  shortName: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  subjects: string;
}

export interface NotificationSettings {
  announcementReplies: boolean;
  assignmentDeadlines: boolean;
  attendanceReminders: boolean;
  gradePosts: boolean;
  calendarEvents: boolean;
}

export interface PreferenceSettings {
  defaultClassroom: string;
  landingTab: string;
  weekStartsOn: 'Sunday' | 'Monday';
  timeFormat: '12-hour' | '24-hour';
}

export interface AppearanceSettings {
  density: 'Comfortable' | 'Compact';
  accent: 'Chalk yellow' | 'Soft green' | 'Sky blue';
}

export interface TeacherSettingsData {
  profile: TeacherSettingsProfile;
  notifications: NotificationSettings;
  preferences: PreferenceSettings;
  appearance: AppearanceSettings;
  classroomOptions: string[];
  landingTabOptions: string[];
}
