'use client';

import React from 'react';
import {
  EmptyState,
  listStyles,
  PageHeader,
  PaginationBar,
  SummaryMetrics,
} from '../shared';
import { useStudents } from './useStudents';
import { StudentsFilters } from './StudentsFilters';
import { StudentsTable } from './StudentsTable';

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
    <div className={listStyles.page}>
      <PageHeader
        title="Students"
        subtitle="View and manage all students from your classes."
      >
        <button type="button" className={listStyles.secondaryBtn}>
          ⬆ Import Students
        </button>
        <button type="button" className={listStyles.primaryBtn}>
          + Add Student
        </button>
      </PageHeader>

      <SummaryMetrics metrics={metrics} columns={5} />

      <StudentsFilters
        filters={filters}
        onFilterChange={setFilter}
        classes={filterOptions.classes}
        gradeLevels={filterOptions.gradeLevels}
        statuses={filterOptions.statuses}
      />

      {paginatedStudents.length === 0 ? (
        <EmptyState
          title="No students found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <StudentsTable students={paginatedStudents} />
      )}

      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="students"
        onPageChange={setPage}
      />
    </div>
  );
}
