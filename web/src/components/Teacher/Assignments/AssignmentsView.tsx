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
import { ConfirmAssignmentModal } from './components/ConfirmAssignmentModal';
import { TeacherToast } from '../shared/TeacherToast';

interface AssignmentsViewProps {
  classFocus?: TeacherClassFocus | null;
}

export function AssignmentsView({ classFocus = null }: AssignmentsViewProps) {
  const [confirmAction, setConfirmAction] = React.useState<{
    type: 'archive_bulk' | 'delete_bulk' | 'archive_single' | 'delete_single';
    id?: string;
  } | null>(null);
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
    duplicateItem,
    selectedAssignment,
    selectedAssignmentTab,
    openAssignment,
    backToAssignments,
    toast,
    dismissToast,
  } = useAssignments({ classFocus });

  if (selectedAssignment) {
    return (
      <AssignmentDetailView
        assignment={selectedAssignment}
        onBack={backToAssignments}
        initialTab={selectedAssignmentTab}
      />
    );
  }

  return (
    <>
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
          onArchiveSelected={() => setConfirmAction({ type: 'archive_bulk' })}
          onDeleteSelected={() => setConfirmAction({ type: 'delete_bulk' })}
          onArchiveItem={(id) => setConfirmAction({ type: 'archive_single', id })}
          onDeleteItem={(id) => setConfirmAction({ type: 'delete_single', id })}
          onDuplicateItem={duplicateItem}
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
    
    {toast && (
      <TeacherToast
        title={toast.title}
        message={toast.message}
        onClose={dismissToast}
      />
    )}

    {confirmAction && (
      <ConfirmAssignmentModal
        assignment={
          confirmAction.type.includes('single') && confirmAction.id
            ? paginatedAssignments.find((a) => a.id === confirmAction.id)
            : null
        }
        count={confirmAction.type.includes('bulk') ? selectedIds.length : 1}
        actionType={confirmAction.type.includes('archive') ? 'archive' : 'delete'}
        onCancel={() => setConfirmAction(null)}
        onConfirm={() => {
          if (confirmAction.type === 'archive_bulk') archiveSelected();
          if (confirmAction.type === 'delete_bulk') deleteSelected();
          if (confirmAction.type === 'archive_single' && confirmAction.id)
            archiveItem(confirmAction.id);
          if (confirmAction.type === 'delete_single' && confirmAction.id)
            deleteItem(confirmAction.id);
          setConfirmAction(null);
        }}
      />
    )}
    </>
  );
}
