'use client';

import React from 'react';
import { FilterSelect, listStyles, SearchField } from '../shared';
import styles from './lessons.module.css';
import type { LessonTab } from '@/types/teacherLessons';
import type { LessonsFiltersState } from './useLessons';

interface LessonsFiltersProps {
  filters: LessonsFiltersState;
  onFilterChange: <K extends keyof LessonsFiltersState>(
    key: K,
    value: LessonsFiltersState[K]
  ) => void;
  tabs: LessonTab[];
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

export function LessonsFilters({
  filters,
  onFilterChange,
  tabs,
  classes,
  subjects,
  statuses,
  types,
  sorts,
}: LessonsFiltersProps) {
  const optionsMap = { classes, subjects, statuses, types };

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="Lesson views">
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

      <div className={listStyles.filtersPanel}>
        <SearchField
          value={filters.searchTerm}
          onChange={(value) => onFilterChange('searchTerm', value)}
          placeholder="Search lessons by title or keyword..."
          aria-label="Search lessons"
        />

        {SELECT_FILTERS.map((filter) => (
          <FilterSelect
            key={filter.key}
            label={filter.label}
            value={filters[filter.key]}
            options={optionsMap[filter.optionsKey]}
            onChange={(value) =>
              onFilterChange(filter.key, value as LessonsFiltersState[typeof filter.key])
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
              onFilterChange('sort', value as LessonsFiltersState['sort'])
            }
          />
        </div>
      </div>
    </>
  );
}
