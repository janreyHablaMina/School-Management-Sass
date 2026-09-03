import React from 'react';
import { Search } from 'lucide-react';
import layoutStyles from '../shared/layout.module.css';
import styles from './students.module.css';

interface StudentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const StudentsFilters: React.FC<StudentsFiltersProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={layoutStyles.filtersRow}>
      <div className={layoutStyles.searchWrapper}>
        <Search className={layoutStyles.searchIcon} size={18} />
        <input 
          type="text" 
          placeholder="Search students..." 
          className={layoutStyles.searchInput}
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
      <button 
        className={searchTerm !== '' ? styles.clearBtnActive : styles.clearBtn}
        onClick={() => setSearchTerm('')}
      >
        Reset Filters
      </button>
    </div>
  );
};
