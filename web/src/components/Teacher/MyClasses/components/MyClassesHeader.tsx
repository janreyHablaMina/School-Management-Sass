import React from 'react';
import styles from '../myClasses.module.css';

interface MyClassesHeaderProps {
  onCreateClass?: () => void;
}

export function MyClassesHeader({ onCreateClass }: MyClassesHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerText}>
        <h1>My Classes</h1>
        <p>View and manage all your classes in one place.</p>
      </div>
      <button type="button" className={styles.addBtn} onClick={onCreateClass}>
        + Create New Class
      </button>
    </div>
  );
}
