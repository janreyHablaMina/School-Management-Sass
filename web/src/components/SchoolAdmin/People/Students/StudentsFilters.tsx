import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';
import type { StudentStatusFilter } from './useStudents';


interface StudentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: StudentStatusFilter;
  setStatusFilter: (status: StudentStatusFilter) => void;
}

export const StudentsFilters: React.FC<StudentsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'All Status';

  return (
    <SchoolAdminDirectoryFilters
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search students..."
      searchAriaLabel="Search students"
      selects={[
        {
          label: 'Grade Level',
          value: 'All Grade Levels',
          onChange: () => {},
          options: ['All Grade Levels', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
        },
        {
          label: 'Section',
          value: 'All Sections',
          onChange: () => {},
          options: ['All Sections', 'Section A', 'Section B']
        },
        {
          label: 'Status',
          value: statusFilter,
          onChange: (value) => setStatusFilter(value as StudentStatusFilter),
          options: ['All Status', 'Active', 'Inactive', 'At Risk', 'Archived']
        },
        {
          label: 'Gender',
          value: 'All Gender',
          onChange: () => {},
          options: ['All Gender', 'Male', 'Female']
        }
      ]}
      hasActiveFilters={hasActiveFilters}
      onReset={() => {
        setSearchTerm('');
        setStatusFilter('All Status');
      }}
    />
  );
};
