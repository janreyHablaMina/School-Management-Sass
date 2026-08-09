'use client';

import React from 'react';
import { ResourceFilters } from '../shared';
import type { AnnouncementsFiltersState } from './useAnnouncements';

interface AnnouncementsFiltersProps {
  filters: AnnouncementsFiltersState;
  onFilterChange: <K extends keyof AnnouncementsFiltersState>(
    key: K,
    value: AnnouncementsFiltersState[K]
  ) => void;
  tabs: readonly string[];
  audiences: string[];
  statuses: string[];
  types: string[];
  sorts: string[];
}

export function AnnouncementsFilters({
  filters,
  onFilterChange,
  tabs,
  audiences,
  statuses,
  types,
  sorts,
}: AnnouncementsFiltersProps) {
  return (
    <ResourceFilters
      searchTerm={filters.searchTerm}
      onSearchChange={(value) => onFilterChange('searchTerm', value)}
      searchPlaceholder="Search announcements by title or keyword..."
      searchAriaLabel="Search announcements"
      selects={[
        { key: 'classFilter', label: 'Audience', options: audiences },
        { key: 'status', label: 'Status', options: statuses },
        { key: 'type', label: 'Type', options: types },
      ]}
      getSelectValue={(key) => String(filters[key as keyof AnnouncementsFiltersState] ?? '')}
      onSelectChange={(key, value) =>
        onFilterChange(
          key as keyof AnnouncementsFiltersState,
          value as AnnouncementsFiltersState[keyof AnnouncementsFiltersState]
        )
      }
      sorts={sorts}
      sortValue={filters.sort}
      onSortChange={(value) =>
        onFilterChange('sort', value as AnnouncementsFiltersState['sort'])
      }
      tabs={tabs}
      tabValue={filters.tab}
      onTabChange={(tab) => onFilterChange('tab', tab as AnnouncementsFiltersState['tab'])}
      tabsAriaLabel="Announcement views"
      tabsPlacement="after"
    />
  );
}
