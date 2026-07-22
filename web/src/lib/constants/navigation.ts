export interface NavItem {
  label: string;
  icon: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const menuGroups: NavGroup[] = [
  {
    title: 'Management',
    items: [
      { label: 'Schools', icon: '🏫' },
      { label: 'Subscriptions', icon: '📝' },
      { label: 'Users', icon: '👤' },
      { label: 'Support Center', icon: '🎫' },
    ],
  },
  {
    title: 'Platform',
    items: [
      { label: 'Reports', icon: '📊' },
      { label: 'Announcements', icon: '📢' },
      { label: 'AI Usage', icon: '⚡' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Audit Logs', icon: '📜' },
      { label: 'Settings', icon: '⚙️' },
    ],
  },
];

export const schoolAdminMenuGroups: NavGroup[] = [
  {
    title: 'People',
    items: [
      { label: 'Students', icon: '👨‍🎓' },
      { label: 'Teachers', icon: '👩‍🏫' },
      { label: 'Parents', icon: '👨‍👩‍👧' },
      { label: 'Classes & Sections', icon: '🏫' },
      { label: 'Subjects', icon: '📚' },
    ],
  },
  {
    title: 'Academics',
    items: [
      { label: 'Attendance', icon: '📅' },
      { label: 'Assignments', icon: '📝' },
      { label: 'Lessons', icon: '📖' },
      { label: 'Quizzes', icon: '📋' },
      { label: 'Grades', icon: '🎓' },
    ],
  },
  {
    title: 'Communication',
    items: [
      { label: 'Announcements', icon: '📢' },
      { label: 'Class Feed', icon: '💬' },
      { label: 'Calendar', icon: '📆' },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { label: 'Reports', icon: '📊' },
      { label: 'AI Assistant', icon: '🤖' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', icon: '⚙️' },
    ],
  },
];
