import React from 'react';
import type { AiUsage } from '@/types/teacherPortal';
import styles from '../aiAssistant.module.css';

interface CreditUsageCardProps {
  creditsLeft: number;
  usage: AiUsage;
}

export function CreditUsageCard({ creditsLeft, usage }: CreditUsageCardProps) {
  return (
    <div className={`${styles.panel} ${styles.usageCard}`}>
      <div className={styles.usageTop}>
        <div>
          <p className={styles.usageEyebrow}>Monthly allowance</p>
          <p className={styles.usageTitle}>Credits this month</p>
        </div>
        <span className={styles.usagePill}>✨ {creditsLeft.toLocaleString()} left</span>
      </div>
      <div className={styles.usageMeta}>
        <span>
          {usage.used} / {usage.total.toLocaleString()} used
        </span>
        <span>{usage.percent}%</span>
      </div>
      <div className={styles.usageTrack} aria-hidden>
        <div className={styles.usageFill} style={{ width: `${usage.percent}%` }} />
      </div>
    </div>
  );
}
