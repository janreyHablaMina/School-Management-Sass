import React from 'react';
import styles from '../students.module.css';

interface TeachersFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export const TeachersFilters: React.FC<TeachersFiltersProps> = ({ 
  searchTerm, 
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div className={styles.filtersRow}>
      <div className={styles.searchWrapper}>
        <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input 
          type="text" 
          placeholder="Search teachers..." 
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <select 
        className={styles.filterSelect}
        value={departmentFilter}
        onChange={(e) => setDepartmentFilter(e.target.value)}
      >
        <option value="All Departments">All Departments</option>
        <option value="Science">Science</option>
        <option value="Mathematics">Mathematics</option>
        <option value="English">English</option>
        <option value="Filipino">Filipino</option>
        <option value="Social Studies">Social Studies</option>
        <option value="Computer">Computer</option>
        <option value="MAPEH">MAPEH</option>
        <option value="Physical Education">Physical Education</option>
        <option value="Religion">Religion</option>
      </select>
      <select 
        className={styles.filterSelect}
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All Status">All Status</option>
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
      </select>
      
      <button className={styles.filterBtn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        Filters
      </button>
      <button className={styles.clearBtn} onClick={() => {
        setSearchTerm('');
        setDepartmentFilter('All Departments');
        setStatusFilter('All Status');
      }}>Clear</button>
    </div>
  );
};
