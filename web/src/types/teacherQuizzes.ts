import type { TeacherSummaryMetric } from './teacherList';

export type { TeacherSummaryMetric };

export type QuizStatus = 'Active' | 'Upcoming' | 'Completed' | 'Draft' | 'Archived';

export type QuizType = 'Graded' | 'Practice';

export type QuizTab =
  | 'All Quizzes'
  | 'Upcoming'
  | 'Active'
  | 'Completed'
  | 'Draft'
  | 'Archived';

export type QuizSort = 'Newest First' | 'Oldest First' | 'Due Date' | 'Title A-Z';

export type QuizSummaryMetric = TeacherSummaryMetric;

export interface TeacherQuizRow {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
  classLabel: string;
  subject: string;
  type: QuizType;
  questionCount: number;
  questionFormat: string;
  dueDate: string;
  dueTime: string;
  dueSortKey: string;
  attemptCount: number;
  totalStudents: number;
  averageScore: number | null;
  status: QuizStatus;
  createdSortKey: string;
}

export interface TeacherQuizzesPageData {
  metrics: QuizSummaryMetric[];
  quizzes: TeacherQuizRow[];
  tabs: QuizTab[];
  filterOptions: {
    classes: string[];
    subjects: string[];
    statuses: Array<'All Status' | QuizStatus>;
    types: Array<'All Types' | QuizType>;
    sorts: QuizSort[];
  };
}
