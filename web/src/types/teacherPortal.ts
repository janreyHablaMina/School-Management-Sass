export type GrowthTone = 'yellow' | 'green';

export interface TeacherProfile {
  fullName: string;
  shortName: string;
  role: string;
  initials: string;
}

export interface TeacherMetric {
  label: string;
  value: string;
  growth: string;
  growthClass: GrowthTone;
}

export interface ScheduleItem {
  id: number;
  time: string;
  endTime: string;
  title: string;
  subject: string;
  room: string;
  status: 'ongoing' | 'upcoming';
  accent: string;
}

export interface OverviewStat {
  id: number;
  label: string;
  value: string;
  change: string;
  up: boolean;
  stroke: string;
  path: string;
}

export interface ClassPerformance {
  id: number;
  name: string;
  subject: string;
  score: number;
  color: string;
}

export interface AttentionItem {
  id: number;
  name: string;
  detail: string;
  tag: string;
  tagColor: string;
}

export interface AnnouncementItem {
  id: number;
  title: string;
  desc: string;
  date: string;
  audience: string;
  pinned: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface AiTool {
  id: number;
  title: string;
  desc: string;
  icon: string;
  credits: string;
  iconBg: string;
  iconColor: string;
}

export interface AiUsage {
  used: number;
  total: number;
  percent: number;
}

export interface TeacherClass {
  id: number;
  title: string;
  subject: string;
  students: number;
  attendance: number;
  avgGrade: string;
  next: string;
  accent: string;
}

export interface ClassActivity {
  id: number;
  text: string;
  time: string;
  accent: string;
}

export interface DeadlineItem {
  id: number;
  month: string;
  day: string;
  title: string;
  className: string;
  daysLeft: string;
  type: string;
  color: string;
}

export interface TeacherPortalData {
  teacher: TeacherProfile;
  aiCredits: number;
  metrics: TeacherMetric[];
  schedule: ScheduleItem[];
  studentOverview: OverviewStat[];
  classPerformance: ClassPerformance[];
  attentionItems: AttentionItem[];
  announcements: AnnouncementItem[];
  aiTools: AiTool[];
  aiUsage: AiUsage;
  myClasses: TeacherClass[];
  classActivity: ClassActivity[];
  deadlines: DeadlineItem[];
}
