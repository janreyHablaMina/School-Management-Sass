import type { TeacherClassFocus } from '@/lib/teacher/classFocus';
import type {
  LetterGrade,
  StudentGuardian,
  StudentStatus,
  TeacherStudentRow,
} from '@/types/teacherStudents';

export function letterGradeAccent(grade: LetterGrade): string {
  if (grade.startsWith('A')) return '#5cc789';
  if (grade.startsWith('B')) return '#84a9ff';
  if (grade.startsWith('C')) return '#f5a623';
  return '#ff7e93';
}

/** Row/dossier attendance bars use 90/80/70 thresholds (stricter than shared rateBarColor). */
export function attendanceBarColor(rate: number): string {
  if (rate >= 90) return '#5cc789';
  if (rate >= 80) return '#84a9ff';
  if (rate >= 70) return '#f5a623';
  return '#ff7e93';
}

export function statusAccent(status: StudentStatus): string {
  if (status === 'Active') return '#5cc789';
  if (status === 'At Risk') return '#f5a623';
  return 'rgba(240, 239, 237, 0.55)';
}

export function toStudentClassFocus(
  student: TeacherStudentRow,
  enrolledClass?: { classLabel: string; subject: string; gradeLevel: string }
): TeacherClassFocus {
  return {
    gradeSection: enrolledClass?.classLabel ?? student.classLabel,
    subject: enrolledClass?.subject ?? student.subject,
    gradeLevel: enrolledClass?.gradeLevel ?? student.gradeLevel,
  };
}

export function toStudentGradesNav(
  student: TeacherStudentRow,
  enrolledClass?: { classLabel: string; subject: string; gradeLevel: string }
) {
  return {
    tab: 'Grades' as const,
    classFocus: toStudentClassFocus(student, enrolledClass),
    studentFocus: {
      fullName: student.fullName,
      studentCode: student.studentCode,
    },
  };
}

export function primaryGuardian(student: TeacherStudentRow): StudentGuardian | null {
  const { guardians } = student.details;
  return (
    guardians.find((item) => item.isPrimary) ??
    guardians.find((item) => item.isLegalGuardian) ??
    guardians[0] ??
    null
  );
}

export interface StudentActivityItem {
  id: string;
  tone: 'ok' | 'warn' | 'info';
  title: string;
  meta: string;
  when: string;
  tab?: string;
}

/** Lightweight session activity derived from the student record (frontend mock). */
export function buildStudentActivity(student: TeacherStudentRow): StudentActivityItem[] {
  const guardian = primaryGuardian(student);
  const presentLikely = student.attendanceRate >= 85;
  const gradeTone =
    student.averageGrade >= 85 ? 'ok' : student.averageGrade >= 75 ? 'info' : 'warn';

  return [
    {
      id: 'attendance',
      tone: presentLikely ? 'ok' : 'warn',
      title: presentLikely ? 'Present to this class' : 'Absent from this class',
      meta: `${student.subject} · ${student.classLabel}`,
      when: 'Today',
      tab: 'Attendance',
    },
    {
      id: 'quiz',
      tone: 'ok',
      title: 'Submitted Quiz: Linear Equations',
      meta: `Scored ${Math.round(student.averageGrade)}%`,
      when: 'Yesterday',
      tab: 'Grades',
    },
    {
      id: 'assignment',
      tone: 'info',
      title: 'Completed Assignment: Chapter 4',
      meta: 'On time delivery',
      when: '2 days ago',
      tab: 'Assignments',
    },
    {
      id: 'guardian',
      tone: student.status === 'At Risk' ? 'warn' : 'info',
      title:
        student.status === 'At Risk'
          ? `Missing Homework: Follow up with ${guardian?.name ?? 'guardian'}`
          : `Note shared with ${guardian?.relationship?.toLowerCase() ?? 'guardian'}`,
      meta: guardian?.phone ?? student.phone,
      when: student.status === 'At Risk' ? 'Due soon' : 'Last week',
    },
  ];
}
