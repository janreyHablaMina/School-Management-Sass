import React from 'react';
import styles from '../myClasses.module.css';
import type { MyClassSummaryMetric } from '@/types/myClasses';

interface MyClassesMetricsProps {
  metrics: MyClassSummaryMetric[];
}

export function MyClassesMetrics({ metrics }: MyClassesMetricsProps) {
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
