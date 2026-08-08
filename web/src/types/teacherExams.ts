import type { TeacherSummaryMetric } from './teacherList';

export type { TeacherSummaryMetric };

export type ExamStatus = 'Upcoming' | 'Ongoing' | 'Completed' | 'Draft' | 'Archived';

export type ExamType = 'Written' | 'Practical';

export type ExamTab =
  | 'All Exams'
  | 'Upcoming'
  | 'Ongoing'
  | 'Completed'
  | 'Draft'
  | 'Archived';

export type ExamSort = 'Newest First' | 'Oldest First' | 'Due Date' | 'Title A-Z';

export type ExamSummaryMetric = TeacherSummaryMetric;

export interface TeacherExamRow {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
  classLabel: string;
  subject: string;
  type: ExamType;
  examDate: string;
  examTime: string;
  dueSortKey: string;
  duration: string;
  completedCount: number;
  totalStudents: number;
  averageScore: number | null;
  status: ExamStatus;
  createdSortKey: string;
}

export interface TeacherExamsPageData {
  metrics: ExamSummaryMetric[];
  exams: TeacherExamRow[];
  tabs: ExamTab[];
  filterOptions: {
    classes: string[];
    subjects: string[];
    statuses: Array<'All Status' | ExamStatus>;
    types: Array<'All Types' | ExamType>;
    sorts: ExamSort[];
  };
}
