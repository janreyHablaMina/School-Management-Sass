import React from 'react';
import styles from './students.module.css';

interface StudentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const StudentsFilters: React.FC<StudentsFiltersProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.filtersRow}>
      <div className={styles.searchWrapper}>
        <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input 
          type="text" 
          placeholder="Search student name, ID, or email..." 
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <select className={styles.filterSelect}>
        <option>All Grade Levels</option>
      </select>
      <select className={styles.filterSelect}>
        <option>All Sections</option>
      </select>
      <select className={styles.filterSelect}>
        <option>All Status</option>
      </select>
      <select className={styles.filterSelect}>
        <option>All Gender</option>
      </select>
      <button className={styles.filterBtn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        Filters
      </button>
      <button className={styles.clearBtn}>Clear</button>
    </div>
  );
};
