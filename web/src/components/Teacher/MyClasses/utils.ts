import { teacherLessonsPageMock } from '@/lib/mock/teacherLessons.mock';
import { teacherStudentsPageMock } from '@/lib/mock/teacherStudents.mock';
import type { ClassFormInput, MyClassRow } from '@/types/myClasses';
import type { TeacherSummaryMetric } from '@/types/teacherList';
import type { TeacherLessonRow } from '@/types/teacherLessons';
import type { TeacherStudentRow } from '@/types/teacherStudents';

export const CLASS_WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

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

function formatTimeLabel(value: string): string {
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

export function parseSectionFromGradeSection(gradeSection: string): string {
  const match = gradeSection.match(/Section\s+(.+)$/i);
  return match?.[1]?.trim() ?? gradeSection.trim();
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

export function getClassFormError(input: {
  subject: string;
  gradeLevel: string;
  section: string;
  academicYear: string;
  room: string;
  days: string[];
  startTime: string;
  endTime: string;
}): string | null {
  if (!input.subject.trim()) return 'Choose a subject for this class.';
  if (!input.gradeLevel.trim()) return 'Choose a grade level.';
  if (!input.section.trim()) return 'Choose a section.';
  if (!input.academicYear.trim()) return 'Choose an academic year.';
  if (!input.room.trim()) return 'Add a room or meeting place.';
  if (input.days.length === 0) return 'Pick at least one class day.';
  if (!input.startTime || !input.endTime) return 'Set start and end times.';
  if (input.startTime >= input.endTime) return 'End time must be after start time.';
  return null;
}

/** @deprecated Use getClassFormError */
export const getCreateClassError = getClassFormError;

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
      label: 'Lessons This Week',
      value: String(active.length * 2),
      subtitle: 'Estimated sessions',
      icon: '📖',
      accent: '#f5a623',
    },
    {
      label: 'Pending Grading',
      value: String(Math.max(0, active.length * 3)),
      subtitle: 'Assignments & quizzes',
      icon: '📋',
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
  const exact = lessons.filter(
    (lesson) => lesson.classLabel === cls.gradeSection && lesson.subject === cls.subject,
  );
  if (exact.length > 0) return exact.slice(0, limit);

  return lessons
    .filter(
      (lesson) =>
        lesson.subject === cls.subject && lesson.classLabel.includes(cls.gradeLevel),
    )
    .slice(0, limit);
}

/** Stable invite code for a class (frontend mock — later from API). */
export function classJoinCode(cls: MyClassRow): string {
  const subject = cls.subject.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() || 'CLASS';
  const section = parseSectionFromGradeSection(cls.gradeSection)
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(0, 2)
    .toUpperCase() || 'A';
  const idPart = cls.id.toString(36).toUpperCase().padStart(3, '0').slice(-3);
  return `${subject}${section}-${idPart}`;
}

export const DEFAULT_INVITE_HOURS = 1;

export function inviteExpiresAt(hours: number, from = Date.now()): number {
  return from + Math.max(1, hours) * 60 * 60 * 1000;
}

export function toDateInputValue(ms: number): string {
  const d = new Date(ms);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function toTimeInputValue(ms: number): string {
  const d = new Date(ms);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/** Combine local date (`YYYY-MM-DD`) + time (`HH:MM`) into a timestamp. */
export function combineDateAndTime(date: string, time: string): number | null {
  if (!date.trim() || !time.trim()) return null;
  const parsed = new Date(`${date}T${time}`);
  const ms = parsed.getTime();
  return Number.isFinite(ms) ? ms : null;
}

export const INVITE_QUICK_EXPIRY = [
  { id: '1h' as const, label: 'In 1 hour', hoursFromNow: 1 },
  { id: '6h' as const, label: 'In 6 hours', hoursFromNow: 6 },
  { id: '24h' as const, label: 'In 24 hours', hoursFromNow: 24 },
] as const;

export function parseInviteExpiry(value: string | null | undefined): number | null {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function isInviteExpired(expiresAt: number | null, now = Date.now()): boolean {
  if (expiresAt == null) return true;
  return now >= expiresAt;
}

export function formatInviteExpiry(expiresAt: number): string {
  return new Date(expiresAt).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatInviteRemaining(expiresAt: number, now = Date.now()): string {
  const ms = Math.max(0, expiresAt - now);
  const totalMins = Math.ceil(ms / 60000);
  if (totalMins <= 1) return 'less than 1 minute';
  if (totalMins < 60) return `${totalMins} minutes`;
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hours < 48) {
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours === 1 ? '' : 's'}`;
  }
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'}`;
}

export function classInvitePath(cls: MyClassRow, expiresAt: number): string {
  return `/join/${encodeURIComponent(classJoinCode(cls))}?exp=${expiresAt}`;
}

export function classInviteUrl(cls: MyClassRow, expiresAt: number): string {
  const path = classInvitePath(cls, expiresAt);
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${path}`;
  }
  return path;
}

const INVITE_STORAGE_KEY = 'teachify.classInvites';

export interface StoredClassInvite {
  code: string;
  classId: number;
  expiresAt: number;
}

export function rememberClassInvite(invite: StoredClassInvite) {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(INVITE_STORAGE_KEY);
    const list: StoredClassInvite[] = raw ? (JSON.parse(raw) as StoredClassInvite[]) : [];
    const next = [
      invite,
      ...list.filter((item) => item.code !== invite.code && item.expiresAt > Date.now()),
    ].slice(0, 20);
    window.localStorage.setItem(INVITE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage failures in mock
  }
}

export function storedInviteExpiry(code: string): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(INVITE_STORAGE_KEY);
    if (!raw) return null;
    const list = JSON.parse(raw) as StoredClassInvite[];
    const normalized = decodeURIComponent(code).trim().toUpperCase();
    const match = list.find((item) => item.code.toUpperCase() === normalized);
    return match?.expiresAt ?? null;
  } catch {
    return null;
  }
}

export function findClassByJoinCode(
  code: string,
  classes: MyClassRow[],
): MyClassRow | null {
  const normalized = decodeURIComponent(code).trim().toUpperCase();
  if (!normalized) return null;
  return classes.find((cls) => classJoinCode(cls) === normalized) ?? null;
}
