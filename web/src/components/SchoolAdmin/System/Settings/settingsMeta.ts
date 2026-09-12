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
    key: 'emailAlerts' as keyof NotificationSettings,
    label: 'Critical System Alerts',
    hint: 'Get emails for urgent server or security issues.',
  },
  {
    key: 'smsAlerts' as keyof NotificationSettings,
    label: 'SMS Alerts',
    hint: 'Receive text messages for emergency broadcasts.',
  },
  {
    key: 'inAppAlerts' as keyof NotificationSettings,
    label: 'Portal Notifications',
    hint: 'Show the notification bell for new enrollments and requests.',
  },
  {
    key: 'weeklyDigest' as keyof NotificationSettings,
    label: 'Weekly Digest',
    hint: 'A Friday summary of school performance and metrics.',
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
