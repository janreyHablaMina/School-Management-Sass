import React from 'react';
import styles from '../dashboard.module.css';
import type { TeacherMetric } from '@/types/teacherPortal';

interface MetricsRowProps {
  metrics: TeacherMetric[];
}

export function MetricsRow({ metrics }: MetricsRowProps) {
  return (
    <section className={styles.metricsGrid}>
      {metrics.map((m) => (
        <div key={m.label} className={styles.metricCard}>
          <div className={styles.metricLabel}>{m.label}</div>
          <div className={styles.metricValue}>{m.value}</div>
          <div
            className={`${styles.metricGrowth} ${
              m.growthClass === 'green' ? styles.growthGreen : styles.growthYellow
            }`}
          >
            {m.growth}
          </div>
        </div>
      ))}
    </section>
  );
}
