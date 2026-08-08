import React from 'react';
import { DataTable } from '../shared';
import { AssignmentRow } from './components/AssignmentRow';
import type { TeacherAssignmentRow } from '@/types/teacherAssignments';

interface AssignmentsTableProps {
  assignments: TeacherAssignmentRow[];
}

const COLUMNS = [
  'Assignment',
  'Class',
  'Type',
  'Due Date',
  'Submissions',
  'Average Score',
  'Status',
  'Actions',
] as const;

export function AssignmentsTable({ assignments }: AssignmentsTableProps) {
  return (
    <DataTable columns={COLUMNS} minWidth={1180}>
      {assignments.map((assignment) => (
        <AssignmentRow key={assignment.id} assignment={assignment} />
      ))}
    </DataTable>
  );
}
