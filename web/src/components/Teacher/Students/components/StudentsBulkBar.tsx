'use client';

import styles from '../students.module.css';

interface StudentsBulkBarProps {
  selectedCount: number;
  selectedActiveCount: number;
  selectedInactiveCount: number;
  onMarkInactive: () => void;
  onRestoreActive: () => void;
  onClearSelection: () => void;
}

export function StudentsBulkBar({
  selectedCount,
  selectedActiveCount,
  selectedInactiveCount,
  onMarkInactive,
  onRestoreActive,
  onClearSelection,
}: StudentsBulkBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className={styles.bulkBar} role="region" aria-label="Bulk selection actions">
      <div className={styles.bulkBarInfo}>
        <span className={styles.bulkBarCount}>{selectedCount}</span>
        <span>
          student{selectedCount === 1 ? '' : 's'} selected
        </span>
      </div>

      <div className={styles.bulkBarActions}>
        {selectedActiveCount > 0 ? (
          <button
            type="button"
            className={`${styles.bulkBtn} ${styles.bulkDanger}`}
            onClick={onMarkInactive}
          >
            Mark inactive ({selectedActiveCount})
          </button>
        ) : null}
        {selectedInactiveCount > 0 ? (
          <button
            type="button"
            className={`${styles.bulkBtn} ${styles.bulkRestore}`}
            onClick={onRestoreActive}
          >
            Restore active ({selectedInactiveCount})
          </button>
        ) : null}
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
