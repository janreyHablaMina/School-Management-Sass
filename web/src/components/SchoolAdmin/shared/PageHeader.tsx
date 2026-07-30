import React from 'react';
import styles from './layout.module.css';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actionButton?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actionButton }) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      
      {actionButton && (
        <div className={styles.headerActions}>
          <button className={styles.addBtn} onClick={actionButton.onClick}>
            {actionButton.icon || (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            )}
            {actionButton.label}
          </button>
        </div>
      )}
    </div>
  );
};
