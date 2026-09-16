import React from 'react';
import { FilterSelect, listStyles, SearchField } from '@/components/ui/shared';

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
  const hasActiveFilters = searchTerm !== '' || departmentFilter !== 'All Departments' || statusFilter !== 'All Status';

  return (
    <div className={listStyles.filtersPanel}>
      <SearchField
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search teachers..."
        aria-label="Search teachers"
      />
      <FilterSelect 
        label="Department"
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
      <FilterSelect 
        label="Status"
        value={statusFilter}
        onChange={setStatusFilter}
        options={[
          'All Status',
          'Active',
          'On Leave'
        ]}
      />
      
      <button 
        type="button"
        className={hasActiveFilters ? listStyles.toolBtnActive : listStyles.toolBtn}
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
