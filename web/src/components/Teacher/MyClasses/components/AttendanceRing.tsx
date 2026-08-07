import React from 'react';
import styles from '../myClasses.module.css';

interface AttendanceRingProps {
  value: number;
  color: string;
}

export function AttendanceRing({ value, color }: AttendanceRingProps) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={styles.attendanceCell}>
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="rgba(240, 239, 237, 0.12)"
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 18 18)"
        />
      </svg>
      <span>{value}%</span>
    </div>
  );
}
