import React from 'react';
import styles from '../dashboard.module.css';

interface MiniSparklineProps {
  path: string;
  stroke: string;
}

export function MiniSparkline({ path, stroke }: MiniSparklineProps) {
  return (
    <svg className={styles.sparkline} viewBox="0 0 80 36" fill="none" aria-hidden="true">
      <path d={path} stroke={stroke} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d={`${path} L 76 36 L 4 36 Z`} fill={stroke} opacity="0.12" />
    </svg>
  );
}
