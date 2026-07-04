// ─── School (Admin List) ──────────────────────────────────────────────────────

export interface School {
  name: string;
  location: string;
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Pending';
  plan: string;
  limit: string;
  students: number;
  teachers: number;
  joined: string;
  renewal: string;
  renewalBadge?: string | null;
  renewalBadgeColor?: string | null;
  revenue: string;
  revenueBadge?: string | null;
}

// ─── School Details (returned by getSchoolDetails) ───────────────────────────

export interface CreditBreakdownItem {
  tool: string;
  count: number;
}

export interface ActivityItem {
  text: string;
  time: string;
}

export interface SchoolDetails {
  principal: string;
  email: string;
  phone: string;
  address: string;
  schoolYear: string;
  id: string;
  sections: number;
  planLimit: string;
  paymentMethod: string;
  creditsUsed: number;
  creditsTotal: number;
  creditsReset: string;
  activities: ActivityItem[];
  creditsBreakdown: CreditBreakdownItem[];
}

// ─── Student ─────────────────────────────────────────────────────────────────

export interface Student {
  name: string;
  id: string;
  grade: string;
  gender: string;
  dob: string;
  status: 'Active' | 'Inactive';
  join: string;
}

// ─── Teacher ─────────────────────────────────────────────────────────────────

export interface Teacher {
  name: string;
  id: string;
  subject: string;
  position: string;
  type: 'Full-time' | 'Part-time';
  status: 'Active' | 'Inactive';
  join: string;
  gender: string;
}

// ─── Section ─────────────────────────────────────────────────────────────────

export interface Section {
  id: string;
  short: string;
  name: string;
  adviser: string;
  students: number;
  capacity: number;
  utilization: number;
  status: 'Active' | 'Near Capacity' | 'Full Capacity';
  year: string;
}

// ─── AI Credit History Entry ─────────────────────────────────────────────────

export interface AICreditEntry {
  date: string;
  feature: string;
  description: string;
  credits: number;
  user: string;
  initials: string;
  role: string;
  avatarColor: string;
}
