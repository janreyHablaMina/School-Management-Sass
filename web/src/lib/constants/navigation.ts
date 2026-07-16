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
