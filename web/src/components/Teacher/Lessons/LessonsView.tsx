'use client';

import React from 'react';
import {
  EmptyState,
  listStyles,
  PageHeader,
  PaginationBar,
  SummaryMetrics,
} from '../shared';
import { useLessons } from './useLessons';
import { LessonsFilters } from './LessonsFilters';
import { LessonsTable } from './LessonsTable';

export function LessonsView() {
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
  } = useLessons();

  return (
    <div className={listStyles.page}>
      <PageHeader
        title="Lessons"
        subtitle="Create, organize and manage your lessons."
      >
        <button type="button" className={listStyles.primaryBtn}>
          + Create New Lesson
        </button>
      </PageHeader>

      <SummaryMetrics metrics={metrics} columns={4} />

      <LessonsFilters
        filters={filters}
        onFilterChange={setFilter}
        tabs={tabs}
        classes={filterOptions.classes}
        subjects={filterOptions.subjects}
        statuses={filterOptions.statuses}
        types={filterOptions.types}
        sorts={filterOptions.sorts}
      />

      {paginatedLessons.length === 0 ? (
        <EmptyState
          title="No lessons found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <LessonsTable lessons={paginatedLessons} />
      )}

      <PaginationBar
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filteredCount}
        page={page}
        totalPages={totalPages}
        itemLabel="lessons"
        onPageChange={setPage}
      />
    </div>
  );
}
