import React from 'react';
import styles from '../dashboard.module.css';

interface PanelHeaderProps {
  title: string;
  right?: React.ReactNode;
}

export function PanelHeader({ title, right }: PanelHeaderProps) {
  return (
    <div className={styles.panelHeader}>
      <h3 className={styles.panelTitleChalk}>{title}</h3>
      {right}
    </div>
  );
}
