import type { QuizStatus } from '@/types/teacherQuizzes';
import { accentFromMap, rateBarColor } from '../shared';

const STATUS_ACCENTS: Record<QuizStatus, string> = {
  Active: '#5cc789',
  Upcoming: '#84a9ff',
  Completed: '#8a9a90',
  Draft: '#f5a623',
  Archived: '#8a9a90',
};

export function quizStatusAccent(status: QuizStatus): string {
  return accentFromMap(STATUS_ACCENTS, status);
}

export function attemptBarColor(rate: number): string {
  return rateBarColor(rate, '#b68eff');
}
