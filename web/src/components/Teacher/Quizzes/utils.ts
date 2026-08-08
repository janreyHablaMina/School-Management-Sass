import type { QuizStatus, QuizType } from '@/types/teacherQuizzes';
import { accentFromMap, rateBarColor } from '../shared';

const TYPE_ACCENTS: Record<QuizType, string> = {
  Graded: '#b68eff',
  Practice: '#84a9ff',
};

const STATUS_ACCENTS: Record<QuizStatus, string> = {
  Active: '#5cc789',
  Upcoming: '#84a9ff',
  Completed: '#8a9a90',
  Draft: '#f5a623',
  Archived: '#8a9a90',
};

export function quizTypeAccent(type: QuizType): string {
  return accentFromMap(TYPE_ACCENTS, type, '#f5c842');
}

export function quizStatusAccent(status: QuizStatus): string {
  return accentFromMap(STATUS_ACCENTS, status);
}

export function attemptBarColor(rate: number): string {
  return rateBarColor(rate, '#b68eff');
}
