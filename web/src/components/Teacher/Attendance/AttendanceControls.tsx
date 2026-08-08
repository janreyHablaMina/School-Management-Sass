'use client';

import React from 'react';
import { FilterSelect, listStyles } from '../shared';
import type { AttendanceViewMode } from '@/types/teacherAttendance';
import styles from './attendance.module.css';

interface AttendanceControlsProps {
  selectedDateLabel: string;
  viewModes: AttendanceViewMode[];
  viewMode: AttendanceViewMode;
  onViewModeChange: (mode: AttendanceViewMode) => void;
}

export function AttendanceControls({
  selectedDateLabel,
  viewModes,
  viewMode,
  onViewModeChange,
}: AttendanceControlsProps) {
  return (
    <div className={styles.controls}>
      <label className={listStyles.filterField}>
        <span className={listStyles.filterLabel}>Date</span>
        <button type="button" className={`${listStyles.filterSelect} ${styles.dateBtn}`}>
          📅 {selectedDateLabel}
        </button>
      </label>

      <FilterSelect
        label="View"
        value={viewMode}
        options={[...viewModes]}
        onChange={(value) => onViewModeChange(value as AttendanceViewMode)}
      />

      <div className={styles.navGroup}>
        <button type="button" className={styles.iconBtn} aria-label="Previous day">
          ‹
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Next day">
          ›
        </button>
        <button type="button" className={listStyles.secondaryBtn}>
          Today
        </button>
      </div>
    </div>
  );
}
