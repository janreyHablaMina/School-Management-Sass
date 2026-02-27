import React from 'react';
import { SchoolAdminDirectoryFilters } from '../../shared/SchoolAdminDirectoryFilters';

interface TeachersFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export const TeachersFilters: React.FC<TeachersFiltersProps> = ({ 
  searchTerm, 
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter
}) => {
  const hasActiveFilters = searchTerm !== '' || departmentFilter !== 'All Departments' || statusFilter !== 'All Status';

  return (
    <SchoolAdminDirectoryFilters
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search teachers..."
      searchAriaLabel="Search teachers"
      selects={[
        {
          label: 'Department',
          value: departmentFilter,
          onChange: setDepartmentFilter,
          options: [
            'All Departments',
            'Science',
            'Mathematics',
            'English',
            'Filipino',
            'Social Studies',
            'Computer',
            'MAPEH',
            'Physical Education',
            'Religion'
          ]
        },
        {
          label: 'Status',
          value: statusFilter,
          onChange: setStatusFilter,
          options: [
            'All Status',
            'Active',
            'On Leave'
          ]
        }
      ]}
      hasActiveFilters={hasActiveFilters}
      onReset={() => {
        setSearchTerm('');
        setDepartmentFilter('All Departments');
        setStatusFilter('All Status');
      }}
    />
  );
};
