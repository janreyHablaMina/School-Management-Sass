import React from 'react';
import { DataTable } from '../shared';
import { StudentRow } from './components/StudentRow';
import type { TeacherStudentRow } from '@/types/teacherStudents';

interface StudentsTableProps {
  students: TeacherStudentRow[];
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

export function StudentsTable({ students }: StudentsTableProps) {
  return (
    <DataTable columns={COLUMNS} minWidth={1100}>
      {students.map((student) => (
        <StudentRow key={student.id} student={student} />
      ))}
    </DataTable>
  );
}
