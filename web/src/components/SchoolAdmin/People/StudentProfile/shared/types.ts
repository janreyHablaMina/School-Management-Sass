export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  gradeSection: string;
  parentGuardian: string;
  contact: string;
  dateEnrolled: string;
  avatarColor?: string;
  status?: 'Active' | 'Inactive' | 'At Risk' | 'Archived' | string;
  attendanceRate?: number;
  averageGrade?: number;
  letterGrade?: string;
}
