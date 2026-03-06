'use client';

import React from 'react';
import {
  ClassroomResourceFilters,
  listStyles,
  ResourceListPage,
} from '../shared';
import { useLessons } from './useLessons';
import { LessonsTable } from './LessonsTable';

import type { TeacherClassFocus } from '@/lib/teacher/classFocus';

interface LessonsViewProps {
  classFocus?: TeacherClassFocus | null;
}

export function LessonsView({ classFocus = null }: LessonsViewProps) {
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
  } = useLessons({ classFocus });

  return (
    <ResourceListPage
      title="Lessons"
      subtitle="Create, organize and manage your lessons."
      headerActions={
        <button type="button" className={listStyles.primaryBtn}>
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
  );
}
