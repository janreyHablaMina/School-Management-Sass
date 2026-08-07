import type { LetterGrade, StudentStatus } from '@/types/teacherStudents';

export function letterGradeAccent(grade: LetterGrade): string {
  if (grade.startsWith('A')) return '#5cc789';
  if (grade.startsWith('B')) return '#84a9ff';
  if (grade.startsWith('C')) return '#f5a623';
  return '#ff7e93';
}

export function attendanceBarColor(rate: number): string {
  if (rate >= 90) return '#5cc789';
  if (rate >= 80) return '#84a9ff';
  if (rate >= 70) return '#f5a623';
  return '#ff7e93';
}

export function statusAccent(status: StudentStatus): string {
  return status === 'Active' ? '#5cc789' : '#f5a623';
}
