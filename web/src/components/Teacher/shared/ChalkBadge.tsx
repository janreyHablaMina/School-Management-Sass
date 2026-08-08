import React from 'react';
import styles from './listPage.module.css';

interface ChalkBadgeProps {
  label: string;
  accent: string;
}

export function ChalkBadge({ label, accent }: ChalkBadgeProps) {
  return (
    <span
      className={styles.chalkBadge}
      style={{
        color: accent,
        borderColor: `${accent}88`,
        background: `${accent}18`,
      }}
    >
      {label}
    </span>
  );
}
