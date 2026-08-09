import type { AssignmentStatus, AssignmentType } from '@/types/teacherAssignments';
import { accentFromMap } from '../shared';

const TYPE_ACCENTS: Record<AssignmentType, string> = {
  Worksheet: '#b68eff',
  'Lab Report': '#5cc789',
  Project: '#f5a623',
  Essay: '#ff7e93',
  Practice: '#84a9ff',
  Drawing: '#8a9a90',
};

const STATUS_ACCENTS: Record<AssignmentStatus, string> = {
  Active: '#5cc789',
  'Due Soon': '#f5a623',
  Completed: '#84a9ff',
  Draft: '#c9a8ff',
  Archived: '#8a9a90',
};

export function assignmentTypeAccent(type: AssignmentType): string {
  return accentFromMap(TYPE_ACCENTS, type, '#f5c842');
}

export function assignmentStatusAccent(status: AssignmentStatus): string {
  return accentFromMap(STATUS_ACCENTS, status);
}
