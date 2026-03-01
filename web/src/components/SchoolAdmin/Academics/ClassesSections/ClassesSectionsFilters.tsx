import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';

interface ClassesSectionsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  gradeFilter: string;
  setGradeFilter: (grade: string) => void;
  sectionFilter: string;
  setSectionFilter: (section: string) => void;
  availableSections: string[];
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const ClassesSectionsFilters: React.FC<ClassesSectionsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  gradeFilter,
  setGradeFilter,
  sectionFilter,
  setSectionFilter,
  availableSections,
  statusFilter,
  setStatusFilter,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <SchoolAdminDirectoryFilters
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search classes, advisers, rooms..."
      searchAriaLabel="Search classes and sections"
      selects={[
        {
          label: 'Grade Level',
          value: gradeFilter,
          onChange: setGradeFilter,
          options: [
            'All Grades',
            'Grade 7',
            'Grade 8',
            'Grade 9',
            'Grade 10',
            'Grade 11',
            'Grade 12',
          ],
        },
        {
          label: 'Section',
          value: sectionFilter,
          onChange: setSectionFilter,
          options: availableSections,
        },
        {
          label: 'Status',
          value: statusFilter,
          onChange: setStatusFilter,
          options: ['All Status', 'Active', 'Needs Adviser', 'Draft', 'Archived'],
        },
      ]}
      hasActiveFilters={hasActiveFilters}
      onReset={onReset}
    />
  );
};
