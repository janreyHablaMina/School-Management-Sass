import type { ExamStatus, ExamType } from '@/types/teacherExams';
import { accentFromMap } from '../shared';

const TYPE_ACCENTS: Record<ExamType, string> = {
  Written: '#b68eff',
  Practical: '#84a9ff',
};

const STATUS_ACCENTS: Record<ExamStatus, string> = {
  Upcoming: '#5cc789',
  Ongoing: '#84a9ff',
  Completed: '#8a9a90',
  Draft: '#f5a623',
  Archived: '#8a9a90',
};

export function examTypeAccent(type: ExamType): string {
  return accentFromMap(TYPE_ACCENTS, type, '#f5c842');
}

export function examStatusAccent(status: ExamStatus): string {
  return accentFromMap(STATUS_ACCENTS, status);
}
