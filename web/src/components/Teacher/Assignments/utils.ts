import type { AssignmentStatus, AssignmentType } from '@/types/teacherAssignments';

export function assignmentTypeAccent(type: AssignmentType): string {
  switch (type) {
    case 'Worksheet':
      return '#b68eff';
    case 'Lab Report':
      return '#5cc789';
    case 'Project':
      return '#f5a623';
    case 'Essay':
      return '#ff7e93';
    case 'Practice':
      return '#84a9ff';
    case 'Drawing':
      return '#8a9a90';
    default:
      return '#f5c842';
  }
}

export function assignmentStatusAccent(status: AssignmentStatus): string {
  switch (status) {
    case 'Active':
      return '#5cc789';
    case 'Due Soon':
      return '#f5a623';
    case 'Completed':
      return '#84a9ff';
    case 'Draft':
      return '#c9a8ff';
    case 'Archived':
      return '#8a9a90';
    default:
      return '#f0efed';
  }
}

export function submissionBarColor(rate: number): string {
  if (rate >= 90) return '#5cc789';
  if (rate >= 70) return '#84a9ff';
  if (rate >= 50) return '#f5a623';
  return '#ff7e93';
}
