import React from 'react';
import styles from './ui.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  itemName?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemName = 'items'
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={styles.pagination}>
      <span>Showing {totalItems === 0 ? 0 : startItem} to {endItem} of {totalItems} {itemName}</span>
      <div className={styles.pageControls}>
        <button 
          className={styles.pageBtn}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>
        <button className={`${styles.pageBtn} ${styles.active}`}>{currentPage}</button>
        <button 
          className={styles.pageBtn}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
