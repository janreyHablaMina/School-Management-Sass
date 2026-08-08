import React from 'react';
import { DataTable } from '../shared';
import { QuizRow } from './components/QuizRow';
import type { TeacherQuizRow } from '@/types/teacherQuizzes';

interface QuizzesTableProps {
  quizzes: TeacherQuizRow[];
}

const COLUMNS = [
  'Quiz',
  'Class',
  'Questions',
  'Due Date / Schedule',
  'Attempts',
  'Status',
  'Actions',
] as const;

export function QuizzesTable({ quizzes }: QuizzesTableProps) {
  return (
    <DataTable columns={COLUMNS} minWidth={1020}>
      {quizzes.map((quiz) => (
        <QuizRow key={quiz.id} quiz={quiz} />
      ))}
    </DataTable>
  );
}
