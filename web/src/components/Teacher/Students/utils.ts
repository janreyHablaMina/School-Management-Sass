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

export function attendanceBarColor(rate: number): string {
  if (rate >= 90) return '#5cc789';
  if (rate >= 80) return '#84a9ff';
  if (rate >= 70) return '#f5a623';
  return '#ff7e93';
}

export function statusAccent(status: StudentStatus): string {
  return status === 'Active' ? '#5cc789' : '#f5a623';
}

export function toStudentClassFocus(student: TeacherStudentRow): TeacherClassFocus {
  return {
    gradeSection: student.classLabel,
    subject: student.subject,
    gradeLevel: student.gradeLevel,
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

export type GuardianContactChannel = 'app' | 'email' | 'sms' | 'call';

export function contactSubject(student: TeacherStudentRow): string {
  return `Regarding ${student.fullName} · ${student.classLabel}`;
}

export function contactSmsBody(student: TeacherStudentRow): string {
  return `Hi, this is about ${student.fullName} (${student.classLabel}).`;
}

export function emailContact(email: string, subject: string) {
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export function smsContact(phone: string, body: string) {
  const digits = phone.replace(/[^\d+]/g, '');
  if (!digits) return;
  window.location.href = `sms:${digits}?body=${encodeURIComponent(body)}`;
}

export function callPhone(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '');
  if (!digits) return;
  window.location.href = `tel:${digits}`;
}

/** Prefer primary guardian email; falls back to student email. */
export function messageGuardian(student: TeacherStudentRow) {
  const guardian = primaryGuardian(student);
  emailContact(guardian?.email ?? student.email, contactSubject(student));
}

export function openGuardianChannel(
  channel: GuardianContactChannel,
  student: TeacherStudentRow,
  guardian: StudentGuardian,
): { title: string; message: string } | null {
  const subject = contactSubject(student);

  switch (channel) {
    case 'email':
      emailContact(guardian.email, subject);
      return null;
    case 'sms':
      smsContact(guardian.phone, contactSmsBody(student));
      return null;
    case 'call':
      callPhone(guardian.phone);
      return null;
    case 'app':
      return {
        title: 'App message ready',
        message: `Draft to ${guardian.name} will open in Teachify Messages once messaging is connected.`,
      };
    default:
      return null;
  }
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
