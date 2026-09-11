import React from 'react';
import styles from './dashboardMetrics.module.css';

export type DashboardMetricTone = 'yellow' | 'green';

export interface DashboardMetric {
  label: string;
  value: string;
  growth: string;
  growthClass: DashboardMetricTone;
}

interface DashboardMetricsProps {
  metrics: DashboardMetric[];
  columns?: number;
}

export function DashboardMetrics({ metrics, columns = 6 }: DashboardMetricsProps) {
  const gridStyle = {
    '--dashboard-metric-columns': columns,
  } as React.CSSProperties;

  return (
    <section className={styles.metricsGrid} style={gridStyle}>
      {metrics.map((metric) => (
        <div key={metric.label} className={styles.metricCard}>
          <div className={styles.metricLabel}>{metric.label}</div>
          <div className={styles.metricValue}>{metric.value}</div>
          <div
            className={`${styles.metricGrowth} ${
              metric.growthClass === 'green' ? styles.growthGreen : styles.growthYellow
            }`}
          >
            {metric.growth}
          </div>
        </div>
      ))}
    </section>
  );
}
