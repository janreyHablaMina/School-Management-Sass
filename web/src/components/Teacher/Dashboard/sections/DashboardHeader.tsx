import React from 'react';
import styles from '../dashboard.module.css';

interface DashboardHeaderProps {
  shortName: string;
  onAskAi?: () => void;
}

export function DashboardHeader({ shortName, onAskAi }: DashboardHeaderProps) {
  return (
    <div className={styles.headerSection}>
      <div className={styles.headerText}>
        <h1>Good morning, {shortName}! 👋</h1>
        <p>Here&apos;s what&apos;s happening in your classes today.</p>
      </div>
      <button type="button" className={styles.aiAskBtn} onClick={onAskAi}>
        <span>✨</span> Ask AI Assistant
      </button>
    </div>
  );
}
