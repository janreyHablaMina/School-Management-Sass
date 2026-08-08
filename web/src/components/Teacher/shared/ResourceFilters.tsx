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
  tabs?: readonly string[];
  tabValue?: string;
  onTabChange?: (tab: string) => void;
  tabsAriaLabel?: string;
  tabsPlacement?: 'before' | 'after';
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
  tabs,
  tabValue,
  onTabChange,
  tabsAriaLabel,
  tabsPlacement = 'before',
}: ResourceFiltersProps) {
  const tabsNode =
    tabs && tabValue != null && onTabChange ? (
      <ListTabs
        tabs={tabs}
        value={tabValue}
        onChange={onTabChange}
        aria-label={tabsAriaLabel}
      />
    ) : null;

  return (
    <>
      {tabsPlacement === 'before' ? tabsNode : null}

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
          <button type="button" className={styles.toolBtn}>
            ⚙ Filters
          </button>
          {sorts && sortValue != null && onSortChange ? (
            <FilterSelect
              label="Sort by"
              value={sortValue}
              options={sorts}
              onChange={onSortChange}
            />
          ) : null}
        </div>
      </div>

      {tabsPlacement === 'after' ? tabsNode : null}
    </>
  );
}
