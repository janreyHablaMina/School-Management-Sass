import React from 'react';
import styles from './students.module.css';

export const StudentsHeader: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        <h1>Students</h1>
        <p>Manage student information, enrollment, and academic records.</p>
      </div>
      <div className={styles.headerActions}>
        <button className={styles.importBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          Import Students
        </button>
        <button className={styles.addBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Student
        </button>
        <button className={styles.moreBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          More
        </button>
      </div>
    </div>
  );
};
