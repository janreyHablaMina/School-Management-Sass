'use client';

import React from 'react';
import {
  ClassroomResourceFilters,
  listStyles,
  ResourceListPage,
} from '../shared';
import { useQuizzes } from './useQuizzes';
import { QuizzesTable } from './QuizzesTable';

export function QuizzesView() {
  const {
    metrics,
    tabs,
    filterOptions,
    filters,
    setFilter,
    filteredCount,
    paginatedQuizzes,
    page,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = useQuizzes();

  return (
    <ResourceListPage
      title="Quizzes"
      subtitle="Create, manage and analyze your quizzes."
      headerActions={
        <>
          <button type="button" className={listStyles.secondaryBtn}>
            + New Folder
          </button>
          <button type="button" className={listStyles.primaryBtn}>
            + Create New Quiz
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
          searchPlaceholder="Search quizzes by title or keyword..."
          searchAriaLabel="Search quizzes"
          tabsAriaLabel="Quiz views"
          tabsPlacement="after"
        />
      }
      itemsCount={paginatedQuizzes.length}
      emptyTitle="No quizzes found"
      emptyDescription="Try adjusting your search or filters."
      table={<QuizzesTable quizzes={paginatedQuizzes} />}
      rangeStart={rangeStart}
      rangeEnd={rangeEnd}
      total={filteredCount}
      page={page}
      totalPages={totalPages}
      itemLabel="quizzes"
      onPageChange={setPage}
    />
  );
}
