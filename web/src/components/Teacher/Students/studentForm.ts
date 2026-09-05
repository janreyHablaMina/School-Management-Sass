import type {
  StudentGuardian,
  StudentGuardianFormInput,
  StudentProfileFormInput,
  TeacherStudentRow,
} from '@/types/teacherStudents';

export function initialsFromName(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function emptyGuardianInput(): StudentGuardianFormInput {
  return {
    name: '',
    relationship: 'Parent',
    phone: '',
    email: '',
    occupation: '',
  };
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

export function studentToFormValues(student: TeacherStudentRow): StudentProfileFormInput {
  const guardians = student.details.guardians.map(guardianToFormInput);
  if (guardians.length === 0) {
    guardians.push(emptyGuardianInput());
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
    enrolledClasses: student.enrolledClasses,
  };
}

export function emptyStudentFormValues(
  defaults?: Partial<StudentProfileFormInput>,
): StudentProfileFormInput {
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
    enrolledClasses: [{ classLabel: '', subject: '', gradeLevel: '' }],
    ...defaults,
    guardians: defaults?.guardians ?? [emptyGuardianInput()],
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
  values: StudentProfileFormInput,
  options?: { requireClassPlacement?: boolean },
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 0) {
    if (!values.fullName.trim()) errors.fullName = 'Student name is required.';
    if (!values.phone.trim()) errors.phone = 'Student phone number is required.';
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Enter a valid student email address.';
    }
    if (!values.address.trim()) errors.address = 'Home address is required.';
    
    if (options?.requireClassPlacement) {
      if (values.enrolledClasses && values.enrolledClasses.length > 0) {
        values.enrolledClasses.forEach((cls, i) => {
          if (!cls.classLabel?.trim()) errors[`classLabel_${i}`] = 'Class is required.';
          if (!cls.subject?.trim()) errors[`subject_${i}`] = 'Subject is required.';
          if (!cls.gradeLevel?.trim()) errors[`gradeLevel_${i}`] = 'Grade level is required.';
        });
      } else {
        if (!values.classLabel?.trim()) errors.classLabel = 'Class is required.';
        if (!values.subject?.trim()) errors.subject = 'Subject is required.';
        if (!values.gradeLevel?.trim()) errors.gradeLevel = 'Grade level is required.';
      }
    }
  }

  if (step === 1) {
    const primary = values.guardians[0];
    if (!primary?.name.trim()) errors['guardian0.name'] = 'Primary guardian name is required.';
    if (!primary.phone.trim()) errors['guardian0.phone'] = 'Primary guardian phone is required.';
    if (primary.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(primary.email)) {
      errors['guardian0.email'] = 'Enter a valid primary guardian email.';
    }

    for (let i = 1; i < values.guardians.length; i += 1) {
      const guardian = values.guardians[i];
      const hasAny =
        guardian.name.trim() ||
        guardian.phone.trim() ||
        guardian.email.trim() ||
        guardian.occupation.trim();
      if (!hasAny) continue;
      if (!guardian.name.trim()) errors[`guardian${i}.name`] = `Guardian ${i + 1} name is required.`;
      if (!guardian.phone.trim()) errors[`guardian${i}.phone`] = `Guardian ${i + 1} phone is required.`;
      if (guardian.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guardian.email)) {
        errors[`guardian${i}.email`] = `Enter a valid email for guardian ${i + 1}.`;
      }
    }

    if (!values.emergencyContact.name.trim()) {
      errors['emergencyContact.name'] = 'Emergency contact name is required.';
    }
    if (!values.emergencyContact.phone.trim()) {
      errors['emergencyContact.phone'] = 'Emergency contact phone is required.';
    }
  }

  return errors;
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
    enrolledClasses: input.enrolledClasses || student.enrolledClasses,
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
    enrolledClasses: input.enrolledClasses || [
      { classLabel, subject, gradeLevel },
    ],
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
