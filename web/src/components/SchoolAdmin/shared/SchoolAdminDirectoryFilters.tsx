import React from 'react';
import { FilterSelect, listStyles, SearchField } from '@/components/Teacher/shared';

export interface SchoolAdminFilterSelect {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

interface SchoolAdminDirectoryFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  searchPlaceholder: string;
  searchAriaLabel: string;
  selects: SchoolAdminFilterSelect[];
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const SchoolAdminDirectoryFilters: React.FC<SchoolAdminDirectoryFiltersProps> = ({
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  searchAriaLabel,
  selects,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <div className={listStyles.filtersPanel}>
      <SearchField
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        aria-label={searchAriaLabel}
      />
      {selects.map((select) => (
        <FilterSelect
          key={select.label}
          label={select.label}
          value={select.value}
          onChange={select.onChange}
          options={select.options}
        />
      ))}
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
