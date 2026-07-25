import React from 'react';
import styles from './students.module.css';

export const StudentsMetrics: React.FC = () => {
  const metrics = [
    { label: 'Total Students', value: '1,245', sub: '8.6% vs last month', growth: true, icon: '👥', iconBg: 'rgba(132, 169, 255, 0.1)', color: '#84a9ff' },
    { label: 'Male Students', value: '642', sub: '51.6% of total', growth: false, icon: '👨‍🎓', iconBg: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' },
    { label: 'Female Students', value: '603', sub: '48.4% of total', growth: false, icon: '👩‍🎓', iconBg: 'rgba(255, 126, 147, 0.1)', color: '#ff7e93' },
    { label: 'New Enrollments', value: '56', sub: '12.0% vs last month', growth: true, icon: '📝', iconBg: 'rgba(255, 171, 107, 0.1)', color: '#ffab6b' },
    { label: 'Promoted Students', value: '1,180', sub: '95.7% of total', growth: false, icon: '🏅', iconBg: 'rgba(245, 200, 66, 0.1)', color: '#f5c842' },
    { label: 'With Incomplete Info', value: '18', sub: 'View list', growth: false, isLink: true, icon: '📄', iconBg: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' },
  ];

  return (
    <div className={styles.metricsGrid}>
      {metrics.map((metric, idx) => (
        <div key={idx} className={styles.metricCard}>
          <div className={styles.metricTop}>
            <div className={styles.metricIconWrapper} style={{ background: metric.iconBg, color: metric.color }}>
              {metric.icon}
            </div>
            <span className={styles.metricLabel}>{metric.label}</span>
          </div>
          <div className={styles.metricValue}>{metric.value}</div>
          <div className={styles.metricBottom}>
            {metric.growth && <span className={styles.growthGreen}>↑ {metric.sub.split(' ')[0]}</span>}
            <span className={metric.isLink ? styles.linkText : styles.subText}>
              {metric.growth ? metric.sub.substring(metric.sub.indexOf(' ')) : metric.sub}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
