import type { ReactNode } from 'react';
import styles from './listPage.module.css';

export type DataTableColumn =
  | string
  | {
      id: string;
      label: string;
      sortable?: boolean;
    };

interface DataTableProps {
  columns: readonly DataTableColumn[];
  minWidth?: number;
  children: ReactNode;
  /** Optional first header cell (e.g. select-all checkbox). */
  leadingHeader?: ReactNode;
  sortKey?: string | null;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
}

function normalizeColumn(column: DataTableColumn) {
  if (typeof column === 'string') {
    return { id: column, label: column, sortable: false };
  }
  return {
    id: column.id,
    label: column.label,
    sortable: Boolean(column.sortable),
  };
}

function sortIcon(
  columnId: string,
  sortKey: string | null | undefined,
  sortDirection: 'asc' | 'desc' | undefined,
) {
  if (!sortKey || sortKey !== columnId) return '↕';
  return sortDirection === 'asc' ? '↑' : '↓';
}

export function DataTable({
  columns,
  minWidth = 980,
  children,
  leadingHeader,
  sortKey = null,
  sortDirection = 'asc',
  onSort,
}: DataTableProps) {
  return (
    <div className={styles.tablePanel}>
      <div className={styles.tableWrap}>
        <table className={styles.table} style={{ minWidth }}>
          <thead>
            <tr>
              {leadingHeader ? <th className={styles.checkHeader}>{leadingHeader}</th> : null}
              {columns.map((column) => {
                const normalized = normalizeColumn(column);
                if (!normalized.sortable || !onSort) {
                  return <th key={normalized.id}>{normalized.label}</th>;
                }

                const active = sortKey === normalized.id;
                return (
                  <th
                    key={normalized.id}
                    className={styles.sortableTh}
                    aria-sort={
                      active
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => onSort(normalized.id)}
                      aria-label={`Sort by ${normalized.label}`}
                    >
                      {normalized.label}
                      <span className={styles.sortIcon} aria-hidden>
                        {sortIcon(normalized.id, sortKey, sortDirection)}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}
