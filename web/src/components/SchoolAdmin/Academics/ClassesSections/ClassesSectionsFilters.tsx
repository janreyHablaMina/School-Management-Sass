import React from 'react';
import { FilterSelect, listStyles, SearchField } from '@/components/Teacher/shared';

interface ClassesSectionsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  gradeFilter: string;
  setGradeFilter: (grade: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const ClassesSectionsFilters: React.FC<ClassesSectionsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  gradeFilter,
  setGradeFilter,
  statusFilter,
  setStatusFilter,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <div className={listStyles.filtersPanel}>
      <SearchField
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search classes, advisers, rooms..."
        aria-label="Search classes and sections"
      />
      <FilterSelect
        label="Grade Level"
        value={gradeFilter}
        onChange={setGradeFilter}
        options={[
          'All Grades',
          'Grade 7',
          'Grade 8',
          'Grade 9',
          'Grade 10',
          'Grade 11',
          'Grade 12',
        ]}
      />
      <FilterSelect
        label="Status"
        value={statusFilter}
        onChange={setStatusFilter}
        options={['All Status', 'Active', 'Needs Adviser', 'Draft']}
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
