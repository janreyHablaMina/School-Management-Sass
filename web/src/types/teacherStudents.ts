import type { TeacherSummaryMetric } from './teacherList';

export type { TeacherSummaryMetric };

export type StudentStatus = 'Active' | 'At Risk';

export type LetterGrade = 'A' | 'A-' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';

export type StudentSummaryMetric = TeacherSummaryMetric;

export interface StudentGuardian {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  occupation?: string;
  isPrimary?: boolean;
  isLegalGuardian?: boolean;
  /** Parent has the Teachify app linked. */
  appLinked?: boolean;
}

export interface StudentEmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface StudentAuthorizedPickup {
  name: string;
  relationship: string;
  phone: string;
}

/** Profile fields shown on the student detail hub. */
export interface TeacherStudentDetails {
  gender: 'Male' | 'Female';
  birthDate: string;
  age: number;
  address: string;
  enrollmentDate: string;
  lrn: string;
  guardians: StudentGuardian[];
  emergencyContact: StudentEmergencyContact;
  authorizedPickup: StudentAuthorizedPickup[];
  allergies: string;
  medicalNotes: string;
  teacherNotes: string;
}

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
  details: TeacherStudentDetails;
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
