'use client';

import React, { useCallback, useState } from 'react';
import {
  ClassroomResourceFilters,
  listStyles,
  ResourceListPage,
  TeacherToast,
} from '../shared';
import { CreateLessonModal } from './components/CreateLessonModal';
import { LessonGeneratorView } from './LessonGeneratorView';
import { useLessons } from './useLessons';
import { LessonsTable } from './LessonsTable';
import type { LessonGeneratorSession } from './types';
import { LessonPreviewModal } from './components/LessonPreviewModal';
import { ConfirmLessonModal } from './components/ConfirmLessonModal';
import type { TeacherLessonRow } from '@/types/teacherLessons';

import type { TeacherClassFocus, TeacherNavRequest } from '@/lib/teacher/classFocus';

interface LessonsViewProps {
  classFocus?: TeacherClassFocus | null;
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function LessonsView({
  classFocus = null,
}: LessonsViewProps) {
  const {
    metrics,
    tabs,
    filterOptions,
    filters,
    setFilter,
    clearFilters,
    isDirty,
    filteredCount,
    paginatedLessons,
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
    downloadSelected,
    archiveItem,
    deleteItem,
    duplicateItem,
    isCreateOpen,
    openCreate,
    closeCreate,
    createLesson,
    ingestSavedLessons,
    highlightId,
    toast,
    dismissToast,
  } = useLessons({ classFocus });

  const [generator, setGenerator] = useState<LessonGeneratorSession | null>(null);
  const [previewLesson, setPreviewLesson] = useState<TeacherLessonRow | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'archive_bulk' | 'delete_bulk' | 'archive_single' | 'delete_single';
    id?: string;
  } | null>(null);

  const handleSaved = useCallback(
    (lessons: TeacherLessonRow[]) => {
      setGenerator(null);
      ingestSavedLessons(lessons);
    },
    [ingestSavedLessons],
  );

  if (generator) {
    return (
      <LessonGeneratorView
        session={generator}
        classOptions={filterOptions.classes.filter((item) => item !== 'All Classes')}
        subjectOptions={filterOptions.subjects.filter(
          (item) => item !== 'All Subjects',
        )}
        onBack={() => setGenerator(null)}
        onSaved={handleSaved}
      />
    );
  }

  return (
    <>
      <ResourceListPage
        title="Lessons"
        subtitle="Create, organize and manage your lessons."
        headerActions={
          <button
            type="button"
            className={listStyles.primaryBtn}
            onClick={openCreate}
          >
            + Create New Lesson
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
            types={filterOptions.types}
            sorts={filterOptions.sorts}
            searchPlaceholder="Search lessons by title or keyword..."
            searchAriaLabel="Search lessons"
            tabsAriaLabel="Lesson views"
            tabsPlacement="before"
            onClear={clearFilters}
            isDirty={isDirty}
          />
        }
        itemsCount={paginatedLessons.length}
        emptyTitle="No lessons found"
        emptyDescription="Try adjusting your search or filters."
        table={
          <LessonsTable
            lessons={paginatedLessons}
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
            onDownloadSelected={downloadSelected}
            onArchiveItem={(id) => setConfirmAction({ type: 'archive_single', id })}
            onDeleteItem={(id) => setConfirmAction({ type: 'delete_single', id })}
            onDuplicateItem={duplicateItem}
            onViewLesson={setPreviewLesson}
            highlightId={highlightId}
          />
        }
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="lessons"
        onPageChange={setPage}
      />

      {isCreateOpen ? (
        <CreateLessonModal
          classes={filterOptions.classes}
          subjects={filterOptions.subjects}
          initialClassLabel={filters.classFilter}
          initialSubject={filters.subject}
          onCancel={closeCreate}
          onCreate={createLesson}
          onStartGenerator={(session) => {
            closeCreate();
            setGenerator(session);
          }}
        />
      ) : null}

      {toast ? (
        <TeacherToast
          title={toast.title}
          message={toast.message}
          onClose={dismissToast}
        />
      ) : null}

      {previewLesson && (
        <LessonPreviewModal
          lesson={previewLesson}
          onClose={() => setPreviewLesson(null)}
        />
      )}

      {confirmAction && (
        <ConfirmLessonModal
          lesson={
            confirmAction.type.includes('single') && confirmAction.id
              ? paginatedLessons.find((l) => l.id === confirmAction.id)
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
