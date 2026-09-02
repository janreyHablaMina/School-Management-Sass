import type { StudentGuardian, TeacherStudentRow } from '@/types/teacherStudents';

export type GuardianContactChannel = 'app' | 'email' | 'sms' | 'call';

export interface GuardianChannelOption {
  id: GuardianContactChannel;
  icon: string;
  label: string;
  shortLabel: string;
  hint: string;
  featured?: boolean;
}

export const GUARDIAN_CHANNELS: GuardianChannelOption[] = [
  {
    id: 'app',
    icon: '💬',
    label: 'App message',
    shortLabel: 'App',
    hint: 'Send in Eskwelahan + (parents app)',
    featured: true,
  },
  {
    id: 'email',
    icon: '✉️',
    label: 'Email',
    shortLabel: 'Email',
    hint: 'Open your email app',
  },
  {
    id: 'sms',
    icon: '📱',
    label: 'SMS',
    shortLabel: 'SMS',
    hint: 'Text message to phone',
  },
  {
    id: 'call',
    icon: '📞',
    label: 'Call',
    shortLabel: 'Call',
    hint: 'Dial guardian phone',
  },
];

function phoneDigits(phone: string) {
  return phone.replace(/[^\d+]/g, '');
}

function contactSubject(student: TeacherStudentRow) {
  return `Regarding ${student.fullName} · ${student.classLabel}`;
}

function contactSmsBody(student: TeacherStudentRow) {
  return `Hi, this is about ${student.fullName} (${student.classLabel}).`;
}

export function openGuardianChannel(
  channel: GuardianContactChannel,
  student: TeacherStudentRow,
  guardian: StudentGuardian,
): { title: string; message: string } | null {
  const subject = contactSubject(student);

  switch (channel) {
    case 'email':
      window.location.href = `mailto:${guardian.email}?subject=${encodeURIComponent(subject)}`;
      return null;
    case 'sms': {
      const digits = phoneDigits(guardian.phone);
      if (digits) {
        window.location.href = `sms:${digits}?body=${encodeURIComponent(contactSmsBody(student))}`;
      }
      return null;
    }
    case 'call': {
      const digits = phoneDigits(guardian.phone);
      if (digits) window.location.href = `tel:${digits}`;
      return null;
    }
    case 'app':
      return {
        title: 'App message ready',
        message: `Draft to ${guardian.name} will open in Eskwelahan + Messages once messaging is connected.`,
      };
    default:
      return null;
  }
}
