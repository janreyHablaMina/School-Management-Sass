import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';

interface AssignmentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  riskFilter: string;
  setRiskFilter: (risk: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const AssignmentsFilters: React.FC<AssignmentsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  riskFilter,
  setRiskFilter,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <SchoolAdminDirectoryFilters
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search assignments, classes, subjects..."
      searchAriaLabel="Search assignments"
      selects={[
        {
          label: 'Status',
          value: statusFilter,
          onChange: setStatusFilter,
          options: ['All Status', 'Active', 'Due Soon', 'Completed', 'Draft', 'Archived'],
        },
        {
          label: 'Risk',
          value: riskFilter,
          onChange: setRiskFilter,
          options: ['All Risk Levels', 'Low', 'Medium', 'High'],
        },
      ]}
      hasActiveFilters={hasActiveFilters}
      onReset={onReset}
    />
  );
};
