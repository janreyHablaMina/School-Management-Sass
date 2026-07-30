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
  return (
    <div className={styles.metricsGrid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {metrics.map((metric, idx) => (
        <div key={idx} className={styles.metricCard}>
          <div className={styles.metricTop}>
            <div className={styles.metricIconWrapper} style={{ background: metric.iconBg, color: metric.iconColor }}>
              {metric.title === 'Total Teachers' ? '👥' : 
               metric.title === 'Active Teachers' ? '✅' :
               metric.title === 'Advisers' ? '👩‍🏫' : 
               metric.title === 'On Leave' ? '🌴' : 
               metric.title === 'Total Students' ? '👥' :
               metric.title === 'Active Students' ? '🟢' :
               metric.title === 'New Enrollments' ? '📈' :
               metric.title === 'Avg. Attendance' ? '📅' : '📊'}
            </div>
            <span className={styles.metricLabel}>{metric.title}</span>
          </div>
          <div className={styles.metricValue}>{metric.value}</div>
          <div className={styles.metricBottom}>
            <span className={styles.subText}>{metric.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
