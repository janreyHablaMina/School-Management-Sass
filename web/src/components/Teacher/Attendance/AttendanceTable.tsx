'use client';

import React from 'react';
import { listStyles } from '../shared';
import type { AttendanceStatus, AttendanceStudentRow } from '@/types/teacherAttendance';
import { AttendanceBulkBar } from './components/AttendanceBulkBar';
import { AttendanceStudentRow as StudentRow } from './components/AttendanceStudentRow';
import type { AttendanceSortKey } from './useAttendance';
import styles from './attendance.module.css';

interface AttendanceTableProps {
  students: AttendanceStudentRow[];
  totalStudents: number;
  selectedIds: string[];
  allVisibleSelected: boolean;
  sortKey: AttendanceSortKey | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: AttendanceSortKey) => void;
  onToggleStudent: (id: string) => void;
  onToggleAllVisible: () => void;
  onMarkSelected: (status: AttendanceStatus) => void;
  onClearSelection: () => void;
}

function sortIcon(
  columnId: AttendanceSortKey,
  sortKey: AttendanceSortKey | null,
  sortDirection: 'asc' | 'desc',
) {
  if (!sortKey || sortKey !== columnId) return '↕';
  return sortDirection === 'asc' ? '↑' : '↓';
}

const SORTABLE_HEADERS: { id: AttendanceSortKey; label: string }[] = [
  { id: 'fullName', label: 'Student' },
  { id: 'status', label: 'Status' },
  { id: 'time', label: 'Time in' },
  { id: 'notes', label: 'Notes' },
];

export function AttendanceTable({
  students,
  totalStudents,
  selectedIds,
  allVisibleSelected,
  sortKey,
  sortDirection,
  onSort,
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
              {SORTABLE_HEADERS.map((column) => {
                const active = sortKey === column.id;
                return (
                  <th
                    key={column.id}
                    className={listStyles.sortableTh}
                    aria-sort={
                      active
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    <button
                      type="button"
                      className={listStyles.sortButton}
                      onClick={() => onSort(column.id)}
                      aria-label={`Sort by ${column.label}`}
                    >
                      {column.label}
                      <span className={listStyles.sortIcon} aria-hidden>
                        {sortIcon(column.id, sortKey, sortDirection)}
                      </span>
                    </button>
                  </th>
                );
              })}
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
