import React from 'react';
import type { AttendanceDaySummary } from '@/types/teacherAttendance';
import { attendanceStatusAccent } from '../utils';
import styles from '../attendance.module.css';

interface DaySummaryProps {
  dateLabel: string;
  summary: AttendanceDaySummary;
  attendanceRate: number;
}

function pct(part: number, total: number) {
  if (total === 0) return 0;
  return (part / total) * 100;
}

export function DaySummary({ dateLabel, summary, attendanceRate }: DaySummaryProps) {
  const rows = [
    { label: 'Present', count: summary.present, status: 'Present' as const },
    { label: 'Absent', count: summary.absent, status: 'Absent' as const },
    { label: 'Late', count: summary.late, status: 'Late' as const },
  ];

  return (
    <div className={styles.summaryPanel}>
      <div className={styles.summaryHead}>
        <div>
          <p className={styles.summaryEyebrow}>Today’s snapshot</p>
          <h3 className={styles.summaryTitle}>{dateLabel}</h3>
        </div>
        <div className={styles.summaryRate}>
          <span className={styles.summaryRateValue}>{attendanceRate}%</span>
          <span className={styles.summaryRateLabel}>Attendance</span>
        </div>
      </div>

      <ul className={styles.summaryList}>
        {rows.map((row) => {
          const accent = attendanceStatusAccent(row.status);
          const width = pct(row.count, summary.total);
          return (
            <li key={row.label} className={styles.summaryItem}>
              <div className={styles.summaryItemTop}>
                <span className={styles.summaryLeft}>
                  <span className={styles.summaryDot} style={{ background: accent }} />
                  {row.label}
                </span>
                <span className={styles.summaryValue}>
                  {row.count}
                  <span className={styles.summaryPct}>{width.toFixed(0)}%</span>
                </span>
              </div>
              <div className={styles.summaryTrack}>
                <div
                  className={styles.summaryFill}
                  style={{ width: `${width}%`, background: accent }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.summaryTotal}>
        <span>{summary.total} students in this class</span>
        <button type="button" className={styles.reportLink}>
          Monthly report ↗
        </button>
      </div>
    </div>
  );
}
