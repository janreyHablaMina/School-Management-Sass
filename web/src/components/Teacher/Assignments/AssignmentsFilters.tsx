'use client';

import React from 'react';
import { FilterSelect, listStyles, SearchField } from '../shared';
import styles from './assignments.module.css';
import type { AssignmentTab } from '@/types/teacherAssignments';
import type { AssignmentsFiltersState } from './useAssignments';

interface AssignmentsFiltersProps {
  filters: AssignmentsFiltersState;
  onFilterChange: <K extends keyof AssignmentsFiltersState>(
    key: K,
    value: AssignmentsFiltersState[K]
  ) => void;
  tabs: AssignmentTab[];
  classes: string[];
  subjects: string[];
  statuses: string[];
  types: string[];
  sorts: string[];
}

const SELECT_FILTERS: Array<{
  key: 'classFilter' | 'subject' | 'status' | 'type';
  label: string;
  optionsKey: 'classes' | 'subjects' | 'statuses' | 'types';
}> = [
  { key: 'classFilter', label: 'Class', optionsKey: 'classes' },
  { key: 'subject', label: 'Subject', optionsKey: 'subjects' },
  { key: 'status', label: 'Status', optionsKey: 'statuses' },
  { key: 'type', label: 'Type', optionsKey: 'types' },
];

export function AssignmentsFilters({
  filters,
  onFilterChange,
  tabs,
  classes,
  subjects,
  statuses,
  types,
  sorts,
}: AssignmentsFiltersProps) {
  const optionsMap = { classes, subjects, statuses, types };

  return (
    <>
      <div className={listStyles.filtersPanel}>
        <SearchField
          value={filters.searchTerm}
          onChange={(value) => onFilterChange('searchTerm', value)}
          placeholder="Search assignments by title or keyword..."
          aria-label="Search assignments"
        />

        {SELECT_FILTERS.map((filter) => (
          <FilterSelect
            key={filter.key}
            label={filter.label}
            value={filters[filter.key]}
            options={optionsMap[filter.optionsKey]}
            onChange={(value) =>
              onFilterChange(filter.key, value as AssignmentsFiltersState[typeof filter.key])
            }
          />
        ))}

        <div className={listStyles.filterActions}>
          <button type="button" className={listStyles.toolBtn}>
            ⚙ Filters
          </button>
          <FilterSelect
            label="Sort by"
            value={filters.sort}
            options={sorts}
            onChange={(value) =>
              onFilterChange('sort', value as AssignmentsFiltersState['sort'])
            }
          />
        </div>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Assignment views">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={filters.tab === tab}
            className={`${styles.tab} ${filters.tab === tab ? styles.tabActive : ''}`}
            onClick={() => onFilterChange('tab', tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  );
}
