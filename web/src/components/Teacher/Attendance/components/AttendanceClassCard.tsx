'use client';

import React from 'react';
import type { AttendanceClassSection } from '@/types/teacherAttendance';
import styles from '../attendance.module.css';

interface AttendanceClassCardProps {
  cls: AttendanceClassSection;
  onOpen: (id: string) => void;
}

export function AttendanceClassCard({ cls, onOpen }: AttendanceClassCardProps) {
  return (
    <button
      type="button"
      className={styles.classCard}
      onClick={() => onOpen(cls.id)}
      style={{ borderColor: `${cls.accent}55` }}
    >
      <div className={styles.classCardTop}>
        <div
          className={styles.classIcon}
          style={{
            background: `${cls.accent}22`,
            color: cls.accent,
            borderColor: `${cls.accent}66`,
          }}
        >
          {cls.icon}
        </div>
        <div className={styles.classCardRate}>
          <span className={styles.classCardRateValue} style={{ color: cls.accent }}>
            {cls.attendanceRate}%
          </span>
          <span className={styles.classCardRateLabel}>Attendance</span>
        </div>
      </div>

      <div className={styles.classCardBody}>
        <h3 className={styles.classCardTitle}>{cls.subject}</h3>
        <p className={styles.classCardSection}>{cls.gradeSection}</p>
        <p className={styles.classCardMeta}>
          {cls.room} · {cls.schedule}
        </p>
      </div>

      <div className={styles.classCardStats}>
        <span className={styles.statPresent}>{cls.presentToday} Present</span>
        <span className={styles.statAbsent}>{cls.absentToday} Absent</span>
        <span className={styles.statLate}>{cls.lateToday} Late</span>
      </div>

      <div className={styles.classCardFooter}>
        <span>{cls.studentCount} students</span>
        <span className={styles.classCardCta}>Take attendance →</span>
      </div>
    </button>
  );
}
