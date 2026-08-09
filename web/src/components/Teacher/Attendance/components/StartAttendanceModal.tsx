'use client';

import React, { useState } from 'react';
import { listStyles, modalStyles, useLockWorkspaceScroll } from '../../shared';
import type { AttendanceSchoolConfig } from '@/types/attendanceSession';

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

  useLockWorkspaceScroll();

  return (
    <div
      className={modalStyles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="start-attendance-title"
    >
      <div className={`${modalStyles.modalCard} ${modalStyles.modalCardNarrow}`}>
        <p className={modalStyles.modalEyebrow}>Location attendance</p>
        <h2 id="start-attendance-title" className={modalStyles.modalTitle}>
          Start attendance session
        </h2>
        <p className={modalStyles.modalCopy}>
          We’ll capture your current location as the classroom center. Students inside the radius can
          mark themselves present until the session expires. You can still mark Present, Absent, or
          Late manually.
        </p>

        <div className={modalStyles.modalMeta}>
          <span>{subject}</span>
          <span> · </span>
          <span>{classLabel}</span>
        </div>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Attendance radius</span>
          <div className={modalStyles.chipRow}>
            {config.radiusOptionsMeters.map((option) => (
              <button
                key={option}
                type="button"
                className={`${modalStyles.choiceChip} ${
                  radiusMeters === option ? modalStyles.choiceChipActive : ''
                }`}
                onClick={() => setRadiusMeters(option)}
                disabled={isStarting}
              >
                {option}m
              </button>
            ))}
          </div>
        </label>

        <label className={modalStyles.modalField}>
          <span className={modalStyles.modalLabel}>Session duration</span>
          <div className={modalStyles.chipRow}>
            {config.durationOptionsMinutes.map((option) => (
              <button
                key={option}
                type="button"
                className={`${modalStyles.choiceChip} ${
                  durationMinutes === option ? modalStyles.choiceChipActive : ''
                }`}
                onClick={() => setDurationMinutes(option)}
                disabled={isStarting}
              >
                {option} min
              </button>
            ))}
          </div>
        </label>

        {locationHint ? <p className={modalStyles.modalHint}>{locationHint}</p> : null}

        <div className={modalStyles.modalActions}>
          <button
            type="button"
            className={listStyles.secondaryBtn}
            onClick={onCancel}
            disabled={isStarting}
          >
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
