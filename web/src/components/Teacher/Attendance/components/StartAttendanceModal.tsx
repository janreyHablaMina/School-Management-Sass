'use client';

import React, { useState } from 'react';
import { TeacherModal, modalStyles, listStyles } from '../../shared';
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

  return (
    <TeacherModal
      titleId="start-attendance-title"
      eyebrow="Location attendance"
      title="Start attendance session"
      copy="We’ll capture your current location as the classroom center. Students inside the radius can mark themselves present until the session expires. You can still mark Present, Absent, or Late manually."
      onClose={onCancel}
      cardClassName={modalStyles.modalCardNarrow}
      footer={
        <>
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
        </>
      }
    >
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
    </TeacherModal>
  );
}
