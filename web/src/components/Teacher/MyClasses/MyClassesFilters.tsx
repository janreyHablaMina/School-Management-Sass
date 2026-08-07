'use client';

import React from 'react';
import styles from './myClasses.module.css';

interface MyClassesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  academicYear: string;
  onAcademicYearChange: (value: string) => void;
  gradeLevel: string;
  onGradeLevelChange: (value: string) => void;
  subject: string;
  onSubjectChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  academicYears: string[];
  gradeLevels: string[];
  subjects: string[];
  statuses: string[];
  onClear: () => void;
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className={styles.filterField}>
      <span className={styles.filterLabel}>{label}</span>
      {children}
    </label>
  );
}

export function MyClassesFilters({
  searchTerm,
  onSearchChange,
  academicYear,
  onAcademicYearChange,
  gradeLevel,
  onGradeLevelChange,
  subject,
  onSubjectChange,
  status,
  onStatusChange,
  academicYears,
  gradeLevels,
  subjects,
  statuses,
  onClear,
}: MyClassesFiltersProps) {
  return (
    <div className={styles.filtersPanel}>
      <div className={styles.searchWrapper}>
        <svg
          className={styles.searchIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search classes by subject, grade or section..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search classes"
        />
      </div>

      <FilterField label="Academic Year">
        <select
          className={styles.filterSelect}
          value={academicYear}
          onChange={(e) => onAcademicYearChange(e.target.value)}
        >
          {academicYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </FilterField>

      <FilterField label="Grade Level">
        <select
          className={styles.filterSelect}
          value={gradeLevel}
          onChange={(e) => onGradeLevelChange(e.target.value)}
        >
          {gradeLevels.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </FilterField>

      <FilterField label="Subject">
        <select
          className={styles.filterSelect}
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
        >
          {subjects.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </FilterField>

      <FilterField label="Status">
        <select
          className={styles.filterSelect}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </FilterField>

      <button type="button" className={styles.clearBtn} onClick={onClear}>
        ↺ Clear Filters
      </button>
    </div>
  );
}
