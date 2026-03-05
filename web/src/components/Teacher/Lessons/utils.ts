import type {
  LessonStatus,
  LessonType,
  TeacherLessonRow,
} from '@/types/teacherLessons';
import { accentFromMap } from '../shared';

const TYPE_ACCENTS: Record<LessonType, string> = {
  'Video Lesson': '#b68eff',
  Document: '#5cc789',
  Presentation: '#f5a623',
  Link: '#84a9ff',
  'Text Lesson': '#c9a8ff',
};

const TYPE_ICONS: Record<LessonType, string> = {
  'Video Lesson': '▶',
  Document: '📄',
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
  'Presentation',
  'Link',
  'Text Lesson',
];

export const LESSON_CREATE_STATUSES: LessonStatus[] = ['Draft', 'Published'];

/** AI Assistant tool id for "Generate Lesson". */
export const GENERATE_LESSON_AI_TOOL_ID = 2;

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

export interface CreateLessonInput {
  title: string;
  description: string;
  classLabel: string;
  subject: string;
  type: LessonType;
  status: LessonStatus;
  durationMins: number;
}

export function lessonTypeAccent(type: LessonType): string {
  return accentFromMap(TYPE_ACCENTS, type, '#f5c842');
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

  return {
    id: String(maxNumericId + 1),
    title: input.title.trim(),
    description: input.description.trim() || 'No description yet',
    durationMins: Math.round(input.durationMins),
    icon: TYPE_ICONS[type],
    accent: TYPE_ACCENTS[type],
    classLabel: input.classLabel.trim(),
    subject: input.subject.trim(),
    type,
    status,
    statusDate: label,
    updatedAt: label,
    updatedBy: 'You',
    updatedSortKey: sortKey,
  };
}
