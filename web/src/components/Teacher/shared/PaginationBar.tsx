import React from 'react';
import styles from './listPage.module.css';

interface PaginationBarProps {
  rangeStart: number;
  rangeEnd: number;
  total: number;
  page: number;
  totalPages: number;
  itemLabel: string;
  onPageChange: (page: number) => void;
}

export function PaginationBar({
  rangeStart,
  rangeEnd,
  total,
  page,
  totalPages,
  itemLabel,
  onPageChange,
}: PaginationBarProps) {
  return (
    <div className={styles.pagination}>
      <span className={styles.pageInfo}>
        Showing {rangeStart} to {rangeEnd} of {total} {itemLabel}
      </span>
      <div className={styles.pageControls}>
        <button
          type="button"
          className={styles.pageBtn}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ''}`}
            onClick={() => onPageChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          className={styles.pageBtn}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}
