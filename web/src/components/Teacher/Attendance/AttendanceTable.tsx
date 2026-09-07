'use client';

import React from 'react';
import {
  DataTable,
  ResourceBulkBar,
  SelectAllCheckbox,
  type DataTableColumn,
} from '../shared';
import type { AttendanceStatus, AttendanceStudentRow } from '@/types/teacherAttendance';
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

const COLUMNS: DataTableColumn[] = [
  { id: 'fullName', label: 'Student', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'time', label: 'Time in', sortable: true },
  { id: 'notes', label: 'Notes', sortable: true },
  { id: 'actions', label: 'Actions' },
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

      <ResourceBulkBar
        selectedCount={selectedCount}
        itemLabel="student"
        onClearSelection={onClearSelection}
        actions={[
          {
            label: `Mark present (${selectedCount})`,
            onClick: () => onMarkSelected('Present'),
            tone: 'default',
          },
          {
            label: `Mark absent (${selectedCount})`,
            onClick: () => onMarkSelected('Absent'),
            tone: 'danger',
          },
          {
            label: `Mark late (${selectedCount})`,
            onClick: () => onMarkSelected('Late'),
            tone: 'default',
          },
        ]}
      />

      <DataTable
        columns={COLUMNS}
        minWidth={760}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => onSort(key as AttendanceSortKey)}
        leadingHeader={
          <SelectAllCheckbox
            checked={allVisibleSelected}
            onChange={onToggleAllVisible}
            label="Select all visible students"
          />
        }
      >
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            selected={selectedIds.includes(student.id)}
            onToggle={onToggleStudent}
          />
        ))}
      </DataTable>
    </section>
  );
}
