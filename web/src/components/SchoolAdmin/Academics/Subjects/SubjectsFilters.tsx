import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';

interface SubjectsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (department: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  gradeFilter: string;
  setGradeFilter: (grade: string) => void;
  departments: string[];
  grades: string[];
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const SubjectsFilters: React.FC<SubjectsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  gradeFilter,
  setGradeFilter,
  departments,
  grades,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <SchoolAdminDirectoryFilters
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search subjects, codes, grade levels..."
      searchAriaLabel="Search subjects"
      selects={[
        {
          label: 'Department',
          value: departmentFilter,
          onChange: setDepartmentFilter,
          options: departments,
        },
        {
          label: 'Status',
          value: statusFilter,
          onChange: setStatusFilter,
          options: ['All Status', 'Active', 'Needs Teacher', 'Draft'],
        },
        {
          label: 'Grade Level',
          value: gradeFilter,
          onChange: setGradeFilter,
          options: grades,
        },
      ]}
      hasActiveFilters={hasActiveFilters}
      onReset={onReset}
    />
  );
};
