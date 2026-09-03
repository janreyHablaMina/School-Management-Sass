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
  schedule: string; // Keep as fallback/display string
  sessions?: { day: string; startTime: string; endTime: string }[];
  room: string;
  studentCount: number;
  attendanceRate: number;
  courseProgress: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  status: ClassStatus;
  accent: string;
  icon: string;
  coverImage?: string;
}

export interface ClassFormInput {
  subject: string;
  gradeLevel: string;
  section: string;
  academicYear: string;
  room: string;
  days: string[];
  startTime: string;
  endTime: string;
  lessonsTotal?: number;
  coverImage?: string;
}

/** @deprecated Use ClassFormInput */
export type CreateClassInput = ClassFormInput;

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
