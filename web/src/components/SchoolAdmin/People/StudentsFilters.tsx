import React from 'react';
import { FilterSelect, listStyles, SearchField } from '@/components/ui/shared';;;
import type { StudentStatusFilter } from './useStudents';

interface StudentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: StudentStatusFilter;
  setStatusFilter: (status: StudentStatusFilter) => void;
}

export const StudentsFilters: React.FC<StudentsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'All Status';

  return (
    <div className={listStyles.filtersPanel}>
      <SearchField
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search students..."
        aria-label="Search students"
      />
      <FilterSelect
        label="Grade Level"
        value="All Grade Levels"
        onChange={() => {}}
        options={['All Grade Levels', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']}
      />
      <FilterSelect
        label="Section"
        value="All Sections"
        onChange={() => {}}
        options={['All Sections', 'Section A', 'Section B']}
      />
      <FilterSelect
        label="Status"
        value={statusFilter}
        onChange={(value) => setStatusFilter(value as StudentStatusFilter)}
        options={['All Status', 'Active', 'Inactive', 'At Risk', 'Archived']}
      />
      <FilterSelect
        label="Gender"
        value="All Gender"
        onChange={() => {}}
        options={['All Gender', 'Male', 'Female']}
      />

      <button 
        type="button"
        className={hasActiveFilters ? listStyles.toolBtnActive : listStyles.toolBtn}
        onClick={() => {
          setSearchTerm('');
          setStatusFilter('All Status');
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};
