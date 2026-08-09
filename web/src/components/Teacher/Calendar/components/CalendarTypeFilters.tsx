'use client';

import React from 'react';
import type { CalendarFilter } from '@/types/teacherCalendar';
import styles from '../calendar.module.css';

interface CalendarTypeFiltersProps {
  filters: CalendarFilter[];
  value: CalendarFilter;
  onChange: (filter: CalendarFilter) => void;
}

export function CalendarTypeFilters({ filters, value, onChange }: CalendarTypeFiltersProps) {
  return (
    <div className={styles.filterRow} role="group" aria-label="Filter calendar by type">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`${styles.filterChip} ${value === filter ? styles.filterChipActive : ''}`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
