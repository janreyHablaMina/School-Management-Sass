'use client';

import React from 'react';
import styles from './students.module.css';
import { useStudents } from './useStudents';
import { StudentsFilters } from './StudentsFilters';
import { StudentsTable } from './StudentsTable';
import { StudentsHeader } from './components/StudentsHeader';
import { StudentsMetrics } from './components/StudentsMetrics';
import { PaginationBar } from './components/PaginationBar';

export function StudentsView() {
  const {
    metrics,
    filterOptions,
    filters,
    setFilter,
    filteredCount,
    paginatedStudents,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = useStudents();

  return (
    <div className={styles.page}>
      <StudentsHeader />
      <StudentsMetrics metrics={metrics} />

      <StudentsFilters
        filters={filters}
        onFilterChange={setFilter}
        classes={filterOptions.classes}
        gradeLevels={filterOptions.gradeLevels}
        statuses={filterOptions.statuses}
      />

      {paginatedStudents.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No students found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <StudentsTable students={paginatedStudents} />
      )}

      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
