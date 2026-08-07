'use client';

import React from 'react';
import styles from './students.module.css';
import { FilterSelect } from './components/FilterSelect';
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
    <div className={styles.filtersPanel}>
      <div className={styles.searchWrapper}>
        <svg
          className={styles.searchIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search students by name or ID..."
          className={styles.searchInput}
          value={filters.searchTerm}
          onChange={(e) => onFilterChange('searchTerm', e.target.value)}
          aria-label="Search students"
        />
      </div>

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

      <div className={styles.filterActions}>
        <button type="button" className={styles.toolBtn}>
          ⚙ Filters
        </button>
        <button type="button" className={styles.toolBtn} onClick={onExport}>
          ⬇ Export
        </button>
      </div>
    </div>
  );
}
