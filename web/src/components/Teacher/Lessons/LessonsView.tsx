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
    archiveItem,
    deleteItem,
    isCreateOpen,
    openCreate,
    closeCreate,
    createLesson,
    ingestSavedLesson,
    highlightId,
    toast,
    dismissToast,
  } = useLessons({ classFocus });

  const [generator, setGenerator] = useState<LessonGeneratorSession | null>(null);

  const handleSaved = useCallback(
    (lesson: TeacherLessonRow) => {
      setGenerator(null);
      ingestSavedLesson(lesson);
    },
    [ingestSavedLesson],
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
        metricsColumns={4}
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
            searchPlaceholder="Search lessons by title or keyword..."
            searchAriaLabel="Search lessons"
            tabsAriaLabel="Lesson views"
            tabsPlacement="before"
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
            onArchiveSelected={archiveSelected}
            onDeleteSelected={deleteSelected}
            onArchiveItem={archiveItem}
            onDeleteItem={deleteItem}
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
    </>
  );
}
