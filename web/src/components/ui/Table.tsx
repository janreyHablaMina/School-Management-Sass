import React from 'react';
import styles from './ui.module.css';

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
}

export function Table<T>({ columns, data, keyExtractor }: TableProps<T>) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className={styles.emptyTable}>
              No data available.
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={keyExtractor(item)}>
              {columns.map((col, index) => (
                <td key={index}>
                  {col.render ? col.render(item) : String(col.accessor ? item[col.accessor] : '')}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
