import React from 'react';
import styles from './students.module.css';
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
    <div className={styles.tablePanel}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {COLUMNS.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentRow key={student.id} student={student} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
