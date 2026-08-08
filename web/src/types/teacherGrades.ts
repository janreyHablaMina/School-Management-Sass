import type { TeacherSummaryMetric } from './teacherList';

export type { TeacherSummaryMetric };

export type GradeLetter = 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'F';

export type GradeStatus = 'Complete' | 'Incomplete' | 'Needs Attention';

export type GradeTrend = 'up' | 'down' | 'steady';

export type GradeTab = 'All Grades' | 'Needs Attention' | 'Top Performers' | 'Incomplete';

export type GradeSort = 'Highest First' | 'Lowest First' | 'Name A-Z';

export type GradeSummaryMetric = TeacherSummaryMetric;

export interface TeacherGradeRow {
  id: string;
  classId: string;
  fullName: string;
  studentCode: string;
  initials: string;
  avatarAccent: string;
  classLabel: string;
  subject: string;
  term: string;
  overallScore: number;
  letterGrade: GradeLetter;
  assignmentsAvg: number;
  quizzesAvg: number;
  examsAvg: number | null;
  trend: GradeTrend;
  status: GradeStatus;
  lastUpdated: string;
}

export interface GradeClassSection {
  id: string;
  gradeSection: string;
  subject: string;
  room: string;
  schedule: string;
  studentCount: number;
  classAverage: number;
  passingRate: number;
  needsAttention: number;
  incomplete: number;
  accent: string;
  icon: string;
  grades: TeacherGradeRow[];
}

export interface TeacherGradesPageData {
  metrics: GradeSummaryMetric[];
  classes: GradeClassSection[];
  tabs: GradeTab[];
  filterOptions: {
    statuses: Array<'All Status' | GradeStatus>;
    terms: string[];
    sorts: GradeSort[];
  };
}
