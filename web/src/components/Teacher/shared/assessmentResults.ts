import type { DataTableColumn } from './DataTable';

export const ASSESSMENT_RESULT_COLUMNS: DataTableColumn[] = [
  { id: 'student', label: 'Student' },
  { id: 'status', label: 'Status' },
  { id: 'score', label: 'Score' },
  { id: 'duration', label: 'Duration' },
  { id: 'submitted', label: 'Submitted' },
];

export const ASSESSMENT_STUDENTS = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Davis',
  'Diana Prince',
  'Evan Wright',
  'Fatima Santos',
  'Gabriel Cruz',
  'Hannah Lee',
];

export function visibleAssessmentResultCount(totalStudents: number) {
  return Math.min(ASSESSMENT_STUDENTS.length, Math.max(totalStudents, 5));
}

export function mockScoreFromAverage(averageScore: number | null, index: number) {
  return Math.min(
    100,
    Math.max(60, Math.round((averageScore ?? 78) + ((index % 5) - 2) * 4)),
  );
}

export function assessmentResultStatusAccent(status: string) {
  switch (status) {
    case 'Completed':
      return '#5cc789';
    case 'In Progress':
    case 'Taking':
      return '#84a9ff';
    default:
      return '#ff8a8a';
  }
}
