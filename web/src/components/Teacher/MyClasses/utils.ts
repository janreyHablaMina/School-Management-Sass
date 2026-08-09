import { teacherLessonsPageMock } from '@/lib/mock/teacherLessons.mock';
import { teacherStudentsPageMock } from '@/lib/mock/teacherStudents.mock';
import type { CreateClassInput, MyClassRow } from '@/types/myClasses';
import type { TeacherSummaryMetric } from '@/types/teacherList';
import type { TeacherLessonRow } from '@/types/teacherLessons';
import type { TeacherStudentRow } from '@/types/teacherStudents';

export const CLASS_WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

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

export function formatClassSchedule(
  days: string[],
  startTime: string,
  endTime: string,
): string {
  return `${days.join(', ')} · ${formatTimeLabel(startTime)} - ${formatTimeLabel(endTime)}`;
}

export function getCreateClassError(input: {
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

export function buildClassFromInput(
  input: CreateClassInput,
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
