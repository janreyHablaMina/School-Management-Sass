import type { TeacherSummaryMetric } from './teacherList';

export type { TeacherSummaryMetric };

export type LessonStatus = 'Published' | 'Draft' | 'Archived';

export type LessonType =
  | 'Video Lesson'
  | 'Document'
  | 'PDF'
  | 'Presentation'
  | 'Link'
  | 'Text Lesson';

export type LessonTab = 'All Lessons' | 'By Class' | 'By Subject' | 'Recently Updated';

export type LessonSort = 'Newest First' | 'Oldest First' | 'Title A-Z';

export type LessonSummaryMetric = TeacherSummaryMetric;

export interface TeacherLessonRow {
  id: string;
  title: string;
  description: string;
  durationMins: number;
  icon: string;
  accent: string;
  classLabel: string;
  subject: string;
  type: LessonType;
  status: LessonStatus;
  statusDate: string;
  updatedAt: string;
  updatedBy: string;
  updatedSortKey: string;
}

export interface TeacherLessonsPageData {
  metrics: LessonSummaryMetric[];
  lessons: TeacherLessonRow[];
  tabs: LessonTab[];
  filterOptions: {
    classes: string[];
    subjects: string[];
    statuses: Array<'All Status' | LessonStatus>;
    types: Array<'All Types' | LessonType>;
    sorts: LessonSort[];
  };
}
