'use client';

import React from 'react';
import {
  ClassroomResourceFilters,
  listStyles,
  ResourceListPage,
} from '../shared';
import type { TeacherClassFocus } from '@/lib/teacher/classFocus';
import { useAssignments } from './useAssignments';
import { AssignmentsTable } from './AssignmentsTable';

interface AssignmentsViewProps {
  classFocus?: TeacherClassFocus | null;
}

export function AssignmentsView({ classFocus = null }: AssignmentsViewProps) {
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
  } = useAssignments({ classFocus });

  return (
    <ResourceListPage
      title="Assignments"
      subtitle="Create, manage and track student assignments."
      headerActions={
        <>
          <button type="button" className={listStyles.secondaryBtn}>
            + New Folder
          </button>
          <button type="button" className={listStyles.primaryBtn}>
            + Create New Assignment
          </button>
        </>
      }
      metrics={metrics}
      metricsColumns={5}
      filters={
        <ClassroomResourceFilters
          filters={filters}
          onFilterChange={setFilter}
          tabs={tabs}
          classes={filterOptions.classes}
          subjects={filterOptions.subjects}
          statuses={filterOptions.statuses}
          types={filterOptions.types}
          sorts={filterOptions.sorts}
          searchPlaceholder="Search assignments by title or keyword..."
          searchAriaLabel="Search assignments"
          tabsAriaLabel="Assignment views"
          tabsPlacement="after"
        />
      }
      itemsCount={paginatedAssignments.length}
      emptyTitle="No assignments found"
      emptyDescription="Try adjusting your search or filters."
      table={<AssignmentsTable assignments={paginatedAssignments} />}
      rangeStart={rangeStart}
      rangeEnd={rangeEnd}
      total={filteredCount}
      page={page}
      totalPages={totalPages}
      itemLabel="assignments"
      onPageChange={setPage}
    />
  );
}
