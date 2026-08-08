'use client';

import React from 'react';
import { listStyles } from '../../shared';
import { formatCountdown } from '@/lib/attendance';
import { formatDistance } from '@/lib/geo/attendanceGeo';
import type { AttendanceSessionRecord } from '@/types/attendanceSession';
import styles from '../attendance.module.css';

interface LiveSessionPanelProps {
  session: AttendanceSessionRecord;
  remainingSeconds: number;
  presentCount: number;
  totalStudents: number;
  usedFallbackLocation: boolean;
  onEndSession: () => void;
}

export function LiveSessionPanel({
  session,
  remainingSeconds,
  presentCount,
  totalStudents,
  usedFallbackLocation,
  onEndSession,
}: LiveSessionPanelProps) {
  const expired = remainingSeconds <= 0;

  return (
    <section className={`${styles.liveSession} ${expired ? styles.liveSessionExpired : ''}`}>
      <div className={styles.liveSessionMain}>
        <div className={styles.liveSessionBadge}>{expired ? 'Session ended' : 'Live session'}</div>
        <h3 className={styles.liveSessionTitle}>
          {expired ? 'Attendance window closed' : 'Students can check in now'}
        </h3>
        <p className={styles.liveSessionCopy}>
          Radius {formatDistance(session.radiusMeters)} around your device
          {usedFallbackLocation ? ' (demo location — GPS unavailable)' : ''}.
          Manual Present / Absent / Late still works anytime.
        </p>

        <div className={styles.liveSessionStats}>
          <div className={styles.liveStat}>
            <span className={styles.liveStatValue}>{presentCount}</span>
            <span className={styles.liveStatLabel}>Checked in</span>
          </div>
          <div className={styles.liveStat}>
            <span className={styles.liveStatValue}>{Math.max(totalStudents - presentCount, 0)}</span>
            <span className={styles.liveStatLabel}>Waiting</span>
          </div>
          <div className={styles.liveStat}>
            <span className={styles.liveStatValue}>{formatCountdown(remainingSeconds)}</span>
            <span className={styles.liveStatLabel}>{expired ? 'Expired' : 'Time left'}</span>
          </div>
        </div>
      </div>

      <div className={styles.liveSessionSide}>
        <p className={styles.liveCoords}>
          Center: {session.center.lat.toFixed(5)}, {session.center.lng.toFixed(5)}
        </p>
        <p className={styles.liveStudentLink}>
          Student check-in demo: <code>/student/attendance</code>
        </p>
        <button type="button" className={listStyles.secondaryBtn} onClick={onEndSession}>
          {expired ? 'Save & close' : 'End session'}
        </button>
      </div>
    </section>
  );
}
