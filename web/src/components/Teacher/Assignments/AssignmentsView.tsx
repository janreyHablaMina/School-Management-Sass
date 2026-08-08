'use client';

import React from 'react';
import {
  EmptyState,
  listStyles,
  PageHeader,
  PaginationBar,
  SummaryMetrics,
} from '../shared';
import { useAssignments } from './useAssignments';
import { AssignmentsFilters } from './AssignmentsFilters';
import { AssignmentsTable } from './AssignmentsTable';

export function AssignmentsView() {
  const {
    metrics,
    tabs,
    filterOptions,
    filters,
    setFilter,
    filteredCount,
    paginatedAssignments,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = useAssignments();

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Assignments"
        subtitle="Create, manage and track student assignments."
      >
        <button type="button" className={listStyles.secondaryBtn}>
          + New Folder
        </button>
        <button type="button" className={listStyles.primaryBtn}>
          + Create New Assignment
        </button>
      </PageHeader>

      <SummaryMetrics metrics={metrics} columns={5} />

      <AssignmentsFilters
        filters={filters}
        onFilterChange={setFilter}
        tabs={tabs}
        classes={filterOptions.classes}
        subjects={filterOptions.subjects}
        statuses={filterOptions.statuses}
        types={filterOptions.types}
        sorts={filterOptions.sorts}
      />

      {paginatedAssignments.length === 0 ? (
        <EmptyState
          title="No assignments found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <AssignmentsTable assignments={paginatedAssignments} />
      )}

      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="assignments"
        onPageChange={setPage}
      />
    </div>
  );
}
