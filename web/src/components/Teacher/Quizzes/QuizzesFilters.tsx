'use client';

import React from 'react';
import { ResourceFilters } from '../shared';
import type { QuizzesFiltersState } from './useQuizzes';

interface QuizzesFiltersProps {
  filters: QuizzesFiltersState;
  onFilterChange: <K extends keyof QuizzesFiltersState>(
    key: K,
    value: QuizzesFiltersState[K]
  ) => void;
  tabs: string[];
  classes: string[];
  subjects: string[];
  statuses: string[];
  types: string[];
  sorts: string[];
}

export function QuizzesFilters({
  filters,
  onFilterChange,
  tabs,
  classes,
  subjects,
  statuses,
  types,
  sorts,
}: QuizzesFiltersProps) {
  return (
    <ResourceFilters
      searchTerm={filters.searchTerm}
      onSearchChange={(value) => onFilterChange('searchTerm', value)}
      searchPlaceholder="Search quizzes by title or keyword..."
      searchAriaLabel="Search quizzes"
      selects={[
        { key: 'classFilter', label: 'Class', options: classes },
        { key: 'subject', label: 'Subject', options: subjects },
        { key: 'status', label: 'Status', options: statuses },
        { key: 'type', label: 'Type', options: types },
      ]}
      getSelectValue={(key) => filters[key as keyof QuizzesFiltersState] as string}
      onSelectChange={(key, value) =>
        onFilterChange(key as keyof QuizzesFiltersState, value as never)
      }
      sorts={sorts}
      sortValue={filters.sort}
      onSortChange={(value) => onFilterChange('sort', value as QuizzesFiltersState['sort'])}
      tabs={tabs}
      tabValue={filters.tab}
      onTabChange={(tab) => onFilterChange('tab', tab as QuizzesFiltersState['tab'])}
      tabsAriaLabel="Quiz views"
      tabsPlacement="after"
    />
  );
}
