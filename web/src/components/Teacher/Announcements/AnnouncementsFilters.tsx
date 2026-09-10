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
  recipients: string[];
  statuses: string[];
  types: string[];
  onClearFilters: () => void;
  isDirty: boolean;
}

export function AnnouncementsFilters({
  filters,
  onFilterChange,
  recipients,
  statuses,
  types,
  onClearFilters,
  isDirty,
}: AnnouncementsFiltersProps) {
  return (
    <ResourceFilters
      searchTerm={filters.searchTerm}
      onSearchChange={(value) => onFilterChange('searchTerm', value)}
      searchPlaceholder="Search announcements by title or keyword..."
      searchAriaLabel="Search announcements"
      selects={[
        { key: 'recipientFilter', label: 'Recipient', options: recipients },
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
      onClear={onClearFilters}
      isDirty={isDirty}
    />
  );
}
