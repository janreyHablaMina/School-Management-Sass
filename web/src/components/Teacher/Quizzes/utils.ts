import type { QuizStatus, QuizType } from '@/types/teacherQuizzes';

export function quizTypeAccent(type: QuizType): string {
  return type === 'Graded' ? '#b68eff' : '#84a9ff';
}

export function quizStatusAccent(status: QuizStatus): string {
  switch (status) {
    case 'Active':
      return '#5cc789';
    case 'Upcoming':
      return '#84a9ff';
    case 'Completed':
      return '#8a9a90';
    case 'Draft':
      return '#f5a623';
    case 'Archived':
      return '#8a9a90';
    default:
      return '#f0efed';
  }
}

export function attemptBarColor(rate: number): string {
  if (rate >= 90) return '#5cc789';
  if (rate >= 70) return '#b68eff';
  if (rate >= 50) return '#f5a623';
  return '#ff7e93';
}
