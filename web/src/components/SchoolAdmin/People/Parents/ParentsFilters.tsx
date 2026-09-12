import React from 'react';
import { FilterSelect, listStyles, SearchField } from '@/components/Teacher/shared';

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
    <div className={listStyles.filtersPanel}>
      <SearchField
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search parents, students, contact..."
        aria-label="Search parents"
      />
      <FilterSelect
        label="Relationship"
        value={relationshipFilter}
        onChange={setRelationshipFilter}
        options={['All Relationships', 'Mother', 'Father', 'Guardian']}
      />
      <FilterSelect
        label="Portal Status"
        value={statusFilter}
        onChange={setStatusFilter}
        options={['All Status', 'Active', 'Pending Invite', 'Inactive']}
      />
      <button
        type="button"
        className={hasActiveFilters ? listStyles.toolBtnActive : listStyles.toolBtn}
        onClick={onReset}
      >
        Reset Filters
      </button>
    </div>
  );
};
