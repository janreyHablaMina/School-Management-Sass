import React from 'react';
import styles from './layout.module.css';

export interface Metric {
  title: string;
  value: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
  iconName?: string;
}

interface MetricsGridProps {
  metrics: Metric[];
  columns?: number;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics, columns = 4 }) => {
  const columnClass =
    columns === 6 ? styles.metricsCols6 : columns === 5 ? styles.metricsCols5 : styles.metricsCols4;

  return (
    <section className={`${styles.metricsGrid} ${columnClass}`}>
      {metrics.map((metric, idx) => (
        <div key={idx} className={styles.metricCard}>
          <div className={styles.metricIconWrapper} style={{ background: metric.iconBg, color: metric.iconColor }}>
            {metric.title === 'Total Teachers' ? '👥' :
             metric.title === 'Active Teachers' ? '✅' :
             metric.title === 'Advisers' ? '👩‍🏫' :
             metric.title === 'On Leave' ? '🌴' :
             metric.title === 'Total Students' ? '👥' :
             metric.title === 'Male Students' ? '♂' :
             metric.title === 'Female Students' ? '♀' :
             metric.title === 'New Enrollments' ? '↗' :
             metric.title === 'Active Students' ? '●' :
             metric.title === 'Avg. Attendance' ? '◷' : '▣'}
          </div>
          <div className={styles.metricBody}>
            <span className={styles.metricLabel}>{metric.title}</span>
            <span className={styles.metricValue}>{metric.value}</span>
            <span className={styles.subText}>{metric.subtitle}</span>
          </div>
        </div>
      ))}
    </section>
  );
};
