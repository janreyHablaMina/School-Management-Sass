import React from 'react';
import { FilterSelect, listStyles, SearchField } from '@/components/Teacher/shared';

interface LessonsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  coverageFilter: string;
  setCoverageFilter: (coverage: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const LessonsFilters: React.FC<LessonsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  coverageFilter,
  setCoverageFilter,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <div className={listStyles.filtersPanel}>
      <SearchField
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search lessons, classes, subjects..."
        aria-label="Search lessons"
      />
      <FilterSelect
        label="Status"
        value={statusFilter}
        onChange={setStatusFilter}
        options={['All Status', 'Published', 'Draft', 'Archived']}
      />
      <FilterSelect
        label="Coverage"
        value={coverageFilter}
        onChange={setCoverageFilter}
        options={['All Coverage', 'Complete', 'Needs Review', 'Missing Classes', 'Archived']}
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
