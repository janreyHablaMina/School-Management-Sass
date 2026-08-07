import type { TeacherSummaryMetric } from './teacherList';

export type { TeacherSummaryMetric };

export type ClassStatus = 'Active' | 'Archived';

export type MyClassSummaryMetric = TeacherSummaryMetric;

export interface MyClassRow {
  id: number;
  subject: string;
  gradeSection: string;
  gradeLevel: string;
  academicYear: string;
  schedule: string;
  room: string;
  studentCount: number;
  attendanceRate: number;
  courseProgress: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  status: ClassStatus;
  accent: string;
  icon: string;
}

export interface MyClassesPageData {
  metrics: MyClassSummaryMetric[];
  classes: MyClassRow[];
  filterOptions: {
    academicYears: string[];
    gradeLevels: string[];
    subjects: string[];
    statuses: Array<'All Status' | ClassStatus>;
  };
}
