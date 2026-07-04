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
      { label: 'Billing', icon: '💳' },
      { label: 'AI Credits', icon: '⚡' },
      { label: 'Users', icon: '👤' },
      { label: 'Support Tickets', icon: '🎫' },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { label: 'Platform Analytics', icon: '📊' },
      { label: 'AI Usage', icon: '⚙️' },
      { label: 'Reports', icon: '📁' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', icon: '⚙️' },
      { label: 'Logs', icon: '📋' },
      { label: 'Activity Logs', icon: '📜' },
    ],
  },
];
