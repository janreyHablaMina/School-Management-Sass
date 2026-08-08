'use client';

import React from 'react';
import { listStyles } from '../../shared';
import type { AttendanceClassSection } from '@/types/teacherAttendance';
import styles from '../attendance.module.css';

interface AttendanceDetailHeaderProps {
  cls: AttendanceClassSection;
  onBack: () => void;
  sessionActive: boolean;
  onStartAttendance: () => void;
}

export function AttendanceDetailHeader({
  cls,
  onBack,
  sessionActive,
  onStartAttendance,
}: AttendanceDetailHeaderProps) {
  return (
    <header className={styles.detailHeader}>
      <button type="button" className={styles.backLink} onClick={onBack}>
        ← All classes
      </button>

      <div className={styles.detailHeaderRow}>
        <div className={styles.detailIdentity}>
          <div
            className={styles.detailIcon}
            style={{
              background: `${cls.accent}22`,
              color: cls.accent,
              borderColor: `${cls.accent}66`,
            }}
          >
            {cls.icon}
          </div>
          <div>
            <h1 className={styles.detailTitle}>{cls.subject}</h1>
            <p className={styles.detailMeta}>
              {cls.gradeSection}
              <span className={styles.metaDot}>·</span>
              {cls.room}
              <span className={styles.metaDot}>·</span>
              {cls.schedule}
            </p>
          </div>
        </div>

        <div className={styles.detailActions}>
          <button type="button" className={listStyles.secondaryBtn}>
            ⬇ Export
          </button>
          <button
            type="button"
            className={listStyles.primaryBtn}
            onClick={onStartAttendance}
            disabled={sessionActive}
            title={sessionActive ? 'A live session is already running' : 'Start location attendance'}
          >
            {sessionActive ? '● Session active' : '📍 Start Attendance'}
          </button>
        </div>
      </div>
    </header>
  );
}
