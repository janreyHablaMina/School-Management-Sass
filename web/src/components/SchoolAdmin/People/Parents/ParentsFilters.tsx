import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';

interface ParentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  relationshipFilter: string;
  setRelationshipFilter: (relationship: string) => void;
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
      ]}
      hasActiveFilters={hasActiveFilters}
      onReset={onReset}
    />
  );
};
