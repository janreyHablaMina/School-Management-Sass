import React from 'react';
import styles from '../students.module.css';

interface StudentsHeaderProps {
  onImport?: () => void;
  onAdd?: () => void;
}

export function StudentsHeader({ onImport, onAdd }: StudentsHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerText}>
        <h1>Students</h1>
        <p>View and manage all students from your classes.</p>
      </div>
      <div className={styles.headerActions}>
        <button type="button" className={styles.secondaryBtn} onClick={onImport}>
          ⬆ Import Students
        </button>
        <button type="button" className={styles.primaryBtn} onClick={onAdd}>
          + Add Student
        </button>
      </div>
    </div>
  );
}
