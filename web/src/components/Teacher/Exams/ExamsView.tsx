'use client';

import React from 'react';
import {
  ClassroomResourceFilters,
  ConfirmActionModal,
  listStyles,
  ResourceListPage,
  TeacherToast,
} from '../shared';
import type { TeacherClassFocus } from '@/lib/teacher/classFocus';
import type { TeacherExamRow } from '@/types/teacherExams';
import { useExams } from './useExams';
import { ExamsTable } from './ExamsTable';
import { ExamDetailView } from './components/ExamDetailView';

interface ExamsViewProps {
  classFocus?: TeacherClassFocus | null;
}

export function ExamsView({ classFocus = null }: ExamsViewProps) {
  const [selectedExam, setSelectedExam] = React.useState<TeacherExamRow | null>(null);
  const [confirmAction, setConfirmAction] = React.useState<{
    type: 'archive_bulk' | 'delete_bulk' | 'archive_single' | 'delete_single';
    id?: string;
  } | null>(null);
  const {
    metrics,
    filterOptions,
    filters,
    setFilter,
    clearFilters,
    isDirty,
    filteredCount,
    paginatedExams,
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
    toast,
    dismissToast,
  } = useExams({ classFocus });
  const confirmExam = confirmAction?.id
    ? paginatedExams.find((exam) => exam.id === confirmAction.id) ?? null
    : null;
  const confirmCount = confirmAction?.type.includes('bulk') ? selectedIds.length : 1;
  const confirmActionType = confirmAction?.type.includes('archive') ? 'archive' : 'delete';

  if (selectedExam) {
    return (
      <ExamDetailView
        exam={selectedExam}
        onBack={() => setSelectedExam(null)}
      />
    );
  }

  return (
    <>
      <ResourceListPage
        title="Exams"
        subtitle="Create, manage and monitor all your exams."
        headerActions={
          <button type="button" className={listStyles.primaryBtn}>
            + Create New Exam
          </button>
        }
        metrics={metrics}
        metricsColumns={5}
        filters={
          <ClassroomResourceFilters
            filters={filters}
            onFilterChange={setFilter}
            classes={filterOptions.classes}
            subjects={filterOptions.subjects}
            statuses={filterOptions.statuses}
            searchPlaceholder="Search exams by title or keyword..."
            searchAriaLabel="Search exams"
            onClear={clearFilters}
            isDirty={isDirty}
          />
        }
        itemsCount={paginatedExams.length}
        emptyTitle="No exams found"
        emptyDescription="Try adjusting your search or filters."
        table={
          <ExamsTable
            exams={paginatedExams}
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
            onViewExam={setSelectedExam}
          />
        }
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="exams"
        onPageChange={setPage}
      />

      {toast ? (
        <TeacherToast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}

      {confirmAction ? (
        <ConfirmActionModal
          title={
            confirmAction.type.includes('bulk')
              ? `${confirmCount} ${confirmCount === 1 ? 'exam' : 'exams'}`
              : confirmExam?.title ?? 'Exam'
          }
          copy={
            confirmAction.type.includes('bulk')
              ? 'Selected from your exams list'
              : `${confirmExam?.classLabel ?? ''} - ${confirmExam?.subject ?? ''}`
          }
          itemLabel="exam"
          count={confirmCount}
          actionType={confirmActionType}
          onCancel={() => setConfirmAction(null)}
          onConfirm={() => {
            if (confirmAction.type === 'archive_bulk') archiveSelected();
            if (confirmAction.type === 'delete_bulk') deleteSelected();
            if (confirmAction.type === 'archive_single' && confirmAction.id) {
              archiveItem(confirmAction.id);
            }
            if (confirmAction.type === 'delete_single' && confirmAction.id) {
              deleteItem(confirmAction.id);
            }
            setConfirmAction(null);
          }}
        />
      ) : null}
    </>
  );
}
