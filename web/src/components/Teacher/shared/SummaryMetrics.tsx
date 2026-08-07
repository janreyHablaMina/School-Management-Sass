import React from 'react';
import styles from './listPage.module.css';
import type { TeacherSummaryMetric } from '@/types/teacherList';

interface SummaryMetricsProps {
  metrics: TeacherSummaryMetric[];
  columns?: 4 | 5;
}

export function SummaryMetrics({ metrics, columns = 4 }: SummaryMetricsProps) {
  const colsClass = columns === 5 ? styles.metricsCols5 : styles.metricsCols4;

  return (
    <section className={`${styles.metricsGrid} ${colsClass}`}>
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
