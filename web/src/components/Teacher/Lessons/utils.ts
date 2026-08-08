import type { LessonStatus, LessonType } from '@/types/teacherLessons';
import { accentFromMap } from '../shared';

const TYPE_ACCENTS: Record<LessonType, string> = {
  'Video Lesson': '#b68eff',
  Document: '#5cc789',
  Presentation: '#f5a623',
  Link: '#84a9ff',
  'Text Lesson': '#c9a8ff',
};

const STATUS_ACCENTS: Record<LessonStatus, string> = {
  Published: '#5cc789',
  Draft: '#f5a623',
  Archived: '#84a9ff',
};

export function lessonTypeAccent(type: LessonType): string {
  return accentFromMap(TYPE_ACCENTS, type, '#f5c842');
}

export function lessonStatusAccent(status: LessonStatus): string {
  return accentFromMap(STATUS_ACCENTS, status);
}
