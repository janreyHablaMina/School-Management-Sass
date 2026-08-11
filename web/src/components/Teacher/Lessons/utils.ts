import type {
  LessonStatus,
  LessonType,
  TeacherLessonRow,
} from '@/types/teacherLessons';
import { teacherLessonsPageMock } from '@/lib/mock/teacherLessons.mock';
import {
  loadTeacherLessons,
  persistTeacherLessons,
  setLessonsPendingToast,
} from '@/lib/lessons/storage';
import { accentFromMap } from '../shared';

const TYPE_ACCENTS: Record<LessonType, string> = {
  'Video Lesson': '#b68eff',
  Document: '#5cc789',
  PDF: '#e85d5d',
  Presentation: '#f5a623',
  Link: '#84a9ff',
  'Text Lesson': '#c9a8ff',
};

const TYPE_ICONS: Record<LessonType, string> = {
  'Video Lesson': '▶',
  Document: '📄',
  PDF: '📕',
  Presentation: '🖥',
  Link: '🔗',
  'Text Lesson': 'Aa',
};

const STATUS_ACCENTS: Record<LessonStatus, string> = {
  Published: '#5cc789',
  Draft: '#f5a623',
  Archived: '#84a9ff',
};

export const LESSON_TYPES: LessonType[] = [
  'Video Lesson',
  'Document',
  'PDF',
  'Presentation',
  'Link',
  'Text Lesson',
];

/** AI Lesson studio save options — text drafts as Docs or PDF. */
export const AI_LESSON_SAVE_TYPES: LessonType[] = ['PDF', 'Document'];

export const AI_LESSON_SAVE_TYPE_LABELS: Record<
  (typeof AI_LESSON_SAVE_TYPES)[number],
  string
> = {
  PDF: 'PDF',
  Document: 'Docs',
};

export const AI_LESSON_SAVE_TYPE_HINTS: Record<
  (typeof AI_LESSON_SAVE_TYPES)[number],
  string
> = {
  PDF: 'Shareable file for students',
  Document: 'Editable notes / Word-style',
};

export const LESSON_CREATE_STATUSES: LessonStatus[] = ['Draft', 'Published'];

/** Class label used when saving without assigning a classroom. */
export const UNASSIGNED_CLASS_LABEL = 'Unassigned';

/** AI Assistant tool id for "Generate Lesson". */
export const GENERATE_LESSON_AI_TOOL_ID = 2;

/** AI Assistant tool id for "Upload PDF / Docs". */
export const UPLOAD_LESSON_AI_TOOL_ID = 1;

/** Starter prompt for AI Generate Lesson from the Create Lesson modal. */
export function buildGenerateLessonPrompt(input: {
  subject: string;
  classLabel: string;
  durationMins?: number;
  topic?: string;
}): string {
  const subject = input.subject.trim() || 'this subject';
  const classLabel = input.classLabel.trim() || 'this class';
  const mins =
    Number.isFinite(input.durationMins) && (input.durationMins ?? 0) >= 5
      ? Math.round(input.durationMins!)
      : 45;
  const topic = input.topic?.trim();

  if (topic) {
    return `Create a ${mins}-minute ${subject} lesson on ${topic} for ${classLabel}, with a warm-up, guided practice, and exit ticket.`;
  }

  return `Create a ${mins}-minute ${subject} lesson for ${classLabel}, with a warm-up, guided practice, and exit ticket. Suggest a clear topic that fits the class.`;
}

/** Starter prompt when creating a lesson from uploaded files. */
export function buildUploadLessonPrompt(input: {
  subject: string;
  classLabel: string;
}): string {
  const subject = input.subject.trim() || 'this subject';
  const classLabel = input.classLabel.trim() || 'this class';
  return `I will upload my materials. Please analyze them and draft a classroom-ready ${subject} lesson for ${classLabel}, including a short outline and key teaching points.`;
}

export interface CreateLessonInput {
  title: string;
  description: string;
  classLabel: string;
  /** All classes when multi-assign; defaults to [classLabel]. */
  classLabels?: string[];
  subject: string;
  type: LessonType;
  status: LessonStatus;
  durationMins: number;
}

export function lessonTypeAccent(type: LessonType): string {
  return accentFromMap(TYPE_ACCENTS, type, '#f5c842');
}

export function lessonTypeIcon(type: LessonType): string {
  return TYPE_ICONS[type] ?? '📄';
}

export function lessonTypeLabel(type: LessonType): string {
  if (type === 'Document') return 'Docs';
  return type;
}

export function lessonClassLabels(lesson: Pick<TeacherLessonRow, 'classLabel' | 'classLabels'>): string[] {
  if (lesson.classLabels?.length) return lesson.classLabels;
  return lesson.classLabel ? [lesson.classLabel] : [];
}

