import React from 'react';
import type { AttendanceDaySummary } from '@/types/teacherAttendance';
import { attendanceStatusAccent } from '../utils';
import styles from '../attendance.module.css';

interface DaySummaryProps {
  dateLabel: string;
  summary: AttendanceDaySummary;
}

function pct(part: number, total: number) {
  if (total === 0) return '0%';
  return `${((part / total) * 100).toFixed(1)}%`;
}

export function DaySummary({ dateLabel, summary }: DaySummaryProps) {
  const rows = [
    { label: 'Present', count: summary.present, status: 'Present' as const },
    { label: 'Absent', count: summary.absent, status: 'Absent' as const },
    { label: 'Late', count: summary.late, status: 'Late' as const },
  ];

  return (
    <div>
      <h3 className={styles.summaryTitle}>Summary for {dateLabel}</h3>
      <ul className={styles.summaryList}>
        {rows.map((row) => {
          const accent = attendanceStatusAccent(row.status);
          return (
            <li key={row.label} className={styles.summaryItem}>
              <span className={styles.summaryLeft}>
                <span className={styles.summaryDot} style={{ background: accent }} />
                {row.label}
              </span>
              <span className={styles.summaryValue}>
                {row.count} · {pct(row.count, summary.total)}
              </span>
            </li>
          );
        })}
      </ul>
      <div className={styles.summaryTotal}>
        <span>Total Students</span>
        <strong>{summary.total}</strong>
      </div>
      <button type="button" className={styles.reportLink}>
        View Monthly Report ↗
      </button>
    </div>
  );
}
