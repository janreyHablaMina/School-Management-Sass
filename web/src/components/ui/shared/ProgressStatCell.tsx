import React from 'react';
import styles from './listPage.module.css';

interface ProgressStatCellProps {
  current: number;
  total: number;
  barColor: string;
}

export function ProgressStatCell({ current, total, barColor }: ProgressStatCellProps) {
  const rate = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className={styles.progressStatCell}>
      <div className={styles.progressStatTop}>
        <span className={styles.progressStatCount}>
          {current} / {total}
        </span>
        <span className={styles.progressStatPct}>{rate}%</span>
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${rate}%`, background: barColor }}
        />
      </div>
    </div>
  );
}
