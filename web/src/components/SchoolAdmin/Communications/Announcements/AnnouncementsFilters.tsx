import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';

interface AnnouncementsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const AnnouncementsFilters: React.FC<AnnouncementsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <SchoolAdminDirectoryFilters
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search announcements, audiences, authors..."
      searchAriaLabel="Search announcements"
      selects={[
        {
          label: 'Status',
          value: statusFilter,
          onChange: setStatusFilter,
          options: ['All Status', 'Published', 'Scheduled', 'Draft', 'Archived'],
        },
        {
          label: 'Type',
          value: typeFilter,
          onChange: setTypeFilter,
          options: ['All Types', 'General', 'Academic', 'Reminder', 'Event', 'Urgent'],
        },
      ]}
      hasActiveFilters={hasActiveFilters}
      onReset={onReset}
    />
  );
};
