'use client';

import React from 'react';
import { FilterSelect, listStyles } from '../shared';
import type { AttendanceStatus, AttendanceViewMode } from '@/types/teacherAttendance';
import styles from './attendance.module.css';

interface AttendanceControlsProps {
  selectedDateLabel: string;
  viewModes: AttendanceViewMode[];
  viewMode: AttendanceViewMode;
  onViewModeChange: (mode: AttendanceViewMode) => void;
  onMarkAll: (status: AttendanceStatus) => void;
}

export function AttendanceControls({
  selectedDateLabel,
  viewModes,
  viewMode,
  onViewModeChange,
  onMarkAll,
}: AttendanceControlsProps) {
  return (
    <div className={styles.detailToolbar}>
      <div className={styles.toolbarLeft}>
        <div className={styles.dateNav}>
          <button type="button" className={styles.iconBtn} aria-label="Previous day">
            ‹
          </button>
          <button type="button" className={styles.dateChip}>
            {selectedDateLabel}
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Next day">
            ›
          </button>
          <button type="button" className={styles.todayBtn}>
            Today
          </button>
        </div>

        <FilterSelect
          label="View"
          value={viewMode}
          options={[...viewModes]}
          onChange={(value) => onViewModeChange(value as AttendanceViewMode)}
        />
      </div>

      <div className={styles.toolbarRight}>
        <span className={styles.toolbarLabel}>Mark all</span>
        <button
          type="button"
          className={`${styles.bulkBtn} ${styles.bulkPresent}`}
          onClick={() => onMarkAll('Present')}
        >
          Present
        </button>
        <button
          type="button"
          className={`${styles.bulkBtn} ${styles.bulkAbsent}`}
          onClick={() => onMarkAll('Absent')}
        >
          Absent
        </button>
        <button
          type="button"
          className={`${styles.bulkBtn} ${styles.bulkLate}`}
          onClick={() => onMarkAll('Late')}
        >
          Late
        </button>
        <button type="button" className={listStyles.toolBtn}>
          More ▾
        </button>
      </div>
    </div>
  );
}
