'use client';

import React from 'react';
import { listStyles } from '../shared';
import type { AttendanceStatus, AttendanceStudentRow } from '@/types/teacherAttendance';
import { AttendanceStudentRow as StudentRow } from './components/AttendanceStudentRow';
import styles from './attendance.module.css';

interface AttendanceTableProps {
  students: AttendanceStudentRow[];
  totalStudents: number;
  selectedIds: string[];
  allVisibleSelected: boolean;
  onToggleStudent: (id: string) => void;
  onToggleAllVisible: () => void;
  onMarkAll: (status: AttendanceStatus) => void;
}

export function AttendanceTable({
  students,
  totalStudents,
  selectedIds,
  allVisibleSelected,
  onToggleStudent,
  onToggleAllVisible,
  onMarkAll,
}: AttendanceTableProps) {
  return (
    <div className={styles.tablePanel}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>Students ({totalStudents})</h3>
        <div className={styles.bulkActions}>
          <button
            type="button"
            className={`${styles.bulkBtn} ${styles.bulkPresent}`}
            onClick={() => onMarkAll('Present')}
          >
            Mark All Present
          </button>
          <button
            type="button"
            className={`${styles.bulkBtn} ${styles.bulkAbsent}`}
            onClick={() => onMarkAll('Absent')}
          >
            Mark All Absent
          </button>
          <button
            type="button"
            className={`${styles.bulkBtn} ${styles.bulkLate}`}
            onClick={() => onMarkAll('Late')}
          >
            Mark All Late
          </button>
        </div>
      </div>

      <div className={listStyles.tableWrap}>
        <table className={listStyles.table} style={{ minWidth: 720 }}>
          <thead>
            <tr>
              <th className={styles.checkCell}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={allVisibleSelected}
                  onChange={onToggleAllVisible}
                  aria-label="Select all visible students"
                />
              </th>
              <th>Student</th>
              <th>Status</th>
              <th>Time</th>
              <th>Notes</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                selected={selectedIds.includes(student.id)}
                onToggle={onToggleStudent}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
