import React from 'react';
import { FilterSelect, listStyles, SearchField } from '@/components/Teacher/shared';

interface SubjectsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (department: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  departments: string[];
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const SubjectsFilters: React.FC<SubjectsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  departments,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <div className={listStyles.filtersPanel}>
      <SearchField
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search subjects, codes, grade levels..."
        aria-label="Search subjects"
      />
      <FilterSelect
        label="Department"
        value={departmentFilter}
        onChange={setDepartmentFilter}
        options={departments}
      />
      <FilterSelect
        label="Status"
        value={statusFilter}
        onChange={setStatusFilter}
        options={['All Status', 'Active', 'Needs Teacher', 'Draft']}
      />
      <button
        type="button"
        className={hasActiveFilters ? listStyles.toolBtnActive : listStyles.toolBtn}
        onClick={onReset}
      >
        Reset Filters
      </button>
    </div>
  );
};
