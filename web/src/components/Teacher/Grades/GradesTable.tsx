import React from 'react';
import { DataTable } from '../shared';
import { GradeRow } from './components/GradeRow';
import type { TeacherGradeRow } from '@/types/teacherGrades';

interface GradesTableProps {
  grades: TeacherGradeRow[];
}

const COLUMNS = [
  'Student',
  'Class',
  'Term',
  'Overall',
  'Letter',
  'Breakdown',
  'Trend',
  'Status',
  'Actions',
] as const;

export function GradesTable({ grades }: GradesTableProps) {
  return (
    <DataTable columns={COLUMNS} minWidth={1080}>
      {grades.map((grade) => (
        <GradeRow key={grade.id} grade={grade} />
      ))}
    </DataTable>
  );
}