export function lessonAssignedToClass(
  lesson: Pick<TeacherLessonRow, 'classLabel' | 'classLabels'>,
  classFilter: string,
): boolean {
  if (classFilter === 'All Classes') return true;
  return lessonClassLabels(lesson).includes(classFilter);
}

export function lessonStatusAccent(status: LessonStatus): string {
  return accentFromMap(STATUS_ACCENTS, status);
}

export function getCreateLessonError(input: CreateLessonInput): string | null {
  if (!input.title.trim()) return 'Add a title for this lesson.';
  if (!input.classLabel.trim()) return 'Choose a class for this lesson.';
  if (!input.subject.trim()) return 'Choose a subject.';
  if (!Number.isFinite(input.durationMins) || input.durationMins < 5) {
    return 'Duration must be at least 5 minutes.';
  }
  if (input.durationMins > 240) return 'Keep duration under 4 hours.';
  return null;
}

function formatLessonDate(date = new Date()): { label: string; sortKey: string } {
  const label = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const sortKey = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
  return { label, sortKey };
}

export function buildLessonFromInput(
  input: CreateLessonInput,
  existing: TeacherLessonRow[],
): TeacherLessonRow {
  const maxNumericId = existing.reduce((max, lesson) => {
    const n = Number(lesson.id);
    return Number.isFinite(n) ? Math.max(max, n) : max;
  }, 0);
  const { label, sortKey } = formatLessonDate();
  const type = input.type;
  const status = input.status;
  const labels = (
    input.classLabels?.length
      ? input.classLabels
      : [input.classLabel]
  )
    .map((item) => item.trim())
    .filter(Boolean);
  const uniqueLabels = [...new Set(labels)];
  const primaryClass = uniqueLabels[0] || input.classLabel.trim();

  return {
    id: String(maxNumericId + 1),
    title: input.title.trim(),
    description: input.description.trim() || 'No description yet',
    durationMins: Math.round(input.durationMins),
    icon: TYPE_ICONS[type],
    accent: TYPE_ACCENTS[type],
    classLabel: primaryClass,
    classLabels: uniqueLabels.length > 0 ? uniqueLabels : [primaryClass],
    subject: input.subject.trim(),
    type,
    status,
    statusDate: label,
    updatedAt: label,
    updatedBy: 'You',
    updatedSortKey: sortKey,
  };
}

export function titleFromAiTopic(topic: string, content = ''): string {
  const fromContent = content.match(/^Topic:\s*(.+)$/im)?.[1]?.trim();
  let cleaned = (fromContent || topic).replace(/\s+/g, ' ').trim();

  const onTopic = cleaned.match(
    /\blesson\s+on\s+(.+?)(?:,?\s+with\s+|\s+for\s+grade\b|$)/i,
  );
  if (onTopic?.[1]) {
    cleaned = onTopic[1].trim();
  } else {
    cleaned = cleaned
      .replace(/^(a\s+|an\s+|the\s+)?\d+\s*-?\s*minute\s+/i, '')
      .replace(/,?\s*with\s+(a\s+)?warm-?up.*$/i, '')
      .replace(/\s+for\s+grade\s+[\d\w\s.\-–,—]+$/i, '')
      .trim();

    const subjectOnly = cleaned.match(
      /^(mathematics|math|science|english|ict|information technology)\s+lesson\b/i,
    );
    if (subjectOnly) {
      const label =
        subjectOnly[1].toLowerCase() === 'ict'
          ? 'ICT'
          : subjectOnly[1].replace(/\b\w/g, (c) => c.toUpperCase());
      cleaned = `${label} Lesson`;
    }
  }

  if (!cleaned || cleaned.length < 3 || /^grade\s+\d/i.test(cleaned)) {
    cleaned = 'AI Lesson Draft';
  }

  const titled = cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
  return titled.length > 48 ? `${titled.slice(0, 45)}…` : titled;
}

