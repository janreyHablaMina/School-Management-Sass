'use client';

import { FilterSelect, listStyles, SearchField } from '../shared';
import type { StudentsFiltersState } from './useStudents';

interface StudentsFiltersProps {
  filters: StudentsFiltersState;
  onFilterChange: <K extends keyof StudentsFiltersState>(
    key: K,
    value: StudentsFiltersState[K]
  ) => void;
  classes: string[];
  gradeLevels: string[];
  statuses: string[];
  onExport?: () => void;
  onClear: () => void;
}

const SELECT_FILTERS: Array<{
  key: Exclude<keyof StudentsFiltersState, 'searchTerm'>;
  label: string;
  optionsKey: 'classes' | 'gradeLevels' | 'statuses';
}> = [
  { key: 'classFilter', label: 'Class', optionsKey: 'classes' },
  { key: 'gradeLevel', label: 'Grade Level', optionsKey: 'gradeLevels' },
  { key: 'status', label: 'Status', optionsKey: 'statuses' },
];

export function StudentsFilters({
  filters,
  onFilterChange,
  classes,
  gradeLevels,
  statuses,
  onExport,
  onClear,
}: StudentsFiltersProps) {
  const optionsMap = { classes, gradeLevels, statuses };
  const isDirty = 
    filters.searchTerm !== '' ||
    filters.classFilter !== 'All Classes' ||
    filters.gradeLevel !== 'All Grades' ||
    filters.status !== 'All Status';

  return (
    <div className={listStyles.filtersPanel}>
      <SearchField
        value={filters.searchTerm}
        onChange={(value) => onFilterChange('searchTerm', value)}
        placeholder="Search students by name or ID..."
        aria-label="Search students"
      />

      {SELECT_FILTERS.map((filter) => (
        <FilterSelect
          key={filter.key}
          label={filter.label}
          value={filters[filter.key]}
          options={optionsMap[filter.optionsKey]}
          onChange={(value) =>
            onFilterChange(filter.key, value as StudentsFiltersState[typeof filter.key])
          }
        />
      ))}

      <button 
        type="button" 
        className={isDirty ? listStyles.toolBtnActive : listStyles.toolBtn} 
        onClick={onClear}
      >
        Reset Filters
      </button>

      {onExport ? (
        <div className={listStyles.filterActions}>
          <button type="button" className={listStyles.toolBtn} onClick={onExport}>
            Export
          </button>
        </div>
      ) : null}
    </div>
  );
}
