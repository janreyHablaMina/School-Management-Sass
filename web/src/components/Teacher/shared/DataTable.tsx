import React from 'react';
import styles from './listPage.module.css';

interface DataTableProps {
  columns: readonly string[];
  minWidth?: number;
  children: React.ReactNode;
}

export function DataTable({ columns, minWidth = 980, children }: DataTableProps) {
  return (
    <div className={styles.tablePanel}>
      <div className={styles.tableWrap}>
        <table className={styles.table} style={{ minWidth }}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}
