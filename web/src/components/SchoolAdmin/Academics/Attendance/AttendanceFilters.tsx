import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';

interface AttendanceFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  gradeFilter: string;
  setGradeFilter: (grade: string) => void;
  availableGrades: string[];
  sectionFilter: string;
  setSectionFilter: (section: string) => void;
  availableSections: string[];
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  riskFilter: string;
  setRiskFilter: (risk: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  gradeFilter,
  setGradeFilter,
  availableGrades,
  sectionFilter,
  setSectionFilter,
  availableSections,
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
      searchPlaceholder="Search section, adviser, room..."
      searchAriaLabel="Search attendance"
      selects={[
        {
          label: 'Grade Level',
          value: gradeFilter,
          onChange: setGradeFilter,
          options: availableGrades,
        },
        {
          label: 'Section',
          value: sectionFilter,
          onChange: setSectionFilter,
          options: availableSections,
        },
        {
          label: 'Submission',
          value: statusFilter,
          onChange: setStatusFilter,
          options: ['All Status', 'Submitted', 'Needs Review'],
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
