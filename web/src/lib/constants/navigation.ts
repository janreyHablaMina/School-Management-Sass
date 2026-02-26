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
      { label: 'Grades', icon: '🎓' },
    ],
  },
  {
    title: 'Communication',
    items: [
      { label: 'Announcements', icon: '📢' },
      { label: 'Calendar', icon: '📆' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Finances', icon: '💰' },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { label: 'Reports', icon: '📊' },
      { label: 'PieYah Assistant', icon: '🤖' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', icon: '⚙️' },
    ],
  },
];

export const teacherMenuGroups: NavGroup[] = [
  {
    title: 'Classroom',
    items: [
      { label: 'My Classes', icon: '🏫' },
      { label: 'Students', icon: '👨‍🎓' },
      { label: 'Lessons', icon: '📖' },
      { label: 'Assignments', icon: '📝' },
      { label: 'Quizzes', icon: '📋' },
      { label: 'Exams', icon: '📄' },
    ],
  },
  {
    title: 'Tracking',
    items: [
      { label: 'Attendance', icon: '✅' },
      { label: 'Grades', icon: '🎓' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { label: 'Announcements', icon: '📢' },
      { label: 'Calendar', icon: '📅' },
      { label: 'PieYah Assistant', icon: '✨' },
      { label: 'Settings', icon: '⚙️' },
    ],
  },
];

export const studentMenuGroups: NavGroup[] = [
  {
    title: 'Academics',
    items: [
      { label: 'My Subjects', icon: '📚' },
      { label: 'Class Schedule', icon: '⏰' },
      { label: 'Assignments', icon: '📝' },
      { label: 'Quizzes & Exams', icon: '📄' },
      { label: 'Grades (Form 138)', icon: '🎓' },
      { label: 'Attendance', icon: '✅' },
    ],
  },
  {
    title: 'Student Life',
    items: [
      { label: 'Clubs & Orgs', icon: '🏅' },
      { label: 'Clearance Status', icon: '📋' },
      { label: 'Clinic & Health', icon: '🏥' },
      { label: 'Guidance Office', icon: '🤝' },
    ],
  },
  {
    title: 'Communication',
    items: [
      { label: 'Announcements', icon: '📢' },
      { label: 'Calendar', icon: '📅' },
      { label: 'Messages', icon: '💬' },
    ],
  },
  {
    title: 'Finances',
    items: [
      { label: 'Tuition & Fees', icon: '💰' },
      { label: 'Payment History', icon: '🧾' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Digital ID & Pass', icon: '📱' },
      { label: 'Library & E-Books', icon: '📖' },
      { label: 'Downloadable Forms', icon: '📥' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'My Profile', icon: '👤' },
      { label: 'Documents', icon: '📁' },
      { label: 'Settings', icon: '⚙️' },
    ],
  },
];
