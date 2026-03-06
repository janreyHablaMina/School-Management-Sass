'use client';

import type { ReactNode } from 'react';
import styles from './listPage.module.css';

export interface ResourceBulkAction {
  label: string;
  onClick: () => void;
  tone?: 'danger' | 'restore' | 'default';
}

interface ResourceBulkBarProps {
  selectedCount: number;
  itemLabel: string;
  actions?: ResourceBulkAction[];
  onClearSelection: () => void;
  children?: ReactNode;
}

export function ResourceBulkBar({
  selectedCount,
  itemLabel,
  actions = [],
  onClearSelection,
  children,
}: ResourceBulkBarProps) {
  if (selectedCount === 0) return null;

  const plural =
    selectedCount === 1 ? itemLabel : itemLabel.endsWith('s') ? itemLabel : `${itemLabel}s`;

  return (
    <div className={styles.bulkBar} role="region" aria-label="Bulk selection actions">
      <div className={styles.bulkBarInfo}>
        <span className={styles.bulkBarCount}>{selectedCount}</span>
        <span>
          {plural} selected
        </span>
      </div>

      <div className={styles.bulkBarActions}>
        {children}
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className={
              action.tone === 'danger'
                ? `${styles.bulkBtn} ${styles.bulkDanger}`
                : action.tone === 'restore'
                  ? `${styles.bulkBtn} ${styles.bulkRestore}`
                  : `${styles.bulkBtn} ${styles.bulkDefault}`
            }
            onClick={action.onClick}
          >
            {action.label}
          </button>
        ))}
        <button
          type="button"
          className={styles.clearSelectionBtn}
          onClick={onClearSelection}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
