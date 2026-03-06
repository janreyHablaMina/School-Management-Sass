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

export function toStudentClassFocus(student: TeacherStudentRow): TeacherClassFocus {
  return {
    gradeSection: student.classLabel,
    subject: student.subject,
    gradeLevel: student.gradeLevel,
  };
}

export function toStudentGradesNav(student: TeacherStudentRow) {
  return {
    tab: 'Grades' as const,
    classFocus: toStudentClassFocus(student),
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
      title: presentLikely ? 'Marked present today' : 'Absence flagged recently',
      meta: `${student.subject} · ${student.classLabel}`,
      when: 'Today',
      tab: 'Attendance',
    },
    {
      id: 'grade',
      tone: gradeTone,
      title:
        gradeTone === 'ok'
          ? `Strong average — ${student.averageGrade.toFixed(1)} (${student.letterGrade})`
          : gradeTone === 'info'
            ? `Holding at ${student.averageGrade.toFixed(1)} (${student.letterGrade})`
            : `Grade needs support — ${student.averageGrade.toFixed(1)} (${student.letterGrade})`,
      meta: `${student.subject} class standing`,
      when: 'This week',
      tab: 'Grades',
    },
    {
      id: 'guardian',
      tone: student.status === 'At Risk' ? 'warn' : 'info',
      title:
        student.status === 'At Risk'
          ? `Follow up with ${guardian?.name ?? 'guardian'}`
          : `Last note shared with ${guardian?.relationship?.toLowerCase() ?? 'guardian'}`,
      meta: guardian?.phone ?? student.phone,
      when: student.status === 'At Risk' ? 'Due soon' : '2 days ago',
    },
    {
      id: 'health',
      tone: student.details.allergies.toLowerCase().includes('none') ? 'info' : 'warn',
      title: student.details.allergies.toLowerCase().includes('none')
        ? 'No allergy alerts on file'
        : `Allergy on file — ${student.details.allergies}`,
      meta: 'Health record',
      when: 'On file',
    },
  ];
}
