'use client';

import React from 'react';
import {
  ClassroomResourceFilters,
  listStyles,
  ResourceListPage,
  TeacherToast,
} from '../shared';
import { CreateLessonModal } from './components/CreateLessonModal';
import { useLessons } from './useLessons';
import { LessonsTable } from './LessonsTable';

import type { TeacherClassFocus, TeacherNavRequest } from '@/lib/teacher/classFocus';

interface LessonsViewProps {
  classFocus?: TeacherClassFocus | null;
  onNavigate?: (request: TeacherNavRequest | string) => void;
}

export function LessonsView({
  classFocus = null,
  onNavigate,
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
    toast,
    dismissToast,
  } = useLessons({ classFocus });

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
          onGenerateWithAi={
            onNavigate
              ? (request) => {
                  closeCreate();
                  onNavigate(request);
                }
              : undefined
          }
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
