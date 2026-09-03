import { teacherLessonsPageMock } from '@/lib/mock/teacherLessons.mock';
import { teacherStudentsPageMock } from '@/lib/mock/teacherStudents.mock';
import { parseSectionFromGradeSection } from '@/lib/classroom';
import type { ClassFormInput, MyClassRow } from '@/types/myClasses';
import type { TeacherSummaryMetric } from '@/types/teacherList';
import type { TeacherLessonRow } from '@/types/teacherLessons';
import type { TeacherStudentRow } from '@/types/teacherStudents';

export const CLASS_WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const TIME_OPTIONS = Array.from({ length: 48 }).map((_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

export interface ClassFormValues {
  subject: string;
  gradeLevel: string;
  section: string;
  academicYear: string;
  room: string;
  days: string[];
  startTime: string;
  endTime: string;
}

const SUBJECT_STYLE: Record<string, { accent: string; icon: string }> = {
  Mathematics: { accent: '#b68eff', icon: '∑' },
  Science: { accent: '#5cc789', icon: '🔬' },
  English: { accent: '#84a9ff', icon: 'Aa' },
  ICT: { accent: '#f5a623', icon: '</>' },
};

const FALLBACK_STYLES = [
  { accent: '#c9a8ff', icon: '📚' },
  { accent: '#6ed9a0', icon: '✦' },
  { accent: '#ff7e93', icon: '◎' },
];

function styleForSubject(subject: string, nextId: number) {
  return (
    SUBJECT_STYLE[subject] ?? FALLBACK_STYLES[nextId % FALLBACK_STYLES.length]
  );
}

export function formatTimeLabel(value: string): string {
  const [hourRaw, minute = '00'] = value.split(':');
  const hour = Number(hourRaw);
  if (Number.isNaN(hour)) return value;
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${period}`;
}

function parseTimeToInput(label: string): string | null {
  const match = label.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = match[2];
  const period = match[3].toUpperCase();
  if (period === 'PM' && hour < 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return `${String(hour).padStart(2, '0')}:${minute}`;
}

export function formatClassSchedule(
  days: string[],
  startTime: string,
  endTime: string,
): string {
  return `${days.join(', ')} · ${formatTimeLabel(startTime)} - ${formatTimeLabel(endTime)}`;
}

export function parseScheduleParts(schedule: string): {
  days: string[];
  startTime: string;
  endTime: string;
} {
  const fallback = {
    days: ['Mon', 'Wed', 'Fri'] as string[],
    startTime: '08:00',
    endTime: '09:00',
  };

  if (!schedule || schedule === 'Archived') return fallback;

  const [daysPart, timePart] = schedule.split('·').map((part) => part.trim());
  const days = CLASS_WEEKDAYS.filter((day) =>
    daysPart
      .split(',')
      .map((item) => item.trim())
      .includes(day),
  );

  const times = timePart?.split(/\s*-\s*/) ?? [];
  const startTime = times[0] ? parseTimeToInput(times[0]) : null;
  const endTime = times[1] ? parseTimeToInput(times[1]) : null;

  return {
    days: days.length > 0 ? [...days] : fallback.days,
    startTime: startTime ?? fallback.startTime,
    endTime: endTime ?? fallback.endTime,
  };
}

export function classToFormValues(cls: MyClassRow): ClassFormValues {
  const schedule = parseScheduleParts(cls.schedule);
  return {
    subject: cls.subject,
    gradeLevel: cls.gradeLevel,
    section: parseSectionFromGradeSection(cls.gradeSection),
    academicYear: cls.academicYear,
    room: cls.room,
    days: schedule.days,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
  };
}

export function getClassFormErrors(input: {
  subject: string;
  gradeLevel: string;
  section: string;
  academicYear: string;
  room: string;
  days: string[];
  startTime: string;
  endTime: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!input.subject.trim()) errors.subject = 'Subject is required.';
  if (!input.gradeLevel.trim()) errors.gradeLevel = 'Grade level is required.';
  if (!input.section.trim()) errors.section = 'Section is required.';
  if (!input.academicYear.trim()) errors.academicYear = 'Academic year is required.';
  if (!input.room.trim()) errors.room = 'Room is required.';
  if (input.days.length === 0) errors.days = 'Pick at least one day.';
  if (!input.startTime) errors.startTime = 'Start time is required.';
  if (!input.endTime) errors.endTime = 'End time is required.';
  
  if (input.startTime && input.endTime && input.startTime >= input.endTime) {
    errors.endTime = 'Must be after start time.';
  }

  return errors;
}

export function buildClassFromInput(
  input: ClassFormInput,
  existing: MyClassRow[],
): MyClassRow {
  const nextId = existing.reduce((max, cls) => Math.max(max, cls.id), 0) + 1;
  const subject = input.subject.trim();
  const section = input.section.trim();
  const gradeLevel = input.gradeLevel.trim();
  const lessonsTotal = Math.max(1, input.lessonsTotal ?? 20);
  const style = styleForSubject(subject, nextId);

  return {
    id: nextId,
    subject,
    gradeSection: `${gradeLevel} - Section ${section}`,
    gradeLevel,
    academicYear: input.academicYear.trim(),
    schedule: formatClassSchedule(input.days, input.startTime, input.endTime),
    room: input.room.trim(),
    studentCount: 0,
    attendanceRate: 100,
    courseProgress: 0,
    lessonsCompleted: 0,
    lessonsTotal,
    status: 'Active',
    accent: style.accent,
    icon: style.icon,
    coverImage: input.coverImage,
  };
}

export function applyClassFormInput(cls: MyClassRow, input: ClassFormInput): MyClassRow {
  const subject = input.subject.trim();
  const section = input.section.trim();
  const gradeLevel = input.gradeLevel.trim();
  const style =
    SUBJECT_STYLE[subject] ??
    (subject === cls.subject
      ? { accent: cls.accent, icon: cls.icon }
      : styleForSubject(subject, cls.id));

  return {
    ...cls,
    subject,
    gradeSection: `${gradeLevel} - Section ${section}`,
    gradeLevel,
    academicYear: input.academicYear.trim(),
    schedule: formatClassSchedule(input.days, input.startTime, input.endTime),
    room: input.room.trim(),
    accent: style.accent,
    icon: style.icon,
    coverImage: input.coverImage ?? cls.coverImage,
  };
}

function nextCopySection(section: string, existing: MyClassRow[], gradeLevel: string): string {
  const base = section.replace(/\s*\(Copy(?:\s+\d+)?\)$/i, '').trim() || section;
  let candidate = `${base} (Copy)`;
  let n = 2;
  const taken = new Set(existing.map((cls) => cls.gradeSection.toLowerCase()));
  while (taken.has(`${gradeLevel} - Section ${candidate}`.toLowerCase())) {
    candidate = `${base} (Copy ${n})`;
    n += 1;
  }
  return candidate;
}

const DEFAULT_RESTORE_SCHEDULE = 'Mon, Wed, Fri · 8:00 - 9:00 AM';

export interface ArchivedClassSnapshot {
  schedule: string;
  accent: string;
  icon: string;
}

export function snapshotBeforeArchive(cls: MyClassRow): ArchivedClassSnapshot {
  return {
    schedule: cls.schedule,
    accent: cls.accent,
    icon: cls.icon,
  };
}

/** Mark a class archived (schedule shown as Archived; accent muted). */
export function archiveClassRow(cls: MyClassRow): MyClassRow {
  if (cls.status === 'Archived') return cls;
  return {
    ...cls,
    status: 'Archived',
    schedule: 'Archived',
    accent: '#8a9a90',
  };
}

/** Reactivate an archived class, restoring snapshot fields when available. */
export function restoreClassRow(
  cls: MyClassRow,
  snapshot?: ArchivedClassSnapshot,
): MyClassRow {
  if (cls.status !== 'Archived') return cls;
  const schedule =
    snapshot?.schedule && snapshot.schedule !== 'Archived'
      ? snapshot.schedule
      : DEFAULT_RESTORE_SCHEDULE;
  const style =
    SUBJECT_STYLE[cls.subject] ??
    (snapshot
      ? { accent: snapshot.accent, icon: snapshot.icon }
      : styleForSubject(cls.subject, cls.id));

  return {
    ...cls,
    status: 'Active',
    schedule,
    accent: snapshot?.accent ?? style.accent,
    icon: snapshot?.icon ?? style.icon,
  };
}

/** Clone a class with a new id; roster/progress reset for the copy. */
export function duplicateClassFrom(cls: MyClassRow, existing: MyClassRow[]): MyClassRow {
  const nextId = existing.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  const section = nextCopySection(
    parseSectionFromGradeSection(cls.gradeSection),
    existing,
    cls.gradeLevel,
  );

  return {
    ...cls,
    id: nextId,
    gradeSection: `${cls.gradeLevel} - Section ${section}`,
    studentCount: 0,
    attendanceRate: 100,
    courseProgress: 0,
    lessonsCompleted: 0,
    status: 'Active',
    schedule: cls.schedule === 'Archived' ? 'Mon, Wed, Fri · 8:00 - 9:00 AM' : cls.schedule,
  };
}

export function buildMyClassesMetrics(classes: MyClassRow[]): TeacherSummaryMetric[] {
  const active = classes.filter((cls) => cls.status === 'Active');
  const students = classes.reduce((sum, cls) => sum + cls.studentCount, 0);

  return [
    {
      label: 'Active Classes',
      value: String(active.length),
      subtitle: 'All running classes',
      icon: '📚',
      accent: '#b68eff',
    },
    {
      label: 'Total Students',
      value: String(students),
      subtitle: 'Across all classes',
      icon: '👥',
      accent: '#5cc789',
    },
    {
      label: 'Students at Risk',
      value: String(active.length + 1),
      subtitle: 'Need attention',
      icon: '⚠️',
      accent: '#f5a623',
    },
    {
      label: 'Upcoming Deadlines',
      value: String(active.length * 2),
      subtitle: 'Assignments due soon',
      icon: '📅',
      accent: '#84a9ff',
    },
  ];
}

export function rosterForClass(cls: MyClassRow, limit = 5): TeacherStudentRow[] {
  const students = teacherStudentsPageMock.students;
  const matched = students.filter(
    (student) =>
      student.classLabel === cls.gradeSection && student.subject === cls.subject,
  );
  const roster = matched.length
    ? matched
    : students.filter((student) => student.classLabel === cls.gradeSection);
  return roster.slice(0, limit);
}

export function lessonsForClass(cls: MyClassRow, limit = 3): TeacherLessonRow[] {
  const lessons = teacherLessonsPageMock.lessons;
  const inClass = (lesson: TeacherLessonRow) => {
    const labels =
      lesson.classLabels?.length > 0 ? lesson.classLabels : [lesson.classLabel];
    return labels.includes(cls.gradeSection);
  };

  const exact = lessons.filter(
    (lesson) => inClass(lesson) && lesson.subject === cls.subject,
  );
  if (exact.length > 0) return exact.slice(0, limit);

  return lessons
    .filter(
      (lesson) =>
        lesson.subject === cls.subject &&
        (inClass(lesson) || lesson.classLabel.includes(cls.gradeLevel)),
    )
    .slice(0, limit);
}
