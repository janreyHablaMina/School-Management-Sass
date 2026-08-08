'use client';

import React from 'react';
import type { AttendanceStatus } from '@/types/teacherAttendance';
import styles from '../attendance.module.css';

interface AttendanceBulkBarProps {
  selectedCount: number;
  onMarkSelected: (status: AttendanceStatus) => void;
  onClearSelection: () => void;
}

export function AttendanceBulkBar({
  selectedCount,
  onMarkSelected,
  onClearSelection,
}: AttendanceBulkBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className={styles.bulkBar} role="region" aria-label="Bulk selection actions">
      <div className={styles.bulkBarInfo}>
        <span className={styles.bulkBarCount}>{selectedCount}</span>
        <span>
          student{selectedCount === 1 ? '' : 's'} selected
        </span>
      </div>

      <div className={styles.bulkBarActions}>
        <span className={styles.toolbarLabel}>Quick mark</span>
        <button
          type="button"
          className={`${styles.bulkBtn} ${styles.bulkPresent}`}
          onClick={() => onMarkSelected('Present')}
        >
          Present
        </button>
        <button
          type="button"
          className={`${styles.bulkBtn} ${styles.bulkAbsent}`}
          onClick={() => onMarkSelected('Absent')}
        >
          Absent
        </button>
        <button
          type="button"
          className={`${styles.bulkBtn} ${styles.bulkLate}`}
          onClick={() => onMarkSelected('Late')}
        >
          Late
        </button>
        <button type="button" className={styles.clearSelectionBtn} onClick={onClearSelection}>
          Clear
        </button>
      </div>
    </div>
  );
}
