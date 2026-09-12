import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';

interface QuizzesFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  riskFilter: string;
  setRiskFilter: (risk: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const QuizzesFilters: React.FC<QuizzesFiltersProps> = ({
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
      searchPlaceholder="Search quizzes, classes, subjects..."
      searchAriaLabel="Search quizzes"
      selects={[
        {
          label: 'Status',
          value: statusFilter,
          onChange: setStatusFilter,
          options: ['All Status', 'Active', 'Upcoming', 'Completed', 'Draft', 'Archived'],
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
