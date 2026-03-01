import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';

interface ParentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  relationshipFilter: string;
  setRelationshipFilter: (relationship: string) => void;
  gradeFilter: string;
  setGradeFilter: (grade: string) => void;
  sectionFilter: string;
  setSectionFilter: (section: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const ParentsFilters: React.FC<ParentsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  relationshipFilter,
  setRelationshipFilter,
  gradeFilter,
  setGradeFilter,
  sectionFilter,
  setSectionFilter,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <SchoolAdminDirectoryFilters
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search parents, students, contact..."
      searchAriaLabel="Search parents"
      selects={[
        {
          label: 'Relationship',
          value: relationshipFilter,
          onChange: setRelationshipFilter,
          options: ['All Relationships', 'Mother', 'Father', 'Guardian'],
        },
        {
          label: 'Portal Status',
          value: statusFilter,
          onChange: setStatusFilter,
          options: ['All Status', 'Active', 'Pending Invite', 'Inactive'],
        },
        {
          label: 'Grade',
          value: gradeFilter,
          onChange: setGradeFilter,
          options: ['All Grades', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
        },
        {
          label: 'Section',
          value: sectionFilter,
          onChange: setSectionFilter,
          options: ['All Sections', 'Section A', 'Section B', 'Section C', 'Section ICT', 'STEM A', 'HUMSS B', 'ABM A'],
        },
      ]}
      hasActiveFilters={hasActiveFilters}
      onReset={onReset}
    />
  );
};
