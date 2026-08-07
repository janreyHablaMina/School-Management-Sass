import React from 'react';
import styles from './myClasses.module.css';
import { ClassRow } from './components/ClassRow';
import type { MyClassRow } from '@/types/myClasses';

interface ClassesTableProps {
  classes: MyClassRow[];
}

const COLUMNS = ['Class', 'Schedule', 'Students', 'Attendance', 'Progress', 'Actions'] as const;

export function ClassesTable({ classes }: ClassesTableProps) {
  return (
    <div className={styles.tablePanel}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {COLUMNS.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <ClassRow key={cls.id} cls={cls} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
