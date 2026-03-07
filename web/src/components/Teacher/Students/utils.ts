import type { TeacherClassFocus } from '@/lib/teacher/classFocus';
import type {
  LetterGrade,
  StudentGuardian,
  StudentGuardianFormInput,
  StudentProfileFormInput,
  StudentStatus,
  TeacherStudentRow,
} from '@/types/teacherStudents';

export type StudentProfileFormValues = StudentProfileFormInput;

export function initialsFromName(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function guardianToFormInput(guardian: StudentGuardian): StudentGuardianFormInput {
  return {
    name: guardian.name,
    relationship: guardian.relationship,
    phone: guardian.phone,
    email: guardian.email,
    occupation: guardian.occupation ?? '',
  };
}

export function studentToFormValues(student: TeacherStudentRow): StudentProfileFormValues {
  const guardians = student.details.guardians.map(guardianToFormInput);
  if (guardians.length === 0) {
    guardians.push({
      name: '',
      relationship: 'Parent',
      phone: '',
      email: '',
      occupation: '',
    });
  }

  return {
    fullName: student.fullName,
    phone: student.phone,
    email: student.email,
    status: student.status,
    address: student.details.address,
    allergies: student.details.allergies,
    medicalNotes: student.details.medicalNotes,
    teacherNotes: student.details.teacherNotes,
    photoUrl: student.photoUrl ?? null,
    guardians,
    emergencyContact: {
      name: student.details.emergencyContact.name,
      relationship: student.details.emergencyContact.relationship,
      phone: student.details.emergencyContact.phone,
    },
    classLabel: student.classLabel,
    subject: student.subject,
    gradeLevel: student.gradeLevel,
  };
}

export function emptyStudentFormValues(
  defaults?: Partial<StudentProfileFormValues>,
): StudentProfileFormValues {
  return {
    fullName: '',
    phone: '',
    email: '',
    status: 'Active',
    address: '',
    allergies: 'None on file',
    medicalNotes: '',
    teacherNotes: '',
    photoUrl: null,
    classLabel: '',
    subject: '',
    gradeLevel: '',
    ...defaults,
    guardians: defaults?.guardians ?? [
      {
        name: '',
        relationship: 'Parent',
        phone: '',
        email: '',
        occupation: '',
      },
    ],
    emergencyContact: defaults?.emergencyContact ?? {
      name: '',
      relationship: 'Parent',
      phone: '',
    },
  };
}

export type StudentEditStep = 0 | 1 | 2;

export const STUDENT_EDIT_STEPS = [
  { id: 0 as const, label: 'Student' },
  { id: 1 as const, label: 'Family' },
  { id: 2 as const, label: 'Health' },
] as const;

export function getStudentFormStepError(
  step: StudentEditStep,
  values: StudentProfileFormValues,
  options?: { requireClassPlacement?: boolean },
): string | null {
  if (step === 0) {
    if (!values.fullName.trim()) return 'Student name is required.';
    if (!values.phone.trim()) return 'Student phone number is required.';
    if (!values.email.trim()) return 'Student email is required.';
    if (!values.email.includes('@')) return 'Enter a valid student email address.';
    if (!values.address.trim()) return 'Home address is required.';
    if (options?.requireClassPlacement) {
      if (!values.classLabel?.trim()) return 'Class is required.';
      if (!values.subject?.trim()) return 'Subject is required.';
      if (!values.gradeLevel?.trim()) return 'Grade level is required.';
    }
    return null;
  }

  if (step === 1) {
    const primary = values.guardians[0];
    if (!primary?.name.trim()) return 'Primary guardian name is required.';
    if (!primary.phone.trim()) return 'Primary guardian phone is required.';
    if (primary.email.trim() && !primary.email.includes('@')) {
      return 'Enter a valid primary guardian email.';
    }

    for (let i = 1; i < values.guardians.length; i += 1) {
      const guardian = values.guardians[i];
      const hasAny =
        guardian.name.trim() ||
        guardian.phone.trim() ||
        guardian.email.trim() ||
        guardian.occupation.trim();
      if (!hasAny) continue;
      if (!guardian.name.trim()) return `Guardian ${i + 1} name is required.`;
      if (!guardian.phone.trim()) return `Guardian ${i + 1} phone is required.`;
      if (guardian.email.trim() && !guardian.email.includes('@')) {
        return `Enter a valid email for guardian ${i + 1}.`;
      }
    }

    if (!values.emergencyContact.name.trim()) {
      return 'Emergency contact name is required.';
    }
    if (!values.emergencyContact.phone.trim()) {
      return 'Emergency contact phone is required.';
    }
    return null;
  }

  return null;
}

export function getStudentFormError(values: StudentProfileFormValues): string | null {
  return (
    getStudentFormStepError(0, values) ??
    getStudentFormStepError(1, values) ??
    getStudentFormStepError(2, values)
  );
}

export const STUDENT_PHOTO_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';
export const STUDENT_PHOTO_MAX_BYTES = 2 * 1024 * 1024;

export function readStudentPhotoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Choose a JPG, PNG, WEBP, or GIF image.'));
      return;
    }
    if (file.size > STUDENT_PHOTO_MAX_BYTES) {
      reject(new Error('Photo must be 2 MB or smaller.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('Could not read that image.'));
    };
    reader.onerror = () => reject(new Error('Could not read that image.'));
    reader.readAsDataURL(file);
  });
}

