import React from 'react';
import styles from './listPage.module.css';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerText}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children ? <div className={styles.headerActions}>{children}</div> : null}
    </div>
  );
}
