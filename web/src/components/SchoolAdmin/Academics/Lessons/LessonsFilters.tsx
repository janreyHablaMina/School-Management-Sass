import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';

interface LessonsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  coverageFilter: string;
  setCoverageFilter: (coverage: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const LessonsFilters: React.FC<LessonsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  coverageFilter,
  setCoverageFilter,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <SchoolAdminDirectoryFilters
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search lessons, classes, subjects..."
      searchAriaLabel="Search lessons"
      selects={[
        {
          label: 'Status',
          value: statusFilter,
          onChange: setStatusFilter,
          options: ['All Status', 'Published', 'Draft', 'Archived'],
        },
        {
          label: 'Coverage',
          value: coverageFilter,
          onChange: setCoverageFilter,
          options: ['All Coverage', 'Complete', 'Needs Review', 'Missing Classes', 'Archived'],
        },
      ]}
      hasActiveFilters={hasActiveFilters}
      onReset={onReset}
    />
  );
};
