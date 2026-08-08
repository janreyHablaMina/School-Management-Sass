'use client';

import React from 'react';
import { ResourceFilters } from './ResourceFilters';

export interface ClassroomFilterShape {
  searchTerm: string;
  classFilter: string;
  subject: string;
  status: string;
  type: string;
  sort: string;
  tab: string;
}

interface ClassroomResourceFiltersProps<T extends ClassroomFilterShape> {
  filters: T;
  onFilterChange: <K extends keyof T>(key: K, value: T[K]) => void;
  tabs: readonly string[];
  classes: string[];
  subjects: string[];
  statuses: string[];
  types: string[];
  sorts: string[];
  searchPlaceholder: string;
  searchAriaLabel: string;
  tabsAriaLabel: string;
  tabsPlacement?: 'before' | 'after';
}

export function ClassroomResourceFilters<T extends ClassroomFilterShape>({
  filters,
  onFilterChange,
  tabs,
  classes,
  subjects,
  statuses,
  types,
  sorts,
  searchPlaceholder,
  searchAriaLabel,
  tabsAriaLabel,
  tabsPlacement = 'after',
}: ClassroomResourceFiltersProps<T>) {
  return (
    <ResourceFilters
      searchTerm={filters.searchTerm}
      onSearchChange={(value) => onFilterChange('searchTerm' as keyof T, value as T[keyof T])}
      searchPlaceholder={searchPlaceholder}
      searchAriaLabel={searchAriaLabel}
      selects={[
        { key: 'classFilter', label: 'Class', options: classes },
        { key: 'subject', label: 'Subject', options: subjects },
        { key: 'status', label: 'Status', options: statuses },
        { key: 'type', label: 'Type', options: types },
      ]}
      getSelectValue={(key) => String(filters[key as keyof T] ?? '')}
      onSelectChange={(key, value) => onFilterChange(key as keyof T, value as T[keyof T])}
      sorts={sorts}
      sortValue={filters.sort}
      onSortChange={(value) => onFilterChange('sort' as keyof T, value as T[keyof T])}
      tabs={tabs}
      tabValue={filters.tab}
      onTabChange={(tab) => onFilterChange('tab' as keyof T, tab as T[keyof T])}
      tabsAriaLabel={tabsAriaLabel}
      tabsPlacement={tabsPlacement}
    />
  );
}
