'use client';

import React from 'react';
import {
  EmptyState,
  listStyles,
  PageHeader,
  PaginationBar,
  SummaryMetrics,
} from '../shared';
import { useMyClasses } from './useMyClasses';
import { MyClassesFilters } from './MyClassesFilters';
import { ClassesTable } from './ClassesTable';

export function MyClassesView() {
  const {
    metrics,
    filterOptions,
    filters,
    setFilter,
    clearFilters,
    filteredCount,
    paginatedClasses,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = useMyClasses();

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="My Classes"
        subtitle="View and manage all your classes in one place."
      >
        <button type="button" className={listStyles.primaryBtn}>
          + Create New Class
        </button>
      </PageHeader>

      <SummaryMetrics metrics={metrics} columns={4} />

      <MyClassesFilters
        filters={filters}
        onFilterChange={setFilter}
        academicYears={filterOptions.academicYears}
        gradeLevels={filterOptions.gradeLevels}
        subjects={filterOptions.subjects}
        statuses={filterOptions.statuses}
        onClear={clearFilters}
      />

      {paginatedClasses.length === 0 ? (
        <EmptyState
          title="No classes found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <ClassesTable classes={paginatedClasses} />
      )}

      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="classes"
        onPageChange={setPage}
      />
    </div>
  );
}
