import React from 'react';
import styles from './listPage.module.css';

interface ListTabsProps {
  tabs: readonly string[];
  value: string;
  onChange: (tab: string) => void;
  'aria-label'?: string;
}

export function ListTabs({
  tabs,
  value,
  onChange,
  'aria-label': ariaLabel = 'List views',
}: ListTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={value === tab}
          className={`${styles.tab} ${value === tab ? styles.tabActive : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
