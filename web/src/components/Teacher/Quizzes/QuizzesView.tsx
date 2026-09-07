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
import type { TeacherQuizRow } from '@/types/teacherQuizzes';
import { useQuizzes } from './useQuizzes';
import { QuizzesTable } from './QuizzesTable';
import { QuizDetailView } from './components/QuizDetailView';

interface QuizzesViewProps {
  classFocus?: TeacherClassFocus | null;
}

export function QuizzesView({ classFocus = null }: QuizzesViewProps) {
  const [selectedQuiz, setSelectedQuiz] = React.useState<TeacherQuizRow | null>(null);
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
    paginatedQuizzes,
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
  } = useQuizzes({ classFocus });
  const confirmQuiz = confirmAction?.id
    ? paginatedQuizzes.find((quiz) => quiz.id === confirmAction.id) ?? null
    : null;
  const confirmCount = confirmAction?.type.includes('bulk') ? selectedIds.length : 1;
  const confirmActionType = confirmAction?.type.includes('archive') ? 'archive' : 'delete';

  if (selectedQuiz) {
    return (
      <QuizDetailView
        quiz={selectedQuiz}
        onBack={() => setSelectedQuiz(null)}
      />
    );
  }

  return (
    <>
      <ResourceListPage
        title="Quizzes"
        subtitle="Create, manage and analyze your quizzes."
        headerActions={
          <button type="button" className={listStyles.primaryBtn}>
            + Create New Quiz
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
            searchPlaceholder="Search quizzes by title or keyword..."
            searchAriaLabel="Search quizzes"
            onClear={clearFilters}
            isDirty={isDirty}
          />
        }
        itemsCount={paginatedQuizzes.length}
        emptyTitle="No quizzes found"
        emptyDescription="Try adjusting your search or filters."
        table={
          <QuizzesTable
            quizzes={paginatedQuizzes}
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
            onViewQuiz={setSelectedQuiz}
          />
        }
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="quizzes"
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
              ? `${confirmCount} ${confirmCount === 1 ? 'quiz' : 'quizzes'}`
              : confirmQuiz?.title ?? 'Quiz'
          }
          copy={
            confirmAction.type.includes('bulk')
              ? 'Selected from your quizzes list'
              : `${confirmQuiz?.classLabel ?? ''} - ${confirmQuiz?.subject ?? ''}`
          }
          itemLabel="quiz"
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
