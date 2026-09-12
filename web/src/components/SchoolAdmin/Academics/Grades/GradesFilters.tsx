import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';

interface GradesFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  riskFilter: string;
  setRiskFilter: (risk: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const GradesFilters: React.FC<GradesFiltersProps> = ({
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
      searchPlaceholder="Search gradebooks, subjects, teachers..."
      searchAriaLabel="Search grades"
      selects={[
        {
          label: 'Status',
          value: statusFilter,
          onChange: setStatusFilter,
          options: ['All Status', 'Submitted', 'Incomplete', 'Needs Review'],
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
