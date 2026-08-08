import React from 'react';
import { DataTable } from '../shared';
import { ExamRow } from './components/ExamRow';
import type { TeacherExamRow } from '@/types/teacherExams';

interface ExamsTableProps {
  exams: TeacherExamRow[];
}

const COLUMNS = [
  'Exam',
  'Class',
  'Type',
  'Date / Schedule',
  'Duration',
  'Students',
  'Average Score',
  'Status',
  'Actions',
] as const;

export function ExamsTable({ exams }: ExamsTableProps) {
  return (
    <DataTable columns={COLUMNS} minWidth={1180}>
      {exams.map((exam) => (
        <ExamRow key={exam.id} exam={exam} />
      ))}
    </DataTable>
  );
}
