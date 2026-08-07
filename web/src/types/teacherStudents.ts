import type { TeacherSummaryMetric } from './teacherList';

export type { TeacherSummaryMetric };

export type StudentStatus = 'Active' | 'At Risk';

export type LetterGrade = 'A' | 'A-' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';

export type StudentSummaryMetric = TeacherSummaryMetric;

export interface TeacherStudentRow {
  id: string;
  fullName: string;
  studentCode: string;
  idNumber: string;
  initials: string;
  avatarAccent: string;
  classLabel: string;
  subject: string;
  classFilter: string;
  gradeLevel: string;
  phone: string;
  email: string;
  attendanceRate: number;
  averageGrade: number;
  letterGrade: LetterGrade;
  status: StudentStatus;
}

export interface TeacherStudentsPageData {
  metrics: StudentSummaryMetric[];
  students: TeacherStudentRow[];
  filterOptions: {
    classes: string[];
    gradeLevels: string[];
    statuses: Array<'All Status' | StudentStatus>;
  };
}
