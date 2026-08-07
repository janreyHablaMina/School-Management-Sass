'use client';

import React from 'react';
import { FilterSelect, listStyles, SearchField } from '../shared';
import type { MyClassesFiltersState } from './useMyClasses';

interface MyClassesFiltersProps {
  filters: MyClassesFiltersState;
  onFilterChange: <K extends keyof MyClassesFiltersState>(
    key: K,
    value: MyClassesFiltersState[K]
  ) => void;
  academicYears: string[];
  gradeLevels: string[];
  subjects: string[];
  statuses: string[];
  onClear: () => void;
}

const SELECT_FILTERS: Array<{
  key: Exclude<keyof MyClassesFiltersState, 'searchTerm'>;
  label: string;
  optionsKey: 'academicYears' | 'gradeLevels' | 'subjects' | 'statuses';
}> = [
  { key: 'academicYear', label: 'Academic Year', optionsKey: 'academicYears' },
  { key: 'gradeLevel', label: 'Grade Level', optionsKey: 'gradeLevels' },
  { key: 'subject', label: 'Subject', optionsKey: 'subjects' },
  { key: 'status', label: 'Status', optionsKey: 'statuses' },
];

export function MyClassesFilters({
  filters,
  onFilterChange,
  academicYears,
  gradeLevels,
  subjects,
  statuses,
  onClear,
}: MyClassesFiltersProps) {
  const optionsMap = { academicYears, gradeLevels, subjects, statuses };

  return (
    <div className={listStyles.filtersPanel}>
      <SearchField
        value={filters.searchTerm}
        onChange={(value) => onFilterChange('searchTerm', value)}
        placeholder="Search classes by subject, grade or section..."
        aria-label="Search classes"
      />

      {SELECT_FILTERS.map((filter) => (
        <FilterSelect
          key={filter.key}
          label={filter.label}
          value={filters[filter.key]}
          options={optionsMap[filter.optionsKey]}
          onChange={(value) =>
            onFilterChange(filter.key, value as MyClassesFiltersState[typeof filter.key])
          }
        />
      ))}

      <button type="button" className={listStyles.toolBtn} onClick={onClear}>
        ↺ Clear Filters
      </button>
    </div>
  );
}
