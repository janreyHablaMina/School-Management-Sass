import React from 'react';
import { DataTable } from '../shared';
import { LessonRow } from './components/LessonRow';
import type { TeacherLessonRow } from '@/types/teacherLessons';

interface LessonsTableProps {
  lessons: TeacherLessonRow[];
}

const COLUMNS = ['Lesson', 'Class', 'Type', 'Status', 'Last Updated', 'Actions'] as const;

export function LessonsTable({ lessons }: LessonsTableProps) {
  return (
    <DataTable columns={COLUMNS} minWidth={1080}>
      {lessons.map((lesson) => (
        <LessonRow key={lesson.id} lesson={lesson} />
      ))}
    </DataTable>
  );
}
