import React from 'react';
import styles from '../students.module.css';
import { TEACHERS_METRICS } from '@/lib/mock/teachers.mock';

export const TeachersMetrics: React.FC = () => {
  return (
    <div className={styles.metricsGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
      {TEACHERS_METRICS.map((metric, idx) => (
        <div key={idx} className={styles.metricCard}>
          <div className={styles.metricTop}>
            <div className={styles.metricIconWrapper} style={{ background: metric.iconBg, color: metric.iconColor }}>
              {/* Fallback to simple emoji or text if lucide icons not available in this scope, but let's use the lucide-react if we can. Wait, I will just render an emoji based on icon name for now to match StudentsMetrics style, or use Lucide. StudentsMetrics uses emojis. Let's use emojis for consistency. */}
              {metric.title === 'Total Teachers' ? '👥' : 
               metric.title === 'Active Teachers' ? '✅' :
               metric.title === 'Advisers' ? '👩‍🏫' : '🌴'}
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
