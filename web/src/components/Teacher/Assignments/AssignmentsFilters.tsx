'use client';

import React from 'react';
import { ResourceFilters } from '../shared';
import type { AssignmentsFiltersState } from './useAssignments';

interface AssignmentsFiltersProps {
  filters: AssignmentsFiltersState;
  onFilterChange: <K extends keyof AssignmentsFiltersState>(
    key: K,
    value: AssignmentsFiltersState[K]
  ) => void;
  tabs: string[];
  classes: string[];
  subjects: string[];
  statuses: string[];
  types: string[];
  sorts: string[];
}

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
  return (
    <ResourceFilters
      searchTerm={filters.searchTerm}
      onSearchChange={(value) => onFilterChange('searchTerm', value)}
      searchPlaceholder="Search assignments by title or keyword..."
      searchAriaLabel="Search assignments"
      selects={[
        { key: 'classFilter', label: 'Class', options: classes },
        { key: 'subject', label: 'Subject', options: subjects },
        { key: 'status', label: 'Status', options: statuses },
        { key: 'type', label: 'Type', options: types },
      ]}
      getSelectValue={(key) => filters[key as keyof AssignmentsFiltersState] as string}
      onSelectChange={(key, value) =>
        onFilterChange(key as keyof AssignmentsFiltersState, value as never)
      }
      sorts={sorts}
      sortValue={filters.sort}
      onSortChange={(value) =>
        onFilterChange('sort', value as AssignmentsFiltersState['sort'])
      }
      tabs={tabs}
      tabValue={filters.tab}
      onTabChange={(tab) => onFilterChange('tab', tab as AssignmentsFiltersState['tab'])}
      tabsAriaLabel="Assignment views"
      tabsPlacement="after"
    />
  );
}
