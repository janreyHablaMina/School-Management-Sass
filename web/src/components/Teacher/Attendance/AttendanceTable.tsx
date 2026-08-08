'use client';

import React from 'react';
import { listStyles } from '../shared';
import type { AttendanceStatus, AttendanceStudentRow } from '@/types/teacherAttendance';
import { AttendanceBulkBar } from './components/AttendanceBulkBar';
import { AttendanceStudentRow as StudentRow } from './components/AttendanceStudentRow';
import styles from './attendance.module.css';

interface AttendanceTableProps {
  students: AttendanceStudentRow[];
  totalStudents: number;
  selectedIds: string[];
  allVisibleSelected: boolean;
  onToggleStudent: (id: string) => void;
  onToggleAllVisible: () => void;
  onMarkSelected: (status: AttendanceStatus) => void;
  onClearSelection: () => void;
}

export function AttendanceTable({
  students,
  totalStudents,
  selectedIds,
  allVisibleSelected,
  onToggleStudent,
  onToggleAllVisible,
  onMarkSelected,
  onClearSelection,
}: AttendanceTableProps) {
  const selectedCount = selectedIds.length;

  return (
    <section className={styles.rosterPanel}>
      <div className={styles.rosterHead}>
        <div className={styles.rosterHeadText}>
          <h3 className={styles.rosterTitle}>Class roster</h3>
          <p className={styles.rosterSub}>{totalStudents} students</p>
        </div>
      </div>

      <AttendanceBulkBar
        selectedCount={selectedCount}
        onMarkSelected={onMarkSelected}
        onClearSelection={onClearSelection}
      />

      <div className={listStyles.tableWrap}>
        <table className={`${listStyles.table} ${styles.rosterTable}`} style={{ minWidth: 680 }}>
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
              <th>Time in</th>
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
    </section>
  );
}
