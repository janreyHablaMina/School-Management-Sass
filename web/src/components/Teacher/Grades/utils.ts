import type { GradeLetter, GradeStatus, GradeTrend } from '@/types/teacherGrades';
import { accentFromMap, rateBarColor } from '../shared';

const LETTER_ACCENTS: Record<GradeLetter, string> = {
  A: '#5cc789',
  'A-': '#5cc789',
  'B+': '#84a9ff',
  B: '#84a9ff',
  'B-': '#84a9ff',
  'C+': '#f5a623',
  C: '#f5a623',
  D: '#ff7e93',
  F: '#ff7e93',
};

const STATUS_ACCENTS: Record<GradeStatus, string> = {
  Complete: '#5cc789',
  Incomplete: '#84a9ff',
  'Needs Attention': '#f5a623',
};

export function gradeLetterAccent(letter: GradeLetter): string {
  return accentFromMap(LETTER_ACCENTS, letter);
}

export function gradeStatusAccent(status: GradeStatus): string {
  return accentFromMap(STATUS_ACCENTS, status);
}

export function gradeScoreBarColor(score: number): string {
  return rateBarColor(score);
}

export function gradeTrendLabel(trend: GradeTrend): string {
  if (trend === 'up') return '↑ Improving';
  if (trend === 'down') return '↓ Declining';
  return '→ Steady';
}

export function gradeTrendAccent(trend: GradeTrend): string {
  if (trend === 'up') return '#5cc789';
  if (trend === 'down') return '#ff7e93';
  return 'rgba(240, 239, 237, 0.55)';
}
