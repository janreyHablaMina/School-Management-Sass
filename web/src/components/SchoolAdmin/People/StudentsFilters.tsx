import React from 'react';
import { Search } from 'lucide-react';
import layoutStyles from '../shared/layout.module.css';
import styles from './students.module.css';
import { CustomSelect } from '../../ui/CustomSelect';

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
      <CustomSelect 
        className={styles.filterSelect}
        value="All Grade Levels"
        onChange={() => {}}
        options={['All Grade Levels', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']}
      />
      <CustomSelect 
        className={styles.filterSelect}
        value="All Sections"
        onChange={() => {}}
        options={['All Sections', 'Section A', 'Section B']}
      />
      <CustomSelect 
        className={styles.filterSelect}
        value="All Status"
        onChange={() => {}}
        options={['All Status', 'Active', 'Inactive']}
      />
      <CustomSelect 
        className={styles.filterSelect}
        value="All Gender"
        onChange={() => {}}
        options={['All Gender', 'Male', 'Female']}
      />
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
