import React from 'react';
import styles from '../students.module.css';
import type { StudentSummaryMetric } from '@/types/teacherStudents';

interface StudentsMetricsProps {
  metrics: StudentSummaryMetric[];
}

export function StudentsMetrics({ metrics }: StudentsMetricsProps) {
  return (
    <section className={styles.metricsGrid}>
      {metrics.map((m) => (
        <div key={m.label} className={styles.metricCard}>
          <div
            className={styles.metricIcon}
            style={{ background: `${m.accent}22`, color: m.accent }}
          >
            {m.icon}
          </div>
          <div className={styles.metricBody}>
            <span className={styles.metricLabel}>{m.label}</span>
            <span className={styles.metricValue}>{m.value}</span>
            <span className={styles.metricSub}>{m.subtitle}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
