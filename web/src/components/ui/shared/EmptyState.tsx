import React from 'react';
import styles from './listPage.module.css';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
