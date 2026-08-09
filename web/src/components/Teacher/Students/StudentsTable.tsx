import React from 'react';
import { DataTable } from '../shared';
import { StudentRow } from './components/StudentRow';
import type { TeacherStudentRow } from '@/types/teacherStudents';

interface StudentsTableProps {
  students: TeacherStudentRow[];
  onOpen: (id: string) => void;
  onViewGrades?: (id: string) => void;
  onMessage?: (id: string) => void;
}

const COLUMNS = [
  'Student',
  'ID Number',
  'Class',
  'Contact',
  'Attendance',
  'Average Grade',
  'Status',
  'Actions',
] as const;

export function StudentsTable({
  students,
  onOpen,
  onViewGrades,
  onMessage,
}: StudentsTableProps) {
  return (
    <DataTable columns={COLUMNS} minWidth={1100}>
      {students.map((student) => (
        <StudentRow
          key={student.id}
          student={student}
          onOpen={onOpen}
          onViewGrades={onViewGrades}
          onMessage={onMessage}
        />
      ))}
    </DataTable>
  );
}