function truncateText(value: string, max: number): string {
  const cleaned = value.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

/** Short blurb for the Lessons list — not the full AI draft body. */
export function shortLessonDescription(content: string, topic: string): string {
  const oneSentence = content.match(/In one sentence\s*\n+([^\n]+)/i)?.[1];
  if (oneSentence) return truncateText(oneSentence, 110);

  const skip =
    /^(here is|student-friendly|topic:|lesson outline|materials|demo mode|what next|source files|based on|quiz draft|exam draft|questions\s*&)/i;

  const line = content
    .split('\n')
    .map((part) => part.trim())
    .find(
      (part) =>
        part.length > 24 &&
        !skip.test(part) &&
        !part.startsWith('•') &&
        !/^\d+\./.test(part),
    );

  if (line) return truncateText(line.replace(/^[-•]\s*/, ''), 110);

  const title = titleFromAiTopic(topic, content);
  return `AI lesson draft on ${title}`;
}

/** Map AI classroom + optional focus into Create Lesson fields. */
export function buildLessonInputFromAiDraft(input: {
  topic: string;
  content: string;
  classroom: string;
  title?: string;
  classLabel?: string;
  classLabels?: string[];
  subject?: string;
  type?: LessonType;
  classFocus?: { gradeSection: string; subject: string } | null;
}): CreateLessonInput {
  const classes = teacherLessonsPageMock.filterOptions.classes.filter(
    (item) => item !== 'All Classes',
  );
  const subjects = teacherLessonsPageMock.filterOptions.subjects.filter(
    (item) => item !== 'All Subjects',
  );

  const classLabel =
    (input.classFocus &&
      classes.find(
        (option) =>
          option === input.classFocus!.gradeSection ||
          option.includes(input.classFocus!.gradeSection) ||
          input.classFocus!.gradeSection.includes(option),
      )) ||
    classes.find((option) => option === input.classroom) ||
    classes.find(
      (option) =>
        input.classroom.includes(option) || option.includes(input.classroom),
    ) ||
    classes[0] ||
    input.classroom ||
    'Grade 7 - Section A';

  const focusSubject = input.classFocus?.subject?.trim() ?? '';
  const subject =
    subjects.find((option) => option === focusSubject) ||
    (focusSubject === 'ICT'
      ? subjects.find((option) => option.includes('Information'))
      : undefined) ||
    subjects.find((option) =>
      focusSubject
        ? option.toLowerCase().includes(focusSubject.toLowerCase()) ||
          focusSubject.toLowerCase().includes(option.toLowerCase())
        : false,
    ) ||
    subjects[0] ||
    'English';

  const customTitle = input.title?.trim();
  const customSubject = input.subject?.trim();
  const customType =
    input.type && AI_LESSON_SAVE_TYPES.includes(input.type)
      ? input.type
      : 'PDF';
  const resolvedLabels = (
    input.classLabels?.length
      ? input.classLabels
      : [input.classLabel?.trim() || classLabel]
  )
    .map((item) => item.trim())
    .filter(Boolean);
  const uniqueLabels = [...new Set(resolvedLabels)];
  const primaryClass = uniqueLabels[0] || UNASSIGNED_CLASS_LABEL;
  const isAssigned = uniqueLabels.some(
    (label) => label !== UNASSIGNED_CLASS_LABEL,
  );

  return {
    title: customTitle || titleFromAiTopic(input.topic, input.content),
    description: shortLessonDescription(input.content, input.topic),
    classLabel: primaryClass,
    classLabels: uniqueLabels,
    subject: customSubject || subject,
    type: customType,
    status: isAssigned ? 'Published' : 'Draft',
    durationMins: 45,
  };
}

/** Persist an AI draft into the shared Lessons list (local mock store). */
export function saveAiDraftAsLesson(input: {
  topic: string;
  content: string;
  classroom: string;
  title?: string;
  classLabel?: string;
  classLabels?: string[];
  subject?: string;
  type?: LessonType;
  classFocus?: { gradeSection: string; subject: string } | null;
}): TeacherLessonRow {
  const existing = loadTeacherLessons();
  const lesson = buildLessonFromInput(
    buildLessonInputFromAiDraft({
      ...input,
      classLabel: input.classLabel,
      classLabels: input.classLabels,
      subject: input.subject,
      type: input.type,
    }),
    existing,
  );
  persistTeacherLessons([lesson, ...existing]);
  const classSummary =
    lesson.classLabels.length > 1
      ? `${lesson.classLabels.length} classes`
      : lesson.classLabel;
  setLessonsPendingToast({
    title: lesson.status === 'Published' ? 'Lesson published' : 'Draft saved',
    message: `${lesson.title} · ${classSummary} (${lesson.status})`,
  });
  return lesson;
}

/** Compact long AI drafts already sitting in the Lessons list. */
export function sanitizeLessonListRow(lesson: TeacherLessonRow): TeacherLessonRow {
  const labels = lessonClassLabels(lesson);
  const withClasses: TeacherLessonRow = {
    ...lesson,
    classLabel: labels[0] || lesson.classLabel || UNASSIGNED_CLASS_LABEL,
    classLabels: labels,
  };

  const titleTooLong = withClasses.title.length > 56;
  const descTooLong = withClasses.description.length > 140;
  if (!titleTooLong && !descTooLong) return withClasses;

  return {
    ...withClasses,
    title: titleTooLong
      ? titleFromAiTopic(withClasses.title, withClasses.description)
      : withClasses.title,
    description: descTooLong
      ? shortLessonDescription(withClasses.description, withClasses.title)
      : withClasses.description,
  };
}

export function sanitizeLessonList(lessons: TeacherLessonRow[]): TeacherLessonRow[] {
  return lessons.map(sanitizeLessonListRow);
}
