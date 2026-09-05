import React from 'react';
import layoutStyles from '../../shared/layout.module.css';
import styles from '../students.module.css';
import { CustomSelect } from '../../../ui/CustomSelect';

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
    <div className={layoutStyles.filtersRow}>
      <div className={layoutStyles.searchWrapper}>
        <svg className={layoutStyles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input 
          type="text" 
          placeholder="Search teachers..." 
          className={layoutStyles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <CustomSelect 
        className={styles.filterSelect}
        value={departmentFilter}
        onChange={setDepartmentFilter}
        options={[
          'All Departments',
          'Science',
          'Mathematics',
          'English',
          'Filipino',
          'Social Studies',
          'Computer',
          'MAPEH',
          'Physical Education',
          'Religion'
        ]}
      />
      <CustomSelect 
        className={styles.filterSelect}
        value={statusFilter}
        onChange={setStatusFilter}
        options={[
          'All Status',
          'Active',
          'On Leave'
        ]}
      />
      
      <button className={styles.filterBtn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        Filters
      </button>
      <button 
        className={
          (searchTerm !== '' || departmentFilter !== 'All Departments' || statusFilter !== 'All Status')
            ? styles.clearBtnActive 
            : styles.clearBtn
        } 
        onClick={() => {
          setSearchTerm('');
          setDepartmentFilter('All Departments');
          setStatusFilter('All Status');
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};
