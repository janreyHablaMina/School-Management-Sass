import React from 'react';
import { FilterSelect, listStyles, SearchField } from '@/components/Teacher/shared';

interface AttendanceFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
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
  statusFilter,
  setStatusFilter,
  riskFilter,
  setRiskFilter,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <div className={listStyles.filtersPanel}>
      <SearchField
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search section, adviser, room..."
        aria-label="Search attendance"
      />
      <FilterSelect
        label="Submission"
        value={statusFilter}
        onChange={setStatusFilter}
        options={['All Status', 'Submitted', 'Needs Review']}
      />
      <FilterSelect
        label="Risk"
        value={riskFilter}
        onChange={setRiskFilter}
        options={['All Risk Levels', 'Low', 'Medium', 'High']}
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
