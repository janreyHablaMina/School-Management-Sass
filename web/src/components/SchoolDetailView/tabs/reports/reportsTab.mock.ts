// ---------------------------------------------------------------------------
// reportsTab.mock.ts — all hardcoded data for the Reports tab
// ---------------------------------------------------------------------------

export interface MetricCardData {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  delta: string;
  deltaColor: string;
}

export const METRIC_CARDS: MetricCardData[] = [
  {
    icon: '👥',
    iconBg: 'rgba(132, 169, 255, 0.1)',
    iconColor: '#84a9ff',
    label: 'Total Students',
    value: '512',
    delta: '↑ 18 (3.7%) vs Apr 1',
    deltaColor: '#4df58a',
  },
  {
    icon: '👨‍🏫',
    iconBg: 'rgba(77, 245, 138, 0.1)',
    iconColor: '#4df58a',
    label: 'Total Teachers',
    value: '45',
    delta: '↑ 3 (7.1%) vs Apr 1',
    deltaColor: '#4df58a',
  },
  {
    icon: '🏫',
    iconBg: 'rgba(132, 169, 255, 0.1)',
    iconColor: '#84a9ff',
    label: 'Total Sections',
    value: '18',
    delta: '− 0 (0%) vs Apr 1',
    deltaColor: 'rgba(240, 239, 237, 0.45)',
  },
  {
    icon: '📊',
    iconBg: 'rgba(245, 200, 66, 0.1)',
    iconColor: '#f5c842',
    label: 'Attendance Rate',
    value: '92.4%',
    delta: '↑ 4.2% vs Apr 1',
    deltaColor: '#4df58a',
  },
];

// ---------------------------------------------------------------------------

export interface SectionRanking {
  rank: number;
  section: string;
  avg: number;
  medal: string;
}

export const SECTION_RANKINGS: SectionRanking[] = [
  { rank: 1, section: '10A - St. John',      avg: 92.45, medal: '#f5c842' },
  { rank: 2, section: '9A - St. Francis',    avg: 90.12, medal: '#c0c0c0' },
  { rank: 3, section: '8A - St. Benedict',   avg: 89.33, medal: '#cd7f32' },
  { rank: 4, section: '7A - St. Augustine',  avg: 88.76, medal: 'rgba(240,239,237,0.3)' },
  { rank: 5, section: '9B - St. Therese',    avg: 87.91, medal: 'rgba(240,239,237,0.3)' },
];

// ---------------------------------------------------------------------------

export interface AiFeature {
  name: string;
  icon: string;
  count: number;
  pct: number;
  color: string;
}

export const AI_FEATURES: AiFeature[] = [
  { name: 'AI Quiz Generator',        icon: '📝', count: 45, pct: 45, color: '#b884ff' },
  { name: 'AI Assignment Generator',  icon: '📑', count: 20, pct: 20, color: '#ff8a8a' },
  { name: 'AI Reviewer Generator',    icon: '🕵️', count: 20, pct: 20, color: '#84a9ff' },
  { name: 'AI Lesson Summary',        icon: '📚', count: 10, pct: 10, color: '#84a9ff' },
  { name: 'AI Rubric Generator',      icon: '✨', count:  5, pct:  5, color: '#84a9ff' },
];

// ---------------------------------------------------------------------------

export interface ReportItem {
  title: string;
  desc: string;
}

export const REPORT_ITEMS: ReportItem[] = [
  { title: 'Student Enrollment Report',    desc: 'Detailed report of student enrollment and demographics' },
  { title: 'Teacher Activity Report',      desc: 'Overview of teacher activities and engagement' },
  { title: 'Attendance Report',            desc: 'Detailed attendance summary and trends' },
  { title: 'Academic Performance Report',  desc: 'Student performance and grade analysis' },
  { title: 'AI Usage Report',              desc: 'Detailed AI features usage and credit consumption' },
];
