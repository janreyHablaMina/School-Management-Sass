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
}: StudentsFiltersProps) {
  const optionsMap = { classes, gradeLevels, statuses };

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

      <div className={listStyles.filterActions}>
        <button type="button" className={listStyles.toolBtn}>
          ⚙ Filters
        </button>
        <button type="button" className={listStyles.toolBtn} onClick={onExport}>
          ⬇ Export
        </button>
      </div>
    </div>
  );
}
