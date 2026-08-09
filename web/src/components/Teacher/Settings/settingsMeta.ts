import type {
  AppearanceSettings,
  NotificationSettings,
  SettingsSection,
} from '@/types/teacherSettings';

export const SECTION_META: Array<{
  id: SettingsSection;
  icon: string;
  hint: string;
}> = [
  { id: 'Profile', icon: '👤', hint: 'Name & contact' },
  { id: 'Notifications', icon: '🔔', hint: 'Alerts & reminders' },
  { id: 'Preferences', icon: '⚙️', hint: 'Classroom defaults' },
  { id: 'Security', icon: '🔒', hint: 'Password & access' },
  { id: 'Appearance', icon: '🎨', hint: 'Look & density' },
];

export const NOTIFICATION_ITEMS: Array<{
  key: keyof NotificationSettings;
  label: string;
  hint: string;
}> = [
  {
    key: 'announcementReplies',
    label: 'Announcement replies',
    hint: 'When students or parents respond',
  },
  {
    key: 'assignmentDeadlines',
    label: 'Assignment deadlines',
    hint: 'Reminders before work is due',
  },
  {
    key: 'attendanceReminders',
    label: 'Attendance reminders',
    hint: 'Before class sessions start',
  },
  {
    key: 'gradePosts',
    label: 'Grade posts',
    hint: 'When grades are ready to publish',
  },
  {
    key: 'calendarEvents',
    label: 'Calendar events',
    hint: 'Upcoming classes and school events',
  },
];

export const ACCENT_OPTIONS: Array<{
  value: AppearanceSettings['accent'];
  color: string;
}> = [
  { value: 'Chalk yellow', color: '#f5c842' },
  { value: 'Soft green', color: '#5cc789' },
  { value: 'Sky blue', color: '#84a9ff' },
];