function mergeGuardians(
  existing: StudentGuardian[],
  input: StudentGuardianFormInput[],
): StudentGuardian[] {
  return input
    .filter((item, index) => {
      if (index === 0) return true;
      return Boolean(
        item.name.trim() ||
          item.phone.trim() ||
          item.email.trim() ||
          item.occupation.trim(),
      );
    })
    .map((item, index) => {
      const prior = existing[index];
      return {
        name: item.name.trim(),
        relationship: item.relationship.trim() || 'Guardian',
        phone: item.phone.trim(),
        email: item.email.trim(),
        occupation: item.occupation.trim() || undefined,
        isPrimary: prior?.isPrimary ?? index === 0,
        isLegalGuardian: prior?.isLegalGuardian,
        appLinked: prior?.appLinked,
      };
    });
}

export function applyStudentFormInput(
  student: TeacherStudentRow,
  input: StudentProfileFormInput,
): TeacherStudentRow {
  const fullName = input.fullName.trim();
  return {
    ...student,
    fullName,
    initials: initialsFromName(fullName) || student.initials,
    phone: input.phone.trim(),
    email: input.email.trim(),
    status: input.status,
    photoUrl: input.photoUrl,
    details: {
      ...student.details,
      address: input.address.trim(),
      allergies: input.allergies.trim() || 'None on file',
      medicalNotes: input.medicalNotes.trim() || 'No medical notes on file.',
      teacherNotes: input.teacherNotes.trim() || 'No special notes.',
      guardians: mergeGuardians(student.details.guardians, input.guardians),
      emergencyContact: {
        name: input.emergencyContact.name.trim(),
        relationship: input.emergencyContact.relationship.trim() || 'Emergency',
        phone: input.emergencyContact.phone.trim(),
      },
    },
  };
}

const AVATAR_ACCENTS = [
  '#b68eff',
  '#5cc789',
  '#ff7e93',
  '#84a9ff',
  '#f5c842',
  '#f5a623',
  '#6ed9a0',
  '#c9a8ff',
];

function nextStudentIdentity(students: TeacherStudentRow[]) {
  let max = 0;
  for (const student of students) {
    const match = student.idNumber.match(/(\d+)$/);
    if (match) max = Math.max(max, Number(match[1]));
    const codeMatch = student.studentCode.match(/(\d+)$/);
    if (codeMatch) max = Math.max(max, Number(codeMatch[1]));
  }
  const next = String(max + 1).padStart(4, '0');
  return {
    id: `new-${max + 1}`,
    idNumber: `2026-${next}`,
    studentCode: `STU-2026-${next}`,
  };
}

function enrollmentDateLabel(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function gradeLevelFromClassLabel(classLabel: string) {
  const match = classLabel.match(/Grade\s+\d+/i);
  return match?.[0] ?? 'Grade 7';
}

export function buildStudentFromInput(
  input: StudentProfileFormInput,
  students: TeacherStudentRow[],
): TeacherStudentRow {
  const fullName = input.fullName.trim();
  const classLabel = input.classLabel?.trim() || 'Grade 7 - Section A';
  const subject = input.subject?.trim() || 'Mathematics';
  const gradeLevel =
    input.gradeLevel?.trim() || gradeLevelFromClassLabel(classLabel);
  const identity = nextStudentIdentity(students);
  const guardians = mergeGuardians([], input.guardians);
  const primary = guardians[0];
  const emergency = {
    name: input.emergencyContact.name.trim(),
    relationship: input.emergencyContact.relationship.trim() || 'Emergency',
    phone: input.emergencyContact.phone.trim(),
  };

  return {
    id: identity.id,
    fullName,
    studentCode: identity.studentCode,
    idNumber: identity.idNumber,
    initials: initialsFromName(fullName) || 'ST',
    avatarAccent: AVATAR_ACCENTS[students.length % AVATAR_ACCENTS.length],
    photoUrl: input.photoUrl,
    classLabel,
    subject,
    classFilter: classLabel,
    gradeLevel,
    phone: input.phone.trim(),
    email: input.email.trim(),
    attendanceRate: 100,
    averageGrade: 0,
    letterGrade: 'C',
    status: input.status,
    details: {
      gender: 'Male',
      birthDate: 'January 1, 2013',
      age: 13,
      address: input.address.trim(),
      enrollmentDate: enrollmentDateLabel(),
      lrn: `1${identity.idNumber.replace(/-/g, '')}`.padEnd(12, '0').slice(0, 12),
      guardians,
      emergencyContact: emergency,
      authorizedPickup: primary
        ? [
            {
              name: primary.name,
              relationship: primary.relationship,
              phone: primary.phone,
            },
          ]
        : [],
      allergies: input.allergies.trim() || 'None on file',
      medicalNotes: input.medicalNotes.trim() || 'No medical notes on file.',
      teacherNotes: input.teacherNotes.trim() || 'No special notes.',
    },
  };
}

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
