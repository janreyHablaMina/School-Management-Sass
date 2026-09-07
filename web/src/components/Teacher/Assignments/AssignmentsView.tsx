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
import { AssignmentDetailView } from './components/AssignmentDetailView';

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
    clearFilters,
    isDirty,
    filteredCount,
    paginatedAssignments,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
    selectedIds,
    allVisibleSelected,
    sortKey,
    sortDirection,
    handleSort,
    toggle,
    toggleAllVisible,
    clearSelection,
    archiveSelected,
    deleteSelected,
    archiveItem,
    deleteItem,
    selectedAssignment,
    openAssignment,
    backToAssignments,
  } = useAssignments({ classFocus });

  if (selectedAssignment) {
    return (
      <AssignmentDetailView
        assignment={selectedAssignment}
        onBack={backToAssignments}
      />
    );
  }

  return (
    <ResourceListPage
      title="Assignments"
      subtitle="Create, manage and track student assignments."
      metrics={metrics}
      metricsColumns={4}
      headerActions={
        <>
          <button type="button" className={listStyles.primaryBtn}>
            + Create New Assignment
          </button>
        </>
      }
      metricsColumns={4}

      itemsCount={paginatedAssignments.length}
      emptyTitle="No assignments found"
      emptyDescription="Try adjusting your search or filters."
      table={
        <AssignmentsTable
          assignments={paginatedAssignments}
          selectedIds={selectedIds}
          allVisibleSelected={allVisibleSelected}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          onToggle={toggle}
          onToggleAllVisible={toggleAllVisible}
          onClearSelection={clearSelection}
          onArchiveSelected={archiveSelected}
          onDeleteSelected={deleteSelected}
          onArchiveItem={archiveItem}
          onDeleteItem={deleteItem}
          onViewAssignment={openAssignment}
        />
      }
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
