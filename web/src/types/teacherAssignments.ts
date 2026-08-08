import type { TeacherSummaryMetric } from './teacherList';

export type { TeacherSummaryMetric };

export type AssignmentStatus = 'Active' | 'Due Soon' | 'Completed' | 'Draft' | 'Archived';

export type AssignmentType =
  | 'Worksheet'
  | 'Lab Report'
  | 'Project'
  | 'Essay'
  | 'Practice'
  | 'Drawing';

export type AssignmentTab =
  | 'All Assignments'
  | 'Upcoming'
  | 'Pending'
  | 'Graded'
  | 'Draft'
  | 'Archived';

export type AssignmentSort = 'Newest First' | 'Oldest First' | 'Due Date' | 'Title A-Z';

export type AssignmentSummaryMetric = TeacherSummaryMetric;

export interface TeacherAssignmentRow {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
  classLabel: string;
  subject: string;
  type: AssignmentType;
  dueDate: string;
  dueSortKey: string;
  submittedCount: number;
  totalStudents: number;
  averageScore: number | null;
  status: AssignmentStatus;
  createdSortKey: string;
}

export interface TeacherAssignmentsPageData {
  metrics: AssignmentSummaryMetric[];
  assignments: TeacherAssignmentRow[];
  tabs: AssignmentTab[];
  filterOptions: {
    classes: string[];
    subjects: string[];
    statuses: Array<'All Status' | AssignmentStatus>;
    types: Array<'All Types' | AssignmentType>;
    sorts: AssignmentSort[];
  };
}
