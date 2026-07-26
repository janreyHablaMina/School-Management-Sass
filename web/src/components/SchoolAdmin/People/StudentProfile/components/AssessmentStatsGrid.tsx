import React from 'react';
import styles from '../studentProfile.module.css';
import { ASSESSMENT_STATS } from './mockData';
import { InfoCard } from './SharedComponents';

export const AssessmentStatsGrid: React.FC = () => {
  return (
    <div className={styles.assessmentsTopGrid}>
      {/* Overall Performance */}
      <InfoCard title="Overall Performance" icon="📊" iconBg="rgba(92, 199, 137, 0.1)" iconColor="#5cc789">
        <div className={styles.donutChartWrapper}>
          <div className={styles.donutChart}></div>
          <div className={styles.donutInfo}>
            <span className={styles.donutValue}>{ASSESSMENT_STATS.overall.value}</span>
            <span className={styles.donutSub}>{ASSESSMENT_STATS.overall.subText}</span>
            <span className={styles.donutLabel} style={{ color: ASSESSMENT_STATS.overall.color }}>{ASSESSMENT_STATS.overall.label}</span>
          </div>
        </div>
      </InfoCard>

      {/* Completed */}
      <InfoCard title="Completed" icon={ASSESSMENT_STATS.completed.icon} iconBg={ASSESSMENT_STATS.completed.iconBg} iconColor={ASSESSMENT_STATS.completed.iconColor}>
        <div className={styles.donutInfo} style={{ marginTop: '0.5rem' }}>
          <span className={styles.donutValue}>{ASSESSMENT_STATS.completed.value}</span>
          <span className={styles.donutSub}>{ASSESSMENT_STATS.completed.subText}</span>
        </div>
      </InfoCard>

      {/* Pending */}
      <InfoCard title="Pending" icon={ASSESSMENT_STATS.pending.icon} iconBg={ASSESSMENT_STATS.pending.iconBg} iconColor={ASSESSMENT_STATS.pending.iconColor}>
        <div className={styles.donutInfo} style={{ marginTop: '0.5rem' }}>
          <span className={styles.donutValue}>{ASSESSMENT_STATS.pending.value}</span>
          <span className={styles.donutSub}>{ASSESSMENT_STATS.pending.subText}</span>
        </div>
      </InfoCard>

      {/* Overdue */}
      <InfoCard title="Overdue" icon={ASSESSMENT_STATS.overdue.icon} iconBg={ASSESSMENT_STATS.overdue.iconBg} iconColor={ASSESSMENT_STATS.overdue.iconColor}>
        <div className={styles.donutInfo} style={{ marginTop: '0.5rem' }}>
          <span className={styles.donutValue}>{ASSESSMENT_STATS.overdue.value}</span>
          <span className={styles.donutSub}>{ASSESSMENT_STATS.overdue.subText}</span>
        </div>
      </InfoCard>
    </div>
  );
};
