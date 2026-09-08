'use client';

import React from 'react';
import { ResourceFilters } from '../shared';
import type { GradesFiltersState } from './useGrades';

interface GradesFiltersProps {
  filters: GradesFiltersState;
  onFilterChange: <K extends keyof GradesFiltersState>(
    key: K,
    value: GradesFiltersState[K]
  ) => void;
  tabs: readonly string[];
  statuses: string[];
  terms: string[];
  sorts: string[];
}

export function GradesFilters({
  filters,
  onFilterChange,
  tabs,
  statuses,
  terms,
  sorts,
}: GradesFiltersProps) {
  return (
    <ResourceFilters
      searchTerm={filters.searchTerm}
      onSearchChange={(value) => onFilterChange('searchTerm', value)}
      searchPlaceholder="Search students by name or ID..."
      searchAriaLabel="Search grades"
      selects={[
        { key: 'status', label: 'Status', options: statuses },
        { key: 'type', label: 'Term', options: terms },
      ]}
      getSelectValue={(key) => String(filters[key as keyof GradesFiltersState] ?? '')}
      onSelectChange={(key, value) =>
        onFilterChange(
          key as keyof GradesFiltersState,
          value as GradesFiltersState[keyof GradesFiltersState]
        )
      }
      sorts={sorts}
      sortValue={filters.sort}
      onSortChange={(value) => onFilterChange('sort', value as GradesFiltersState['sort'])}
      tabs={tabs}
      tabValue={filters.tab}
      onTabChange={(tab) => onFilterChange('tab', tab as GradesFiltersState['tab'])}
      tabsAriaLabel="Grade views"
      tabsPlacement="after"
    />
  );
}
