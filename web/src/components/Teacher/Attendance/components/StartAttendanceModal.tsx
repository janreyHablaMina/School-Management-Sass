'use client';

import React, { useState } from 'react';
import { listStyles } from '../../shared';
import type { AttendanceSchoolConfig } from '@/types/attendanceSession';
import styles from '../attendance.module.css';

interface StartAttendanceModalProps {
  classLabel: string;
  subject: string;
  config: AttendanceSchoolConfig;
  isStarting: boolean;
  locationHint?: string | null;
  onCancel: () => void;
  onStart: (radiusMeters: number, durationMinutes: number) => void;
}

export function StartAttendanceModal({
  classLabel,
  subject,
  config,
  isStarting,
  locationHint,
  onCancel,
  onStart,
}: StartAttendanceModalProps) {
  const [radiusMeters, setRadiusMeters] = useState(config.defaultRadiusMeters);
  const [durationMinutes, setDurationMinutes] = useState(config.defaultDurationMinutes);

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="start-attendance-title">
      <div className={styles.modalCard}>
        <p className={styles.modalEyebrow}>Location attendance</p>
        <h2 id="start-attendance-title" className={styles.modalTitle}>
          Start attendance session
        </h2>
        <p className={styles.modalCopy}>
          We’ll capture your current location as the classroom center. Students inside the radius can mark
          themselves present until the session expires. You can still mark Present, Absent, or Late manually.
        </p>

        <div className={styles.modalMeta}>
          <span>{subject}</span>
          <span className={styles.metaDot}>·</span>
          <span>{classLabel}</span>
        </div>

        <label className={styles.modalField}>
          <span className={styles.modalLabel}>Attendance radius</span>
          <div className={styles.chipRow}>
            {config.radiusOptionsMeters.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.choiceChip} ${radiusMeters === option ? styles.choiceChipActive : ''}`}
                onClick={() => setRadiusMeters(option)}
                disabled={isStarting}
              >
                {option}m
              </button>
            ))}
          </div>
        </label>

        <label className={styles.modalField}>
          <span className={styles.modalLabel}>Session duration</span>
          <div className={styles.chipRow}>
            {config.durationOptionsMinutes.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.choiceChip} ${durationMinutes === option ? styles.choiceChipActive : ''}`}
                onClick={() => setDurationMinutes(option)}
                disabled={isStarting}
              >
                {option} min
              </button>
            ))}
          </div>
        </label>

        {locationHint ? <p className={styles.modalHint}>{locationHint}</p> : null}

        <div className={styles.modalActions}>
          <button type="button" className={listStyles.secondaryBtn} onClick={onCancel} disabled={isStarting}>
            Cancel
          </button>
          <button
            type="button"
            className={listStyles.primaryBtn}
            disabled={isStarting}
            onClick={() => onStart(radiusMeters, durationMinutes)}
          >
            {isStarting ? 'Capturing location…' : '📍 Start Attendance'}
          </button>
        </div>
      </div>
    </div>
  );
}
