'use client';

import React from 'react';
import { FilterSelect, listStyles } from '../shared';
import type { AttendanceClassOption, AttendanceViewMode } from '@/types/teacherAttendance';
import styles from './attendance.module.css';

interface AttendanceControlsProps {
  classOptions: AttendanceClassOption[];
  classId: string;
  onClassChange: (id: string) => void;
  selectedDateLabel: string;
  viewModes: AttendanceViewMode[];
  viewMode: AttendanceViewMode;
  onViewModeChange: (mode: AttendanceViewMode) => void;
}

export function AttendanceControls({
  classOptions,
  classId,
  onClassChange,
  selectedDateLabel,
  viewModes,
  viewMode,
  onViewModeChange,
}: AttendanceControlsProps) {
  const classLabels = classOptions.map((option) => option.label);
  const selectedClassLabel =
    classOptions.find((option) => option.id === classId)?.label ?? classLabels[0];

  return (
    <div className={styles.controls}>
      <div className={styles.controlGrow}>
        <FilterSelect
          label="Class"
          value={selectedClassLabel}
          options={classLabels}
          onChange={(label) => {
            const match = classOptions.find((option) => option.label === label);
            if (match) onClassChange(match.id);
          }}
        />
      </div>

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
