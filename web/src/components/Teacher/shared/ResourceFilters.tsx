'use client';

import React from 'react';
import { FilterSelect } from './FilterSelect';
import { ListTabs } from './ListTabs';
import { SearchField } from './SearchField';
import styles from './listPage.module.css';

export interface ResourceFilterSelect {
  key: string;
  label: string;
  options: string[];
}

interface ResourceFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  searchAriaLabel: string;
  selects: ResourceFilterSelect[];
  onSelectChange: (key: string, value: string) => void;
  getSelectValue: (key: string) => string;
  sorts?: string[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  onClear?: () => void;
  isDirty?: boolean;
}

export function ResourceFilters({
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  searchAriaLabel,
  selects,
  onSelectChange,
  getSelectValue,
  sorts,
  sortValue,
  onSortChange,
  onClear,
  isDirty = false,
}: ResourceFiltersProps) {
  return (
    <>
      <div className={styles.filtersPanel}>
        <SearchField
          value={searchTerm}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          aria-label={searchAriaLabel}
        />

        {selects.map((select) => (
          <FilterSelect
            key={select.key}
            label={select.label}
            value={getSelectValue(select.key)}
            options={select.options}
            onChange={(value) => onSelectChange(select.key, value)}
          />
        ))}

        <div className={styles.filterActions}>
          {sorts && sortValue != null && onSortChange ? (
            <FilterSelect
              label="Sort by"
              value={sortValue}
              options={sorts}
              onChange={onSortChange}
            />
          ) : null}
          {onClear ? (
            <button
              type="button"
              className={isDirty ? styles.toolBtnActive : styles.toolBtn}
              onClick={onClear}
            >
              Reset Filters
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
